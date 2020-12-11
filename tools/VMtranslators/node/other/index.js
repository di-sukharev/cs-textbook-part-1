const VMtranslator = require("./VMtranslator");

var args = process.argv.slice(2);
console.log("args: ", args);

VMtranslator(args[0], args[1]);
