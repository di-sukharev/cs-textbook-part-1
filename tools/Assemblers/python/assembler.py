#!/usr/bin/env python

import re
import sys
from enum import Enum, auto
from pathlib import Path
from typing import Mapping

COMPS = {
    "0": "0101010",
    "1": "0111111",
    "-1": "0111010",
    "D": "0001100",
    "A": "0110000",
    "M": "1110000",
    "!D": "0001101",
    "!A": "0110001",
    "!M": "1110001",
    "-D": "0001111",
    "-A": "0110011",
    "-M": "1110011",
    "D+1": "0011111",
    "A+1": "0110111",
    "M+1": "1110111",
    "D-1": "0001110",
    "A-1": "0110010",
    "M-1": "1110010",
    "D+A": "0000010",
    "D+M": "1000010",
    "D-A": "0010011",
    "D-M": "1010011",
    "A-D": "0000111",
    "M-D": "1000111",
    "D&A": "0000000",
    "D&M": "1000000",
    "D|A": "0010101",
    "D|M": "1010101",
}

JUMPS = {
    # None: '000',
    "JGT": "001",
    "JEQ": "010",
    "JGE": "011",
    "JLT": "100",
    "JNE": "101",
    "JLE": "110",
    "JMP": "111",
}

COMMENT_RE = re.compile(r"//.*$")
C_COMMAND_RE = re.compile(
    "^(?P<dest>A?M?D?=|)"
    + ("(?P<comp>" + "|".join(re.escape(comp) for comp in COMPS) + ")")
    + ("(?:;(?P<jump>" + "|".join(re.escape(jump) for jump in JUMPS) + "))?$")
)


class Command(Enum):
    A_COMMAND = auto()
    C_COMMAND = auto()
    L_COMMAND = auto()


def parse_commands(asm_file: Path):
    with asm_file.open() as f:
        for line_no, line in enumerate(f):
            line = COMMENT_RE.sub("", line).strip()
            if line:
                if line.startswith("(") and line.endswith(")"):
                    yield (Command.L_COMMAND, line[1:-1])

                elif line.startswith("@"):
                    yield (Command.A_COMMAND, line[1:])

                elif C_COMMAND_RE.fullmatch(line):
                    yield (Command.C_COMMAND, line)

                else:
                    raise RuntimeError(f"Unable to parse {asm_file}:{line_no}: {line}")


def generate_symbols(asm_file: Path):
    symbol_table = {
        **{name: n for n, name in enumerate(["SP", "LCL", "ARG", "THIS", "THAT"])},
        **{f"R{n}": n for n in range(16)},
        "SCREEN": 0x4000,
        "KBD": 0x6000,
    }

    cur_address = 0
    for command, line in parse_commands(asm_file):
        if (command == Command.C_COMMAND) or (command == Command.A_COMMAND):
            cur_address += 1
        elif command == Command.L_COMMAND:
            if line not in symbol_table:
                symbol_table[line] = cur_address

    return symbol_table


class DynamicSymbolTable(dict):
    next_variable_address = 16

    def __missing__(self, symbol):
        self[symbol] = self.next_variable_address
        self.next_variable_address += 1
        return self[symbol]


def assemble(asm_file: Path, symbols: Mapping):
    symbols = DynamicSymbolTable(symbols)
    with asm_file.with_suffix(".hack").open("w") as hack_file:
        for command, line in parse_commands(asm_file):
            if command == Command.A_COMMAND:
                try:
                    value = int(line)
                except ValueError:
                    value = symbols[line]
                hack_file.write(f"0{value:015b}\n")
            elif command == Command.C_COMMAND:
                match = C_COMMAND_RE.fullmatch(line)
                if match:
                    value = COMPS[match["comp"]]
                    for dest in "ADM":
                        if dest in match["dest"]:
                            value += "1"
                        else:
                            value += "0"
                    value += JUMPS.get(match["jump"], "000")
                    hack_file.write(f"111{value}\n")


def main(filename: str):
    asm_file = Path(filename)
    symbols = generate_symbols(asm_file)
    assemble(asm_file, symbols)


if __name__ == "__main__":
    main(sys.argv[1])
