#!/usr/bin/env python

import contextlib
import functools
import re
import sys
import textwrap
from pathlib import Path

COMMENT_RE = re.compile(r"//.*$")
ARITH_COMMANDS = {"add", "sub", "neg", "eq", "gt", "lt", "and", "or", "not"}


class WrapWriterMethods(type):
    def __new__(cls, name, bases, namespace):
        def wrap_writer(method):
            @functools.wraps(method)
            def f(self, *args, **kwargs):
                for chunk in method(self, *args, **kwargs):
                    self.out.write(textwrap.dedent(chunk))

            return f

        for attribute in list(namespace):
            if attribute.startswith("write_"):
                namespace[attribute] = wrap_writer(namespace[attribute])
        return type.__new__(cls, name, bases, namespace)


class AsmWriter(metaclass=WrapWriterMethods):
    vm_segments = {"local": "LCL", "argument": "ARG",
                   "this": "THIS", "that": "THAT"}
    direct_segments = {"temp": 5, "pointer": 3}
    frame_registers = ["LCL", "ARG", "THIS", "THAT"]

    def __init__(self, path: Path, call_sys_init=False):
        self.out = path.open("w")
        self.call_sys_init = call_sys_init
        self.temp_labels = 0
        self.set_filename("$nofile")
        self.write_init()

    def write_init(self):
        yield """\
        // INIT @SP | write_init
        @256
        D=A
        @SP
        M=D
        """

        if self.call_sys_init:
            self.write_call("Sys.init", "0")
            self.write_endless_loop()

    def close(self):
        if not self.call_sys_init:
            self.write_endless_loop()
        self.out.close()

    def write_endless_loop(self):
        loop_label = self.temp_label()
        yield f"""\
        // write_endless_loop
        ({loop_label})
        @{loop_label}
        0;JMP
        """

    def set_filename(self, filename):
        self.filename = filename
        self.funcname = f"{filename}.$nofunction"

    def temp_label(self):
        self.temp_labels += 1
        return f"{self.funcname}$genlabel${self.temp_labels}"

    def write_push(self, segment, number):

        yield f"""\
            // push {segment} {number} | write_push
            """

        # read data into D
        if segment == "constant":
            yield f"""\
            @{number}
            D=A
            """

        elif segment in self.vm_segments:
            register = self.vm_segments[segment]
            yield f"""\
            @{register}
            D=M
            @{number}
            A=D+A
            D=M
            """

        elif segment in self.direct_segments:
            base = self.direct_segments[segment]
            addr = base + int(number)
            yield f"""\
            @{addr}
            D=M
            """

        elif segment == "static":
            label = f"{self.filename}.{number}"
            yield f"""\
            @{label}
            D=M
            """

        else:
            raise RuntimeError(f"push segment {segment!r} not implemented")

        # push D on stack
        yield """\
        // push D on stack
        @SP
        M=M+1
        A=M-1
        M=D
        """

    def write_pop(self, segment, number):
        
        yield f"""\
            // pop {segment} {number} | write_pop
            """

        # compute address of pop target and put it in D
        if segment == "constant":
            raise RuntimeError("Can't pop constant segment")


        elif segment in self.vm_segments:
            register = self.vm_segments[segment]
            yield f"""\
            @{register}
            D=M
            @{number}
            D=D+A
            """

        elif segment in self.direct_segments:
            base = self.direct_segments[segment]
            addr = base + int(number)
            yield f"""\
            @{addr}
            D=A
            """

        elif segment == "static":
            label = f"{self.filename}.{number}"
            yield f"""\
            @{label}
            D=A
            """

        else:
            raise RuntimeError(f"pop segment {segment!r} not implemented")

        # Write D to R13, pop from stack, write to *R13
        yield """\
        // Write D to R13, pop from stack, write to *R13
        @R13
        M=D
        @SP
        AM=M-1
        D=M
        @R13
        A=M
        M=D
        """

    def write_arith(self, command):
        unary_ops = {"neg": "-", "not": "!"}
        binary_ops = {"add": "+", "and": "&", "or": "|"}
        compare_ops = {"eq": "JEQ", "lt": "JLT", "gt": "JGT"}
        if command in unary_ops:
            sign = unary_ops[command]
            yield f"""\
            // {command} | write_arith
            @SP
            A=M-1
            M={sign}M
            """

        elif command in binary_ops:
            sign = binary_ops[command]
            yield f"""\
            @SP
            AM=M-1
            D=M
            A=A-1
            M=D{sign}M
            """

        elif command == "sub":
            yield """\
            @SP
            AM=M-1
            D=M
            A=A-1
            M=M-D
            """

        elif command in compare_ops:
            jmp = compare_ops[command]
            exit_label = self.temp_label()
            yield f"""\
            @SP
            AM=M-1
            D=M
            A=A-1
            D=M-D
            M=-1
            @{exit_label}
            D;{jmp}
            @SP
            A=M-1
            M=0
            ({exit_label})
            """

        else:
            raise RuntimeError(f"Arith command not implemented")

    def mangle_label(self, label):
        return f"{self.funcname}${label}"

    def write_label(self, label):
        label = self.mangle_label(label)
        yield f"""\
        // write_label
        ({label})
        """

    def write_goto(self, label):
        label = self.mangle_label(label)
        yield f"""\
        // goto {label} | write_goto
        @{label}
        0;JMP
        """

    def write_if(self, label):
        label = self.mangle_label(label)
        yield f"""\
        // if-goto {label} | write_if
        @SP
        AM=M-1
        D=M
        @{label}
        D;JNE
        """

    def write_call(self, name, num_args):
        num_args = int(num_args)
        return_address = self.temp_label()
        # push RIP
        yield f"""\
        // push return address before >> call {name} {num_args} | write_call
        @{return_address}
        D=A
        @SP
        A=M
        M=D
        """

        yield f"""\
        // -- save function context before -- >> call {name} {num_args}
        """
        # save registers
        for reg in self.frame_registers:
            yield f"""\
            // save segment {reg}
            @{reg}
            D=M
            @SP
            AM=M+1
            M=D
            """

        # ARG = SP - num_args - 5, with a twist: SP is off by one now
        arg_shift = num_args + 4
        yield f"""\
        // ARG = SP - num_args - 5; SP is off by one now
        @{arg_shift} // arg_shift = num_args + 4, num_args={num_args}
        D=A
        @SP
        D=M-D
        @ARG
        M=D
        """

        # LCL = SP; fix SP being off by one
        yield """\
        // LCL = SP; fix SP being off by one
        @SP
        MD=M+1
        @LCL
        M=D
        """

        # goto callee, set up a RIP label
        yield f"""\
        // goto callee, set up a return label
        @{name}
        0;JMP
        ({return_address})
        """

    def write_function(self, name, num_vars):
        num_vars = int(num_vars)
        self.funcname = name
        yield f"""\
        // declaring function {name} {num_vars} | write_function
        ({name})
        """

        if num_vars:
            yield f"""\
            // initialize LCL segment values
            @{num_vars}
            D=A
            @SP
            AM=D+M
            """

            for r in range(num_vars):
                yield f"""\
                // declaring local {r}
                A=A-1
                M=0
                """

    def write_return(self):
        # save RIP in R14
        yield """\
        // save return address in R14 | write_return
        @5
        D=A
        @LCL
        A=M-D
        D=M
        @R14
        M=D
        """

        # move retval on caller stack, reset SP
        # this can overwrite RIP on stack, but we saved it earlier
        yield """\
        // move return value on caller stack, reset SP
        @SP
        A=M-1
        D=M
        @ARG
        A=M
        M=D
        D=A+1
        @SP
        M=D
        """

        # pop frame
        yield """\
            // pop contexts of previous function
            """
        first_iteration = True
        for reg in reversed(self.frame_registers):
            if first_iteration:
                yield """\
                @LCL
                D=M
                @R13
                AM=D-1
                """

                first_iteration = False
            else:
                yield """\
                @R13
                AM=M-1
                """

            yield f"""\
            D=M
            @{reg}
            M=D
            """

        # jump RIP. NB: A=M; JMP is undefined behaviour
        yield """\
        // jump to return address
        @R14
        A=M
        0;JMP
        """


def parse_vm(filename: Path):  # generator tuple str
    for line in filename.open():
        line = COMMENT_RE.sub("", line).strip()
        if line:
            command, *args = line.split()
            if command in ARITH_COMMANDS:
                args.insert(0, command)
                command = "arith"
            elif command == "if-goto":
                command = "if"
            yield (command, *args)


def main(file_or_dir):
    path = Path(file_or_dir)
    if path.is_file():
        inputs = [path]
        asm_path = path.with_suffix(".asm")
        call_sys_init = False
    else:
        inputs = list(path.glob("*.vm"))
        asm_path = path / (path.name + ".asm")
        call_sys_init = any(vm_file.name == "Sys.vm" for vm_file in inputs)
    with contextlib.closing(AsmWriter(asm_path, call_sys_init)) as writer:
        for vm_file in inputs:
            writer.set_filename(vm_file.stem)
            for command, *args in parse_vm(vm_file):
                method = getattr(writer, "write_" + command, None)
                if method is not None:
                    method(*args)
                else:
                    raise RuntimeError(
                        f"{vm_file}: unknown command: {command}")


if __name__ == "__main__":
    print(f"Compiling {sys.argv[1]} 🧠")
    main(sys.argv[1])
    print("Your .asm file compiled 🌞")
