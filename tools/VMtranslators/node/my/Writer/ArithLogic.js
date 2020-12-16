const { breakLines } = require("../tools");

const ARITH_LOGIC_OPS = {
    add: "add",
    sub: "sub",
    eq: "eq",
    lt: "lt",
    gt: "gt",
    neg: "neg",
    not: "not",
    or: "or",
    and: "and",
};

class ArithLogic {
    constructor() {
        return this;
    }

    translate(instruction) {
        switch (instruction) {
            case ARITH_LOGIC_OPS.add:
                return this._translateADD();
            case ARITH_LOGIC_OPS.sub:
                return this._translateSUB();
            case ARITH_LOGIC_OPS.eq:
                return this._translateJump("JNE");
            case ARITH_LOGIC_OPS.lt:
                return this._translateJump("JGE");
            case ARITH_LOGIC_OPS.gt:
                return this._translateJump("JLE");
            case ARITH_LOGIC_OPS.neg:
                return this._translateNEG();
            case ARITH_LOGIC_OPS.not:
                return this._translateNOT();
            case ARITH_LOGIC_OPS.or:
                return this._translateOR();
            case ARITH_LOGIC_OPS.and:
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
        return breakLines`${this._SPtoMD} M=D&M`;
    }

    _translateOR() {
        return breakLines`${this._SPtoMD} M=D|M`;
    }

    _translateNOT() {
        return breakLines`@SP A=M-1 M=!M`;
    }
}

module.exports = { AL: ArithLogic, ARITH_LOGIC_OPS };
