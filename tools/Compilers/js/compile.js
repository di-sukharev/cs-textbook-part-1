const fs = require("fs");
const writer = require("./writer.js");

const DEBUG = false;

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

            let vmFile = writer.init() + "\n" + compileFile(jackFile);

            fs.writeFileSync(
                `${inputDirectoryName}/${targetDirectoryName}.vm`,
                vmFile
            );
        });
}

function compileFile(jackFile) {
    const removeComments = (line) =>
        (line.includes("//") ? line.slice(0, line.indexOf("//")) : line).trim();
    const removeWhitespaces = (line) => !!line;
    const intoTokens = " ";

    const vmFile = jackFile
        .split(intoTokens)
        .map(removeComments)
        .filter(removeWhitespaces)
        .map(jack2vm)
        .join(intoLines);

    if (DEBUG) console.log({ DEBUG });

    return vmFile;
}

function jack2vm(jackInstruction) {
    let asmInstructions = `\n// ${jackInstruction}\n`;

    const [operation, arg1, arg2] = jackInstruction.split(" ");

    asmInstructions += writer[operation](arg1, arg2);

    return asmInstructions;
}

module.exports = compileDirectory;
