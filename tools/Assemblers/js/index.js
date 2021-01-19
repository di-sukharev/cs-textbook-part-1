const fs = require("fs");
const Assembler = require("./Assembler.js");
const { performance } = require("perf_hooks");

const [
    // eslint-disable-next-line no-unused-vars
    nodeExecPath,
    // eslint-disable-next-line no-unused-vars
    thisFilePath,
    inputFile,
    outputFile = `${/.*(?=\.asm)/i.exec(inputFile)}.hack`,
] = process.argv;

console.info("args: ", { inputFile, outputFile });

if (!inputFile.endsWith(".asm"))
    throw new Error("Only .asm file can be assembled into .hack");

const assembler = new Assembler();

console.info("Assembling ⏳");

const started = performance.now();
const file = fs.readFileSync(inputFile, "utf8");    
const binary = assembler.assemble(file);
fs.writeFileSync(outputFile, binary);
const finished = performance.now();

console.info(
    `Assembled .asm into .hack 🌞 took ${(finished - started).toFixed(2)} ms`
);

