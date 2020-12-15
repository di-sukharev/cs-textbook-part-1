const fs = require("fs");
const { breakLines } = require("./tools");

const DEBUG = false;

const INSTRUCTION = {
    POP: "pop",
    PUSH: "push",
    AL: "arithmetic-logical",
};

const SEGMENTS = {
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
        fs.readdirSync(inputDirectoryName).forEach((fileName) => {
            if (!fileName.includes(".vm")) return;

            const [
                fileNameWithExtension,
                fileNameWithoutExtension,
            ] = fileName.match(/(.+).vm$/);

            const file = fs.readFileSync(
                `${inputDirectoryName}/${fileNameWithExtension}`,
                "utf8"
            );

            const assembly = this._translate(file);

            fs.writeFileSync(
                `${inputDirectoryName}/${fileNameWithoutExtension}.test.asm`,
                assembly
            );
        });
    }

    _translate(file) {
        const removeComments = (line) =>
            (line.includes("//")
                ? line.slice(0, line.indexOf("//"))
                : line
            ).trim();
        const removeWhitespaces = (line) => !!line;
        const intoLines = "\r\n";
        const intoFile = "\n";

        const result = file
            .split(intoLines)
            .map(removeComments)
            .filter(removeWhitespaces)
            .map(this._vmToAsm.bind(this))
            .join(intoFile);

        if (DEBUG) console.log({ DEBUG });

        return result;
    }

    _vmToAsm(instruction) {
        let asm = `// ${instruction} \n`;

        switch (this._getType(instruction)) {
            case INSTRUCTION.PUSH:
                asm += this._translatePush(instruction);
                break;
            case INSTRUCTION.POP:
                asm += this._translatePop(instruction);
                break;
            case INSTRUCTION.AL:
                asm += this._translateAL(instruction);
                break;
        }

        return asm;
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
                return this._pushSegment(SEGMENTS.TEMP, value);
        }
    }

    _advanceSP = () => {
        return breakLines`@SP A=M M=D @SP M=M+1`;
    };

    _pushConstant(value) {
        return breakLines`@${value} D=A ${this._advanceSP()}`;
    }

    _pushSegment(segment, value) {
        return breakLines`@${segment} D=M @${value} A=D+A D=M ${this._advanceSP()}`;
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
                return this._popSegment(SEGMENTS.TEMP, value);
        }
    }

    _popSegment(segment, value) {
        return breakLines`@${segment} D=M @${value} D=D+A @R13 M=D @SP AM=M-1 D=M @R13 A=M M=D`;
    }

    _translateAL(instruction) {
        switch (instruction) {
            case "add":
                return this._translateAdd();
            case "sub":
                return this._translateSub();
        }
    }

    _getLastTwoStackValues = () => {
        return breakLines`@SP AM=M-1 D=M A=A-1`;
    };

    _translateAdd() {
        return breakLines`${this._getLastTwoStackValues()} M=M+D`;
    }

    _translateSub() {
        return breakLines`${this._getLastTwoStackValues()} M=M-D`;
    }
}

module.exports = VMtranslator;
