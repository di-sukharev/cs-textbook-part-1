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

    _translateLabel(value) {}

    _translateGoto(value) {}

    _translateIf(value) {}
}

module.exports = { BRANCHING_OPS, Brancher };
