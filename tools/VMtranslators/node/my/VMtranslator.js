const fs = require("fs");
const { INSTRUCTION_TYPE } = require("./constants.js");
const Writer = require("./Writer/index.js");
const { ARITH_LOGIC_OPS } = require("./Writer/ArithLogic.js");
const { BRANCHING_OPS } = require("./Writer/Brancher.js");
const { CALLER_OPS } = require("./Writer/Caller.js");

const DEBUG = false;

class VMtranslator {
    constructor() {
        this.writer = new Writer();

        return this;
    }

    translate(inputDirectoryName) {
        const isVMfile = (fileName) => fileName.endsWith(".vm");

        let assemblyFile = this.writer.init() + "\n";

        const [targetDirectoryName] = inputDirectoryName.match(/[^/]+(?=\/$)/);

        fs.readdirSync(inputDirectoryName)
            .filter(isVMfile)
            .forEach((fileName) => {
                const vmFile = fs.readFileSync(
                    `${inputDirectoryName}/${fileName}`,
                    "utf8"
                );

                assemblyFile += this._translate(vmFile);
            });

        fs.writeFileSync(
            `${inputDirectoryName}/${targetDirectoryName}.my.asm`,
            assemblyFile
        );
    }

    _translate(vmFile) {
        const removeComments = (line) =>
            (line.includes("//")
                ? line.slice(0, line.indexOf("//"))
                : line
            ).trim();
        const removeWhitespaces = (line) => !!line;
        const intoLines = "\r\n";
        const intoFile = "\n";

        const assemblyFile = vmFile
            .split(intoLines)
            .map(removeComments)
            .filter(removeWhitespaces)
            .map(this._vmToAsm.bind(this))
            .join(intoFile);

        if (DEBUG) console.log({ DEBUG });

        return assemblyFile;
    }

    _vmToAsm(vmInstruction) {
        let asmInstructions = `// ${vmInstruction} \n`; // start with comment

        switch (this._getType(vmInstruction)) {
            case INSTRUCTION_TYPE.PUSH:
                asmInstructions += this.writer.push(vmInstruction);
                break;
            case INSTRUCTION_TYPE.POP:
                asmInstructions += this.writer.pop(vmInstruction);
                break;
            case INSTRUCTION_TYPE.AL:
                asmInstructions += this.writer.arithLogic(vmInstruction);
                break;
            case INSTRUCTION_TYPE.GOTO:
                asmInstructions += this.writer.branching(vmInstruction);
                break;
            case INSTRUCTION_TYPE.CALL:
                asmInstructions += this.writer.call(vmInstruction);
                break;
        }

        return asmInstructions;
    }

    // todo: check where to save this vars better
    _getType(instruction) {
        const [operation] = instruction.split(" ");

        if (operation === INSTRUCTION_TYPE.POP) return INSTRUCTION_TYPE.POP;

        if (operation === INSTRUCTION_TYPE.PUSH) return INSTRUCTION_TYPE.PUSH;

        if (Object.values(BRANCHING_OPS).includes(operation))
            return INSTRUCTION_TYPE.GOTO;

        if (Object.values(ARITH_LOGIC_OPS).includes(operation))
            return INSTRUCTION_TYPE.AL;

        if (Object.values(CALLER_OPS).includes(operation))
            return INSTRUCTION_TYPE.CALL;
    }
}

module.exports = VMtranslator;
