const SEGMENTS = {
    argument: "ARG",
    local: "LCL",
    this: "THIS",
    that: "THAT",
};

const INSTRUCTIONS = {
    advanceSP: "@SP M=M+1 A=M-1 M=D",
    SPtoD: "@SP AM=M-1 D=M",
    goBack: "A=A-1",
    SPtoDandGoBack: `${INSTRUCTIONS.SPtoD} ${INSTRUCTIONS.goBack}`,
};

module.exports = {
    SEGMENTS,
    INSTRUCTIONS,
};
