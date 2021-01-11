const fs = require("fs");
const writer = require("./writer.js");

const DEBUG = false;

function translateDirectory(inputDirectoryName) {
    const isVMfile = (fileName) => fileName.endsWith(".vm");

    let assemblyFile = writer.init() + "\n";

    const [targetDirectoryName] = inputDirectoryName.match(/[^/]+(?=\/$)/);

    fs.readdirSync(inputDirectoryName)
        .filter(isVMfile)
        .forEach((fileName) => {
            const vmFile = fs.readFileSync(
                `${inputDirectoryName}/${fileName}`,
                "utf8"
            );

            assemblyFile += translateFile(vmFile);
        });

    fs.writeFileSync(
        `${inputDirectoryName}/${targetDirectoryName}.node.asm`,
        assemblyFile
    );
}

function translateFile(vmFile) {
    const removeComments = (line) =>
        (line.includes("//") ? line.slice(0, line.indexOf("//")) : line).trim();
    const removeWhitespaces = (line) => !!line;
    const intoLines = "\r\n";
    const intoFile = "\n";

    const assemblyFile = vmFile
        .split(intoLines)
        .map(removeComments)
        .filter(removeWhitespaces)
        .map(vmToAsm)
        .join(intoFile);

    if (DEBUG) console.log({ DEBUG });

    return assemblyFile;
}

function vmToAsm(vmInstruction) {
    let asmInstructions = `\n// ${vmInstruction}\n`;

    const [operation, arg1, arg2] = vmInstruction.split(" ");

    asmInstructions += writer[operation](arg1, arg2);

    return asmInstructions;
}

module.exports = translateDirectory;
