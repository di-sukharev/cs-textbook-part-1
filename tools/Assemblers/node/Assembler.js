fs = require("fs");

const INSTRUCTIONS = {
    A: "ADDRESS",
    C: "COMPUTE",
    L: "LABEL",
};

class Assembler {
    static symbolTable;

    constructor() {
        this.symbolTable = {}; // todo: maybe move this somewhere?

        return this;
    }

    assemble(inputFileName, outputFileName) {
        if (!outputFileName)
            outputFileName = /\w*(?=\.asm)/i.exec(inputFileName);

        const file = fs.readFileSync(inputFileName, "utf8");

        const hack = this.parse(file);

        // fs.writeFile(`./${outputFileName}.hack`, hack, () => { });
    }

    parse(file) {
        const removeComments = (line) => !line.includes("//");
        const removeWhitespaces = (line) => !!line;

        const instructions = file
            .split("\n")
            .filter(removeComments)
            .filter(removeWhitespaces);

        instructions.map(this.translate);

        instructions.join("\n");

        return instructions;
    }

    translate(instruction) {
        switch (getType(instruction)) {
            case INSTRUCTIONS.A:
                return this.translateA(instruction);
            case INSTRUCTIONS.C:
                return this.translateC(instruction);
            case INSTRUCTIONS.L:
                return this.translateL(instruction);
        }
    }

    getType(instruction) {
        if (instruction.includes("@")) return INSTRUCTIONS.A;
        else if (instruction.includes("(")) return INSTRUCTIONS.L;
        else return INSTRUCTIONS.C;
    }

    translateA(instruction) {
        const decToBin = (dec) => (dec >>> 0).toString(2);

        return `0${decToBin(instruction)}`;
    }

    translateC(instruction) {
        const [dstcmp, jmp] = instruction.split(";");
        const [dst, cmp] = dstcmp.split("=");

        const hack = `111${this.dest(dst)}${this.comp(cmp)}${this.jump(jmp)}`;

        return hack;
    }

    translateL(instruction) {
        /*  Проходим первый раз:
            1. Переносим все лейбы в таблицу
        */
        /*  Проходим второй раз, когда натыкаемся на @symbol:
            1. меняем symbol на лейбл, если он есть в таблице
            2. или (если это переменная) создаем ее и/или заменяем
        */
    }

    dest(symbols) {
        // prettier-ignore
        switch (symbols) {
            case "":    return '000';
            case "M":   return '001';
            case "D":   return '010';
            case "MD":  return '011';
            case "A":   return '100';
            case "AM":  return '101';
            case "AD":  return '110';
            case "AMD": return '111';
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
        }
    }

    jump(symbols) {
        // prettier-ignore
        switch (symbols) {
            case "":    return '000';
            case "JGT": return '001';
            case "JEQ": return '010';
            case "JGE": return '011';
            case "JLT": return '100';
            case "JNE": return '101';
            case "JLE": return '110';
            case "JMP": return '111';
        }
    }
}

module.exports = Assembler;
