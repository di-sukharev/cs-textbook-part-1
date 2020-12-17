const { breakLines } = require("../tools");

// todo: maybe BRANCHING_TYPE rename? and rename other contants?
const BRANCHING_OPS = {
    label: "label",
    goto: "goto",
    ifgoto: "if-goto",
};

class Brancher {
    constructor() {
        return this;
    }

    translate(instruction) {
        const [operation, value] = instruction.split(" ");

        switch (operation) {
            case BRANCHING_OPS.label:
                return this._translateLabel(value);
            case BRANCHING_OPS.goto:
                return this._translateGoto(value);
            case BRANCHING_OPS.ifgoto:
                return this._translateIf(value);
        }
    }

    _translateLabel(label) {
        return breakLines`(${label})`;
    }

    _translateGoto(label) {
        return breakLines`@${label} 0;JMP`;
    }

    _translateIf(label) {
        return breakLines`@SP AM=M-1 D=M @${label} D;JNE`;
    }
}

module.exports = { BRANCHING_OPS, Brancher };
