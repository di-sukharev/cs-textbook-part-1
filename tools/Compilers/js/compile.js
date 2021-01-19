const fs = require("fs");
const Tokenizer = require("./tokenizer.js");
const Parser = require("./parser.js");

function compileDirectory(inputDirectoryName) {
    const isJackFile = (fileName) => fileName.endsWith(".jack");

    const [targetDirectoryName] = inputDirectoryName.match(/[^/]+(?=\/$)/);

    fs.readdirSync(inputDirectoryName)
        .filter(isJackFile)
        .forEach((fileName) => {
            const jackSourceCode = fs.readFileSync(
                `${inputDirectoryName}/${fileName}`,
                "utf8"
            );

            let xmlFile = compileFile(jackSourceCode);

            fs.writeFileSync(
                `${inputDirectoryName}/${targetDirectoryName}.xml`,
                xmlFile
            );
        });
}

function compileFile(jackSourceCode) {
    const tokenizer = new Tokenizer(jackSourceCode);

    const parser = new Parser(tokenizer);

    const vmFile = parser.compileClass();

    return vmFile;
}

// function jack2vm(jackInstruction) {
//     let asmInstructions = `\n// ${jackInstruction}\n`;

//     const [operation, arg1, arg2] = jackInstruction.split(" ");

//     asmInstructions += writer[operation](arg1, arg2);

//     return asmInstructions;
// }

module.exports = compileDirectory;
