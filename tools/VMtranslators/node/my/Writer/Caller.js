const { breakLines } = require("../tools");

// todo: maybe CALLER_OPS_TYPE rename? and rename other contants?
const CALLER_OPS = {
    call: "call",
    function: "function",
    return: "return",
};

class Caller {
    constructor() {
        return this;
    }

    translate(instruction) {
        const [operation, value, rest] = instruction.split(" ");

        switch (operation) {
            case CALLER_OPS.call:
                return this._translateCall(value, rest);
            case CALLER_OPS.function:
                return this._translateFunction(value, rest);
            case CALLER_OPS.return:
                return this._translateReturn(value);
        }
    }

    _translateCall(name, args) {
        // save return address to SP
        const pushRIP = () =>
            breakLines`@Main.fibonacci$genlabel$4 D=A @SP A=M M=D`;

        // save segments on stack
        const pushSegments = () =>
            ["LCL", "ARG", "THIS", "THAT"].reduce(
                (res, seg) => (res += breakLines`@${seg} D=A @SP A=M M=D`)
            );

        // arg_shift = num_args + 4, num_args=1
        const shiftArg = () => breakLines`@${args + 4} D=A @SP D=M-D @ARG M=D`;

        // LCL = SP; adjust LCL with SP
        const adjustLCLtoSP = () => breakLines`@SP MD=M+1 @LCL M=D`;

        // goto callee, set up a return label
        const gotoCallee = () => breakLines`@Main.fibonacci 0;JMP`;

        // create the return label
        const createRIPlabel = () => breakLines`(Main.fibonacci$genlabel$4)`;

        return breakLines`${pushRIP()} ${pushSegments()} ${shiftArg()} ${adjustLCLtoSP()} ${gotoCallee()} ${createRIPlabel()}`;
    }

    _translateFunction(name, localVars) {
        return `(${name})`;
    }

    _translateReturn(value) {
        // return to the caller the value computed by the callee
        // recycle the memory resources
        // Reinstate the caller's state and memory segments
        // Jump to the return address in the callers code
    }
}

module.exports = { CALLER_OPS, Caller };
