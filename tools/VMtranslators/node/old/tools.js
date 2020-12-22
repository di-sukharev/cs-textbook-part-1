const breakLines = (strings, ...placeholders) => {
    let withoutLinebreaks = strings.reduce(
        (lines, line, i) => lines + placeholders[i - 1] + line
    );

    let withLinebreaks = withoutLinebreaks.replace(/\s+/gm, "\n");

    return withLinebreaks;
};

module.exports = {
    breakLines,
};
