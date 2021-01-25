const compileDirectory = require("./compile.js");
const { performance } = require("perf_hooks");
const graffiti = require("./graffiti.js");

// eslint-disable-next-line no-unused-vars
const [nodeExecPath, thisFilePath, inputDirectoryName] = process.argv;

console.log("args: ", { inputDirectoryName });

console.log("Translating ⏳");
const started = performance.now();
compileDirectory(inputDirectoryName);
const finished = performance.now();

console.log(
    `Compiled .jack to .vm 🌞 took ${(finished - started).toFixed(2)} ms`
);

console.log(graffiti);
