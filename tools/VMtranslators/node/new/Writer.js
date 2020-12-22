const {
    breakLines,
    getTHISorTHAT,
    getTempAddress,
    getStaticAddress,
} = require("./tools");

const CONSTANTS = {
    TEMP_SEG: "R5",
};

class Writer {
    constructor() {
        return this;
    }

    // todo: move somewhere, rewrite using callback
    _i = 0;
    _getI = () => {
        return this.i++;
    };

    // todo: move this _genLabel somewhere
    currentFunction = "noFunction";
    _genLabel(label) {
        return `${this.fileName}.${this.currentFunction}$${label}`;
    }

    _advanceSP = "@SP A=M M=D @SP M=M+1";

    // todo: move this instructions somewhere to tools or else?
    _SPtoD = "@SP AM=M-1 D=M";
    _goBack = "A=A-1";
    _SPtoDandGoBack = `${this._SPtoD} ${this._goBack}`;

    pop(segment, value) {
        const _moveDtoSP = `@R13 M=D ${this._SPtoD} @R13 A=M M=D`;

        const popSegment = (seg, val) =>
            breakLines`@${seg} D=M @${val} D=D+A ${_moveDtoSP}`;

        const popPointer = (seg) => breakLines`@${seg} D=A ${_moveDtoSP}`;
        const popStatic = (val) => breakLines`@${val} D=A ${_moveDtoSP}`;

        switch (segment) {
            case "argument":
            case "local":
            case "this":
            case "that":
                return popSegment(segment, value);
            case "temp":
                return popSegment(CONSTANTS.TEMP_SEG, getTempAddress(value));
            case "pointer":
                return popPointer(getTHISorTHAT(value));
            case "static":
                return popStatic(getStaticAddress(value));
        }
    }

    push(segment, value) {
        const pushConstant = (val) =>
            breakLines`@${val} D=A ${this._advanceSP}`;
        const pushSegment = (seg, val) =>
            breakLines`@${seg} D=M @${val} A=D+A D=M ${this._advanceSP}`;

        const pushPointer = (seg) => breakLines`@${seg} D=M ${this._advanceSP}`;
        const pushStatic = (val) => breakLines`@${val} D=M ${this._advanceSP}`;

        switch (segment) {
            case "constant":
                return pushConstant(value);
            case "argument":
            case "local":
            case "this":
            case "that":
                return pushSegment(segment, value);
            case "temp":
                return pushSegment(CONSTANTS.TEMP_SEG, getTempAddress(value));
            case "pointer":
                return pushPointer(getTHISorTHAT(value));
            case "static":
                return pushStatic(getStaticAddress(value));
        }
    }

    add() {
        return breakLines`${this._SPtoDandGoBack} M=M+D`;
    }
    sub() {
        return breakLines`${this._SPtoDandGoBack} M=M-D`;
    }

    _translateJump(jmp) {
        const continueLabel = `${this._genLabel("CONTINUE")}.${this._getI()}`;

        const instruction = breakLines`${this._SPtoDandGoBack} D=M-D M=-1 @${continueLabel} D;${jmp} @SP A=M-1 M=0 (${continueLabel})`;

        return instruction;
    }
    eq() {
        return this._translateJump("JEQ");
    }
    lt() {
        return this._translateJump("JLT");
    }
    gt() {
        return this._translateJump("JGT");
    }
    neg() {
        return breakLines`D=0 @SP A=M-1 M=D-M`;
    }
    not() {
        return breakLines`@SP A=M-1 M=!M`;
    }
    or() {
        return breakLines`${this._SPtoD} M=D|M`;
    }
    and() {
        return breakLines`${this._SPtoD} M=D&M`;
    }

    label() {}
    goto() {}
    "if-goto"() {}

    call() {}
    function(funcName, localVars) {
        const repeated = "A=A-1 M=0 ".repeat(localVars).trim();

        const generatedLCLvars =
            localVars > 0 ? ` @${localVars} D=A @SP AM=D+M ${repeated}` : "";

        this.currentFunction = funcName;

        return breakLines`(${funcName})${generatedLCLvars}`;
    }
    return() {}
}

module.exports = Writer;
