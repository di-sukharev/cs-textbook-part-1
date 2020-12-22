const {
    breakLines,
    getTHISorTHAT,
    getTempAddress,
    getStaticAddress,
} = require("./tools");

const CONSTANTS = {
    TEMP_SEG: "R5",
};

class Writer {
    constructor() {}

    pop(segment, value) {
        const _moveDtoSP = "@R13 M=D @SP AM=M-1 D=M @R13 A=M M=D";

        const popSegment = (seg, val) =>
            breakLines`@${seg} D=M @${val} D=D+A ${_moveDtoSP}`;

        const popPointer = (seg) => breakLines`@${seg} D=A ${_moveDtoSP}`;
        const popStatic = (val) => breakLines`@${val} D=A ${_moveDtoSP}`;

        switch (segment) {
            case "argument":
            case "local":
            case "this":
            case "that":
                return popSegment(segment, value);
            case "temp":
                return popSegment(CONSTANTS.TEMP_SEG, getTempAddress(value));
            case "pointer":
                return popPointer(getTHISorTHAT(value));
            case "static":
                return popStatic(getStaticAddress(value));
        }
    }

    push(segment, value) {
        const _advanceSP = "@SP A=M M=D @SP M=M+1";

        const pushConstant = (val) => breakLines`@${val} D=A ${_advanceSP}`;
        const pushSegment = (seg, val) =>
            breakLines`@${seg} D=M @${val} A=D+A D=M ${_advanceSP}`;

        const pushPointer = (seg) => breakLines`@${seg} D=M ${_advanceSP}`;
        const pushStatic = (val) => breakLines`@${val} D=M ${_advanceSP}`;

        switch (segment) {
            case "constant":
                return pushConstant(value);
            case "argument":
            case "local":
            case "this":
            case "that":
                return pushSegment(segment, value);
            case "temp":
                return pushSegment(CONSTANTS.TEMP_SEG, getTempAddress(value));
            case "pointer":
                return pushPointer(getTHISorTHAT(value));
            case "static":
                return pushStatic(getStaticAddress(value));
        }
    }

    add() {}
    sub() {}
    eq() {}
    lt() {}
    gt() {}
    neg() {}
    not() {}
    or() {}
    and() {}

    label() {}
    goto() {}
    "if-goto"() {}

    call() {}
    function() {}
    return() {}
}

module.exports = Writer;
