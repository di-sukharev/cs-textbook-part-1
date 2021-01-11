const fs = require("fs");
const Writer = require("./Writer.js");

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
            `${inputDirectoryName}/${targetDirectoryName}.asm`,
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
        let asmInstructions = `\n// ${vmInstruction}\n`;

        const [operation, arg1, arg2] = vmInstruction.split(" ");

        asmInstructions += this.writer[operation](arg1, arg2);

        return asmInstructions;
    }
}

module.exports = VMtranslator;
