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

    _translateCall(name, args) {}

    _translateFunction(name, localVars) {}

    _translateReturn(value) {}
}

module.exports = { CALLER_OPS, Caller };
