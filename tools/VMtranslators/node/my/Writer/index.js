const Pusher = require("./Pusher");
const Popper = require("./Popper");
const AL = require("./AL");

class Writer {
    constructor() {
        this.pusher = new Pusher();
        this.popper = new Popper();
        this.AL = new AL();

        return this;
    }

    push(instruction) {
        return this.pusher.translate(instruction);
    }

    pop(instruction) {
        return this.popper.translate(instruction);
    }

    al(instruction) {
        return this.AL.translate(instruction);
    }
}

module.exports = Writer;
