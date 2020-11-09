import path from "path";
import fs from "fs";
import Parser from "./Parser.mjs";
import CodeWriter from "./CodeWriter.mjs";

const inputArg = process.argv[2];
const noBootStrapArg = process.argv[3];
if (typeof inputArg === "undefined") {
  console.log(
    "Usage: node --experimental-modules trans.mjs <vm file | dir of vm files>"
  );
  process.exit(1);
}

let inputFiles, outputFile;
const stats = fs.statSync(inputArg);

if (inputArg.endsWith(".vm") && stats.isFile()) {
  inputFiles = [inputArg];
  outputFile = path.format({
    dir: path.dirname(inputArg),
    name: path.basename(inputArg, ".vm"),
    ext: ".asm",
  });
} else if (stats.isDirectory()) {
  const files = fs.readdirSync(inputArg);
  inputFiles = files
    .map((f) => path.resolve(inputArg, f))
    .filter((f) => f.endsWith(".vm"));
  outputFile = path.format({
    dir: path.resolve(inputArg),
    name: path.basename(path.resolve(inputArg)),
    ext: ".asm",
  });
}

console.log("Input files:");
for (let f of inputFiles) {
  console.log(` ${path.relative(process.cwd(), f)}`);
}

const cw = new CodeWriter(outputFile);
noBootStrapArg !== "nobootstrap" && cw.writeInit();

inputFiles.forEach((inputFile) => {
  const printf = (count, command, arg1, arg2) =>
    console.log(
      count.padStart(4, " "),
      command.padStart(12, " "),
      arg1.padStart(20, " "),
      arg2.padStart(4, " ")
    );
  const parser = new Parser(inputFile);
  cw.setFilename(inputFile);

  console.log(`\nParsing ${path.relative(process.cwd(), inputFile)}...`);
  printf("#", "command", "arg1", "arg2");

  for (var count = 1; parser.hasMoreCommands(); count++) {
    parser.advance();
    let command = parser.commandType();
    let arg1 = parser.arg1() || "";
    let arg2 = parser.arg2() || "";

    printf(String(count), command, arg1, arg2);

    switch (parser.commandType()) {
      case Parser.commands.C_ARITHMETIC:
        cw.writeArithmetic(arg1);
        break;
      case Parser.commands.C_PUSH:
      case Parser.commands.C_POP:
        cw.writePushPop(command, arg1, arg2);
        break;
      case Parser.commands.C_LABEL:
        cw.writeLabel(arg1);
        break;
      case Parser.commands.C_IF:
        cw.writeIf(arg1);
        break;
      case Parser.commands.C_GOTO:
        cw.writeGoto(arg1);
        break;
      case Parser.commands.C_FUNCTION:
        cw.writeFunction(arg1, arg2);
        break;
      case Parser.commands.C_RETURN:
        cw.writeReturn();
        break;
      case Parser.commands.C_CALL:
        cw.writeCall(arg1, arg2);
        break;
      default:
        console.log("Unknown command in CodeWriter");
    }
  }
});

cw.close();
