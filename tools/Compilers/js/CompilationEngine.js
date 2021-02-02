/* TODO: proper JSdoc comments
Parsing process
    1. start reading file with the first token
    2. run compileClass as a first method and entry point
    3. first token should be "class keyword"
*/

const SymbolTable = require("./SymbolTable");
const SyntaxAnalyzer = require("./SyntaxAnalyzer");

class CompilationEngine {
    // todo: move this to SymbolTable
    className = null;
    subroutine = { name: null, type: null };

    createLabel(label) {
        return `${this.className}.${this.subroutine.name}.${label}`;
    }

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
            // vmCode: this.vmWriter.VM,
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

        return currentToken.value;
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
            return this.eat();
        else throw new Error("Type was expected, but got: ", ...currentToken);
    }

    compileClass() {
        this.syntaxAnalyzer.openXmlTag("class");

        this.eat("keyword", "class");
        this.className = this.eat("identifier");
        this.eat("symbol", "{");
        this.compileClassVarDec();
        this.compileSubroutineDec();
        this.eat("symbol", "}");

        this.syntaxAnalyzer.closeXmlTag("class");
    }

    compileClassVarDec() {
        while (this.isAtToken("static", "field")) {
            this.syntaxAnalyzer.openXmlTag("classVarDec");

            const kind = this.eat("keyword");
            const type = this.eatType();
            let hasMore = true;
            while (hasMore) {
                const name = this.eat("identifier");
                hasMore = this.tryEat("symbol", ",");

                this.symbolTable.define({ kind, type, name });
            }
            this.eat("symbol", ";");

            this.syntaxAnalyzer.closeXmlTag("classVarDec");
        }
    }

    compileSubroutineDec() {
        while (this.isAtToken("constructor", "method", "function")) {
            this.syntaxAnalyzer.openXmlTag("subroutineDec");

            this.symbolTable.clearSubroutine();

            this.subroutine.name = this.eat("keyword");
            this.subroutine.type = this.eatType();
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
            const type = this.eatType();
            const name = this.eat("identifier");
            hasMore = this.tryEat("symbol", ",");

            this.symbolTable.define({ kind: "arg", type, name });
        }

        this.syntaxAnalyzer.closeXmlTag("parameterList");
    }

    compileSubroutineBody() {
        this.syntaxAnalyzer.openXmlTag("subroutineBody");

        this.eat("symbol", "{");

        this.compileVarDec();
        this.vmWriter.function(
            `${this.className}.${this.subroutine.name}`,
            this.symbolTable.getVarCount("var")
        );

        this.compileStatements();
        this.eat("symbol", "}");

        this.syntaxAnalyzer.closeXmlTag("subroutineBody");
    }

    compileVarDec() {
        while (this.isAtToken("var")) {
            this.syntaxAnalyzer.openXmlTag("varDec");

            this.eat("keyword", "var");
            const type = this.eatType();
            let hasMore = true;
            while (hasMore) {
                const name = this.eat("identifier");
                hasMore = this.tryEat("symbol", ",");

                this.symbolTable.define({ kind: "var", type, name });
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

        let isArray = false;

        this.eat("keyword", "let");
        const identifier = this.eat("identifier");
        if (this.tryEat("symbol", "[")) {
            this.vmWriter.push(
                "local",
                this.symbolTable.getIndexOf(identifier)
            );
            this.compileExpression();
            this.vmWriter.add();

            this.eat("symbol", "]");
            isArray = true;
        }
        this.eat("symbol", "=");
        this.compileExpression();
        this.eat("symbol", ";");

        if (isArray) {
            this.vmWriter.pop("temp", 0);
            this.vmWriter.pop("pointer", 1);
            this.vmWriter.push("temp", 0);
            this.vmWriter.pop("that", 0);
        } else {
            this.vmWriter.pop("local", this.symbolTable.getIndexOf(identifier));
        }

        this.syntaxAnalyzer.closeXmlTag("letStatement");
    }

    compileIf() {
        this.syntaxAnalyzer.openXmlTag("ifStatement");

        this.eat("keyword", "if");
        this.eat("symbol", "(");
        this.compileExpression();

        this.vmWriter.not();
        this.vmWriter.ifGoto(this.createLabel("ALTERNATIVE"));

        this.eat("symbol", ")");
        this.eat("symbol", "{");
        this.compileStatements();
        this.eat("symbol", "}");
        this.vmWriter.goto(this.createLabel("CONSEQUENT"));

        this.vmWriter.label(this.createLabel("ALTERNATIVE"));
        if (this.tryEat("keyword", "else")) {
            this.eat("symbol", "{");
            this.compileStatements();
            this.eat("symbol", "}");
        }
        this.vmWriter.label(this.createLabel("CONSEQUENT"));

        this.syntaxAnalyzer.closeXmlTag("ifStatement");
    }

    compileDo() {
        this.syntaxAnalyzer.openXmlTag("doStatement");

        this.eat("keyword", "do");
        let name = this.eat("identifier");
        if (this.tryEat("symbol", ".")) name += "." + this.eat("identifier");
        this.eat("symbol", "(");
        const argumentsCount = this.compileExpressionList();
        this.eat("symbol", ")");
        this.eat("symbol", ";");

        this.vmWriter.call(name, argumentsCount);
        this.vmWriter.pop("temp", 0); // we don't need return value in raw "do statement()"

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

        if (this.subroutine.type === "void") this.vmWriter.push("constant", 0);
        this.vmWriter.return();

        this.syntaxAnalyzer.closeXmlTag("returnStatement");
    }

    compileExpressionList() {
        this.syntaxAnalyzer.openXmlTag("expressionList");

        let hasMore = !this.isAtToken(")");
        let argumentsCount = 0;
        while (hasMore) {
            this.compileExpression();
            hasMore = this.tryEat("symbol", ",");
            argumentsCount++;
        }

        this.syntaxAnalyzer.closeXmlTag("expressionList");

        return argumentsCount;
    }

    compileExpression() {
        this.syntaxAnalyzer.openXmlTag("expression");

        let op = null;
        let hasMore = true;
        while (hasMore) {
            this.compileTerm();

            if (this.isAtToken("+", "-", "*", "/", "&", "|", "<", ">", "=")) {
                if (op) this.vmWriter.operation(op);
                op = this.eat();
            } else hasMore = false;
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
