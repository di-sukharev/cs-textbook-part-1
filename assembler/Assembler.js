const fs = require('fs');

class Assembler {

    constructor() {

        return this;
    }

    assemble(inputFile, outputFile) {
        const asmCode = fs.readFileSync(inputFile, "utf8");

        const hackCode = this._translate(asmCode)

        fs.writeFileSync(outputFile, hackCode)
        
    }

    _translate(asmCode) {

        const lines = asmCode
                        .split("\r\n")
                        .filter((line) => Boolean(line) && !line.includes("//"))
                        .map(this._asm2hack)
        
        console.log(lines)
    }

    _asm2hack(asmInstruction) {

        const type = this._getInstructionType(asmInstruction);

        if (type === "A") {
            this._translateA(asmInstruction);
        } else if (type === "C") {
            this._translateC(asmInstruction);
        } else {
            throw new Error("Unknown type of: " + asmInstruction)
        }

    }

    _getInstructionType(instruction) {
        if (instruction.includes("@")) {
            return "A";
        } else if (instruction.includes(";") || instruction.includes("=")) {
            return "C";
        }
    }

    _translateA(instruction) {
        // @32768 -> 01010100101010101
        const decToBin = (dec) => (Number(dec)).toString(2);
        const getValueOfA = (instr) => instr.slice(1);
        const fillWithEmptyBits = (val) => "0000000000000000".slice(val.length) + val;

        let value = decToBin(getValueOfA(instruction));

        const hack = "0" + fillWithEmptyBits(value);

        return hack;
    }

    _translateC(instruction) {

        const separateC = (instr) => {
        
            return { dest: 'M', comp: 'D+A', jump: "JLE" };
        }

        const { dest, comp, jump } = separateC(instruction);

        return "111" + this._translateDest(dest) + this._translateComp(comp) + this._translateJump(jump);
    }

}

module.exports = Assembler;