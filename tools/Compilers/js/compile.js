const fs = require("fs");
const Tokenizer = require("./tokenizer.js");
const Parser = require("./parser.js");

function compileDirectory(inputDirectoryName) {
    const isJackFile = (fileName) => fileName.endsWith(".jack");

    const [outputFileName] = inputDirectoryName.match(/[^/]+(?=\/$)/);

    fs.readdirSync(inputDirectoryName)
        .filter(isJackFile)
        .forEach((fileName) => {
            const jackSourceCode = fs.readFileSync(
                `${inputDirectoryName}/${fileName}`,
                "utf8"
            );

            let xmlFile = compileFile(jackSourceCode);

            fs.writeFileSync(
                `${inputDirectoryName}/${outputFileName}.xml`,
                xmlFile
            );
        });
}

function compileFile(jackSourceCode) {
    const tokenizer = new Tokenizer(jackSourceCode);

    const parser = new Parser(tokenizer);

    const compiledCode = parser.compile();

    return compiledCode;
}

module.exports = compileDirectory;
