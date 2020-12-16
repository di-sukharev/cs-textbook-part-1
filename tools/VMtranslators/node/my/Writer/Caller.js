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
        const [operation, value] = instruction.split(" ");

        switch (operation) {
            case CALLER_OPS.call:
                return console.log(value);
            case CALLER_OPS.function:
                return console.log(value);
            case CALLER_OPS.return:
                return console.log(value);
        }
    }
}

module.exports = { CALLER_OPS, Caller };
