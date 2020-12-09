// const Assembler = require("./Assembler.js");

var [inputFile, outputFile] = process.argv.slice(2);
console.log("args: ", { inputFile, outputFile });

const assembler = new Assembler();

assembler.assemble(inputFile, outputFile);
