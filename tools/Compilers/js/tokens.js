/* eslint-disable no-useless-escape */

class Tokenizer {
    iterator = 0;

    constructor(jackSourceCode) {
        const tokens = this._tokenize(jackSourceCode);

        this.tokens = tokens;
        this.currentToken = tokens[this.iterator];

        return this;
    }

    next() {
        this.iterator++;
        this.currentToken = this.tokens[this.iterator];
    }

    _tokenize(jackSourceCode) {
        const keywords =
                "(?<keyword>class|constructor|function|method|field|static|var|int|char|boolean|void|true|false|null|this|let|do|if|else|while|return)",
            symbols = "(?<symbol>[{}()\\[\\]\\.;,&\\+\\-\\*\\/|<>=~])",
            identifiers = "(?<identifier>\\w+)",
            integers = "(?<integerConstant>\\d+)",
            strings = '(?:\\"(?<stringConstant>[^\\"]*?)\\")',
            comment = "(?<comment>(?://).*?\\n|/\\*.*?\\*/)",
            whitespace = "(?<whitespace>\\s+)",
            unknown = "(?<unknown>.)",
            pattern = `${comment}|${whitespace}|${keywords}|${symbols}|${integers}|${strings}|${identifiers}|${unknown}`,
            regex = new RegExp(pattern, "gys");

        const matches = jackSourceCode.matchAll(regex);

        const tokens = Array.from(matches).map((match) => {
            const { groups } = match;

            const keys = Object.keys(groups);

            const tokenType = keys.find((key) => Boolean(groups[key]));

            const token = {
                type: tokenType,
                value: groups[tokenType],
                position: match.index,
            };

            if (token.type === "unknown")
                throw new Error("Unknown token:", token);

            return token;
        });

        const noWhitespaceOrComments = (tkn) =>
            tkn.type != "whitespace" && tkn.type != "comment";

        return tokens.filter(noWhitespaceOrComments);
    }
}

module.exports = Tokenizer;
