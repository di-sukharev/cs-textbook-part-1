// Jack Compiler for nand2tetris project 11 -- written in Rust.
// License: CC BY-SA 4.0 -- https://creativecommons.org/licenses/by-sa/4.0/

use std::collections::HashMap;
use std::env;
use std::fs::File;
use std::io;
use std::io::{BufRead, BufReader, BufWriter, Read, Write};
use std::iter::Peekable;
use std::path::Path;
use std::str::Chars;

// ------------------------------------------------
// Tokenizer
// ------------------------------------------------

#[derive(Clone, Debug, PartialEq)]
enum Token {
    Keyword(Keyword),
    Symbol(char),
    Identifier(String),
    IntegerConstant(i16),
    StringConstant(String),    
}

#[derive(Clone, Debug, PartialEq)]
enum Keyword {
    Class,
    Constructor,
    Function,
    Method,
    Field,
    Static,
    Var,
    Int,
    Char,
    Boolean,
    Void,
    True,
    False,
    Null,
    This,
    Let,
    Do,
    If,
    Else,
    While,
    Return,
}

struct JackTokenizer<'a, R: Read> {
    reader: BufReader<R>,
    line_buffer: String,    
    current_line_chars: Option<Peekable<Chars<'a>>>,    
    line_count: u32,
    is_inside_multiline_comment: bool,
}

impl<'a> JackTokenizer<'a, File> {
    fn new(in_name: &str) -> io::Result<Self>  {
        let in_file = try!(File::open(in_name));
        let reader = BufReader::new(in_file);

        Ok(JackTokenizer {reader: reader, line_buffer: String::with_capacity(256), current_line_chars: None, line_count: 0, is_inside_multiline_comment: false})
    } 
}

impl<'a, R: Read> Iterator for JackTokenizer<'a, R> {
    type Item = Token;

    fn next(&mut self) -> Option<Token> {                
        fn munch(initial_char: char, iterator: &mut Peekable<Chars>, predicate: fn(char) -> bool) -> String {
            let mut string = String::new();
            string.push(initial_char);

            loop {
                // Dereference the char to avoid double borrow at the "let _ = iterator.next();" line below.
                let peek = iterator.peek().map(|c| *c);
                if let Some(peeked) = peek {
                    if predicate(peeked) {                        
                        string.push(peeked);
                        // Consume
                        let _ = iterator.next();
                        continue;
                    }
                }
                break;                                  
            }    
            return string;
        }    

        loop {            
            if let Some(ref mut current_line_chars) = self.current_line_chars {
                while let Some(next_char) = current_line_chars.next() {
                    if self.is_inside_multiline_comment {
                        // We need a "*/" pattern to exit a multiline comment.
                        if next_char == '*' {
                            let peek = current_line_chars.peek().map(|c| *c);
                            if let Some(peeked) = peek {
                                if peeked == '/' {
                                    // Consume
                                    let _ = current_line_chars.next();
                                    self.is_inside_multiline_comment = false;                                    
                                }
                            }
                        }
                        continue;
                    }

                    match next_char {        
                        '/' => {
                            // If the next symbol is a "*", this is the start of a multiline comment. Otherwise, process as a
                            // regular symbol.
                            let peek = current_line_chars.peek().map(|c| *c);
                            if let Some(peeked) = peek {
                                if peeked == '*' {
                                    // Consume
                                    let _ = current_line_chars.next();
                                    self.is_inside_multiline_comment = true;
                                    continue;
                                }
                            }
                            // It's a symbol
                            return Some(Token::Symbol(next_char))
                        }                
                        '{'|'}'|'('|')'|'['|']'|'.'|','|';'|'+'|'-'|'*'|'&'|'|'|'<'|'>'|'='|'~' => {
                            return Some(Token::Symbol(next_char))
                        },
                        '"' => {
                            let mut constant = String::new();                            

                            while let Some(next_char) = current_line_chars.next() {
                                match next_char {
                                    '"' => { return Some(Token::StringConstant(constant)); },
                                    _ => { constant.push(next_char); }
                                }
                            }
                            // Never found the closing quote
                            panic!("Never found closing quote for string: {} on line: {}", constant, self.line_count);
                        },
                        _ => {
                            if next_char.is_whitespace() {
                                // Ignore whitespace
                                continue;
                            } else if next_char.is_digit(10) {
                                // Collect the number
                                // Note: Would be more efficient to slice the string here rather than accumulating in an extra string.
                                // We check if is alphanumeric, since we want to get a panic if letters follow the number.
                                let digit_string = munch(next_char, current_line_chars, |c| c.is_alphanumeric());
                                let number = digit_string.parse::<i16>().expect(&format!("Not a number: {} on line: {}", digit_string, self.line_count));

                                return Some(Token::IntegerConstant(number));
                            } else if next_char.is_alphanumeric() || next_char == '_' {
                                let string = munch(next_char, current_line_chars, |c| c.is_alphanumeric() || c == '_');                                

                                return Some(match string.as_ref() {
                                    "class" => { Token::Keyword(Keyword::Class) },        
                                    "constructor" => { Token::Keyword(Keyword::Constructor) },
                                    "function" => { Token::Keyword(Keyword::Function) },
                                    "method" => { Token::Keyword(Keyword::Method) },
                                    "field" => { Token::Keyword(Keyword::Field) },
                                    "static" => { Token::Keyword(Keyword::Static) },
                                    "var" => { Token::Keyword(Keyword::Var) },
                                    "int" => { Token::Keyword(Keyword::Int) },
                                    "char" => { Token::Keyword(Keyword::Char) },
                                    "boolean" => { Token::Keyword(Keyword::Boolean) },
                                    "void" => { Token::Keyword(Keyword::Void) },
                                    "true" => { Token::Keyword(Keyword::True) },
                                    "false" => { Token::Keyword(Keyword::False) },
                                    "null" => { Token::Keyword(Keyword::Null) },
                                    "this" => { Token::Keyword(Keyword::This) },
                                    "let" => { Token::Keyword(Keyword::Let) },
                                    "do" => { Token::Keyword(Keyword::Do) },
                                    "if" => { Token::Keyword(Keyword::If) },
                                    "else" => { Token::Keyword(Keyword::Else) },
                                    "while" => { Token::Keyword(Keyword::While) },
                                    "return" => { Token::Keyword(Keyword::Return) },
                                    _ => { Token::Identifier(string) },
                                });
                            } else {
                                panic!("Invalid char: {} at line: {}", next_char, self.line_count);
                            }                          
                        },
                    }                    
                }
            }
            
            // We have no more chars -- process the next line 
            self.line_buffer.clear();           
            match self.reader.read_line(&mut self.line_buffer) {                
                Ok(len) => {                                 
                    self.line_count += 1;

                    if len == 0 {
                        // We've hit EOF.
                        return None;
                    }            
                    let line = get_trimmed_line(&self.line_buffer);                    
                    if line.is_empty() {
                        // Skip this line.                       
                        continue;
                    }                      

                    // Note: This is terrible. Would be better to just figure out how to get the lifetimes working, or use the rental or owning_ref crates.
                    // Basically any changes to line_buffer will also invalidate this iterator, so we need to be careful with that.
                    unsafe {      
                        let a = line as *const str;        
                        let b: &str = &*a;                   
                        self.current_line_chars = Some(b.chars().peekable());
                    }                                           
                },
                Err(_) => {                    
                    return None 
                }
            }                   
        }
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

// ------------------------------------------------
// Symbol table
// ------------------------------------------------

#[derive(Debug, Copy, Clone)]
enum SymbolKind {
    Static, Field, Arg, Var,
}

struct Symbol {    
    symbol_type: String,
    symbol_kind: SymbolKind,
    symbol_index: u8,
}

struct SymbolTable {
    class_symbols: HashMap<String, Symbol>,
    subroutine_symbols: HashMap<String, Symbol>,
    static_count: u8,
    field_count: u8,
    arg_count: u8,
    var_count: u8,
}

impl SymbolTable {
    fn new() -> SymbolTable {
        SymbolTable { class_symbols: HashMap::new(), subroutine_symbols: HashMap::new(), static_count: 0, field_count: 0, arg_count: 0, var_count: 0, }
    }

    fn start_subroutine(&mut self) {
        self.subroutine_symbols.clear();
        self.arg_count = 0;
        self.var_count = 0;
    }

    fn define(&mut self, name: &str, symbol_type: &str, symbol_kind: SymbolKind) {        
        match symbol_kind {
            SymbolKind::Static => {
                let symbol_index = self.static_count;
                self.static_count += 1;
                self.class_symbols.insert(name.to_string(), Symbol{ symbol_type: symbol_type.to_string(), symbol_kind: symbol_kind, symbol_index: symbol_index});
            },
            SymbolKind::Field => {
                let symbol_index = self.field_count;
                self.field_count += 1;
                self.class_symbols.insert(name.to_string(), Symbol{ symbol_type: symbol_type.to_string(), symbol_kind: symbol_kind, symbol_index: symbol_index});
            },
            SymbolKind::Arg => {
                let symbol_index = self.arg_count;
                self.arg_count += 1;
                self.subroutine_symbols.insert(name.to_string(), Symbol{ symbol_type: symbol_type.to_string(), symbol_kind: symbol_kind, symbol_index: symbol_index});
            },
            SymbolKind::Var => {
                let symbol_index = self.var_count;
                self.var_count += 1;
                self.subroutine_symbols.insert(name.to_string(), Symbol{ symbol_type: symbol_type.to_string(), symbol_kind: symbol_kind, symbol_index: symbol_index});
            },
        }
    }

    fn kind_of(&self, name: &str) -> Option<SymbolKind> {
        self.symbol_for_name(name)
            .map(|entry| entry.symbol_kind)        
    }

    fn type_of(&self, name: &str) -> Option<&str> {
        self.symbol_for_name(name)
            .map(|entry| entry.symbol_type.as_str())
    }

    fn index_of(&self, name: &str) -> Option<u8> {
        self.symbol_for_name(name)
            .map(|entry| entry.symbol_index)
    }

    fn symbol_for_name(&self, name: &str) -> Option<&Symbol> {
        self.class_symbols.get(name)
            .or_else(|| self.subroutine_symbols.get(name))            
    }
}

// ------------------------------------------------
// Compilation Engine
// ------------------------------------------------

struct CompilationEngine<'a, R: Read, W: Write> {
    tokenizer: Peekable<JackTokenizer<'a, R>>,
    writer: VMWriter<W>,      
    symbol_table: SymbolTable,
    current_class_name: String,  
    if_counter: u16,
    while_loop_counter: u16,
}

impl<'a, R: Read> CompilationEngine<'a, R, File> {
    fn new(tokenizer: JackTokenizer<'a, R>, out_name: &str) -> io::Result<Self>  {        
        let writer = try!(VMWriter::new(out_name));

        Ok(CompilationEngine {tokenizer: tokenizer.peekable(), writer: writer, symbol_table: SymbolTable::new(), 
                              current_class_name: "".to_owned(), if_counter: 0, while_loop_counter: 0, })
    } 
}

// Follows the recommended implementation of the "CompilationEngine" in Chapter 10.
impl<'a, R: Read, W: Write> CompilationEngine<'a, R, W> {
    fn compile_class(&mut self) -> io::Result<()> {
        // 'class' className '{' classVarDec* subroutineDec* '}'                    
        let keyword = self.tokenizer.next().unwrap();
        let class_name = self.tokenizer.next().unwrap();
        let opening_braces = self.tokenizer.next().unwrap();

        expect_keyword(&keyword, Keyword::Class);
        expect_identifier(&class_name);
        expect_symbol(&opening_braces, '{');

        self.current_class_name = identifier_name(&class_name).to_owned();            
        
        loop {
            // NOTE: Has to be cloned to avoid a borrow-checker error. This is inefficient.
            let peek = self.tokenizer.peek().unwrap().clone();
            match peek {
                Token::Keyword(Keyword::Static) | Token::Keyword(Keyword::Field) => {
                    try!(self.compile_class_var_dec());
                },
                Token::Keyword(Keyword::Constructor) | Token::Keyword(Keyword::Function) | Token::Keyword(Keyword::Method) => {
                    try!(self.compile_subroutine(identifier_name(&class_name)));
                },
                _ => { break; } 
            }
        }

        let closing_braces = self.tokenizer.next().unwrap(); 
        expect_symbol(&closing_braces, '}'); 
        
        Ok(())
    }

    fn compile_class_var_dec(&mut self) -> io::Result<()> {
        // ('static' | 'field' ) type varName (',' varName)* ';'        
        let keyword = self.tokenizer.next().unwrap();
        let type_name = self.tokenizer.next().unwrap();
        let var_name = self.tokenizer.next().unwrap();

        expect_keywords(&keyword, &[Keyword::Static, Keyword::Field]);
        expect_typename(&type_name);        
        expect_identifier(&var_name);

        match keyword {
            Token::Keyword(Keyword::Static) => {
                self.symbol_table.define(identifier_name(&var_name), name_of_typename(&type_name), SymbolKind::Static);    
            },
            Token::Keyword(Keyword::Field) => {
                self.symbol_table.define(identifier_name(&var_name), name_of_typename(&type_name), SymbolKind::Field);    
            },
            _ => {},
        }        

        loop {
            let next = self.tokenizer.next().unwrap();
            match next {
                Token::Symbol(',') => {                    
                    let next_var_name = self.tokenizer.next().unwrap();
                    expect_identifier(&next_var_name);
                    match keyword {
                        Token::Keyword(Keyword::Static) => {
                            self.symbol_table.define(identifier_name(&next_var_name), name_of_typename(&type_name), SymbolKind::Static);    
                        },
                        Token::Keyword(Keyword::Field) => {
                            self.symbol_table.define(identifier_name(&next_var_name), name_of_typename(&type_name), SymbolKind::Field);    
                        },
                        _ => {},
                    }                
                },
                Token::Symbol(';') => {                    
                    break;
                },
                _ => {
                    panic!("Expected ',' or ';', got {:?}", next);
                },
            }            
        }
                
        Ok(())        
    }

    fn compile_subroutine(&mut self, class_name: &str) -> io::Result<()> {
        // subroutineDec: ('constructor' | 'function' | 'method') ('void' | type) subroutineName '(' parameterList ')' subroutineBody
        // subroutineBody: '{' varDec* statements '}'
        self.symbol_table.start_subroutine();

        // If and while counters restart for every new subroutine
        self.if_counter = 0;
        self.while_loop_counter = 0;

        let subroutine_type = self.tokenizer.next().unwrap();
        let subroutine_return_value_type = self.tokenizer.next().unwrap();
        let subroutine_name = self.tokenizer.next().unwrap();
        let opening_parenthesis = self.tokenizer.next().unwrap();

        expect_keywords(&subroutine_type, &[Keyword::Constructor, Keyword::Function, Keyword::Method]);        
        expect_typename_including_void(&subroutine_return_value_type);
        expect_identifier(&subroutine_name);
        expect_symbol(&opening_parenthesis, '(');

        // If a method, we have a hidden 'THIS' arg, so we should account for that in our symbol indices.
        match subroutine_type {
            Token::Keyword(Keyword::Method) => {
                self.symbol_table.arg_count += 1;
            },
            _ => {},
        }

        try!(self.compile_parameter_list());
        let closing_parenthesis = self.tokenizer.next().unwrap();   
        expect_symbol(&closing_parenthesis, ')');                          

        try!(self.compile_subroutine_body(&subroutine_type, &format!("{}.{}", class_name, identifier_name(&subroutine_name))));        
        Ok(())        
    }

    fn compile_parameter_list(&mut self) -> io::Result<()> {
        // ( (type varName) (',' type varName)*)?
        // Parameter list could be empty                
        loop {
            // NOTE: Has to be cloned to avoid a borrow-checker error. This is inefficient.
            let peek = self.tokenizer.peek().unwrap().clone();
            match peek {
                Token::Keyword(Keyword::Int) | Token::Keyword(Keyword::Char) | Token::Keyword(Keyword::Boolean) | Token::Identifier(_) => {
                    let consumed = self.tokenizer.next().unwrap();                    
                    let var_name = self.tokenizer.next().unwrap();
                    expect_identifier(&var_name);                    

                    self.symbol_table.define(identifier_name(&var_name), name_of_typename(&peek), SymbolKind::Arg);    
                },
                Token::Symbol(',') => {
                    let consumed = self.tokenizer.next().unwrap();                    
                },
                _ => { break; } 
            }
        }
        
        Ok(())
    }

    fn compile_subroutine_body(&mut self, subroutine_type: &Token, function_definition_name: &str) -> io::Result<()> {
        // '{' varDec* statements '}'
        let mut num_vars: i16 = 0;

        let opening_braces = self.tokenizer.next().unwrap();  
        expect_symbol(&opening_braces, '{');        

        loop {
            // NOTE: Has to be cloned to avoid a borrow-checker error. This is inefficient.
            let peek = self.tokenizer.peek().unwrap().clone();
            match peek {
                Token::Keyword(Keyword::Var) => {
                    num_vars += try!(self.compile_var_dec());
                },
                _ => { break; }
            }
        }

        try!(self.writer.write_function(function_definition_name, num_vars));        
        match subroutine_type {
            &Token::Keyword(Keyword::Constructor) => {
                // Need to allocate space depending on the number of fields in this class.
                let field_count = self.symbol_table.field_count;
                try!(self.writer.write_push(VMSegment::Constant, field_count as i16));
                try!(self.writer.write_call("Memory.alloc", 1));
                // Store result in THIS
                try!(self.writer.write_pop(VMSegment::Pointer, 0));
            },
            &Token::Keyword(Keyword::Method) => {
                // Methods need to load the THIS pointer which was passed in as the first argument.
                try!(self.writer.write_push(VMSegment::Arg, 0));
                try!(self.writer.write_pop(VMSegment::Pointer, 0));                
            },
            _ => {},
        }
        try!(self.compile_statements());

        let closing_braces = self.tokenizer.next().unwrap();   
        expect_symbol(&closing_braces, '}');        
        Ok(())
    }

    fn compile_var_dec(&mut self) -> io::Result<(i16)> {
        // 'var' type varName (',' varName)* ';'
        let mut num_vars: i16 = 1;

        let var_keyword = self.tokenizer.next().unwrap();
        let var_type = self.tokenizer.next().unwrap();
        let var_name = self.tokenizer.next().unwrap();

        expect_keyword(&var_keyword, Keyword::Var);
        expect_typename(&var_type);        
        expect_identifier(&var_name);    

        self.symbol_table.define(identifier_name(&var_name), name_of_typename(&var_type), SymbolKind::Var);    

        loop {
            let next = self.tokenizer.next().unwrap();
            match next {
                Token::Symbol(',') => {                    
                    let next_var_name = self.tokenizer.next().unwrap();
                    expect_identifier(&next_var_name);
                    self.symbol_table.define(identifier_name(&next_var_name), name_of_typename(&var_type), SymbolKind::Var);    
                    num_vars += 1;                  
                },
                Token::Symbol(';') => {                    
                    break;
                },
                _ => {
                    panic!("Expected ',' or ';', got {:?}", next);
                },
            }            
        }
        
        Ok(num_vars)
    }

    fn compile_statements(&mut self) -> io::Result<()> {
        // statements: statement*
        // statement: letStatement | ifStatement | whileStatement | doStatement | returnStatement
        // Could have no statements
        loop {
            // NOTE: Has to be cloned to avoid a borrow-checker error. This is inefficient.
            let peek = self.tokenizer.peek().unwrap().clone();
            match peek {
                Token::Keyword(Keyword::Let) => {
                    try!(self.compile_let());
                },
                Token::Keyword(Keyword::If) => {
                    try!(self.compile_if());
                },
                Token::Keyword(Keyword::While) => {
                    try!(self.compile_while());
                },
                Token::Keyword(Keyword::Do) => {
                    try!(self.compile_do());
                },
                Token::Keyword(Keyword::Return) => {
                    try!(self.compile_return());
                },
                _ => { break; }
            }
        }
        
        Ok(())
    }

    fn compile_let(&mut self) -> io::Result<()> {
        // 'let' varName ('[' expression ']')? '=' expression ';'        
        let keyword = self.tokenizer.next().unwrap();
        let var_name = self.tokenizer.next().unwrap();

        expect_keyword(&keyword, Keyword::Let);
        expect_identifier(&var_name);

        let mut is_array_access = false;
        
        loop {
            let next = self.tokenizer.next().unwrap();
            match next {
                Token::Symbol('[') => {                    
                    try!(self.compile_expression());
                    let next_next = self.tokenizer.next().unwrap();
                    expect_symbol(&next_next, ']');   

                    // Need to generate code to push the array address + offset onto the stack.                    
                    try!(self.write_push_for_symbol(identifier_name(&var_name)));               
                    try!(self.writer.write_arithmetic(VMArithmeticCommand::Add));
                    is_array_access = true;
                },
                Token::Symbol('=') => {                        
                    break;
                },
                _ => {},
            }
        }        
        
        try!(self.compile_expression());
        let semicolon = self.tokenizer.next().unwrap();
        expect_symbol(&semicolon, ';');
        
        let symbol_name = identifier_name(&var_name);
        let symbol_kind = self.symbol_table.kind_of(&symbol_name).unwrap();        
        let symbol_index = self.symbol_table.index_of(&symbol_name).unwrap();

        if is_array_access {
            // Pop the result of the expression into TEMP before storing it into the array.
            try!(self.writer.write_pop(VMSegment::Temp, 0));
            // We previously pushed the array address + offset onto the stack, so set it as our THAT pointer.
            try!(self.writer.write_pop(VMSegment::Pointer, 1));
            // Now we can stick the temp value into the address pointed to by THAT.
            try!(self.writer.write_push(VMSegment::Temp, 0));
            try!(self.writer.write_pop(VMSegment::That, 0));
        } else {
            match symbol_kind {
                SymbolKind::Static => { try!(self.writer.write_pop(VMSegment::Static, symbol_index as i16)); },
                SymbolKind::Field => { try!(self.writer.write_pop(VMSegment::This, symbol_index as i16)); },                
                SymbolKind::Arg => { try!(self.writer.write_pop(VMSegment::Arg, symbol_index as i16)); },
                SymbolKind::Var => { try!(self.writer.write_pop(VMSegment::Local, symbol_index as i16)); },
            }
        }            
        
        Ok(())      
    }

    fn compile_if(&mut self) -> io::Result<()> {
        // 'if' '(' expression ')' '{' statements '}' ( 'else' '{' statements '}' )?        
        let keyword = self.tokenizer.next().unwrap();
        let opening_parenthesis = self.tokenizer.next().unwrap();

        expect_keyword(&keyword, Keyword::If);
        expect_symbol(&opening_parenthesis, '(');

        let if_counter = self.if_counter;
        self.if_counter += 1;

        let if_label = &format!("IF_TRUE{}", if_counter);
        let else_label = &format!("IF_FALSE{}", if_counter);
        let end_label = &format!("IF_END{}", if_counter);        

        try!(self.compile_expression());

        let closing_parenthesis = self.tokenizer.next().unwrap();
        let opening_braces = self.tokenizer.next().unwrap();

        expect_symbol(&closing_parenthesis, ')');
        expect_symbol(&opening_braces, '{');

        // Test if condition
        try!(self.writer.write_if(if_label));  
        try!(self.writer.write_goto(else_label)); 
        try!(self.writer.write_label(if_label));                     
        
        try!(self.compile_statements());

        let closing_braces = self.tokenizer.next().unwrap();
        expect_symbol(&closing_braces, '}');        
        
        // NOTE: Has to be cloned to avoid a borrow-checker error. This is inefficient.
        let peek = self.tokenizer.peek().unwrap().clone();
        match peek {
            Token::Keyword(Keyword::Else) => {
                let consumed = self.tokenizer.next().unwrap();                
                let opening_braces = self.tokenizer.next().unwrap();
                expect_symbol(&opening_braces, '{');                

                try!(self.writer.write_goto(end_label)); 
                try!(self.writer.write_label(else_label));                     
                try!(self.compile_statements());

                let closing_braces = self.tokenizer.next().unwrap();
                expect_symbol(&closing_braces, '}');
                try!(self.writer.write_label(end_label)); 
            },
            _ => {                
                try!(self.writer.write_label(else_label));                                     
            },
        }
        
        Ok(())   
    }

    fn compile_while(&mut self) -> io::Result<()> {
        // 'while' '(' expression ')' '{' statements '}'        
        let keyword = self.tokenizer.next().unwrap();
        let opening_parenthesis = self.tokenizer.next().unwrap();

        expect_keyword(&keyword, Keyword::While);
        expect_symbol(&opening_parenthesis, '(');        

        let while_loop_counter = self.while_loop_counter;
        self.while_loop_counter += 1;

        let begin_label = &format!("WHILE_EXP{}", while_loop_counter);
        let end_label = &format!("WHILE_END{}", while_loop_counter);

        try!(self.writer.write_label(begin_label));
        try!(self.compile_expression());    

        let closing_parenthesis = self.tokenizer.next().unwrap();
        let opening_braces = self.tokenizer.next().unwrap();

        expect_symbol(&closing_parenthesis, ')');
        expect_symbol(&opening_braces, '{');        

        // Test loop condition
        try!(self.writer.write_arithmetic(VMArithmeticCommand::Not));
        try!(self.writer.write_if(end_label));        

        try!(self.compile_statements());

        let closing_braces = self.tokenizer.next().unwrap();
        expect_symbol(&closing_braces, '}');

        // Do loop
        try!(self.writer.write_goto(begin_label));
        try!(self.writer.write_label(end_label));
        
        Ok(())   
    }

    fn compile_do(&mut self) -> io::Result<()> {
        // doStatement: 'do' subroutineCall ';'
        // subroutineCall: subroutineName '(' expressionList ')' | ( className | varName) '.' subroutineName '('expressionList ')'        
        let keyword = self.tokenizer.next().unwrap();        
        let identifier = self.tokenizer.next().unwrap();           

        expect_keyword(&keyword, Keyword::Do);                                
        expect_identifier(&identifier);
        
        let call_name: String;
        let mut num_arguments = 0;
        let next = self.tokenizer.next().unwrap();        
        match next {
            Token::Symbol('.') => {
                // ( className | varName) '.' subroutineName
                let subroutine_name = self.tokenizer.next().unwrap();
                expect_identifier(&subroutine_name);                            

                let opening_parenthesis = self.tokenizer.next().unwrap();
                expect_symbol(&opening_parenthesis, '(');

                // If the identifier is a visible symbol in the symbol table, then treat this as a method call.  
                let var_name = identifier_name(&identifier);
                let index = self.symbol_table.index_of(&var_name);
                if let Some(index) = index {                                        
                    try!(self.write_push_for_symbol(&var_name));
                    let symbol_type = self.symbol_table.type_of(&var_name).unwrap();                                                             
                    num_arguments += 1;

                    call_name = format!("{}.{}", symbol_type, identifier_name(&subroutine_name));    
                } else {
                    call_name = format!("{}.{}", identifier_name(&identifier), identifier_name(&subroutine_name));    
                }                
            },
            Token::Symbol('(') => {
                // subroutineName
                // Assume it's a method in the current class. Every method expects to get the current THIS pointer as the
                // first parameter.
                try!(self.writer.write_push(VMSegment::Pointer, 0));                                               
                num_arguments += 1;
                call_name = format!("{}.{}", self.current_class_name, identifier_name(&identifier));
            },
            _ => {
                panic!("Expected \".\" or \"(\", got {:?}", next);
            }
        }        

        num_arguments += try!(self.compile_expression_list());
        let closing_parenthesis = self.tokenizer.next().unwrap();        
        let semicolon = self.tokenizer.next().unwrap();

        expect_symbol(&closing_parenthesis, ')');        
        expect_symbol(&semicolon, ';');        
        
        try!(self.writer.write_call(&call_name, num_arguments));        
        // Throw the result away.
        try!(self.writer.write_pop(VMSegment::Temp, 0));

        Ok(())   
    }

    fn compile_return(&mut self) -> io::Result<()> {
        // 'return' expression? ';'
        let keyword = self.tokenizer.next().unwrap();        
        expect_keyword(&keyword, Keyword::Return);                

        // NOTE: Has to be cloned to avoid a borrow-checker error. This is inefficient.
        let peek = self.tokenizer.peek().unwrap().clone();
        match peek {
            Token::Symbol(';') => {
                // No expression -- push a dummy return value
                let consumed = self.tokenizer.next().unwrap();                
                try!(self.writer.write_push(VMSegment::Constant, 0));
            },
            _ => {
                try!(self.compile_expression());
                let semicolon = self.tokenizer.next().unwrap();
                expect_symbol(&semicolon, ';');
            },
        }
                        
        try!(self.writer.write_return());
        Ok(())   
    }

    fn compile_expression(&mut self) -> io::Result<()> {        
        // term (op term)*        
        try!(self.compile_term());        

        loop {                    
            // NOTE: Has to be cloned to avoid a borrow-checker error. This is inefficient.
            let peek = self.tokenizer.peek().unwrap().clone();                             

            // Postfix due to VM stack machine-like behavior.
            match peek {
                Token::Symbol('*') | Token::Symbol('+') | Token::Symbol('-') | Token::Symbol('/') |
                Token::Symbol('&') | Token::Symbol('|') | Token::Symbol('<') | Token::Symbol('>') |
                Token::Symbol('=') => {
                    let _ = self.tokenizer.next();
                    try!(self.compile_term()); 
                },            
                _ => break,
            }

            try!(match peek {
                Token::Symbol('*') => self.writer.write_call("Math.multiply", 2),
                Token::Symbol('+') => self.writer.write_arithmetic(VMArithmeticCommand::Add),                
                Token::Symbol('-') => self.writer.write_arithmetic(VMArithmeticCommand::Sub),                  
                Token::Symbol('/') => self.writer.write_call("Math.divide", 2),
                Token::Symbol('&') => self.writer.write_arithmetic(VMArithmeticCommand::And), 
                Token::Symbol('|') => self.writer.write_arithmetic(VMArithmeticCommand::Or), 
                Token::Symbol('<') => self.writer.write_arithmetic(VMArithmeticCommand::Lt), 
                Token::Symbol('>') => self.writer.write_arithmetic(VMArithmeticCommand::Gt), 
                Token::Symbol('=') => self.writer.write_arithmetic(VMArithmeticCommand::Eq),            
                _ => break,
            });
        }
        
        Ok(())   
    }

    fn compile_term(&mut self) -> io::Result<()> {
        // integerConstant | stringConstant | keywordConstant | 
        // varName | varName '[' expression ']' | subroutineCall | '(' expression ')' | unaryOp term    
        let next = self.tokenizer.next().unwrap();
        match next {
            Token::IntegerConstant(num) => {                
                try!(self.writer.write_push(VMSegment::Constant, num));
            },
            Token::StringConstant(string) => { 
                // Allocate the new string
                let len = string.len();            
                try!(self.writer.write_push(VMSegment::Constant, len as i16));
                try!(self.writer.write_call("String.new", 1));

                // Write the string contents into the newly-allocated storage.
                // NOTE: We're not caring about Unicode here, just treating it as ASCII.
                for byte in string.as_bytes() {
                    try!(self.writer.write_push(VMSegment::Constant, *byte as i16));
                    // Two parameters, because the first one is the address of the string, which is already on the stack.
                    try!(self.writer.write_call("String.appendChar", 2));
                }                
            }, 
            Token::Keyword(Keyword::True) => {
                try!(self.writer.write_push(VMSegment::Constant, 0));
                try!(self.writer.write_arithmetic(VMArithmeticCommand::Not));
            },
            Token::Keyword(Keyword::False) | Token::Keyword(Keyword::Null) => {
                try!(self.writer.write_push(VMSegment::Constant, 0));
            },
            Token::Keyword(Keyword::This) => {                
                try!(self.writer.write_push(VMSegment::Pointer, 0));                
            },             
            Token::Identifier(identifier) => {                                
                // NOTE: Has to be cloned to avoid a borrow-checker error. This is inefficient.
                let peek = self.tokenizer.peek().unwrap().clone();
                // Following description from the book: Compiles a term. This routine is faced with a slight difficulty when 
                // trying to decide between some of the alternative parsing rules. Specifically, if the current token is an 
                // identifier, the routine must distinguish between a variable, an array entry, and a subroutine call. A 
                // single look-ahead token, which may be one of “[“, “(“, or “.” suffices to distinguish between the three 
                // possibilities. Any other token is not part of this term and should not be advanced over.
                match peek {
                    Token::Symbol('[') => {
                        // Array access                    
                        let consumed = self.tokenizer.next().unwrap();                        
                        try!(self.compile_expression());
                        
                        let next_next = self.tokenizer.next().unwrap();
                        expect_symbol(&next_next, ']');
                        
                        // Need to generate code to push the array address + offset onto the stack.                    
                        try!(self.write_push_for_symbol(&identifier));               
                        try!(self.writer.write_arithmetic(VMArithmeticCommand::Add));                        
                        // Load the address into THAT.
                        try!(self.writer.write_pop(VMSegment::Pointer, 1));
                        // Dereference and load the value onto the stack.
                        try!(self.writer.write_push(VMSegment::That, 0));                        
                    },
                    Token::Symbol('(') => {
                        // Subroutine call
                        let consumed = self.tokenizer.next().unwrap();
                        let num_arguments = try!(self.compile_expression_list());
                        let next_next = self.tokenizer.next().unwrap();
                        
                        expect_symbol(&next_next, ')');

                        // TODO should this be treated as a local method call?

                        try!(self.writer.write_call(&identifier, num_arguments));                        
                    },               
                    Token::Symbol('.') => {
                        // Subroutine call
                        let consumed = self.tokenizer.next().unwrap();                        
                        let method_name = self.tokenizer.next().unwrap();
                        let opening_parenthesis = self.tokenizer.next().unwrap();

                        expect_identifier(&method_name);                                                
                        expect_symbol(&opening_parenthesis, '(');                        

                        let num_arguments = try!(self.compile_expression_list());                        
                        let next_next = self.tokenizer.next().unwrap();

                        expect_symbol(&next_next, ')');     

                        // If the identifier is a visible symbol in the symbol table, then treat this as a method call.                          
                        let index = self.symbol_table.index_of(&identifier);
                        if let Some(index) = index {                                        
                            try!(self.write_push_for_symbol(&identifier));
                            let symbol_type = self.symbol_table.type_of(&identifier).unwrap();                                                                                         
                            try!(self.writer.write_call(&format!("{}.{}", symbol_type, identifier_name(&method_name)), num_arguments + 1));                        
                        } else {
                            try!(self.writer.write_call(&format!("{}.{}", identifier, identifier_name(&method_name)), num_arguments));                        
                        }                                            
                    },
                    _ => {
                        // Is a regular variable access       
                        try!(self.write_push_for_symbol(&identifier));                                        
                    }
                }
            },
            Token::Symbol('(') => {                
                try!(self.compile_expression());
                let next_next = self.tokenizer.next().unwrap();
                expect_symbol(&next_next, ')');                
            },
            Token::Symbol('-') => {
                try!(self.compile_term());  // Postfix
                try!(self.writer.write_arithmetic(VMArithmeticCommand::Neg));                
            },
            Token::Symbol('~') => {
                try!(self.compile_term());  // Postfix
                try!(self.writer.write_arithmetic(VMArithmeticCommand::Not));                
            },
            _ => {
                panic!("Expected one of integerConstant | stringConstant | keywordConstant | varName | varName '[' expression ']' | subroutineCall | '(' expression ')' | unaryOp term, got {:?}", next);
            },
        }
        
        Ok(())   
    }

    fn compile_expression_list(&mut self) -> io::Result<i16> {
        // (expression (',' expression)* )?
        // Might not have any expressions        
        let mut num_expressions: i16 = 0;

        loop {
            // NOTE: Has to be cloned to avoid a borrow-checker error. This is inefficient.
            let peek = self.tokenizer.peek().unwrap().clone();
            match peek {
                Token::Symbol(')') => {
                    // No expressions
                    break;
                },
                Token::Symbol(',') => {
                    // May have more expressions
                    let consumed = self.tokenizer.next().unwrap();                    
                },
                _ => {
                    try!(self.compile_expression());
                    num_expressions += 1;
                }
            }
        }
        
        Ok(num_expressions)   
    } 

    fn write_push_for_symbol(&mut self, symbol_name: &str) -> io::Result<()> {
        let symbol_kind = self.symbol_table.kind_of(symbol_name).unwrap();        
        let symbol_index = self.symbol_table.index_of(symbol_name).unwrap();                    

        match symbol_kind {
            SymbolKind::Static => { try!(self.writer.write_push(VMSegment::Static, symbol_index as i16)); },
            SymbolKind::Field => { try!(self.writer.write_push(VMSegment::This, symbol_index as i16)); },                
            SymbolKind::Arg => { try!(self.writer.write_push(VMSegment::Arg, symbol_index as i16)); },
            SymbolKind::Var => { try!(self.writer.write_push(VMSegment::Local, symbol_index as i16)); },
        } 

        Ok(())
    }
}

fn expect_keyword(token: &Token, keyword: Keyword) {
    match token {
        &Token::Keyword(ref actual_keyword) => {
            if keyword == *actual_keyword { return; }                        
        },
        _ => {},
    }

    panic!("Expected \"{:?}\" keyword, had \"{:?}\"", keyword, token);
}

fn expect_keywords(token: &Token, keywords: &[Keyword]) {    
    for keyword in keywords {
        match token {
            &Token::Keyword(ref actual_keyword) => {
                if keyword == actual_keyword { return; }                        
            },
            _ => {},
        }
    }

    panic!("Expected one of \"{:?}\" keywords, had \"{:?}\"", keywords, token);
}

fn expect_typename(token: &Token) {
    match token {
        &Token::Keyword(Keyword::Int) | &Token::Keyword(Keyword::Char) | &Token::Keyword(Keyword::Boolean) | &Token::Identifier(_) => {
            // OK
        },
        _ => {
            panic!("Expected 'int', 'char', 'boolean', or class name: {:?}", token);
        }
    }
}

fn expect_typename_including_void(token: &Token) {
    match token {
        &Token::Keyword(Keyword::Void) | &Token::Keyword(Keyword::Int) | &Token::Keyword(Keyword::Char) | &Token::Keyword(Keyword::Boolean) | &Token::Identifier(_) => {
            // OK
        },
        _ => {
            panic!("Expected 'void', 'int', 'char', 'boolean', or class name: {:?}", token);
        }
    }
}

fn expect_identifier(identifier: &Token) {
    match identifier {
        &Token::Identifier(_) => {
            // OK
        },
        _ => {
            panic!("Expected identifier, had \"{:?}\"", identifier);
        }
    }
}

fn expect_symbol(token: &Token, symbol: char) {
    match token {
        &Token::Symbol(actual_symbol) if actual_symbol == symbol => {
            // OK
        },
        _ => {
            panic!("Expected symbol {}, had \"{:?}\"", symbol, token);
        }
    }
}

fn identifier_name(token: &Token) -> &str {
    match token {
        &Token::Identifier(ref string) => &string,
        _ => panic!("Expected identifier, was passed {:?}", token)
    }
}

fn name_of_typename(token: &Token) -> &str {
    match token {
        &Token::Identifier(ref string) => &string,
        &Token::Keyword(Keyword::Void) => &"void",
        &Token::Keyword(Keyword::Int) => &"int",
        &Token::Keyword(Keyword::Char) => &"char",
        &Token::Keyword(Keyword::Boolean) => &"boolean",
        _ => panic!("Expected 'void', 'int', 'char', 'boolean', or class name: {:?}", token),
    }
}

// ------------------------------------------------
// VM Writer
// ------------------------------------------------

enum VMSegment {
    Constant, Arg, Local, Static, This, That, Pointer, Temp,
}

enum VMArithmeticCommand {
    Add, Sub, Neg, Eq, Gt, Lt, And, Or, Not,
}

struct VMWriter<W: Write> {
    writer: BufWriter<W>,
}

impl VMWriter<File> {
    fn new(out_name: &str) -> io::Result<Self>  {
        let out_file = try!(File::create(out_name));
        let writer = BufWriter::new(out_file);

        Ok(VMWriter { writer: writer, })
    }
}

impl<W: Write> VMWriter<W> {
    fn write_push(&mut self, segment: VMSegment, index: i16) -> io::Result<()> {        
        try!(self.writer.write(b"push "));        
        try!(self.write_segment(segment));        
        try!(self.write_index(index));

        Ok(())
    }

    fn write_pop(&mut self, segment: VMSegment, index: i16) -> io::Result<()> {        
        try!(self.writer.write(b"pop "));
        try!(self.write_segment(segment));        
        try!(self.write_index(index));

        Ok(())
    }

    fn write_arithmetic(&mut self, command: VMArithmeticCommand) -> io::Result<()> {
        let writer = &mut self.writer;

        try!(match command {
            VMArithmeticCommand::Add => writer.write(b"add"),
            VMArithmeticCommand::Sub => writer.write(b"sub"),
            VMArithmeticCommand::Neg => writer.write(b"neg"),
            VMArithmeticCommand::Eq => writer.write(b"eq"),
            VMArithmeticCommand::Gt => writer.write(b"gt"),
            VMArithmeticCommand::Lt => writer.write(b"lt"),
            VMArithmeticCommand::And => writer.write(b"and"),
            VMArithmeticCommand::Or => writer.write(b"or"),
            VMArithmeticCommand::Not => writer.write(b"not"),
        });
        try!(writer.write(b"\n"));      

        Ok(())
    }

    fn write_label(&mut self, label: &str) -> io::Result<()> {
        try!(self.writer.write(b"label "));
        try!(self.writer.write(label.as_bytes()));
        try!(self.writer.write(b"\n"));

        Ok(())
    }

    fn write_goto(&mut self, label: &str) -> io::Result<()> {
        try!(self.writer.write(b"goto "));
        try!(self.writer.write(label.as_bytes()));
        try!(self.writer.write(b"\n"));

        Ok(())
    }

    fn write_if(&mut self, label: &str) -> io::Result<()> {
        try!(self.writer.write(b"if-goto "));
        try!(self.writer.write(label.as_bytes()));
        try!(self.writer.write(b"\n"));

        Ok(())
    }

    fn write_call(&mut self, name: &str, num_args: i16) -> io::Result<()> {
        try!(self.writer.write(b"call "));
        try!(self.writer.write(name.as_bytes()));
        try!(self.write_index(num_args));

        Ok(())
    }

    fn write_function(&mut self, name: &str, num_locals: i16) -> io::Result<()> {
        try!(self.writer.write(b"function "));
        try!(self.writer.write(name.as_bytes()));
        try!(self.write_index(num_locals));

        Ok(())
    }

    fn write_return(&mut self) -> io::Result<()> {
        try!(self.writer.write(b"return\n"));
        Ok(())
    }

    fn write_segment(&mut self, segment: VMSegment) -> io::Result<()> {
        let writer = &mut self.writer;

        try!(match segment {
            VMSegment::Constant => writer.write(b"constant"),
            VMSegment::Arg => writer.write(b"argument"),
            VMSegment::Local => writer.write(b"local"),
            VMSegment::Static => writer.write(b"static"),
            VMSegment::This => writer.write(b"this"),
            VMSegment::That => writer.write(b"that"),
            VMSegment::Pointer => writer.write(b"pointer"),
            VMSegment::Temp => writer.write(b"temp"),
        });

        Ok(())
    }

    fn write_index(&mut self, index: i16) -> io::Result<()> {
        try!(self.writer.write(&format!(" {}\n", index).as_bytes()));
        Ok(())
    }
}


// ------------------------------------------------
// Main driver
// ------------------------------------------------

fn compile(input: &str) {
    let input_path = Path::new(&input);
    if input_path.is_dir() {
        // Compiling each .jack file in the directory     
        // Note: Would rather not unwrap here, but it was really farking annoying trying to figure out how to do something equivalent to this pseudocode in Swift:
        // do { input_path.read_dir().filter($0?.path().extension()? == "jack" ?? false) } catch { /* ... */ }  
        // Left as an exercise for the reader!   
        for entry in input_path.read_dir().unwrap().map(|entry| entry.unwrap()).filter(|entry| entry.path().extension().unwrap_or_default() == "jack") {
            compile_file(&entry.path());
        }
    } else {
        // Compiling the given file
        compile_file(input_path);
    }            
}

fn compile_file(input_path: &Path) {        
    let reader = JackTokenizer::new(&input_path.to_str().unwrap()).unwrap();        
    let input_name_without_extension = input_path.file_stem().unwrap();
    let output_name = format!("{}.vm", input_name_without_extension.to_str().unwrap());
    let mut writer = CompilationEngine::new(reader, &output_name).unwrap();
    writer.compile_class().unwrap();
}

// ------------------------------------------------
// Main entry point
// ------------------------------------------------

// Refs:
// http://nand2tetris.org/11.php
// http://nand2tetris.org/lectures/PDF/lecture%2011%20compiler%20II.pdf
// http://www.cs.huji.ac.il/course/2002/nand2tet/docs/ch_11_compiler_II.pdf

fn main() {
    let mut args = env::args();
    match args.len() {
        2 => {            
            let input = args.nth(1).unwrap();                        
            compile(&input);
        },        
        _ => {
            println!("Usage: JackCompiler input");            
            println!("input can be a file or a directory.");            
        }
    }
}