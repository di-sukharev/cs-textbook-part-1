/* eslint-disable no-useless-escape */

class Tokenizer {
    constructor(jackSourceCode) {
        const tokens = this._tokenize(jackSourceCode);

        this.iterator = 0;
        this.tokens = tokens;
        this.currentToken = tokens[this.iterator];

        return this;
    }

    next() {
        this.iterator++;
        this.token = this.tokens[this.iterator];
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
            regex = new RegExp(pattern, "gys");

        const matches = jackSourceCode.matchAll(regex);

        const tokens = Array.from(matches).map((match) => {
            const { groups } = match;

            const keys = Object.keys(groups);

            const tokenType = keys.find((key) => Boolean(groups[key]));

            // TODO: if any unknown symbol in code -> throw Error("Unknown symbol: ", symbol)

            return {
                type: tokenType,
                value: groups[tokenType],
                position: match.index,
            };
        });

        // TODO: filter comments and empty lines

        return tokens;
    }
}

module.exports = Tokenizer;
