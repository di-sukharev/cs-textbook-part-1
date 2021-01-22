const breakLines = (strings, ...placeholders) => {
    let withoutLinebreaks = strings.reduce(
        (lines, line, i) => lines + placeholders[i - 1] + line
    );

    let withLinebreaks = withoutLinebreaks.replace(/\s+/gm, "\n");

    return withLinebreaks;
};

const getTHISorTHAT = (value) => (value === "0" ? "THIS" : "THAT");

const getTempAddress = (addr) => +addr + 5;

const increment = () => {
    let i = 1;

    const counter = () => i++;

    return counter;
};

module.exports = {
    breakLines,
    getTHISorTHAT,
    getTempAddress,
    increment,
};
