/* eslint-disable no-useless-escape */

class Tokenizer {
    constructor(jackSourceCode) {
        this.tokens = this._tokenize(jackSourceCode);

        return this;
    }

    _tokenize(jackSourceCode) {
        const comment = "(?<comment>(?://).*?\\n|/\\*.*?\\*/)",
            whitespace = "(?<whitespace>\\s+)",
            keywords =
                "(?<keyword>class|constructor|function|method|field|static|var|int|char|boolean|void|true|false|null|this|let|do|if|else|while|return)",
            symbols = "(?<symbol>[{}()\\[\\]\\.;,&\\+\\-\\*\\/|<>=~])",
            integers = "(?<integer>\\d+)",
            identifiers = "(?<identifier>\\w+)",
            strings = '(?:\\"(?<stringConstant>[^\\"]*?)\\")',
            unknown = "(?<unknown>.)",
            pattern = `${comment}|${whitespace}|${keywords}|${symbols}|${integers}|${identifiers}|${strings}|${unknown}`,
            regex = new RegExp(pattern, "syg");

        const matches = jackSourceCode.matchAll(regex);

        // Array.from(tokens).forEach((t) => console.log(t.groups));
        const tokens = Array.from(matches).map((match) => {
            const { groups } = match;
            const keys = Object.keys(groups);

            const tokenType = keys.find((key) => Boolean(groups[key]));

            return { type: tokenType, value: groups[tokenType] };
        });

        console.log(tokens);
    }
}

module.exports = Tokenizer;
