const fs = require("fs");
const { breakLines } = require("./tools");

const DEBUG = false;

const INSTRUCTION = {
    POP: "pop",
    PUSH: "push",
    AL: "arithmetic-logical",
};

const SEGMENTS = {
    pointer: "pointer",
    constant: "constant",
    argument: "argument",
    local: "local",
    that: "that",
    this: "this",
    temp: "temp",
    ARG: "ARG",
    LCL: "LCL",
    THAT: "THAT",
    THIS: "THIS",
    TEMP: "R5",
};

class VMtranslator {
    constructor() {
        return this;
    }

    translate(inputDirectoryName) {
        const isVMfile = (fileName) => fileName.endsWith(".vm");

        fs.readdirSync(inputDirectoryName)
            .filter(isVMfile)
            .forEach((fileName) => {
                const [
                    fileNameWithExtension,
                    fileNameWithoutExtension,
                ] = fileName.match(/(.+).vm$/);

                const vmFile = fs.readFileSync(
                    `${inputDirectoryName}/${fileNameWithExtension}`,
                    "utf8"
                );

                const assemblyFile = this._translate(vmFile);

                fs.writeFileSync(
                    `${inputDirectoryName}/${fileNameWithoutExtension}.my.asm`,
                    assemblyFile
                );
            });
    }

    _translate(vmFile) {
        const removeComments = (line) =>
            (line.includes("//")
                ? line.slice(0, line.indexOf("//"))
                : line
            ).trim();
        const removeWhitespaces = (line) => !!line;
        const intoLines = "\r\n";
        const intoFile = "\n";

        const assemblyFile = vmFile
            .split(intoLines)
            .map(removeComments)
            .filter(removeWhitespaces)
            .map(this._vmToAsm.bind(this))
            .join(intoFile);

        if (DEBUG) console.log({ DEBUG });

        return assemblyFile;
    }

    _vmToAsm(vmInstruction) {
        let asmInstructions = `// ${vmInstruction} \n`; // start with comment

        switch (this._getType(vmInstruction)) {
            case INSTRUCTION.PUSH:
                asmInstructions += this._translatePush(vmInstruction);
                break;
            case INSTRUCTION.POP:
                asmInstructions += this._translatePop(vmInstruction);
                break;
            case INSTRUCTION.AL:
                asmInstructions += this._translateAL(vmInstruction);
                break;
        }

        return asmInstructions;
    }

    _getType(instruction) {
        if (instruction.includes("pop")) return INSTRUCTION.POP;
        if (instruction.includes("push")) return INSTRUCTION.PUSH;
        else return INSTRUCTION.AL;
    }

    _translatePush(instruction) {
        const [push, segment, value] = instruction.split(" ");

        switch (segment) {
            case SEGMENTS.constant:
                return this._pushConstant(value);
            case SEGMENTS.argument:
                return this._pushSegment(SEGMENTS.ARG, value);
            case SEGMENTS.local:
                return this._pushSegment(SEGMENTS.LCL, value);
            case SEGMENTS.that:
                return this._pushSegment(SEGMENTS.THAT, value);
            case SEGMENTS.this:
                return this._pushSegment(SEGMENTS.THIS, value);
            case SEGMENTS.temp:
                return this._pushSegment(SEGMENTS.TEMP, +value + 5);
            case SEGMENTS.static:
                return this._pushStatic(+value + 16);
            case SEGMENTS.pointer:
                return this._pushPointer(
                    value === "0" ? SEGMENTS.THIS : SEGMENTS.THAT
                );
        }
    }

    _advanceSP = breakLines`@SP A=M M=D @SP M=M+1`;

    _pushConstant(value) {
        return breakLines`@${value} D=A ${this._advanceSP}`;
    }

    _pushSegment(segment, value) {
        return breakLines`@${segment} D=M @${value} A=D+A D=M ${this._advanceSP}`;
    }

    _pushPointer(segment) {
        return breakLines`@${segment} D=M ${this._advanceSP}`;
    }

    _pushStatic(value) {
        return breakLines`@${value} D=M ${this._advanceSP}`;
    }

    _translatePop(instruction) {
        const [pop, segment, value] = instruction.split(" ");

        switch (segment) {
            case SEGMENTS.argument:
                return this._popSegment(SEGMENTS.ARG, value);
            case SEGMENTS.local:
                return this._popSegment(SEGMENTS.LCL, value);
            case SEGMENTS.that:
                return this._popSegment(SEGMENTS.THAT, value);
            case SEGMENTS.this:
                return this._popSegment(SEGMENTS.THIS, value);
            case SEGMENTS.temp:
                return this._popSegment(SEGMENTS.TEMP, +value + 5);
            case SEGMENTS.static:
                return this._popStatic(+value + 16);
            case SEGMENTS.pointer:
                return this._popPointer(
                    value === "0" ? SEGMENTS.THIS : SEGMENTS.THAT
                );
        }
    }

    _moveDtoSP = breakLines`@R13 M=D @SP AM=M-1 D=M @R13 A=M M=D`;

    _popSegment(segment, value) {
        return breakLines`@${segment} D=M @${value} D=D+A ${this._moveDtoSP}`;
    }

    _popPointer(segment) {
        return breakLines`@${segment} D=A ${this._moveDtoSP}`;
    }

    _popStatic(value) {
        return breakLines`@${value} D=A ${this._moveDtoSP}`;
    }

    _translateAL(instruction) {
        switch (instruction) {
            case "add":
                return this._translateAdd();
            case "sub":
                return this._translateSub();
        }
    }

    _getLastTwoStackValuesInMandD = breakLines`@SP AM=M-1 D=M A=A-1`;

    _translateAdd() {
        return breakLines`${this._getLastTwoStackValuesInMandD} M=M+D`;
    }

    _translateSub() {
        return breakLines`${this._getLastTwoStackValuesInMandD} M=M-D`;
    }
}

module.exports = VMtranslator;
