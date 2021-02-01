/* TODO: proper JSdoc comments
Parsing process
    1. start reading file with the first token
    2. run compileClass as a first method and entry point
    3. first token should be "class keyword"
*/

const SymbolTable = require("./SymbolTable");
const SyntaxAnalyzer = require("./SyntaxAnalyzer");

class CompilationEngine {
    constructor(tokenizer) {
        this.tokenizer = tokenizer;
        this.syntaxAnalyzer = new SyntaxAnalyzer();
        this.symbolTable = new SymbolTable();

        return this;
    }

    compile() {
        this.compileClass();

        return {
            xmlCode: this.syntaxAnalyzer.XML,
            // vmCode: this.writer.VM,
        };
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
                ${this.syntaxAnalyzer.XML}`
            );

        this.syntaxAnalyzer.createXmlTag({
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
        else throw new Error("Type was expected, but got: ", ...currentToken);
    }

    compileClass() {
        this.syntaxAnalyzer.openXmlTag("class");

        this.eat("keyword", "class");
        this.eat("identifier");
        this.eat("symbol", "{");
        this.compileClassVarDec();
        this.compileSubroutineDec();
        this.eat("symbol", "}");

        this.syntaxAnalyzer.closeXmlTag("class");
    }

    compileClassVarDec() {
        // todo: create here new "class level SymbolTable"
        while (this.isAtToken("static", "field")) {
            this.syntaxAnalyzer.openXmlTag("classVarDec");

            this.eat("keyword");
            this.eatType();
            let hasMore = true;
            while (hasMore) {
                this.eat("identifier");
                hasMore = this.tryEat("symbol", ",");
            }
            this.eat("symbol", ";");

            this.syntaxAnalyzer.closeXmlTag("classVarDec");
        }
    }

    compileSubroutineDec() {
        while (this.isAtToken("constructor", "method", "function")) {
            // todo: create here new "subroutine level SymbolTable"
            this.syntaxAnalyzer.openXmlTag("subroutineDec");

            this.eat("keyword");
            this.eatType();
            this.eat("identifier");
            this.eat("symbol", "(");
            this.compileParameterList();
            this.eat("symbol", ")");
            this.compileSubroutineBody();

            this.syntaxAnalyzer.closeXmlTag("subroutineDec");
        }
    }

    compileParameterList() {
        this.syntaxAnalyzer.openXmlTag("parameterList");

        let hasMore = !this.isAtToken(")");
        while (hasMore) {
            this.eatType();
            this.eat("identifier");
            hasMore = this.tryEat("symbol", ",");
        }

        this.syntaxAnalyzer.closeXmlTag("parameterList");
    }

    compileSubroutineBody() {
        this.syntaxAnalyzer.openXmlTag("subroutineBody");

        this.eat("symbol", "{");
        this.compileVarDec();
        this.compileStatements();
        this.eat("symbol", "}");

        this.syntaxAnalyzer.closeXmlTag("subroutineBody");
    }

    compileVarDec() {
        while (this.isAtToken("var")) {
            this.syntaxAnalyzer.openXmlTag("varDec");

            this.eat("keyword", "var");
            this.eatType();
            let hasMore = true;
            while (hasMore) {
                this.eat("identifier");
                hasMore = this.tryEat("symbol", ",");
            }
            this.eat("symbol", ";");

            this.syntaxAnalyzer.closeXmlTag("varDec");
        }
    }

    compileStatements() {
        this.syntaxAnalyzer.openXmlTag("statements");

        let hasMore = true;
        while (hasMore) {
            if (this.isAtToken("let")) this.compileLet();
            else if (this.isAtToken("if")) this.compileIf();
            else if (this.isAtToken("do")) this.compileDo();
            else if (this.isAtToken("while")) this.compileWhile();
            else if (this.isAtToken("return")) this.compileReturn();
            else hasMore = false;
        }

        this.syntaxAnalyzer.closeXmlTag("statements");
    }

    compileLet() {
        this.syntaxAnalyzer.openXmlTag("letStatement");

        this.eat("keyword", "let");
        this.eat("identifier");
        if (this.tryEat("symbol", "[")) {
            this.compileExpression();
            this.eat("symbol", "]");
        }
        this.eat("symbol", "=");
        this.compileExpression();
        this.eat("symbol", ";");

        this.syntaxAnalyzer.closeXmlTag("letStatement");
    }

    compileIf() {
        this.syntaxAnalyzer.openXmlTag("ifStatement");

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

        this.syntaxAnalyzer.closeXmlTag("ifStatement");
    }

    compileDo() {
        this.syntaxAnalyzer.openXmlTag("doStatement");

        this.eat("keyword", "do");
        this.eat("identifier");
        if (this.tryEat("symbol", ".")) this.eat("identifier");
        this.eat("symbol", "(");
        this.compileExpressionList();
        this.eat("symbol", ")");
        this.eat("symbol", ";");

        this.syntaxAnalyzer.closeXmlTag("doStatement");
    }

    compileWhile() {
        this.syntaxAnalyzer.openXmlTag("whileStatement");

        this.eat("keyword", "while");
        this.eat("symbol", "(");
        this.compileExpression();
        this.eat("symbol", ")");
        this.eat("symbol", "{");
        this.compileStatements();
        this.eat("symbol", "}");

        this.syntaxAnalyzer.closeXmlTag("whileStatement");
    }

    compileReturn() {
        this.syntaxAnalyzer.openXmlTag("returnStatement");

        this.eat("keyword", "return");
        if (!this.isAtToken("symbol", ";")) this.compileExpression();
        this.eat("symbol", ";");

        this.syntaxAnalyzer.closeXmlTag("returnStatement");
    }

    compileExpressionList() {
        this.syntaxAnalyzer.openXmlTag("expressionList");

        let hasMore = !this.isAtToken(")");
        while (hasMore) {
            this.compileExpression();
            hasMore = this.tryEat("symbol", ",");
        }

        this.syntaxAnalyzer.closeXmlTag("expressionList");
    }

    compileExpression() {
        this.syntaxAnalyzer.openXmlTag("expression");

        let hasMore = true;
        while (hasMore) {
            this.compileTerm();
            if (this.isAtToken("+", "-", "*", "/", "&", "|", "<", ">", "="))
                this.eat();
            else hasMore = false;
        }

        this.syntaxAnalyzer.closeXmlTag("expression");
    }

    compileTerm() {
        this.syntaxAnalyzer.openXmlTag("term");

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
            }
        } else if (this.isAtToken("symbol")) {
            if (this.isAtToken("(")) {
                this.eat("symbol", "(");
                this.compileExpression();
                this.eat("symbol", ")");
            } else if (this.isAtToken("-", "~")) {
                this.eat("symbol");
                this.compileTerm();
            } else
                throw new Error("Error in term compilation. Unexpected symbol");
        } else throw new Error("Error in term compilation. Unexpected term");

        this.syntaxAnalyzer.closeXmlTag("term");
    }
}

module.exports = CompilationEngine;
