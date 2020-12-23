const translateDirectory = require("./translate.js");
const { performance } = require("perf_hooks");
const graffiti = require("./graffiti.js");

// eslint-disable-next-line no-unused-vars
const [nodeExecPath, thisFilePath, inputDirectoryName] = process.argv;

console.log("args: ", { inputDirectoryName });

console.info("Translating ⏳");
const started = performance.now();
translateDirectory(inputDirectoryName);
const finished = performance.now();

console.info(`Translated 🌞 took ${(finished - started).toFixed(2)} ms`);
console.log(graffiti);
