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
                return console.log(value);
            case BRANCHING_OPS.goto:
                return console.log(value);
            case BRANCHING_OPS.ifgoto:
                return console.log(value);
        }
    }
}

module.exports = { BRANCHING_OPS, Brancher };
