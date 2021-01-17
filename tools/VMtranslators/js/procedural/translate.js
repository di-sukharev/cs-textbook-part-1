const fs = require("fs");
const writer = require("./writer.js");

const DEBUG = false;

function translateDirectory(inputDirectoryName) {
    const isVmFile = (fileName) => fileName.endsWith(".vm");

    let assemblyFile = writer.init() + "\n";

    const [targetDirectoryName] = inputDirectoryName.match(/[^/]+(?=\/$)/);

    fs.readdirSync(inputDirectoryName)
        .filter(isVmFile)
        .forEach((fileName) => {
            const vmFile = fs.readFileSync(
                `${inputDirectoryName}/${fileName}`,
                "utf8"
            );

            assemblyFile += translateFile(vmFile);
        });

    fs.writeFileSync(
        `${inputDirectoryName}/${targetDirectoryName}.asm`,
        assemblyFile
    );
}

function translateFile(vmFile) {
    const removeComments = (line) =>
        (line.includes("//") ? line.slice(0, line.indexOf("//")) : line).trim();
    const removeWhitespaces = (line) => !!line;
    const intoLines = "\r\n";

    const assemblyFile = vmFile
        .split(intoLines)
        .map(removeComments)
        .filter(removeWhitespaces)
        .map(vm2asm)
        .join(intoLines);

    if (DEBUG) console.log({ DEBUG });

    return assemblyFile;
}

function vm2asm(vmInstruction) {
    let asmInstructions = `\n// ${vmInstruction}\n`;

    const [operation, arg1, arg2] = vmInstruction.split(" ");

    asmInstructions += writer[operation](arg1, arg2);

    return asmInstructions;
}

module.exports = translateDirectory;
