const { SEGMENTS } = require("../constants.js");
const { breakLines } = require("../tools.js");

class Popper {
    constructor() {
        return this;
    }

    translate(instruction) {
        // eslint-disable-next-line no-unused-vars
        const [pop, segment, value] = instruction.split(" ");

        switch (segment) {
            case SEGMENTS.argument:
                return this._popSegment(SEGMENTS.ARG, value);
            case SEGMENTS.local:
                return this._popSegment(SEGMENTS.LCL, value);
            case SEGMENTS.that:
                return this._popSegment(SEGMENTS.THAT, value);
            case SEGMENTS.this:
                return this._popSegment(SEGMENTS.THIS, value);
            case SEGMENTS.temp:
                return this._popSegment(SEGMENTS.TEMP, +value + 5);
            case SEGMENTS.static:
                return this._popStatic(+value + 16);
            case SEGMENTS.pointer:
                return this._popPointer(
                    value === "0" ? SEGMENTS.THIS : SEGMENTS.THAT
                );
        }
    }

    _moveDtoSP = breakLines`@R13 M=D @SP AM=M-1 D=M @R13 A=M M=D`;

    _popSegment(segment, value) {
        return breakLines`@${segment} D=M @${value} D=D+A ${this._moveDtoSP}`;
    }

    _popPointer(segment) {
        return breakLines`@${segment} D=A ${this._moveDtoSP}`;
    }

    _popStatic(value) {
        return breakLines`@${value} D=A ${this._moveDtoSP}`;
    }
}

module.exports = Popper;
