/* 
Parsing process
    1. start reading file with the first token
    2. run compile_class
    3. first token should be "class keyword"
*/

function createOpenXmlTag(tag) {
    return `<${tag}>`;
}

function createCloseXmlTag(tag) {
    return `</${tag}>`;
}

function createXmlTag(tag, value) {
    return `${createOpenXmlTag(tag)}${value}${createCloseXmlTag(tag)}` + "\n";
}

class Parser {
    constructor(tokenizer) {
        this.tokenizer = tokenizer;

        return this;
    }

    eat(type = null, token = null) {
        const { currentToken, next } = this.tokenizer;

        if (
            (token != null && currentToken.value != token) ||
            (type != null && currentToken.type != type)
        )
            throw new Error("Unexpected token: " + currentToken);

        this.result += createXmlTag({
            tag: currentToken.type,
            content: currentToken.value,
        });

        next();
    }

    tryEat(type, token) {
        const { currentToken } = this.tokenizer;
        if (currentToken.value != token || currentToken.type != type)
            return false;

        this.eat();
        return true;
    }

    eatType() {
        const { currentToken } = this.tokenizer;
        const allowedTypes = ["int", "char", "boolean", "void"];

        if (
            this.isAtToken(...allowedTypes) ||
            currentToken.type === "identifier"
        )
            this.eat();
        else
            throw new Error("Value type was expected, but got: ", currentToken);
    }

    isAtToken(...tokens) {
        const { currentToken } = this.tokenizer;

        if (tokens.includes(currentToken.value)) return true;
        else return false;
    }

    compile() {
        this.compileClass();
        return this.result;
    }

    compileClass() {
        try {
            createOpenXmlTag("class");
            this.eat("keyword", "class");
            this.eat("identifier");
            this.eat("symbol", "{");
            this.compileClassVarDec();
            this.compileSubroutineDec();
            this.eat("symbol", "}");
            createCloseXmlTag("class");
        } catch (e) {
            throw Error("Error in «compile class»: " + e);
        }
    }

    compileClassVarDec() {
        while (this.isAtToken("static", "field")) {
            createOpenXmlTag("classVarDec");
            this.eat("keyword"); // this should be "static" or "field"
            this.eatType();
            this.eat("identifier");

            let hasMore = true;
            while (hasMore) {
                this.eat("identifier");
                hasMore = this.tryEat("symbol", ",");
            }

            this.eat("symbol", ";");
            createCloseXmlTag("classVarDec");
        }
    }

    compileSubroutineDec() {
        createOpenXmlTag("subroutineDec");
        // …
        createCloseXmlTag("subroutineDec");
    }
}

module.exports = Parser;
