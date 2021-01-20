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

    eat(type, token = null) {
        const { currentToken, next } = this.tokenizer;

        if (
            (token != null && currentToken.value != token) ||
            currentToken.type != type
        ) {
            throw Error("Unexpected token: " + currentToken);
        } else {
            this.result += createXmlTag({
                tag: currentToken.type,
                content: currentToken.value,
            });
            next();
        }

        return currentToken.value;
    }

    isAtToken(...kws) {
        const { currentToken } = this.tokenizer;

        if (kws.includes(currentToken.value)) return true;
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
            this.eat("identifier"); // className
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
            this.eat("keyword"); // this should be "static" or "field"

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
