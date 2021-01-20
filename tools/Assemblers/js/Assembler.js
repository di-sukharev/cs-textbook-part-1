const INSTRUCTIONS = {
    A: "ADDRESS",
    C: "COMPUTE",
    L: "LABEL",
};

class Assembler {
    // we start storing variables at 16th register. From M[16] to M[256].
    freeVariableAddress = 16;

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

    labelsCount = 0;

    LABELS = {};

    constructor() {
        return this;
    }

    assemble(file) {
        const removeComments = (line) =>
            (line.includes("//")
                ? line.slice(0, line.indexOf("//"))
                : line
            ).trim();
        const removeWhitespaces = (line) => !!line;
        const intoLines = "\r\n";
        const inFile = "\n";

        const result = file
            .split(intoLines)
            .map(removeComments)
            .filter(removeWhitespaces)
            .filter(this._initAndRemoveLabels.bind(this))
            .map(this._asmToBin.bind(this))
            .join(inFile);

        return result;
    }

    _initAndRemoveLabels(instruction, lineNumber) {
        if (this.getType(instruction) !== INSTRUCTIONS.L) return true;

        // eslint-disable-next-line no-unused-vars
        const [_, value] = instruction.match(/\((.*)\)/i);

        this.LABELS[value] = lineNumber - this.labelsCount;

        this.labelsCount++;

        return false;
    }

    _asmToBin(instruction) {
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
        const getValueOfInstructionA = (instruction) => instruction.slice(1);

        let value = getValueOfInstructionA(instruction);

        const isLabelOrVariable = value.match(/\D+/i);
        //todo: refactor this scary ternary ???
        if (isLabelOrVariable)
            value =
                this.LABELS[value] !== undefined
                    ? this.LABELS[value]
                    : this.VARIABLES[value] !== undefined
                    ? this.VARIABLES[value]
                    : this._initVariable(value);

        const hack = `0${fillWith15Bits(decToBin(value))}`;

        return hack;
    }

    _initVariable(value) {
        this.VARIABLES[value] = this.freeVariableAddress;
        this.freeVariableAddress++;
        return this.VARIABLES[value];
    }

    _translateC(instruction) {
        const { comp, dest, jump } = this._separateC(instruction);

        this._validateC({ comp, dest, jump }, instruction);

        return `111${comp}${dest}${jump}`;
    }

    _separateC(instruction) {
        const [dstcmp, jmp = null] = instruction.split(";");
        const [dst, cmp] = dstcmp.includes("=")
            ? dstcmp.split("=")
            : [null, dstcmp];

        const comp = this._comp(cmp);
        const dest = this._dest(dst);
        const jump = this._jump(jmp);

        return { comp, dest, jump };
    }

    _validateC({ comp, dest, jump }, instruction) {
        if (comp === null)
            throw Error(`unknown comp in instruction: "${instruction}"`);
        if (dest === null)
            throw Error(`unknown dest in instruction "${instruction}"`);
        if (jump === null)
            throw Error(`unknown jump in instruction "${instruction}"`);
    }

    _dest(symbols) {
        // if (symbols && symbols.length >= 2) console.log({ symbols });
        // prettier-ignore
        switch (symbols) {
            case "M":   return '001';
            case "D":   return '010';
            case "MD":  return '011';
            case "A":   return '100';
            case "AM":  return '101';
            case "AD":  return '110';
            case "AMD": return '111';
            case null:  return '000';
            default:    return null;
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
            case "D+M": return '1000010';
            case "D-M": return '1000010';
            case "M-D": return '1000111';
            case "D&M": return '1000000';
            case "D|M": return '1010101';
            case null:  return '';
            default:    return null;
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
            case null:      return '000';
            default:        return null;
        }
    }
}

module.exports = Assembler;
