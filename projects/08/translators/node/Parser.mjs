import lineByLine from "n-readlines";

const VALID_NAME_RE = "[a-zA-Z][\\w\\.:_]*";

export default class Parser {
  constructor(filename) {
    this.rl = new lineByLine(filename);
    this.lineNum = 0;
  }

  static get commands() {
    return Object.freeze({
      C_ARITHMETIC: "C_ARITHMETIC",
      C_PUSH: "C_PUSH",
      C_POP: "C_POP",
      C_LABEL: "C_LABEL",
      C_GOTO: "C_GOTO",
      C_IF: "C_IF",
      C_FUNCTION: "C_FUNCTION",
      C_RETURN: "C_RETURN",
      C_CALL: "C_CALL",
    });
  }

  hasMoreCommands() {
    this.line = this.rl.next();
    this.lineNum++;

    while (
      /^\s*$|^\/\//.test(this.line.toString().trim()) &&
      this.hasMoreCommands()
    ) {}

    return !!this.line;
  }

  advance() {
    this.line = this.line.toString().split("//")[0].trim();
    return this.line;
  }

  commandType() {
    const pop = /^pop\s+\w+\s+\d+$/;
    const push = /^push\s+\w+\s+\d+$/;
    const arithLogic = /^(add|sub|neg|eq|gt|lt|and|or|not)$/;
    const label = new RegExp(`^label\\s+${VALID_NAME_RE}$`);
    const goto = new RegExp(`^goto\\s+${VALID_NAME_RE}$`);
    const ifgoto = new RegExp(`^if-goto\\s+${VALID_NAME_RE}$`);
    const func = new RegExp(`^function\\s+${VALID_NAME_RE}\\s+\\d+$`);
    const call = new RegExp(`^call\\s+${VALID_NAME_RE}\\s+\\d+$`);

    if (pop.test(this.line)) {
      this.command = Parser.commands.C_POP;
    } else if (push.test(this.line)) {
      this.command = Parser.commands.C_PUSH;
    } else if (arithLogic.test(this.line)) {
      this.command = Parser.commands.C_ARITHMETIC;
    } else if (label.test(this.line)) {
      this.command = Parser.commands.C_LABEL;
    } else if (goto.test(this.line)) {
      this.command = Parser.commands.C_GOTO;
    } else if (ifgoto.test(this.line)) {
      this.command = Parser.commands.C_IF;
    } else if (func.test(this.line)) {
      this.command = Parser.commands.C_FUNCTION;
    } else if (this.line === "return") {
      this.command = Parser.commands.C_RETURN;
    } else if (call.test(this.line)) {
      this.command = Parser.commands.C_CALL;
    } else {
      throw new Error(
        `Unknown command or invalid command syntax on line ${this.lineNum}: ${this.line}`
      );
    }

    return this.command;
  }

  arg1() {
    switch (this.command) {
      case Parser.commands.C_ARITHMETIC:
        return this.line;
      case Parser.commands.C_PUSH:
      case Parser.commands.C_POP:
      case Parser.commands.C_LABEL:
      case Parser.commands.C_GOTO:
      case Parser.commands.C_IF:
      case Parser.commands.C_FUNCTION:
      case Parser.commands.C_CALL:
        return this.line.split(/\s+/)[1];
    }
  }

  arg2() {
    switch (this.command) {
      case Parser.commands.C_POP:
      case Parser.commands.C_PUSH:
      case Parser.commands.C_CALL:
      case Parser.commands.C_FUNCTION:
        return this.line.split(/\s+/)[2];
    }
  }
}
