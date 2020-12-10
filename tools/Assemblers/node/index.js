const Assembler = require("./Assembler.js");
const { performance } = require("perf_hooks");

var [nodePath, currentPath, inputFile, outputFile] = process.argv;
console.log("args: ", { inputFile, outputFile });

const assembler = new Assembler();

console.log("Assembling ⏳");
const stated = performance.now();
assembler.assemble(inputFile, outputFile);
const finished = performance.now();

console.log(`Ready. took ${(finished - stated).toFixed(2)} milliseconds.`);
