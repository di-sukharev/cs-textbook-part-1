const translateDirectory = require("./translate.js");

const [nodePath, scriptPath, inputDirectoryName, outputFilePath] = process.argv;

translateDirectory(inputDirectoryName);

console.log("Translated!!! Yo");
