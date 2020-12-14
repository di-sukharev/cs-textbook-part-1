const Assembler = require("./Assembler.js");
const { performance } = require("perf_hooks");

var [
    nodeExecPath,
    currentPath,
    inputFile,
    outputFile = `${/.*(?=\.asm)/i.exec(inputFile)}.hack`,
] = process.argv;

console.info("args: ", {
    inputFile,
    outputFile:
        outputFile ||
        "is going to be generated automatically in the same folder",
});

const assembler = new Assembler();

console.info("Assembling ⏳");
const started = performance.now();
assembler.assemble(inputFile, outputFile);
const finished = performance.now();

console.info(`Assembled 🌞 took ${(finished - started).toFixed(2)} ms`);
