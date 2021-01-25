const fs = require("fs");
const Writer = require("./Writer.js");

class VMtranslator {
    constructor() {
        this.writer = new Writer();

        return this;
    }

    translate(inputDirectoryName) {
        const isVmFile = (fileName) => fileName.endsWith(".vm");

        let assemblyFile = this.writer.init() + "\n";

        const [outputFileName] = inputDirectoryName.match(/[^/]+(?=\/$)/);

        fs.readdirSync(inputDirectoryName)
            .filter(isVmFile)
            .forEach((fileName) => {
                const vmCode = fs.readFileSync(
                    `${inputDirectoryName}/${fileName}`,
                    "utf8"
                );

                assemblyFile += this._translate(vmCode);
            });

        fs.writeFileSync(
            `${inputDirectoryName}/${outputFileName}.asm`,
            assemblyFile
        );
    }

    _translate(vmCode) {
        const removeComments = (line) =>
            (line.includes("//")
                ? line.slice(0, line.indexOf("//"))
                : line
            ).trim();
        const removeWhitespaces = (line) => !!line;
        const intoLines = "\r\n";

        const assemblyFile = vmCode
            .split(intoLines)
            .map(removeComments)
            .filter(removeWhitespaces)
            .map(this._vmToAsm.bind(this))
            .join(intoLines);

        return assemblyFile;
    }

    _vmToAsm(vmInstruction) {
        let asmInstructions = `\n// ${vmInstruction}\n`;

        const [operation, arg1, arg2] = vmInstruction.split(" ");

        asmInstructions += this.writer[operation](arg1, arg2);

        return asmInstructions;
    }
}

module.exports = VMtranslator;
