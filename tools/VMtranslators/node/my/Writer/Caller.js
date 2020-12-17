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
        // LCL = SP; fix SP being off by one
        const fixSP = () => breakLines`@SP MD=M+1 @LCL M=D`;

        // arg_shift = num_args + 4, num_args=1
        const shiftArg = () => breakLines`@${args + 4} D=A @SP D=M-D @ARG M=D`;

        // save segments on stack
        const pushSegments = () =>
            ["LCL", "ARG", "THIS", "THAT"].reduce(
                (res, seg) => (res += breakLines`@${seg} D=A @SP A=M M=D`)
            );

        const pushRIP = () =>
            breakLines`@Main.fibonacci$genlabel$4 D=A @SP A=M M=D`;

        // goto callee, set up a return label
        const gotoCallee = () =>
            breakLines`@Main.fibonacci 0;JMP (Main.fibonacci$genlabel$4)`;

        return breakLines`${pushRIP()} ${pushSegments()} ${shiftArg()} ${fixSP()} ${gotoCallee()}`;
    }

    _translateFunction(name, localVars) {
        return `(${name})`;
    }

    _translateReturn(value) {}
}

module.exports = { CALLER_OPS, Caller };
