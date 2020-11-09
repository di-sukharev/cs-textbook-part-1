// VM Translator for nand2tetris project 8 -- written in Rust by Kevin Brothaler.
// CC BY-SA 4.0 -- https://creativecommons.org/licenses/by-sa/4.0/
use std::env;
use std::fs::File;
use std::io;
use std::io::{BufRead, BufReader, BufWriter, Read, Write};
use std::path::Path;

fn main() {
    let args: Vec<String> = env::args().collect();
    match args.len() {
        2 => {
            let in_name = &args[1];
            let in_path = Path::new(in_name);            
            let out_path = Path::new(in_name).with_extension("asm");
            
            let mut input_files: Vec<String> = {
                if in_path.is_dir() {
                    in_path.read_dir().unwrap()
                    .filter(|dir_entry| {                        
                        match dir_entry.as_ref().unwrap().path().extension() {
                            Some(extension) => {
                                return extension == "vm";
                            },
                            None => { return false; }
                        }})
                    .map(|dir_entry| dir_entry.unwrap().path().to_str().unwrap().to_string())                    
                    .collect()
                } else {
                    vec![in_path.to_str().unwrap().to_string()]
                }
            };

            let out_name = out_path.to_str().unwrap();
            let symbol_prefix = Path::new(in_name).file_stem().unwrap().to_str().unwrap().to_string();
            let mut writer = Writer::new(&out_name, symbol_prefix).unwrap();

            if input_files.len() > 1 {
                writer.writeln("// Writing bootstrap code").unwrap();
                writer.write_prelude().unwrap();
                writer.write(Command::CallFunction("Sys.init".to_string(), 0)).unwrap();
            }

            for input_file in input_files {                
                writer.writeln(&format!("// Processing {}", input_file)).unwrap();                
                let parser = Parser::new(&input_file).unwrap();                
                writer.symbol_prefix = Path::new(&input_file).file_stem().unwrap().to_str().unwrap().to_string();                
                for (element, line) in parser {                                        
                    writer.writeln(&format!("// {}", line)).unwrap();                    
                    writer.write(element).unwrap();                                        
                }                
            }                                
        }
        _ => {
            println!("Usage: vm-to-hack input_file or vm-to-hack input_dir");
        }
    }
}

// The implementation below follows the "proposed" VM translator implementation
// from the nand2tetris book, although this is possibly not idiomatic Rust.

// Refs:

// http://nand2tetris.org/07.php
// http://nand2tetris.org/08.php
// http://www1.idc.ac.il/tecs/book/chapter07.pdf
// http://www.cs.huji.ac.il/course/2002/nand2tet/docs/ch_8_vm_II.pdf
// http://nand2tetris.org/lectures/PDF/lecture%2007%20virtual%20machine%20I.pdf
// http://nand2tetris.org/lectures/PDF/lecture%2008%20virtual%20machine%20II.pdf

#[derive(Debug)]
enum ArithmeticCommand {
    // These commands pop off the stack, compute, and then push the result back onto the stack.
    Add,    // x + y
    Sub,    // x - y
    Neg,    // -y
    Eq,     // x == y
    Gt,     // x > y
    Lt,     // x < y
    And,    // x & y
    Or,     // x | y
    Not,    // !y
}

#[derive(Debug)]
enum MemorySegment {
    Local,
    Argument,
    This,
    That,
    Pointer,
    Temp,
    Constant,
    Static,
}

#[derive(Debug)]
enum Command {
    Arithmetic(ArithmeticCommand),
    Push(MemorySegment, i32),
    Pop(MemorySegment, i32),
    Label(String, String),
    Goto(String, String),
    IfGoto(String, String),
    DefineFunction(String, i32),
    CallFunction(String, i32),
    Return,    
}

struct Parser<R: Read> {
    reader: BufReader<R>,
    current_function_scope: Option<String>,
}

impl Parser<File> {
    fn new(in_name: &str) -> io::Result<Self>  {
        let in_file = try!(File::open(in_name));
        let reader = BufReader::new(in_file);

        Ok(Parser {reader: reader, current_function_scope: None})
    } 
}

impl<R: Read> Iterator for Parser<R> {
    type Item = (Command, String);

    fn next(&mut self) -> Option<(Command, String)> {
        let mut line = String::new();   // NOTE: Inefficient -- should reuse this for each iteration.
            
        loop {      
            line.clear();        
            match self.reader.read_line(&mut line) {
                Ok(len) => {                    
                    if len == 0 {
                        // We've hit EOF.
                        return None;
                    }                    
                    let line = get_trimmed_line(&line);                    
                    if line.is_empty() {
                        // Skip this line.                       
                        continue;
                    }

                    let mut split = line.split_whitespace(); 
                    let command = split.next().unwrap();

                    if command == "push" {
                        let segment = memory_segment(split.next().unwrap());
                        let value = split.next().unwrap().parse::<i32>().unwrap();
                        return Some((Command::Push(segment, value), line.to_string()))
                    } else if command == "pop" {
                        let segment = memory_segment(split.next().unwrap());
                        let value = split.next().unwrap().parse::<i32>().unwrap();
                        return Some((Command::Pop(segment, value), line.to_string()))
                    } else if command == "add" {
                        return Some((Command::Arithmetic(ArithmeticCommand::Add), line.to_string()))
                    } else if command == "sub" {
                        return Some((Command::Arithmetic(ArithmeticCommand::Sub), line.to_string()))
                    } else if command == "neg" {
                        return Some((Command::Arithmetic(ArithmeticCommand::Neg), line.to_string()))
                    } else if command == "eq" {
                        return Some((Command::Arithmetic(ArithmeticCommand::Eq), line.to_string()))
                    } else if command == "gt" {
                        return Some((Command::Arithmetic(ArithmeticCommand::Gt), line.to_string()))
                    } else if command == "lt" {
                        return Some((Command::Arithmetic(ArithmeticCommand::Lt), line.to_string()))
                    } else if command == "and" {
                        return Some((Command::Arithmetic(ArithmeticCommand::And), line.to_string()))
                    } else if command == "or" {
                        return Some((Command::Arithmetic(ArithmeticCommand::Or), line.to_string()))
                    } else if command == "not" {
                        return Some((Command::Arithmetic(ArithmeticCommand::Not), line.to_string()))
                    } else if command == "label" {
                        let current_scope = self.current_function_scope.clone().unwrap();
                        let identifier = split.next().unwrap();                        
                        return Some((Command::Label(current_scope, identifier.to_string()), line.to_string()))
                    } else if command == "goto" {
                        let current_scope = self.current_function_scope.clone().unwrap();
                        let label = split.next().unwrap();                        
                        return Some((Command::Goto(current_scope, label.to_string()), line.to_string()))
                    } else if command == "if-goto" {
                        let current_scope = self.current_function_scope.clone().unwrap();
                        let label = split.next().unwrap();                        
                        return Some((Command::IfGoto(current_scope, label.to_string()), line.to_string()))
                    } else if command == "function" {
                        let function_name = split.next().unwrap();                        
                        let num_local_variables = split.next().unwrap().parse::<i32>().unwrap();
                        self.current_function_scope = Some(function_name.to_string());
                        return Some((Command::DefineFunction(function_name.to_string(), num_local_variables), line.to_string()))
                    } else if command == "call" {
                        let function_name = split.next().unwrap();                        
                        let num_arguments = split.next().unwrap().parse::<i32>().unwrap();
                        return Some((Command::CallFunction(function_name.to_string(), num_arguments), line.to_string()))
                    } else if command == "return" {                        
                        return Some((Command::Return, line.to_string()))
                    } else {
                        panic!("Invalid command: {:?}", command);
                    }                    
                },
                Err(_) => {                    
                    return None 
                }
            }            
        }
    }
}

fn memory_segment(string: &str) -> MemorySegment {
    if string == "local" {
        return MemorySegment::Local
    } else if string == "argument" {
        return MemorySegment::Argument
    } else if string == "this" {
        return MemorySegment::This
    } else if string == "that" {
        return MemorySegment::That
    } else if string == "pointer" {
        return MemorySegment::Pointer
    } else if string == "temp" {
        return MemorySegment::Temp
    } else if string == "constant" {
        return MemorySegment::Constant
    } else if string == "static" {
        return MemorySegment::Static
    } else {
        panic!("Invalid memory segment: {:?}", string);
    }
}

fn get_trimmed_line(line: &str) -> &str {
    let mut line = line.trim();

    // Strip any comments
    if let Some(idx_comment) = line.find("//") {
        line = &line[0..idx_comment].trim();
    }

    return line;
}

struct Writer<W: Write> {
    writer: BufWriter<W>,
    jump_label_index: u16,
    ret_label_index: u16,
    // This identifies which VM file the symbol originally came from, so that we can disambiguate statics and other identifiers.
    symbol_prefix: String,
}

impl Writer<File> {
    fn new(out_name: &str, initial_symbol_prefix: String) -> io::Result<Self>  {
        let out_file = try!(File::create(out_name));
        let writer = BufWriter::new(out_file);

        Ok(Writer {writer: writer, jump_label_index: 0, ret_label_index: 0, symbol_prefix: initial_symbol_prefix})
    }    
}

impl<W: Write> Writer<W> {
    fn writeln(&mut self, string: &str) -> io::Result<()> {
        try!(self.writer.write(format!("{}\n", string).as_bytes()));

        Ok(())
    }

    fn write_prelude(&mut self) -> io::Result<()> {
        // Initialize stack pointer
        try!(self.writeln("// Initialize stack pointer"));
        try!(self.writeln("@256"));
        try!(self.writeln("D=A"));
        try!(self.writeln("@SP"));
        try!(self.writeln("M=D"));
        try!(self.writeln(""));

        Ok(())
    } 

    fn write(&mut self, command: Command) -> io::Result<()> {
        match command {
            Command::Push(memory_segment, value) => {
                match memory_segment {
                    MemorySegment::Constant => {
                        try!(self.writeln(&format!("// Push {} onto the stack", value)));
                        try!(self.load_value_into_d(value));
                        try!(self.write_push_d_onto_stack());
                    },
                    MemorySegment::Local => {
                        try!(self.writeln(&format!("// Push LCL[{}] onto the stack", value)));
                                                
                        try!(self.load_value_into_d(value));                        
                        try!(self.load_value_offset_by_d("LCL"));                        
                        try!(self.write_push_d_onto_stack());                        
                    },
                    MemorySegment::Argument => {
                        try!(self.writeln(&format!("// Push ARG[{}] onto the stack", value)));
                                                
                        try!(self.load_value_into_d(value));                        
                        try!(self.load_value_offset_by_d("ARG"));                        
                        try!(self.write_push_d_onto_stack());                        
                    },
                    MemorySegment::This => {
                        try!(self.writeln(&format!("// Push THIS[{}] onto the stack", value)));
                                                
                        try!(self.load_value_into_d(value));                        
                        try!(self.load_value_offset_by_d("THIS"));                        
                        try!(self.write_push_d_onto_stack());                        
                    },
                    MemorySegment::That => {
                        try!(self.writeln(&format!("// Push THAT[{}] onto the stack", value)));
                                                
                        try!(self.load_value_into_d(value));                        
                        try!(self.load_value_offset_by_d("THAT"));                        
                        try!(self.write_push_d_onto_stack());                        
                    },
                    MemorySegment::Pointer => {
                        try!(self.writeln(&format!("// Push POINTER[{}] onto the stack", value)));
                                                
                        try!(self.load_value_into_d(value));
                        try!(self.write_load_memory_with_base_into_d(3));
                        try!(self.write_push_d_onto_stack());                        
                    },
                    MemorySegment::Temp => {
                        try!(self.writeln(&format!("// Push TEMP[{}] onto the stack", value)));
                                                
                        try!(self.load_value_into_d(value));
                        try!(self.write_load_memory_with_base_into_d(5));                        
                        try!(self.write_push_d_onto_stack());                        
                    },
                    MemorySegment::Static => {
                        // For statics, we handle by emitting symbols.
                        try!(self.writeln(&format!("// Push STATIC[{}] onto the stack", value)));
                        
                        // Annoying that we have to clone this to work around the borrow-checker.                       
                        // Is there a better way?
                        let symbol_prefix = self.symbol_prefix.clone(); 
                        try!(self.writeln(&format!("@{}.{}", symbol_prefix, value)));      
                        try!(self.writeln("D=M"));
                        try!(self.write_push_d_onto_stack());                        
                    },
                }
            },
            Command::Pop(memory_segment, value) => { 
                match memory_segment {
                    MemorySegment::Constant => {
                        panic!("Can't pop into the constant segment -- that doesn't make sense.");
                    },
                    MemorySegment::Local => {  
                        try!(self.writeln(&format!("// Pop the stack into LCL[{}]", value)));
                        try!(self.write_pop_stack_to_segment("LCL", value));                                         
                    },
                    MemorySegment::Argument => {  
                        try!(self.writeln(&format!("// Pop the stack into ARG[{}]", value)));
                        try!(self.write_pop_stack_to_segment("ARG", value));                                         
                    },
                    MemorySegment::This => {  
                        try!(self.writeln(&format!("// Pop the stack into THIS[{}]", value)));
                        try!(self.write_pop_stack_to_segment("THIS", value));                                         
                    },
                    MemorySegment::That => {  
                        try!(self.writeln(&format!("// Pop the stack into THAT[{}]", value)));
                        try!(self.write_pop_stack_to_segment("THAT", value));                                         
                    },
                    MemorySegment::Pointer => {  
                        try!(self.writeln(&format!("// Pop the stack into POINTER[{}]", value)));                                                
                        try!(self.write_offset_from_base_into_d(3, value));                     
                        try!(self.write_pop_stack_to_d_as_addr());
                    },
                    MemorySegment::Temp => {  
                        try!(self.writeln(&format!("// Pop the stack into TEMP[{}]", value)));                                                
                        try!(self.write_offset_from_base_into_d(5, value));
                        try!(self.write_pop_stack_to_d_as_addr());
                    },
                    MemorySegment::Static => {  
                        // For statics, we handle by emitting symbols. 
                        try!(self.writeln(&format!("// Pop the stack into STATIC[{}]", value)));                                                                    
                        // Annoying that we have to clone this to work around the borrow-checker.                       
                        // Is there a better way?
                        let symbol_prefix = self.symbol_prefix.clone(); 
                        try!(self.writeln(&format!("@{}.{}", symbol_prefix, value)));      
                        try!(self.writeln("D=A"));                       
                        try!(self.write_pop_stack_to_d_as_addr());
                    },
                }
             },
            Command::Arithmetic(arithmetic_command) => {
                match arithmetic_command {
                    ArithmeticCommand::Add => {
                        try!(self.writeln("// Pop 2 from the stack, add, and put result on the stack."));
                        try!(self.write_prelude_for_binary_arithmetic());
                        try!(self.writeln("M=D+M"));
                    },
                    ArithmeticCommand::Sub => {
                        try!(self.writeln("// Pop 2 from the stack, subtract, and put result on the stack."));
                        try!(self.write_prelude_for_binary_arithmetic());
                        try!(self.writeln("M=M-D"));
                    },
                    ArithmeticCommand::Neg => {
                        try!(self.writeln("// Pop 1 from the stack, negate, and put result on the stack."));
                        try!(self.write_prelude_for_unary_arithmetic());
                        try!(self.writeln("M=-M"));
                    },
                    ArithmeticCommand::Eq => {
                        try!(self.writeln("// Pop 2 from the stack, compare equality, and put result on the stack."));
                        try!(self.write_prelude_for_binary_arithmetic());
                        try!(self.write_compare_op("JEQ"));
                    },
                    ArithmeticCommand::Gt => {
                        try!(self.writeln("// Pop 2 from the stack, compare greater than, and put result on the stack."));
                        try!(self.write_prelude_for_binary_arithmetic());
                        try!(self.write_compare_op("JGT"));
                    },
                    ArithmeticCommand::Lt => {
                        try!(self.writeln("// Pop 2 from the stack, compare less than, and put result on the stack."));
                        try!(self.write_prelude_for_binary_arithmetic());
                        try!(self.write_compare_op("JLT"));
                    },
                    ArithmeticCommand::And => {
                        try!(self.writeln("// Pop 2 from the stack, AND them together, and put result on the stack."));
                        try!(self.write_prelude_for_binary_arithmetic());
                        try!(self.writeln("M=D&M"));
                    },
                    ArithmeticCommand::Or => {
                        try!(self.writeln("// Pop 2 from the stack, OR them together, and put result on the stack."));
                        try!(self.write_prelude_for_binary_arithmetic());
                        try!(self.writeln("M=D|M"));
                    },
                    ArithmeticCommand::Not => {
                        try!(self.writeln("// Pop 1 from the stack, NOT it, and put result on the stack."));
                        try!(self.write_prelude_for_unary_arithmetic());
                        try!(self.writeln("M=!M"));
                    },
                }                
            },
            Command::Label(function, identifier) => {                
                try!(self.writeln(&format!("// Define label: {}", identifier)));                        
                try!(self.writeln(&format!("({}${})", function, identifier)));
            },
            Command::Goto(function, label) => {                
                try!(self.writeln(&format!("// GOTO label: {}", label)));         
                                
                try!(self.writeln(&format!("@{}${}", function, label)));
                // Unconditional jump
                try!(self.writeln("0;JMP"));
            },
            Command::IfGoto(function, label) => {                
                try!(self.writeln(&format!("// IF-GOTO label: {}", label))); 

                try!(self.write_pop_stack_into_d());                                
                try!(self.writeln(&format!("@{}${}", function, label)));
                // Jump if not equal to zero
                try!(self.writeln("D;JNE"));
            },
            Command::DefineFunction(function_name, num_local_variables) => {
                try!(self.writeln(&format!("// FUNCTION {} with {} local variables", function_name, num_local_variables)));                

                // Function label
                try!(self.writeln(&format!("({})", function_name)));
                for _ in 0..num_local_variables {
                    // Push local variable onto the stack, initialized to zero.
                    try!(self.writeln("@SP"));
                    try!(self.writeln("A=M"));
                    try!(self.writeln("M=0"));
                    // Increment stack pointer
                    try!(self.writeln("@SP"));
                    try!(self.writeln("M=M+1"));
                }
            },
            Command::CallFunction(function_name, num_arguments) => {
                try!(self.writeln(&format!("// CALL FUNCTION {} with {} arguments", function_name, num_arguments)));
                
                // Push return address onto the stack
                let current_ret_index = self.ret_label_index;                
                try!(self.writeln(&format!("@r{}", current_ret_index)));
                try!(self.writeln("D=A"));   
                try!(self.write_push_d_onto_stack());   

                // Push LCL
                try!(self.writeln("@LCL"));  
                try!(self.writeln("D=M")); 
                try!(self.write_push_d_onto_stack());      

                // Push ARG
                try!(self.writeln("@ARG"));  
                try!(self.writeln("D=M")); 
                try!(self.write_push_d_onto_stack());   

                // Push THIS
                try!(self.writeln("@THIS"));  
                try!(self.writeln("D=M")); 
                try!(self.write_push_d_onto_stack()); 

                // Push THAT
                try!(self.writeln("@THAT"));  
                try!(self.writeln("D=M")); 
                try!(self.write_push_d_onto_stack()); 

                // Reposition ARG AND LCL
                try!(self.writeln("@SP")); 
                try!(self.writeln("D=M"));  
                try!(self.writeln("@LCL")); 
                try!(self.writeln("M=D"));  
                try!(self.writeln("@5")); 
                try!(self.writeln("D=D-A"));  
                try!(self.writeln(&format!("@{}", num_arguments)));
                try!(self.writeln("D=D-A"));  
                try!(self.writeln("@ARG")); 
                try!(self.writeln("M=D"));  

                // Jump to target function   
                try!(self.writeln(&format!("@{}", function_name)));   
                try!(self.writeln("0;JMP"));

                // Write out return address label  
                try!(self.writeln(&format!("(r{})", current_ret_index)));    
                self.ret_label_index = current_ret_index + 1;    
            },
            Command::Return => {                
                try!(self.writeln("// Return to the calling function."));                

                // Save current LCL address as the end of the caller frame -- we'll need it to compute frame offsets.
                try!(self.writeln("@LCL"));   
                try!(self.writeln("D=M"));   
                try!(self.writeln("@R13"));  
                try!(self.writeln("M=D"));

                // Save return address at frame - 5
                try!(self.writeln("@5"));
                try!(self.writeln("A=D-A"));
                try!(self.writeln("D=M"));
                try!(self.writeln("@R14"));
                try!(self.writeln("M=D"));

                // Pop the stack and setup the return value.
                try!(self.write_pop_stack_into_d());
                try!(self.writeln("@ARG"));
                try!(self.writeln("A=M"));
                try!(self.writeln("M=D"));

                // Restore caller's stack pointer
                try!(self.writeln("@ARG"));
                try!(self.writeln("D=M+1"));                
                try!(self.writeln("@SP"));
                try!(self.writeln("M=D"));

                // Restore THAT ptr
                try!(self.writeln("@R13")); 
                try!(self.writeln("AM=M-1"));
                try!(self.writeln("D=M"));
                try!(self.writeln("@THAT")); 
                try!(self.writeln("M=D"));

                // Restore THIS ptr
                try!(self.writeln("@R13")); 
                try!(self.writeln("AM=M-1"));
                try!(self.writeln("D=M"));
                try!(self.writeln("@THIS")); 
                try!(self.writeln("M=D"));

                // Restore ARG ptr
                try!(self.writeln("@R13")); 
                try!(self.writeln("AM=M-1"));
                try!(self.writeln("D=M"));
                try!(self.writeln("@ARG")); 
                try!(self.writeln("M=D"));

                // Restore LCL ptr
                try!(self.writeln("@R13")); 
                try!(self.writeln("AM=M-1"));
                try!(self.writeln("D=M"));
                try!(self.writeln("@LCL")); 
                try!(self.writeln("M=D"));

                // Jump to return address
                try!(self.writeln("@R14")); 
                try!(self.writeln("A=M"));
                try!(self.writeln("0;JMP"));                
            },    
        }

        try!(self.writeln(""));
        Ok(())
    }

    fn write_prelude_for_unary_arithmetic(&mut self) -> io::Result<()> {
        // Load mem[sp - 1] into D.  We don't decrement SP because we'll be writing right back to it.
        try!(self.writeln("@SP"));
        try!(self.writeln("A=M-1"));                
        // M holds the operand we need to operate on.
        Ok(())
    }

    fn write_prelude_for_binary_arithmetic(&mut self) -> io::Result<()> {
        // Load mem[sp - 1] into D and decrement SP
        try!(self.write_pop_stack_into_d());

        // Set address to mem[(original sp) - 2]. We don't decrement SP again because we'll be writing right back to it.
        try!(self.writeln("@SP"));
        try!(self.writeln("A=M-1"));
        
        // Now D and M hold the two operands we need to operate on, and the current address is set to the current location of the stack pointer.        
        Ok(())
    }

    fn load_value_into_d(&mut self, value: i32) -> io::Result<()> {
        // Load constant or offset into D
        try!(self.writeln(&format!("@{}", value)));
        try!(self.writeln("D=A"));    

        Ok(())
    }

    fn load_value_offset_by_d(&mut self, segment: &str) -> io::Result<()> {        
        try!(self.writeln(&format!("@{}", segment)));
        try!(self.writeln("A=M+D"));
        try!(self.writeln("D=M"));

        Ok(())
    }

    fn write_push_d_onto_stack(&mut self) -> io::Result<()> {
        // Push D onto the stack
        try!(self.writeln("@SP"));
        try!(self.writeln("A=M"));
        try!(self.writeln("M=D"));

        // Increment stack pointer
        try!(self.writeln("@SP"));
        try!(self.writeln("M=M+1"));          

        Ok(())
    }

    fn write_compare_op(&mut self, op: &str) -> io::Result<()> {
        // Prepare for comparison
        let current_jump_index = self.jump_label_index;

        try!(self.writeln("D=M-D"));
        try!(self.writeln(&format!("@j{}", current_jump_index)));
        try!(self.writeln(&format!("D;{}", op)));
        
        // Handle test failed
        try!(self.writeln("@SP"));
        try!(self.writeln("A=M-1"));
        try!(self.writeln("M=0"));
        try!(self.writeln(&format!("@j{}end", current_jump_index)));
        try!(self.writeln("0;JMP"));

        // Handle test passed        
        try!(self.writeln(&format!("(j{})", current_jump_index)));
        try!(self.writeln("@SP"));
        try!(self.writeln("A=M-1"));
        try!(self.writeln("M=-1"));

        // Terminating label
        try!(self.writeln(&format!("(j{}end)", current_jump_index)));
        self.jump_label_index = current_jump_index + 1;

        Ok(())
    }

    fn write_pop_stack_to_segment(&mut self, segment: &str, offset: i32) -> io::Result<()> {
        // Load offset into d and jump to segment + offset
        try!(self.writeln(&format!("@{}", offset)));                        
        try!(self.writeln("D=A"));
        try!(self.writeln(&format!("@{}", segment)));        
        try!(self.writeln("D=M+D"));                        

        try!(self.write_pop_stack_to_d_as_addr());

        Ok(())
    }

    fn write_pop_stack_to_d_as_addr(&mut self) -> io::Result<()> {
        // Stuff target address into R13
        try!(self.writeln("@R13"));
        try!(self.writeln("M=D"));

        try!(self.write_pop_stack_into_d());

        // Now go back to R13, jump to the target address and write D
        try!(self.writeln("@R13"));
        try!(self.writeln("A=M"));
        try!(self.writeln("M=D"));

        Ok(())
    }

    fn write_pop_stack_into_d(&mut self) -> io::Result<()> {
        // Pop stack into D and decrement stack pointer.                      
        try!(self.writeln("@SP"));
        try!(self.writeln("AM=M-1"));
        try!(self.writeln("D=M"));

        Ok(())
    }

    fn write_offset_from_base_into_d(&mut self, base: i32, offset: i32) -> io::Result<()> {                
        try!(self.writeln(&format!("@{}", offset)));                        
        try!(self.writeln("D=A"));
        // To adjust for POINTER or TEMP segments, need to offset by 3 or 5.
        try!(self.writeln(&format!("@{}", base)));                        
        try!(self.writeln("D=D+A"));  

        Ok(())
    }

    fn write_load_memory_with_base_into_d(&mut self, base: i32) -> io::Result<()> {
        // To adjust for POINTER or TEMP segments, need to offset by 3 or 5.
        try!(self.writeln(&format!("@{}", base)));      
        try!(self.writeln("A=D+A"));
        try!(self.writeln("D=M"));

        Ok(())
    } 
}