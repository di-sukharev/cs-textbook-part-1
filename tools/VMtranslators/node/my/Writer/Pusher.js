const { SEGMENTS } = require("../constants");
const { breakLines } = require("../tools");

class Pusher {
    constructor() {
        return this;
    }

    translate(instruction) {
        const [push, segment, value] = instruction.split(" ");

        switch (segment) {
            case SEGMENTS.constant:
                return this._pushConstant(value);
            case SEGMENTS.argument:
                return this._pushSegment(SEGMENTS.ARG, value);
            case SEGMENTS.local:
                return this._pushSegment(SEGMENTS.LCL, value);
            case SEGMENTS.that:
                return this._pushSegment(SEGMENTS.THAT, value);
            case SEGMENTS.this:
                return this._pushSegment(SEGMENTS.THIS, value);
            case SEGMENTS.temp:
                return this._pushSegment(SEGMENTS.TEMP, +value + 5);
            case SEGMENTS.static:
                return this._pushStatic(+value + 16);
            case SEGMENTS.pointer:
                return this._pushPointer(
                    value === "0" ? SEGMENTS.THIS : SEGMENTS.THAT
                );
        }
    }

    _advanceSP = breakLines`@SP A=M M=D @SP M=M+1`;

    _pushConstant(value) {
        return breakLines`@${value} D=A ${this._advanceSP}`;
    }

    _pushSegment(segment, value) {
        return breakLines`@${segment} D=M @${value} A=D+A D=M ${this._advanceSP}`;
    }

    _pushPointer(segment) {
        return breakLines`@${segment} D=M ${this._advanceSP}`;
    }

    _pushStatic(value) {
        return breakLines`@${value} D=M ${this._advanceSP}`;
    }
}

module.exports = Pusher;
