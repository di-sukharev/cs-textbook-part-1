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
            throw new Error(
                `Unexpected token: ${currentToken}. Expected: ${type}, ${token}`
            );

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

    isAtToken(...values) {
        const { currentToken } = this.tokenizer;

        if (values.includes(currentToken.value || currentToken.type)) return true;
        else return false;
    }

    compile() {
        this.compileClass();
        return this.result;
    }

    compileClass() {
        createOpenXmlTag("class");
        this.eat("keyword", "class");
        this.eat("identifier");
        this.eat("symbol", "{");
        this.compileClassVarDec();
        this.compileSubroutineDec();
        this.eat("symbol", "}");
        createCloseXmlTag("class");
    }

    compileClassVarDec() {
        while (this.isAtToken("static", "field")) {
            createOpenXmlTag("classVarDec");
            this.eat("keyword");
            this.eatType();

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
        while (this.isAtToken("constructor", "method", "function")) {
            createOpenXmlTag("subroutineDec");
            this.eat("keyword");
            this.eatType();
            this.eat("identifier");
            this.eat("symbol", "(");
            this.compileParameterList();
            this.eat("symbol", ")");
            this.compileSubroutineBody();
            createCloseXmlTag("subroutineDec");
        }
    }

    compileParameterList() {
        createOpenXmlTag("parameterList");
        let hasMore = !this.isAtToken(")");
        while (hasMore) {
            this.eatType();
            this.eat("identifier");
            hasMore = this.tryEat("symbol", ",");
        }
        createCloseXmlTag("parameterList");
    }

    compileSubroutineBody() {
        createOpenXmlTag("subroutineBody");
        this.eat("symbol", "{");
        this.compileVarDec();
        this.compileStatements();
        this.eat("symbol", "}");
        createCloseXmlTag("subroutineBody");
    }

    compileVarDec() {
        while (this.isAtToken("var")) {
            this.eat("keyword", "var");
            this.eatType();

            let hasMore = true;
            while (hasMore) {
                this.eat("identifier");
                hasMore = this.tryEat("symbol", ",");
            }
        }
    }

    compileStatements() {
        let hasMore = true;
        while (hasMore) {
            if (this.isAtToken("let")) this.compileLet();
            else if (this.isAtToken("if")) this.compileIf();
            else if (this.isAtToken("do")) this.compileDo();
            else if (this.isAtToken("while")) this.compileWhile();
            else if (this.isAtToken("return")) this.compileReturn();
            else hasMore = false;
        }
    }

    compileLet() {
        this.eat("keyword", "let");
        this.eat("identifier");
        this.eat("symbol", "=");
        this.compileExpression();
        this.eat("symbol", ";");
    }

    compileIf() {
        this.eat("keyword", "if");
        this.eat("symbol", "(");
        this.compileExpression();
        this.eat("symbol", ")");
        this.eat("symbol", "{");
        this.compileStatements();
        this.eat("symbol", "}");

        if (this.tryEat("keyword", "else")) {
            this.eat("symbol", "{");
            this.compileStatements();
            this.eat("symbol", "}");
        }
    }

    compileDo() {
        this.eat("keyword", "do");
        this.eat("identifier");
        if (this.tryEat("symbol", ".")) this.eat("identifier");
        this.eat("symbol", "(");
        this.compileExpressionList();
        this.eat("symbol", ")");
    }

    compileWhile() {
        this.eat("keyword", "while");
        this.eat("symbol", "(");
        this.compileExpression();
        this.eat("symbol", ")");
        this.eat("symbol", "{");
        this.compileStatements();
        this.eat("symbol", "}");
    }

    compileReturn() {
        this.eat("keyword", "return");
        if (!this.tryEat("symbol", ";")) {
            this.compileExpression();
            this.eat("symbol", ";");
        }
    }

    compileExpressionList() {
        let hasMore = !this.isAtToken(")");
        while (hasMore) {
            this.compileExpression();
            hasMore = this.tryEat("symbol", ",");
        }
    }

    compileExpression() {
        let hasMore = true;
        if (hasMore) {
            this.compileTerm();
            if (this.isAtToken("+","-","*","/","&","|","<",">","=")) 
                this.eat() 
            else hasMore=false;
        }
    }

    compileTerm() {
        

    }
}

module.exports = Parser;
