const fs = require("fs");

const DEBUG = false;

class VMtranslator {
    constructor() {
        return this;
    }

    translate(inputDirectoryName) {
        fs.readdirSync(inputDirectoryName).forEach((fileName) => {
            if (!fileName.includes(".vm")) return;

            const [
                fileNameWithExtension,
                fileNameWithoutExtension,
            ] = fileName.match(/(.+).vm$/);

            const file = fs.readFileSync(
                `${inputDirectoryName}/${fileNameWithExtension}`,
                "utf8"
            );

            const assembly = this._parse(file);

            fs.writeFileSync(
                `${inputDirectoryName}/${fileNameWithoutExtension}.test.asm`,
                assembly
            );
        });
    }

    _parse(file) {
        const removeComments = (line) =>
            (line.includes("//")
                ? line.slice(0, line.indexOf("//"))
                : line
            ).trim();
        const removeWhitespaces = (line) => !!line;
        const intoLines = "\r\n";
        const inFile = "\n";

        const parsed = file
            .split(intoLines)
            .map(removeComments)
            .filter(removeWhitespaces)
            .map(this._vmToAsm.bind(this))
            .join(inFile);

        if (DEBUG) console.log({ DEBUG });

        return parsed;
        // handle push/pop segment i
        // arithmetic/logical operations
    }

    _vmToAsm() {
        return "kyky";
    }
}

module.exports = VMtranslator;
