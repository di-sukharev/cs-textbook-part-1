const fs = require("fs");
const writer = require("./writer.js");

const DEBUG = false;

function translateDirectory(inputDirectoryName) {
    const isJACKfile = (fileName) => fileName.endsWith(".jack");

    let assemblyFile = writer.init() + "\n";

    const [targetDirectoryName] = inputDirectoryName.match(/[^/]+(?=\/$)/);

    fs.readdirSync(inputDirectoryName)
        .filter(isJACKfile)
        .forEach((fileName) => {
            const jackFile = fs.readFileSync(
                `${inputDirectoryName}/${fileName}`,
                "utf8"
            );

            assemblyFile += translateFile(jackFile);
        });

    fs.writeFileSync(
        `${inputDirectoryName}/${targetDirectoryName}.asm`,
        assemblyFile
    );
}

function translateFile(jackFile) {
    const removeComments = (line) =>
        (line.includes("//") ? line.slice(0, line.indexOf("//")) : line).trim();
    const removeWhitespaces = (line) => !!line;
    const intoLines = "\r\n";
    const intoFile = "\n";

    const assemblyFile = jackFile
        .split(intoLines)
        .map(removeComments)
        .filter(removeWhitespaces)
        .map(jack2vm)
        .join(intoFile);

    if (DEBUG) console.log({ DEBUG });

    return assemblyFile;
}

function jack2vm(jackInstruction) {
    let asmInstructions = `\n// ${jackInstruction}\n`;

    const [operation, arg1, arg2] = jackInstruction.split(" ");

    asmInstructions += writer[operation](arg1, arg2);

    return asmInstructions;
}

module.exports = translateDirectory;
