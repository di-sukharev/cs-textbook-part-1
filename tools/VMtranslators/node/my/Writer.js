const { breakLines, getTHISorTHAT, getTempAddress } = require("./tools");

const SEGMENTS = {
    argument: "ARG",
    local: "LCL",
    this: "THIS",
    that: "THAT",
};

class Writer {
    constructor() {
        return this;
    }

    // todo: move somewhere, rewrite using callback
    _i = 0;
    _getI = () => {
        return this._i++;
    };

    // todo: move this _genLabel somewhere
    currentFile = "noFile";
    currentFunction = "noFunction";
    _getFileAndFunction = () => `${this.currentFile}.${this.currentFunction}`;
    _genLabel(label) {
        return `$${this._getFileAndFunction()}$${label}`;
    }

    _advanceSP = "@SP M=M+1 A=M-1 M=D";

    // todo: move this instructions somewhere to tools or else?
    _SPtoD = "@SP AM=M-1 D=M";
    _goBack = "A=A-1";
    _SPtoDandGoBack = `${this._SPtoD} ${this._goBack}`;

    init() {
        const initSP = `@256 D=A @SP M=D`;
        const SysInit = this.call("Sys.init", 0);
        const endlessLoop = "(endlessloop) @endlessloop 0;JMP";
        return breakLines`//initialization-start ${initSP} ${SysInit} ${endlessLoop} //initialization-end`;
    }

    pop(segment, value) {
        const _moveDtoSP = `@R13 M=D ${this._SPtoD} @R13 A=M M=D`;

        const popSegment = (seg, val) =>
            breakLines`@${seg} D=M @${val} D=D+A ${_moveDtoSP}`;
        const popTemp = (val) => breakLines`@${val} D=A ${_moveDtoSP}`;

        const popPointer = (seg) => breakLines`@${seg} D=A ${_moveDtoSP}`;
        const popStatic = (val) =>
            breakLines`@${this.currentFile}.${val} D=A ${_moveDtoSP}`;

        switch (segment) {
            case "argument":
            case "local":
            case "this":
            case "that":
                return popSegment(SEGMENTS[segment], value);
            case "temp":
                return popTemp(getTempAddress(value));
            case "pointer":
                return popPointer(getTHISorTHAT(value));
            case "static":
                return popStatic(value);
        }
    }

    push(segment, value) {
        const pushConstant = (val) =>
            breakLines`@${val} D=A ${this._advanceSP}`;
        const pushSegment = (seg, val) =>
            breakLines`@${seg} D=M @${val} A=D+A D=M ${this._advanceSP}`;
        const pushTemp = (val) =>
            breakLines`@${val} A=A D=M ${this._advanceSP}`;

        const pushPointer = (seg) => breakLines`@${seg} D=M ${this._advanceSP}`;
        const pushStatic = (val) =>
            breakLines`@${this.currentFile}.${val} D=M ${this._advanceSP}`;

        switch (segment) {
            case "constant":
                return pushConstant(value);
            case "argument":
            case "local":
            case "this":
            case "that":
                return pushSegment(SEGMENTS[segment], value);
            case "temp":
                return pushTemp(getTempAddress(value));
            case "pointer":
                return pushPointer(getTHISorTHAT(value));
            case "static":
                return pushStatic(value);
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
        return breakLines`${this._SPtoDandGoBack} M=D|M`;
    }
    and() {
        return breakLines`${this._SPtoDandGoBack} M=D&M`;
    }

    label(label) {
        return breakLines`(${this._genLabel(label)})`;
    }
    goto(label) {
        return breakLines`@${this._genLabel(label)} 0;JMP`;
    }
    "if-goto"(label) {
        return breakLines`@SP AM=M-1 D=M @${this._genLabel(label)} D;JNE`;
    }

    call(funcName, argsCount) {
        const segments = ["LCL", "ARG", "THIS", "THAT"];

        const RIP = `${this._getFileAndFunction()}$return.${this._getI()}`;
        // save return address to SP
        const pushRIP = breakLines`@${RIP} D=A @SP A=M M=D`;

        // save segments on stack
        const pushSegments = segments.reduce(
            (res, seg) => breakLines`${res} @${seg} D=M @SP AM=M+1 M=D`,
            ""
        );

        // arg_shift = argsCount + segments.length, segments.length = 4
        const argShift = +argsCount + segments.length;
        const shiftArg = breakLines`@${argShift} D=A @SP D=M-D @ARG M=D`;

        // LCL = SP; adjust LCL with SP
        const adjustLCLtoSP = breakLines`@SP MD=M+1 @LCL M=D`;

        // goto callee, set up a return label
        const gotoCallee = breakLines`@${funcName} 0;JMP`;

        // create the return label
        const createRIPlabel = breakLines`(${RIP})`;

        return breakLines`${pushRIP} ${pushSegments} ${shiftArg} ${adjustLCLtoSP} ${gotoCallee} ${createRIPlabel}`;
    }

    function(name, localVars) {
        const repeated = "A=A-1 M=0 ".repeat(localVars).trim();

        const generatedLCLvars =
            localVars > 0 ? ` @${localVars} D=A @SP AM=D+M ${repeated}` : "";

        const [fileName, functionName] = name.split(".");

        this.currentFunction = functionName;
        this.currentFile = fileName;

        return breakLines`(${name})${generatedLCLvars}`;
    }

    return() {
        // return to the caller the value computed by the callee: place the return value on args[0]
        // recycle the memory resources by moving SP to ARG[1], just after the return value
        // Reinstate the caller's state and memory segments: ARG LCL THIS THAT
        // Jump to the return address in the callers code
        const gotoReturnAddress = "@returnAddress A=M 0;JMP";

        // save return address in @returnAddress
        const getReturnAddress = "@5 D=A @LCL A=M-D D=M @returnAddress M=D";

        // move return value on caller stack, reset SP
        const getReturnValue = "@SP A=M-1 D=M @ARG A=M M=D D=A+1 @SP M=D";

        const restoreSegment = "M=D @R13 AM=M-1 D=M";
        // pop contexts of previous function
        const restoreContext = breakLines`@LCL D=M @R13 AM=D-1 D=M @THAT ${restoreSegment} @THIS ${restoreSegment} @ARG ${restoreSegment} @LCL M=D`;

        return breakLines`${getReturnAddress} ${getReturnValue} ${restoreContext} ${gotoReturnAddress}`;
    }
}

module.exports = Writer;
