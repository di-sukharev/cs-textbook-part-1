/* 
Parsing process
    1. start reading file with the first token
    2. run compile_class
    3. first token should be "class keyword"
*/

const createOpenXmlTag = (tag) => `<${tag}>`;

const createCloseXmlTag = (tag) => `</${tag}>`;

function createXmlTag({ tag, content }) {
    if (content === "<") content = "&lt;";
    if (content === ">") content = "&gt;";

    return (
        `${createOpenXmlTag(tag)} ${content} ${createCloseXmlTag(tag)}` + "\n"
    );
}

class Parser {
    xml = "";

    constructor(tokenizer) {
        this.tokenizer = tokenizer;

        return this;
    }

    openXmlTag(tag) {
        this.xml += createOpenXmlTag(tag);
    }

    closeXmlTag(tag) {
        this.xml += createCloseXmlTag(tag);
    }

    compile() {
        this.compileClass();
        return this.xml;
    }

    eat(type = null, token = null) {
        const { currentToken } = this.tokenizer;

        if (
            (type != null && currentToken.type != type) ||
            (token != null && currentToken.value != token)
        )
            throw new Error(
                `Unexpected token: ${currentToken.value}
                Type «${currentToken.type}»
                Position: «${currentToken.position}»
                Expected: «${token || ""}» of type «${type || ""}»
                XML:
                ${this.xml}`
            );

        this.xml += createXmlTag({
            tag: currentToken.type,
            content: currentToken.value,
        });

        this.tokenizer.next();
    }

    tryEat(type = null, token = null) {
        const { currentToken } = this.tokenizer;

        if (
            (type != null && currentToken.type != type) ||
            (token != null && currentToken.value != token)
        )
            return false;

        this.eat();
        return true;
    }

    isAtToken(...values) {
        const { currentToken } = this.tokenizer;

        if (
            values.includes(currentToken.type) ||
            values.includes(currentToken.value)
        )
            return true;
        else return false;
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

    isNextToken(...values) {
        const { nextToken } = this.tokenizer;

        if (values.includes(nextToken.type) || values.includes(nextToken.value))
            return true;
        else return false;
    }

    compileClass() {
        this.openXmlTag("class");

        this.eat("keyword", "class");
        this.eat("identifier");
        this.eat("symbol", "{");
        this.compileClassVarDec();
        this.compileSubroutineDec();
        this.eat("symbol", "}");

        this.closeXmlTag("class");
    }

    compileClassVarDec() {
        while (this.isAtToken("static", "field")) {
            this.openXmlTag("classVarDec");

            this.eat("keyword");
            this.eatType();

            let hasMore = true;
            while (hasMore) {
                this.eat("identifier");
                hasMore = this.tryEat("symbol", ",");
            }

            this.eat("symbol", ";");

            this.closeXmlTag("classVarDec");
        }
    }

    compileSubroutineDec() {
        while (this.isAtToken("constructor", "method", "function")) {
            this.openXmlTag("subroutineDec");

            this.eat("keyword");
            this.eatType();
            this.eat("identifier");
            this.eat("symbol", "(");
            this.compileParameterList();
            this.eat("symbol", ")");
            this.compileSubroutineBody();

            this.closeXmlTag("subroutineDec");
        }
    }

    compileParameterList() {
        this.openXmlTag("parameterList");

        let hasMore = !this.isAtToken(")");
        while (hasMore) {
            this.eatType();
            this.eat("identifier");
            hasMore = this.tryEat("symbol", ",");
        }

        this.closeXmlTag("parameterList");
    }

    compileSubroutineBody() {
        this.openXmlTag("subroutineBody");

        this.eat("symbol", "{");
        this.compileVarDec();
        this.compileStatements();
        this.eat("symbol", "}");

        this.closeXmlTag("subroutineBody");
    }

    compileVarDec() {
        while (this.isAtToken("var")) {
            this.openXmlTag("varDec");

            this.eat("keyword", "var");
            this.eatType();

            let hasMore = true;
            while (hasMore) {
                this.eat("identifier");
                hasMore = this.tryEat("symbol", ",");
            }

            this.eat("symbol", ";");

            this.closeXmlTag("varDec");
        }
    }

    compileStatements() {
        this.openXmlTag("statements");
        let hasMore = true;
        while (hasMore) {
            if (this.isAtToken("let")) this.compileLet();
            else if (this.isAtToken("if")) this.compileIf();
            else if (this.isAtToken("do")) this.compileDo();
            else if (this.isAtToken("while")) this.compileWhile();
            else if (this.isAtToken("return")) this.compileReturn();
            else hasMore = false;
        }
        this.closeXmlTag("statements");
    }

    compileLet() {
        this.openXmlTag("letStatement");

        this.eat("keyword", "let");
        this.eat("identifier");
        if (this.tryEat("symbol", "[")) {
            this.compileExpression();
            this.eat("symbol", "]");
        }
        this.eat("symbol", "=");
        this.compileExpression();
        this.eat("symbol", ";");

        this.closeXmlTag("letStatement");
    }

    compileIf() {
        this.openXmlTag("ifStatement");

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

        this.closeXmlTag("ifStatement");
    }

    compileDo() {
        this.openXmlTag("doStatement");

        this.eat("keyword", "do");
        this.eat("identifier");
        if (this.tryEat("symbol", ".")) this.eat("identifier");
        this.eat("symbol", "(");
        this.compileExpressionList();
        this.eat("symbol", ")");
        this.eat("symbol", ";");

        this.closeXmlTag("doStatement");
    }

    compileWhile() {
        this.openXmlTag("whileStatement");

        this.eat("keyword", "while");
        this.eat("symbol", "(");
        this.compileExpression();
        this.eat("symbol", ")");
        this.eat("symbol", "{");
        this.compileStatements();
        this.eat("symbol", "}");

        this.closeXmlTag("whileStatement");
    }

    compileReturn() {
        this.openXmlTag("returnStatement");

        this.eat("keyword", "return");
        if (!this.isAtToken("symbol", ";")) {
            this.compileExpression();
        }
        this.eat("symbol", ";");

        this.closeXmlTag("returnStatement");
    }

    compileExpressionList() {
        this.openXmlTag("expressionList");

        let hasMore = !this.isAtToken(")");
        while (hasMore) {
            this.compileExpression();
            hasMore = this.tryEat("symbol", ",");
        }

        this.closeXmlTag("expressionList");
    }

    compileExpression() {
        this.openXmlTag("expression");
        let hasMore = true;
        while (hasMore) {
            this.compileTerm();
            if (this.isAtToken("+", "-", "*", "/", "&", "|", "<", ">", "="))
                this.eat();
            else hasMore = false;
        }
        this.closeXmlTag("expression");
    }

    compileTerm() {
        this.openXmlTag("term");

        if (this.isAtToken("integerConstant")) {
            this.eat("integerConstant");
        } else if (this.isAtToken("stringConstant")) {
            this.eat("stringConstant");
        } else if (this.isAtToken("true", "false", "null", "this")) {
            this.eat("keyword");
        } else if (this.isAtToken("identifier")) {
            this.eat("identifier");

            if (this.isAtToken(".")) {
                this.eat("symbol", ".");
                this.eat("identifier");
                this.eat("symbol", "(");
                this.compileExpressionList();
                this.eat("symbol", ")");
            } else if (this.isAtToken("(")) {
                this.eat("symbol", "(");
                this.compileExpressionList();
                this.eat("symbol", ")");
            } else if (this.isAtToken("[")) {
                this.eat("symbol", "[");
                this.compileExpression();
                this.eat("symbol", "]");
            } else {
                // wrong identifier can be written, need to handle this
            }
        } else if (this.isAtToken("symbol")) {
            if (this.isAtToken("(")) {
                this.eat("symbol", "(");
                this.compileExpression();
                this.eat("symbol", ")");
            } else if (this.isAtToken("-", "~")) {
                this.eat("symbol");
                this.compileTerm();
            } else throw new Error("Error in compileTerm: wrong symbol");
        } else throw new Error("Error in compileTerm: wrong everything");

        this.closeXmlTag("term");
    }
}

module.exports = Parser;
