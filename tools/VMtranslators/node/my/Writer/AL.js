const { breakLines } = require("../tools");

class AL {
    constructor() {
        return this;
    }

    translate(instruction) {
        switch (instruction) {
            case "add":
                return this._translateADD();
            case "sub":
                return this._translateSUB();
            case "eq":
                return this._translateJump("JNE");
            case "lt":
                return this._translateJump("JGE");
            case "gt":
                return this._translateJump("JLE");
            case "neg":
                return this._translateNEG();
            case "not":
                return this._translateNOT();
            case "or":
                return this._translateOR();
            case "and":
                return this._translateAND();
        }
    }

    _SPtoMD = breakLines`@SP AM=M-1 D=M A=A-1`;

    _translateADD() {
        return breakLines`${this._SPtoMD} M=M+D`;
    }

    _translateSUB() {
        return breakLines`${this._SPtoMD} M=M-D`;
    }

    _jumpCounter = 0;

    _translateJump(jmp) {
        const instruction = breakLines`${this._SPtoMD} D=M-D @FALSE${this._jumpCounter} D;${jmp} @SP A=M-1 M=-1 @CONTINUE${this._jumpCounter} 0;JMP (FALSE${this._jumpCounter}) @SP A=M-1 M=0 (CONTINUE${this._jumpCounter})`;
        this._jumpCounter++;
        return instruction;
    }

    _translateNEG() {
        return breakLines`D=0 @SP A=M-1 M=D-M`;
    }

    _translateAND() {
        return breakLines`@SP AM=M-1 D=M A=A-1 M=D&M`;
    }

    _translateOR() {
        return breakLines`@SP AM=M-1 D=M A=A-1 M=D|M`;
    }

    _translateNOT() {
        return breakLines`@SP A=M-1 M=!M`;
    }
}

module.exports = AL;
