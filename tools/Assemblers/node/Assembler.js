fs = require('fs')

const INSTRUCTIONS = {
    A: 'ADDRESS',
    C: 'COMPUTE',
    L: 'LABEL',
}

class Assembler {
    constructor() {
        return this;
    }

    assemble(inputFileName, outputFileName) {

        if (!outputFileName) outputFileName = /\w*(?=\.asm)/i.exec(inputFileName);

        const file = fs.readFileSync(inputFileName, "utf8");
        const hack = this.parse(file);

        // fs.writeFile(`./${outputFileName}.hack`, hack, () => { });
    }

    parse(assembly) {
        const instructions = assembly.split("\n");

        instructions.map(this.translate);

        return instructions;
    }

    translate(instruction) {
        switch (getType(instruction)) {
            case INSTRUCTIONS.A: return this.translateA(instruction);
            case INSTRUCTIONS.C: return this.translateC(instruction);
            case INSTRUCTIONS.L: return this.translateL(instruction);
        }
    }

    getType(instruction) {
        if (instruction.includes("@")) return INSTRUCTIONS.A;
        else if (instruction.includes("(")) return INSTRUCTIONS.L;
        else return INSTRUCTIONS.C;
    }

    translateA(instruction) {
        const decToBin = (decimal) => (dec >>> 0).toString(2);

        return `0${decToBin(instruction)}`
    }

    translateC(instruction) {
        const dest = (symbols) => 1; // TODO
        const comp = (symbols) => 2; // TODO
        const jump = (symbols) => 3; // TODO

        const [dstcmp, jmp] = instruction.split(';');
        const [dst, cmp] = dstcmp.split('=');

        const hack = `111${dest(dst)}${comp(cmp)}${jump(jmp)}`;

        return hack;
    }

    translateL(instruction) {

    }

}

module.exports = Assembler;