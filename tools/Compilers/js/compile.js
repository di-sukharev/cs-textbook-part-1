const fs = require("fs");
const writer = require("./parser.js");

function compileDirectory(inputDirectoryName) {
    const isJackFile = (fileName) => fileName.endsWith(".jack");

    const [targetDirectoryName] = inputDirectoryName.match(/[^/]+(?=\/$)/);

    fs.readdirSync(inputDirectoryName)
        .filter(isJackFile)
        .forEach((fileName) => {
            const jackFile = fs.readFileSync(
                `${inputDirectoryName}/${fileName}`,
                "utf8"
            );

            let vmFile = compileFile(jackFile);

            fs.writeFileSync(
                `${inputDirectoryName}/${targetDirectoryName}.vm`,
                vmFile
            );
        });
}

function compileFile(jackFile) {
    const vmFile = jackFile;

    vmFile = parser.compileClass(jackFile);

    return vmFile;
}

function jack2vm(jackInstruction) {
    let asmInstructions = `\n// ${jackInstruction}\n`;

    const [operation, arg1, arg2] = jackInstruction.split(" ");

    asmInstructions += writer[operation](arg1, arg2);

    return asmInstructions;
}

module.exports = compileDirectory;
