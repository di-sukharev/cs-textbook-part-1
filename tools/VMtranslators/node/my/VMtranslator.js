const fs = require("fs");
const { INSTRUCTION } = require("./constants.js");
const Writer = require("./Writer/index.js");
const { OPS } = require("./Writer/ArithLogic.js");

const DEBUG = false;

class VMtranslator {
    constructor() {
        this.writer = new Writer();

        return this;
    }

    translate(inputDirectoryName) {
        const isVMfile = (fileName) => fileName.endsWith(".vm");

        fs.readdirSync(inputDirectoryName)
            .filter(isVMfile)
            .forEach((fileName) => {
                const [
                    fileNameWithExtension,
                    fileNameWithoutExtension,
                ] = fileName.match(/(.+).vm$/);

                const vmFile = fs.readFileSync(
                    `${inputDirectoryName}/${fileNameWithExtension}`,
                    "utf8"
                );

                const assemblyFile = this._translate(vmFile);

                fs.writeFileSync(
                    `${inputDirectoryName}/${fileNameWithoutExtension}.my.asm`,
                    assemblyFile
                );
            });
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
            case INSTRUCTION.PUSH:
                asmInstructions += this.writer.push(vmInstruction);
                break;
            case INSTRUCTION.POP:
                asmInstructions += this.writer.pop(vmInstruction);
                break;
            case INSTRUCTION.AL:
                asmInstructions += this.writer.arithLogic(vmInstruction);
                break;
        }

        return asmInstructions;
    }

    _getType(instruction) {
        if (instruction.includes("pop")) return INSTRUCTION.POP;
        else if (instruction.includes("push")) return INSTRUCTION.PUSH;
        else if (Object.keys(OPS).includes(instruction)) return INSTRUCTION.AL;
    }
}

module.exports = VMtranslator;
