module.exports = {
    INSTRUCTION_TYPE: {
        POP: "pop",
        PUSH: "push",
        AL: "arithmetic-logical",
        GOTO: "goto",
        CALL: "function-calling",
    },

    SEGMENTS: {
        constant: "constant",
        argument: "argument",
        local: "local",
        pointer: "pointer",
        that: "that",
        this: "this",
        temp: "temp",
        static: "static",
        ARG: "ARG",
        LCL: "LCL",
        THAT: "THAT",
        THIS: "THIS",
        TEMP: "R5",
    },
};
