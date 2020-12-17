const Pusher = require("./Pusher.js");
const Popper = require("./Popper.js");
const { Brancher } = require("./Brancher.js");
const { Caller } = require("./Caller.js");
const { AL } = require("./ArithLogic.js");
const { breakLines } = require("../tools.js");

class Writer {
    constructor() {
        this.pusher = new Pusher();
        this.popper = new Popper();
        this.AL = new AL();
        this.brancher = new Brancher();
        this.caller = new Caller();

        return this;
    }

    // todo: refactor this method into OPS.forEach(translate) or like OPS[op].translate(instruction)
    init() {
        return breakLines`@256 D=A @SP M=D`;
    }

    push(instruction) {
        return this.pusher.translate(instruction);
    }

    pop(instruction) {
        return this.popper.translate(instruction);
    }

    arithLogic(instruction) {
        return this.AL.translate(instruction);
    }

    branching(instruction) {
        return this.brancher.translate(instruction);
    }

    call(instruction) {
        return this.caller.translate(instruction);
    }
}

module.exports = Writer;
