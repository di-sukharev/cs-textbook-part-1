const SEGMENTS = {
    argument: "ARG",
    local: "LCL",
    this: "THIS",
    that: "THAT",
};

const advanceSP = "@SP M=M+1 A=M-1 M=D";
const SPtoD = "@SP AM=M-1 D=M";
const goBack = "A=A-1";
const SPtoDandGoBack = `${SPtoD} ${goBack}`;

const INSTRUCTIONS = {
    advanceSP,
    SPtoD,
    goBack,
    SPtoDandGoBack,
};

module.exports = {
    SEGMENTS,
    INSTRUCTIONS,
};
