fs = require("fs");

const INSTRUCTIONS = {
    A: "ADDRESS",
    C: "COMPUTE",
    L: "LABEL",
};

class Assembler {
    freeVariableAddress = 16;
    variablesTable = {
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
        SCREEN: 16384,
        KBD: 24578,
        SP: 0,
        // TODO: add VM vars
    };

    labelsTable = {};

    constructor() {
        return this;
    }

    assemble(inputFileName, outputFileName) {
        if (!outputFileName)
            outputFileName = /.*(?=\.asm)/i.exec(inputFileName);

        const file = fs.readFileSync(inputFileName, "utf8");

        const assembled = this.parse(file);

        fs.writeFile(`${outputFileName}.hack`, assembled, () => {});
    }

    parse(file) {
        const removeWhitespaces = (line) => !!line;
        const removeComments = (line) =>
            (line.includes("//")
                ? line.slice(0, line.indexOf("//"))
                : line
            ).trim(); // TODO: make more elegant

        const instructions = file
            .split("\r\n")
            .map(removeComments)
            .filter(removeWhitespaces)
            .filter(this.initLabelsAndVariables.bind(this)) // todo: remove bind(this)
            .map(this.translate.bind(this)) // todo: remove bind(this)
            .join("\n");

        return instructions;
    }

    // todo: refactor, and change this filter() to smth else
    initLabelsAndVariables(instruction, lineNumber) {
        // variable
        if (instruction.includes("@")) {
            let value = instruction.slice(1);
            // pre-defined
            if (this.variablesTable[value] !== undefined) return true;

            // lowercase is a variable, need to init its value in the variablesTable
            if (value.match(/[a-z]+/)) {
                this.variablesTable[value] = this.freeVariableAddress;
                this.freeVariableAddress++;
            }

            // all variables will be changed later
            return true;
        }

        // its a (LABEL)
        if (instruction.includes("(")) {
            const [isLabel, label] = instruction.match(/\((.*)\)/i);

            if (isLabel) this.labelsTable[label] = lineNumber + 1;

            return false;
        }

        return true;
    }

    translate(instruction) {
        switch (this.getType(instruction)) {
            case INSTRUCTIONS.A:
                return this.translateA(instruction);
            case INSTRUCTIONS.C:
                return this.translateC(instruction);
        }
    }

    getType(instruction) {
        if (instruction.includes("@")) return INSTRUCTIONS.A;
        else return INSTRUCTIONS.C;
    }

    translateA(instruction) {
        const decToBin = (dec) => (+dec).toString(2);
        const fillWith15Bits = (bin) =>
            "000000000000000".slice(bin.length) + bin;

        let value = instruction.slice(1);

        // it's a variable or label
        if (value.match(/\D+/i))
            value = this.labelsTable[value] || this.variablesTable[value];

        const hack = `0${fillWith15Bits(decToBin(value))}`;

        return hack;
    }

    translateC(instruction) {
        const [dstcmp, jmp] = instruction.split(";");
        const [dst, cmp] = dstcmp.includes("=")
            ? dstcmp.split("=")
            : [undefined, dstcmp];

        console.log({ instruction, dst, cmp, jmp });

        const hack = `111${this.dest(dst)}${this.comp(cmp)}${this.jump(jmp)}`;

        return hack;
    }

    dest(symbols) {
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

    comp(symbols) {
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

    jump(symbols) {
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
