const Assembler = require("./Assembler.js")

const inputFile = process.argv[2];
const outputFile = process.argv[3];

const files = { inputFile, outputFile };

console.log(files);

const assembler = new Assembler();

assembler.assemble(inputFile, outputFile);
