const tokenizer = require("./tokenizer");
const transformer = require("./transformer");
const fs = require("fs");

function VMtranslator(fileName, outputFileName) {
  if (!outputFileName) outputFileName = "out";
  var contents = fs.readFileSync(fileName, "utf8");
  let tokens = tokenizer(contents);
  let output = transformer(tokens, fileName);
  fs.writeFile(`./${outputFileName}.asm`, output, () => { });
}

module.exports = VMtranslator;
