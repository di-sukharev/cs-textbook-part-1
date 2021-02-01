const fs = require("fs");
const path = require("path");
const Tokenizer = require("./Tokenizer.js");
const CompilationEngine = require("./CompilationEngine.js");

function compileDirectory(inputDirectoryName) {
    const isJackFile = (fileName) => fileName.endsWith(".jack");

    fs.readdirSync(inputDirectoryName)
        .filter(isJackFile)
        .forEach((fileName) => {
            const jackSourceCode = fs.readFileSync(
                `${inputDirectoryName}/${fileName}`,
                "utf8"
            );

            let { xmlCode, vmCode } = compileFile(jackSourceCode);

            const extension = path.extname(fileName);
            const file = path.basename(fileName, extension);

            fs.writeFileSync(
                `${inputDirectoryName}/${file}.syntax-tree.xml`,
                xmlCode
            );

            fs.writeFileSync(`${inputDirectoryName}/${file}.test.vm`, vmCode);
        });
}

function compileFile(jackSourceCode) {
    const tokenizer = new Tokenizer(jackSourceCode);

    const compilationEngine = new CompilationEngine(tokenizer);

    return compilationEngine.compile();
}

module.exports = compileDirectory;
