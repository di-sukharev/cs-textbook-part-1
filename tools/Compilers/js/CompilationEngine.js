/* TODO: proper JSdoc comments
Parsing process
    1. start reading file with the first token
    2. run compileClass as a first method and entry point
    3. first token should be "class keyword"
*/

const SymbolTable = require("./SymbolTable");
const SyntaxAnalyzer = require("./SyntaxAnalyzer");
const VMWriter = require("./VMWriter");

function getSegmentFromKind(kind) {
    switch (kind) {
        case "static":
            return "static";
        case "field":
            return "this";
        case "arg":
            return "argument";
        case "var":
            return "local";

        default:
            throw new Error("Unknown var kind: " + kind);
    }
}

class CompilationEngine {
    // todo: move this to SymbolTable
    className = null;
    subroutine = { name: null, type: null, kind: null };

    constructor(tokenizer) {
        this.tokenizer = tokenizer;
        this.syntaxAnalyzer = new SyntaxAnalyzer();
        this.vmWriter = new VMWriter();
        this.symbolTable = new SymbolTable();

        return this;
    }

    compile() {
        this.compileClass();

        return {
            xmlCode: this.syntaxAnalyzer.XML,
            vmCode: this.vmWriter.VM,
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

            this.subroutine.kind = this.eat("keyword");
            this.subroutine.type = this.eatType();
            this.subroutine.name = this.eat("identifier");
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
            this.symbolTable.getVarCount("local")
        );

        if (this.subroutine.kind === "constructor") {
            this.vmWriter.push(
                "constant",
                this.symbolTable.getVarCount("field")
            );
            this.vmWriter.call("Memory.alloc", 1);
            this.vmWriter.pop("pointer", 0);
        }

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
            console.log(
                this.symbolTable,
                this.symbolTable.getIndexOf(identifier)
            );
            this.vmWriter.pop(
                getSegmentFromKind(this.symbolTable.getKindOf(identifier)),
                this.symbolTable.getIndexOf(identifier)
            );
        }

        this.syntaxAnalyzer.closeXmlTag("letStatement");
    }

    IF_COUNTER = 0;
    compileIf() {
        const counter = this.IF_COUNTER;
        const IF_TRUE = `IF_TRUE_${counter}`;
        const IF_FALSE = `IF_FALSE_${counter}`;
        const IF_END = `IF_END_${counter}`;

        this.syntaxAnalyzer.openXmlTag("ifStatement");

        this.eat("keyword", "if");

        this.eat("symbol", "(");
        this.compileExpression();
        this.vmWriter.ifgoto(IF_TRUE);
        this.vmWriter.goto(IF_FALSE);
        this.eat("symbol", ")");

        this.eat("symbol", "{");
        this.vmWriter.label(IF_TRUE);
        this.compileStatements();
        this.vmWriter.goto(IF_END);
        this.eat("symbol", "}");

        this.vmWriter.label(IF_FALSE);
        if (this.tryEat("keyword", "else")) {
            this.eat("symbol", "{");
            this.compileStatements();
            this.eat("symbol", "}");
        }
        this.vmWriter.label(IF_END);

        this.syntaxAnalyzer.closeXmlTag("ifStatement");

        this.IF_COUNTER++;
    }

    WHILE_COUNTER = 0;
    compileWhile() {
        this.syntaxAnalyzer.openXmlTag("whileStatement");

        const counter = this.WHILE_COUNTER;
        const startLabel = `WHILE_START_${counter}`;
        const endLabel = `WHILE_END_${counter}`;

        this.vmWriter.label(startLabel);

        this.eat("keyword", "while");
        this.eat("symbol", "(");
        this.compileExpression();
        this.eat("symbol", ")");

        this.vmWriter.operation("not");
        this.vmWriter.ifgoto(endLabel);

        this.eat("symbol", "{");
        this.compileStatements();
        this.eat("symbol", "}");

        this.vmWriter.goto(startLabel);
        this.vmWriter.label(endLabel);

        this.syntaxAnalyzer.closeXmlTag("whileStatement");

        this.WHILE_COUNTER++;
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

    compileDo() {
        this.syntaxAnalyzer.openXmlTag("doStatement");

        this.eat("keyword", "do");
        let name = this.eat("identifier");

        if (this.tryEat("symbol", ".")) name += `.${this.eat("identifier")}`;

        this.eat("symbol", "(");
        const argsCount = this.compileExpressionList();
        this.eat("symbol", ")");

        this.eat("symbol", ";");

        let [routine, subroutine] = name.split(".");
        const isMethodCall = !subroutine;
        const type = isMethodCall
            ? this.className
            : this.symbolTable.getTypeOf(routine);

        const isClassType = !["char", "int", "boolean"].includes(type);
        if (isClassType) {
            this.vmWriter.push(
                this.symbolTable.getKindOf(routine),
                this.symbolTable.getIndexOf(routine)
            );
            this.vmWriter.call(
                isMethodCall ? type + `.${routine}` : name,
                argsCount + 1
            );
        } else this.vmWriter.call(name, argsCount);

        // we don't need return value in raw "do statement()", so we throw it away
        this.vmWriter.pop("temp", 0);

        this.syntaxAnalyzer.closeXmlTag("doStatement");
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
            } else {
                if (op) this.vmWriter.operation(op);
                hasMore = false;
            }
        }

        this.syntaxAnalyzer.closeXmlTag("expression");
    }

    compileTerm() {
        this.syntaxAnalyzer.openXmlTag("term");

        if (this.isAtToken("integerConstant")) {
            const int = this.eat("integerConstant");
            this.vmWriter.push("constant", int);
        } else if (this.isAtToken("stringConstant")) {
            const str = this.eat("stringConstant");
            this.vmWriter.push("constant", str.length);
            this.vmWriter.call("String.new", 1);

            for (let i = 0; i < str.length; i++) {
                this.vmWriter.push("constant", str.charCodeAt(i));
                this.vmWriter.call("String.appendChar", 2);
            }
        } else if (this.isAtToken("true", "false", "null", "this")) {
            const keyword = this.eat("keyword");
            this.vmWriter.keywordConstant(keyword);
        } else if (this.isAtToken("identifier")) {
            let name = this.eat("identifier");
            if (this.isAtToken(".")) {
                name += this.eat("symbol", ".");
                name += this.eat("identifier");
                this.eat("symbol", "(");
                const argsCount = this.compileExpressionList();
                this.eat("symbol", ")");
                this.vmWriter.call(name, argsCount);
            } else if (this.isAtToken("(")) {
                this.eat("symbol", "(");
                const argsCount = this.compileExpressionList();
                this.eat("symbol", ")");
                this.vmWriter.call(name, argsCount);
            } else if (this.isAtToken("[")) {
                this.eat("symbol", "[");
                this.compileExpression();
                this.vmWriter.push(
                    this.symbolTable.getKindOf(name),
                    this.symbolTable.getIndexOf(name)
                );
                this.vmWriter.add();
                this.vmWriter.pop("pointer", 1);
                this.vmWriter.push("that", 0);
                this.eat("symbol", "]");
            } else {
                // just a variable, not a function or array
                const variable = this.symbolTable.getVar(name);

                if (!variable) throw new Error("Unknown var: " + name);

                this.vmWriter.push(
                    getSegmentFromKind(variable.kind),
                    variable.index
                );
            }
        } else if (this.isAtToken("symbol")) {
            if (this.isAtToken("(")) {
                this.eat("symbol", "(");
                this.compileExpression();
                this.eat("symbol", ")");
            } else if (this.isAtToken("-", "~")) {
                const op = this.eat("symbol");
                this.compileTerm();
                this.vmWriter.operation(op === "-" ? "neg" : "not");
            } else throw new Error("Unexpected symbol");
        } else throw new Error("Unexpected term");

        this.syntaxAnalyzer.closeXmlTag("term");
    }
}

module.exports = CompilationEngine;
