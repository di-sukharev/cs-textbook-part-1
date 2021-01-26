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

    constructor() {
        return this;
    }

    assemble(asmFile) {
        const noComments = (line) =>
            (line.includes("//")
                ? line.slice(0, line.indexOf("//"))
                : line
            ).trim();
        const noWhitespaces = (line) => Boolean(line);
        const noLabels = (line) => this._getType(line) !== INSTRUCTIONS.L;
        const inLines = "\r\n";

        const asmCode = asmFile
            .split(inLines)
            .map(noComments)
            .filter(noWhitespaces);

        asmCode.forEach(this._initLabels.bind(this));

        const hackCode = asmCode
            .filter(noLabels)
            .map(this._asm2bin.bind(this))
            .join(inLines);

        return hackCode;
    }

    LABELS = {};
    labelLineNumber = 0;
    _initLabels(instruction) {
        if (
            this._getType(instruction) === INSTRUCTIONS.A ||
            this._getType(instruction) === INSTRUCTIONS.C
        )
            this.labelLineNumber++;
        else if (this._getType(instruction) === INSTRUCTIONS.L) {
            // eslint-disable-next-line no-unused-vars
            const [_, value] = instruction.match(/\((.*)\)/i); // todo: don't use regexp
            if (!this.LABELS[value]) this.LABELS[value] = this.labelLineNumber;
        }
    }

    _asm2bin(instruction) {
        switch (this._getType(instruction)) {
            case INSTRUCTIONS.A:
                return this._translateA(instruction);
            case INSTRUCTIONS.C:
                return this._translateC(instruction);
        }
    }

    _getType(instruction) {
        if (instruction.includes("@")) return INSTRUCTIONS.A;
        else if (instruction.startsWith("(") && instruction.endsWith(")"))
            return INSTRUCTIONS.L;
        else if (instruction.match(/A?M?D?=/) || instruction.match(/;J/))
            return INSTRUCTIONS.C; // todo: add strong if statement predicate
    }

    _translateA(instruction) {
        const decToBin = (dec) => (+dec).toString(2);
        const fillWith15Bits = (bin) =>
            "000000000000000".slice(bin.length) + bin;
        const getValueOfInstructionA = (instruction) => instruction.slice(1);

        let value = getValueOfInstructionA(instruction);

        const isLabelOrVariable = value.match(/\D+/i);

        if (isLabelOrVariable)
            value =
                this._getLabel(value) ||
                this._getVariable(value) ||
                this._initVariable(value);

        const hack = `0${fillWith15Bits(decToBin(value))}`;

        return hack;
    }

    _getLabel(value) {
        return this.LABELS[value] !== undefined && String(this.LABELS[value]);
    }

    _getVariable(value) {
        return (
            this.VARIABLES[value] !== undefined && String(this.VARIABLES[value])
        );
    }

    _initVariable(value) {
        this.VARIABLES[value] = this.freeVariableAddress;
        this.freeVariableAddress++;
        return String(this.VARIABLES[value]);
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
