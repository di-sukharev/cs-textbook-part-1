fs = require("fs");

const INSTRUCTIONS = {
    A: "ADDRESS",
    C: "COMPUTE",
    L: "LABEL",
};

class Assembler {
    freeVariableAddress = 16; // we start storing variables at 16th register M[16] … M[256]
    VARIABLES = {
        // pre-defined vars
        R0: 0,
        R1: 1,
        R2: 2,
        R3: 3,
        R4: 4,
        R5: 5,
        R6: 6,
        R7: 7,
        R8: 8,
        R9: 9,
        R10: 10,
        R11: 11,
        R12: 12,
        R13: 13,
        R14: 14,
        R15: 15,
        // IO
        SCREEN: 16384,
        KBD: 24578,
        // VM
        SP: 0,
        LCL: 1,
        ARG: 2,
        THIS: 3,
        THAT: 4,
    };

    LABELS = {};

    constructor() {
        return this;
    }

    assemble(inputFileName, outputFileName) {
        if (!outputFileName)
            outputFileName = /.*(?=\.asm)/i.exec(inputFileName);

        const file = fs.readFileSync(inputFileName, "utf8");

        const binary = this.parse(file);

        fs.writeFile(`${outputFileName}.hack`, binary, () => {});
    }

    parse(file) {
        const removeComments = (line) =>
            (line.includes("//")
                ? line.slice(0, line.indexOf("//"))
                : line
            ).trim();
        const removeWhitespaces = (line) => !!line;
        const removeLabels = (line) => !line.includes("(");

        const instructions = file
            .split("\r\n")
            .map(removeComments)
            .filter(removeWhitespaces);

        instructions.forEach(this._initLabelsAndVariables.bind(this));

        const parsed = instructions
            .filter(removeLabels)
            .map(this._translate.bind(this))
            .join("\n");

        return parsed;
    }

    // todo: refactor, and change this filter() to smth else
    _initLabelsAndVariables(instruction, lineNumber) {
        switch (this.getType(instruction)) {
            case INSTRUCTIONS.A:
                return this._initVariable(instruction);
            case INSTRUCTIONS.L:
                return this._initLabel(instruction, lineNumber + 1);
        }
    }

    _initVariable(instruction) {
        let value = instruction.slice(1);
        // if its a pre-defined do nothing
        if (this.VARIABLES[value] !== undefined) return;

        // lowercase is a variable, need to init its value in the VARIABLES
        if (value.match(/[a-z]+/)) {
            this.VARIABLES[value] = this.freeVariableAddress;
            this.freeVariableAddress++;
        }
    }

    _initLabel(instruction, lineNumber) {
        const label = /\((.*)\)/i.exec(instruction);
        this.LABELS[label] = lineNumber;
    }

    _translate(instruction) {
        switch (this.getType(instruction)) {
            case INSTRUCTIONS.A:
                return this._translateA(instruction);
            case INSTRUCTIONS.C:
                return this._translateC(instruction);
        }
    }

    getType(instruction) {
        if (instruction.includes("@")) return INSTRUCTIONS.A;
        else if (instruction.includes("(")) return INSTRUCTIONS.L;
        else return INSTRUCTIONS.C;
    }

    _translateA(instruction) {
        const decToBin = (dec) => (+dec).toString(2);
        const fillWith15Bits = (bin) =>
            "000000000000000".slice(bin.length) + bin;

        let value = instruction.slice(1);

        // it's a variable or label
        if (value.match(/\D+/i))
            value = this.LABELS[value] || this.VARIABLES[value];

        const hack = `0${fillWith15Bits(decToBin(value))}`;

        return hack;
    }

    _translateC(instruction) {
        const [dstcmp, jmp] = instruction.split(";");
        const [dst, cmp] = dstcmp.includes("=")
            ? dstcmp.split("=")
            : [undefined, dstcmp];

        const hack = `111${this._dest(dst)}${this._comp(cmp)}${this._jump(
            jmp
        )}`;

        return hack;
    }

    _dest(symbols) {
        // prettier-ignore
        switch (symbols) {
            case "M":   return '001';
            case "D":   return '010';
            case "MD":  return '011';
            case "A":   return '100';
            case "AM":  return '101';
            case "AD":  return '110';
            case "AMD": return '111';
            case "":    return '000';
            default:    return '000';
        }
    }

    _comp(symbols) {
        // prettier-ignore
        switch (symbols) {
            // a = 0
            case "0":   return '0101010';
            case "1":   return '0111111';
            case "-1":  return '0111010';
            case "D":   return '0001100';
            case "A":   return '0110000';
            case "!D":  return '0001101';
            case "!A":  return '0110001';
            case "-D":  return '0001111';
            case "-A":  return '0110011';
            case "D+1": return '0011111';
            case "A+1": return '0110111';
            case "D-1": return '0001110';
            case "A-1": return '0110010';
            case "D+A": return '0000010';
            case "D-A": return '0010011';
            case "A-D": return '0000111';
            case "D&A": return '0000000';
            case "D|A": return '0010101';
            // a = 1
            case "M":   return '1110000';
            case "!M":  return '1110001';
            case "-M":  return '1110011';
            case "M+1": return '1110111';
            case "M-1": return '1110010';
            case "D-M": return '1000010';
            case "M-D": return '1000111';
            case "D&M": return '1000000';
            case "D|M": return '1010101';
            default:    return '';
        }
    }

    _jump(symbols) {
        // prettier-ignore
        switch (symbols) {
            case "JGT":     return '001';
            case "JEQ":     return '010';
            case "JGE":     return '011';
            case "JLT":     return '100';
            case "JNE":     return '101';
            case "JLE":     return '110';
            case "JMP":     return '111';
            case "":        return '000';
            default:        return '000';
        }
    }
}

module.exports = Assembler;
