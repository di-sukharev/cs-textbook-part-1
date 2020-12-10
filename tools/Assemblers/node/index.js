const Assembler = require("./Assembler.js");
const { performance } = require("perf_hooks");

var [nodeExecPath, currentPath, inputFile, outputFile] = process.argv;
console.log("args: ", {
    inputFile,
    outputFile:
        outputFile ||
        "is going to be generated automatically in the same folder",
});

const assembler = new Assembler();

console.log("Assembling ⏳");
const started = performance.now();
assembler.assemble(inputFile, outputFile);
const finished = performance.now();

console.log(`Ready 🌞 took ${(finished - started).toFixed(2)} milliseconds`);
