const translateDirectory = require("./translate.js");
const graffiti = require("./graffiti.js");

// eslint-disable-next-line no-unused-vars
const inputDirectoryName = process.argv[3];

console.log("args: ", { inputDirectoryName });

console.log("Translating ⏳");
translateDirectory(inputDirectoryName);
console.log("Translated .vm to .asm ");

console.log(graffiti);
