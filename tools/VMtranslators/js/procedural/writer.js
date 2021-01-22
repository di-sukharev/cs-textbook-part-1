const {
    breakLines: br,
    getTHISorTHAT,
    getTempAddress,
    increment,
} = require("./tools");

const SEGMENTS = {
    argument: "ARG",
    local: "LCL",
    this: "THIS",
    that: "THAT",
};

// todo: move this _genLabel somewhere
let currentFile = "noFile";
let currentFunction = "noFunction";
const _getFileAndFunction = () => `${currentFile}.${currentFunction}`;
const _genLabel = (label) => `$${_getFileAndFunction()}$${label}`;
// ---

// todo: move this instructions somewhere to tools or else?
const _advanceSP = "@SP M=M+1 A=M-1 M=D";
const _SPtoD = "@SP AM=M-1 D=M";
const _goBack = "A=A-1";
const _SPtoDandGoBack = `${_SPtoD} ${_goBack}`;
// ---

const writer = {
    init: () => {
        const initSP = `@256 D=A @SP M=D`;
        const SysInit = writer.call("Sys.init", 0);
        const endlessLoop = "(endlessloop) @endlessloop 0;JMP";
        return br`//initialization-start ${initSP} ${SysInit} ${endlessLoop} //initialization-end`;
    },

    pop: (segment, value) => {
        const _moveDtoSP = `@R13 M=D ${_SPtoD} @R13 A=M M=D`;

        const popSegment = (seg, val) =>
            br`@${seg} D=M @${val} D=D+A ${_moveDtoSP}`;
        const popTemp = (val) => br`@${val} D=A ${_moveDtoSP}`;

        const popPointer = (seg) => br`@${seg} D=A ${_moveDtoSP}`;
        const popStatic = (val) => br`@${currentFile}.${val} D=A ${_moveDtoSP}`;

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
    },

    push: (segment, value) => {
        const pushConstant = (val) => br`@${val} D=A ${_advanceSP}`;
        const pushSegment = (seg, val) =>
            br`@${seg} D=M @${val} A=D+A D=M ${_advanceSP}`;
        const pushTemp = (val) => br`@${val} A=A D=M ${_advanceSP}`;

        const pushPointer = (seg) => br`@${seg} D=M ${_advanceSP}`;
        const pushStatic = (val) =>
            br`@${currentFile}.${val} D=M ${_advanceSP}`;

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
    },

    add: () => br`${_SPtoDandGoBack} M=M+D`,
    sub: () => br`${_SPtoDandGoBack} M=M-D`,

    _translateJump: (jmp) => {
        const continueLabel = `${_genLabel("CONTINUE")}.${increment()}`;

        const instruction = br`${_SPtoDandGoBack} D=M-D M=-1 @${continueLabel} D;${jmp} @SP A=M-1 M=0 (${continueLabel})`;

        return instruction;
    },
    eq: () => writer._translateJump("JEQ"),
    lt: () => writer._translateJump("JLT"),
    gt: () => writer._translateJump("JGT"),
    neg: () => br`D=0 @SP A=M-1 M=D-M`,
    not: () => br`@SP A=M-1 M=!M`,
    or: () => br`${_SPtoDandGoBack} M=D|M`,
    and: () => br`${_SPtoDandGoBack} M=D&M`,

    label: (label) => br`(${_genLabel(label)})`,
    goto: (label) => br`@${_genLabel(label)} 0;JMP`,
    "if-goto": (label) => br`@SP AM=M-1 D=M @${_genLabel(label)} D;JNE`,

    call: (funcName, argsCount) => {
        const segments = ["LCL", "ARG", "THIS", "THAT"];

        const RIP = `${_getFileAndFunction()}$return.${increment()}`;
        // save return address to SP
        const pushRIP = br`@${RIP} D=A @SP A=M M=D`;

        // save segments on stack
        const pushSegments = segments.reduce(
            (res, seg) => br`${res} @${seg} D=M @SP AM=M+1 M=D`,
            ""
        );

        // arg_shift = argsCount + segments.length, segments.length = 4
        const argShift = +argsCount + segments.length;
        const shiftArg = br`@${argShift} D=A @SP D=M-D @ARG M=D`;

        // LCL = SP; adjust LCL with SP
        const adjustLCLtoSP = br`@SP MD=M+1 @LCL M=D`;

        // goto callee, set up a return label
        const gotoCallee = br`@${funcName} 0;JMP`;

        // create the return label
        const createRIPlabel = br`(${RIP})`;

        return br`${pushRIP} ${pushSegments} ${shiftArg} ${adjustLCLtoSP} ${gotoCallee} ${createRIPlabel}`;
    },

    function: (name, localVars) => {
        const repeated = "A=A-1 M=0 ".repeat(localVars).trim();

        const generatedLCLvars =
            localVars > 0 ? ` @${localVars} D=A @SP AM=D+M ${repeated}` : "";

        const [fileName, functionName] = name.split(".");

        currentFunction = functionName;
        currentFile = fileName;

        return br`(${name})${generatedLCLvars}`;
    },

    return: () => {
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
        const restoreContext = br`@LCL D=M @R13 AM=D-1 D=M @THAT ${restoreSegment} @THIS ${restoreSegment} @ARG ${restoreSegment} @LCL M=D`;

        return br`${getReturnAddress} ${getReturnValue} ${restoreContext} ${gotoReturnAddress}`;
    },
};

module.exports = writer;
