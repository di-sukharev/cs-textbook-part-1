const fs = require("fs");
const path = require("path");
const writer = require("./writer.js");

function translateDirectory(inputDirectoryName) {
    const isVmFile = (fileName) => fileName.endsWith(".vm");

    let assemblyFile = writer.init() + "\n";

    const outputFileName = path.basename(inputDirectoryName);

    fs.readdirSync(inputDirectoryName)
        .filter(isVmFile)
        .forEach((fileName) => {
            const vmCode = fs.readFileSync(
                `${inputDirectoryName}/${fileName}`,
                "utf8"
            );

            assemblyFile += translateFile(vmCode);
        });

    fs.writeFileSync(
        `${inputDirectoryName}/${outputFileName}.asm`,
        assemblyFile
    );
}

function translateFile(vmCode) {
    const removeComments = (line) =>
        (line.includes("//") ? line.slice(0, line.indexOf("//")) : line).trim();
    const removeWhitespaces = (line) => !!line;
    const intoLines = "\r\n";

    const assemblyFile = vmCode
        .split(intoLines)
        .map(removeComments)
        .filter(removeWhitespaces)
        .map(vm2asm)
        .join(intoLines);

    return assemblyFile;
}

function vm2asm(vmInstruction) {
    let asmInstructions = `\n// ${vmInstruction}\n`;

    const [operation, arg1, arg2] = vmInstruction.split(" ");

    asmInstructions += writer[operation](arg1, arg2);

    return asmInstructions;
}

module.exports = translateDirectory;
