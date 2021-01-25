const VMtranslator = require("./VMtranslator.js");
const { performance } = require("perf_hooks");
const graffiti = require("./graffiti.js");

// eslint-disable-next-line no-unused-vars
const [nodeExecPath, thisFilePath, inputDirectoryName] = process.argv;

console.log("args: ", { inputDirectoryName });

const translator = new VMtranslator();

console.log("Translating ⏳");
const started = performance.now();
translator.translate(inputDirectoryName);
const finished = performance.now();

console.log(`Translated 🌞 took ${(finished - started).toFixed(2)} ms`);
console.log(graffiti);
