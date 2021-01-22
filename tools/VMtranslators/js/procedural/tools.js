const breakLines = (strings, ...placeholders) => {
    let withoutLinebreaks = strings.reduce(
        (lines, line, i) => lines + placeholders[i - 1] + line
    );

    let withLinebreaks = withoutLinebreaks.replace(/\s+/gm, "\n");

    return withLinebreaks;
};

const getTHISorTHAT = (value) => (value === "0" ? "THIS" : "THAT");

const getTempAddress = (addr) => +addr + 5;

const counter = () => {
    let i = 1;

    const inc = () => i++;

    return inc;
};

module.exports = {
    breakLines,
    getTHISorTHAT,
    getTempAddress,
    counter,
};
