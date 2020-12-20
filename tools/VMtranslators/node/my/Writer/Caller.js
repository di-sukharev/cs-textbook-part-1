const { breakLines } = require("../tools");

// todo: maybe CALLER_OPS_TYPE rename? and rename other contants?
const CALLER_OPS = {
    call: "call",
    function: "function",
    return: "return",
};

class Caller {
    constructor() {
        this.currentFunction = "initialization";
        this.i = 0;

        return this;
    }

    translate(instruction) {
        const [operation, value, rest] = instruction.split(" ");

        switch (operation) {
            case CALLER_OPS.function:
                return this._translateFunction(value, rest);
            case CALLER_OPS.call:
                return this._translateCall(value, rest);
            case CALLER_OPS.return:
                return this._translateReturn();
        }
    }

    _translateFunction(funcName, localVars) {
        // initialize LCL segment values
        const generatedLCLvars =
            localVars > 0
                ? ` @${localVars} D=A @SP AM=D+M ${"A=A-1 M=0 "
                      .repeat(localVars)
                      .trim()}`
                : "";

        this.currentFunction = funcName;

        return breakLines`(${funcName})${generatedLCLvars}`;
    }

    _translateCall(name, argsCount) {
        // save return address to SP
        const pushRIP = breakLines`@${this.currentFunction}$return.${this.i} D=A @SP A=M M=D`;

        // save segments on stack
        const pushSegments = ["LCL", "ARG", "THIS", "THAT"].reduce(
            (res, seg) => breakLines`${res} @${seg} D=A @SP AM=M+1 M=D`,
            ""
        );

        // arg_shift = argsCount + segments.length, segments.length = 4
        const shiftArg = breakLines`@${argsCount + 4} D=A @SP D=M-D @ARG M=D`;

        // LCL = SP; adjust LCL with SP
        const adjustLCLtoSP = breakLines`@SP MD=M+1 @LCL M=D`;

        // goto callee, set up a return label
        const gotoCallee = breakLines`@${name} 0;JMP`;

        // create the return label
        const createRIPlabel = breakLines`(${this.currentFunction}$return.${this.i})`;

        // increment i, so the next returnAddress in this function will be different from current
        this.i++;

        return breakLines`${pushRIP} ${pushSegments} ${shiftArg} ${adjustLCLtoSP} ${gotoCallee} ${createRIPlabel}`;
    }

    _translateReturn() {
        // return to the caller the value computed by the callee: place the return value on args[0]
        // recycle the memory resources by moving SP to ARG[1], just after the return value
        // Reinstate the caller's state and memory segments: ARG LCL THIS THAT
        // Jump to the return address in the callers code
        const gotoReturnAddress = `@returnAddress A=M 0;JMP`;

        // save return address in @returnAddress
        const getReturnAddress = breakLines`@5 D=A @LCL A=M-D D=M @returnAddress M=D`;

        // move return value on caller stack, reset SP
        const getReturnValue = breakLines`@SP A=M-1 D=M @ARG A=M M=D D=A+1 @SP M=D`;

        const restoreSegment = breakLines`M=D @R13 AM=M-1 D=M`;
        // pop contexts of previous function
        const restoreContext = breakLines`@LCL D=M @R13 AM=D-1 D=M @THAT ${restoreSegment} @THIS ${restoreSegment} @ARG ${restoreSegment} @LCL M=D`;

        return breakLines`${getReturnAddress} ${getReturnValue} ${restoreContext} ${gotoReturnAddress}`;
    }
}

module.exports = { CALLER_OPS, Caller };
