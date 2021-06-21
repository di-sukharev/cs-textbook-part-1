const breakLines = (strings, ...placeholders) => {
    let withoutLinebreaks = strings.reduce(
        (lines, line, i) => lines + placeholders[i - 1] + line
    );

    let withLinebreaks = withoutLinebreaks.replace(/\s+/gm, "\n");

    return withLinebreaks;
};

const counter = () => {
    let i = 1;

    const inc = () => i++;

    return inc;
};

module.exports = {
    breakLines,
    counter,
};
