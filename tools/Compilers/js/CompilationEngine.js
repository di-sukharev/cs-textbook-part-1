const SymbolTable = require("./SymbolTable");
const SyntaxAnalyzer = require("./SyntaxAnalyzer");
const VMWriter = require("./VMWriter");

/**
 * CompilationEngine takes Tokenizer as input and goes through every token one by one.
 * Recursively going through tokens, CompilationEngine verifies if tokens stick to the grammar.
 * If some tokens are out of the grammar order — error is thrown in `eat()` method.
 * Otherwise programm is compiled to XML and VM code successfully.
 * ---
 * CompilationEngine uses:
 * 1. SymbolTable to store current class and subroutine scope variables.
 * 2. SyntaxAnalyzer to create XML tree.
 * 3. VMWriter to create VM code.
 * ---
 * Compilation process:
 * 1. Starts compilation with the first token.
 * Running compileClass as a first method and entry point.
 * First token should be "class keyword".
 * 
 * 2. Recursively goes through:
 * `[compileClass -> compileClassVarDec,
 * [compileSubroutineDec -> compileParameterList,
 * [compileSubroutineBody -> … ]]]`
 * 
 * 3. In the end `syntaxAnalyzer.XML` has XML tree and `vmWriter.VM` has VM code.
 * ---
 * @constructor (tokenizer: Tokenizer)
 * An object containing `next()` method and currentToken field.
 * The `next()` method is used to iterate over tokens.
 * Current token is available via currentToken field.
 * @public `compileClass()` is the entry point. Just call it right after the contructor.
 */
class CompilationEngine {
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
            vmCode: this.vmWriter.VM
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
            content: currentToken.value
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

    eatType() {
        const { currentToken } = this.tokenizer;
        const allowedTypes = ["int", "char", "boolean", "void"];

        if (
            this.isAtToken(...allowedTypes) ||
            currentToken.type === "identifier"
        )
            return this.eat();
        else
            throw new Error(
                `Type was expected, but got ${currentToken.type}: ${currentToken.value}`
            );
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

    compileMethodCall(name) {
        let [routine, subroutine] = name.split(".");

        const isClassMethodCall = !subroutine;
        const isObjMethodCall =
            !isClassMethodCall && this.symbolTable.doesVarExist(routine);

        let argsCount = 0;

        if (isClassMethodCall) {
            name = this.symbolTable.classname + `.${name}`;

            this.vmWriter.push("pointer", 0);
            argsCount++;
        } else if (isObjMethodCall) {
            name = this.symbolTable.getTypeOf(routine) + `.${subroutine}`;

            this.vmWriter.push(
                getSegmentFromKind(this.symbolTable.getKindOf(routine)),
                this.symbolTable.getIndexOf(routine)
            );
            argsCount++;
        }

        argsCount += this.compileExpressionList();

        this.vmWriter.call(name, argsCount);
    }

    /**
     * @grammar  `'class' className '{' classVarDec* subroutineDec* '}'`
     */
    compileClass() {
        this.syntaxAnalyzer.openXmlTag("class");

        this.eat("keyword", "class");
        this.symbolTable.setClassname(this.eat("identifier"));
        this.eat("symbol", "{");
        this.compileClassVarDec();
        this.compileSubroutineDec();
        this.eat("symbol", "}");

        this.syntaxAnalyzer.closeXmlTag("class");
    }

    /**
     * @grammar `('static' | 'field') type varName (',' varName)* ';'`
     */
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

    /**
     * @grammar `('constructor' | function' | 'method') ('void' | type) subroutineName`
     */
    compileSubroutineDec() {
        while (this.isAtToken("constructor", "method", "function")) {
            this.syntaxAnalyzer.openXmlTag("subroutineDec");

            this.symbolTable.clearSubroutine();

            const kind = this.eat("keyword");
            const type = this.eatType();
            const name = this.eat("identifier");

            this.symbolTable.setSubroutine({ kind, type, name });

            if (kind === "method")
                this.symbolTable.define({
                    kind: "arg",
                    name: "this",
                    type: this.symbolTable.classname
                });

            this.eat("symbol", "(");
            this.compileParameterList();
            this.eat("symbol", ")");
            this.compileSubroutineBody();

            this.syntaxAnalyzer.closeXmlTag("subroutineDec");
        }
    }

    /**
     * @grammar `(type varName (',' type varName)*)?`
     */
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

    /**
     * @grammar `'{' varDec* statements '}'`
     */
    compileSubroutineBody() {
        this.syntaxAnalyzer.openXmlTag("subroutineBody");

        this.eat("symbol", "{");

        this.compileVarDec();

        this.vmWriter.function(
            `${this.symbolTable.classname}.${this.symbolTable.subroutine.name}`,
            this.symbolTable.getVarCount("var")
        );

        if (this.symbolTable.subroutine.kind === "constructor") {
            this.vmWriter.push(
                "constant",
                this.symbolTable.getVarCount("field")
            );
            this.vmWriter.call("Memory.alloc", 1);
            this.vmWriter.pop("pointer", 0);
        } else if (this.symbolTable.subroutine.kind === "method") {
            this.vmWriter.push("argument", 0);
            this.vmWriter.pop("pointer", 0);
        }

        this.compileStatements();
        this.eat("symbol", "}");

        this.syntaxAnalyzer.closeXmlTag("subroutineBody");
    }

    /**
     * @grammar `'var' type varName (',' varName)* ';'`
     */
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

    /**
     * @grammar `statement*`
     */
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

    /**
     * @grammar `'let' varName '=' expression ';'`
     */
    compileLet() {
        this.syntaxAnalyzer.openXmlTag("letStatement");

        let isArray = false;

        this.eat("keyword", "let");
        const identifier = this.eat("identifier");
        
        if (this.tryEat("symbol", "[")) {
            this.compileExpression();

            this.vmWriter.push(
                getSegmentFromKind(this.symbolTable.getKindOf(identifier)),
                this.symbolTable.getIndexOf(identifier)
            );
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
            this.vmWriter.pop(
                getSegmentFromKind(this.symbolTable.getKindOf(identifier)),
                this.symbolTable.getIndexOf(identifier)
            );
        }

        this.syntaxAnalyzer.closeXmlTag("letStatement");
    }

    IF_COUNTER = 0;
    /**
     * @grammar `'if' '(' expression ')’ '{' statements '}’`
     */
    compileIf() {
        // todo: move this to "new Counter()"
        const counter = this.IF_COUNTER;
        const IF_TRUE = `IF_TRUE_${counter}`;
        const IF_FALSE = `IF_FALSE_${counter}`;
        const IF_END = `IF_END_${counter}`;
        this.IF_COUNTER++;
        // ---

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
    }

    WHILE_COUNTER = 0;
    /**
     * @grammar `'while' '(' expression ')’ '{' statements '}’`
     */
    compileWhile() {
        // todo: move this to "new Counter()"
        const counter = this.WHILE_COUNTER;
        const startLabel = `WHILE_START_${counter}`;
        const endLabel = `WHILE_END_${counter}`;
        this.WHILE_COUNTER++;
        // ---

        this.syntaxAnalyzer.openXmlTag("whileStatement");

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
    }

    /**
     * @grammar `'return' expression? ';'`
     */
    compileReturn() {
        this.syntaxAnalyzer.openXmlTag("returnStatement");

        this.eat("keyword", "return");
        if (!this.isAtToken("symbol", ";")) this.compileExpression();
        this.eat("symbol", ";");

        if (this.symbolTable.subroutine.type === "void")
            this.vmWriter.push("constant", 0);

        this.vmWriter.return();

        this.syntaxAnalyzer.closeXmlTag("returnStatement");
    }

    /**
     * @grammar `'do' subroutineCall ';'`
     */
    compileDo() {
        this.syntaxAnalyzer.openXmlTag("doStatement");

        this.eat("keyword", "do");
        let name = this.eat("identifier");

        if (this.tryEat("symbol", ".")) name += `.${this.eat("identifier")}`;

        this.eat("symbol", "(");
        this.compileMethodCall(name);
        this.eat("symbol", ")");
        this.eat("symbol", ";");

        // we don't need return value in raw "do statement()", so we throw it away
        this.vmWriter.pop("temp", 0);

        this.syntaxAnalyzer.closeXmlTag("doStatement");
    }

    /**
     * @grammar `(expression (',' expression)* )?`
     */
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

    /**
     * @grammar `term (op term)?`
     */
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

    /**
     * @grammar `varName | intConstant | stringConstant |
     * keywordConstant | varName '[' expression ']' |
     * subroutineCall | '(' expression ')' | unaryOp term`
     */
    compileTerm() {
        this.syntaxAnalyzer.openXmlTag("term");
      
        /* eslint-disable padded-blocks */
        
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
                // is subrotine call
                name += this.eat("symbol", ".");
                name += this.eat("identifier");
                this.eat("symbol", "(");
                this.compileMethodCall(name);
                this.eat("symbol", ")");
            } else if (this.isAtToken("(")) {
                // is method call
                this.eat("symbol", "(");
                const argsCount = this.compileExpressionList();
                this.eat("symbol", ")");
                this.vmWriter.call(name, argsCount);
            } else if (this.isAtToken("[")) {
                // is array element read
                this.eat("symbol", "[");
                this.compileExpression();
                this.eat("symbol", "]");

                this.vmWriter.push(
                    getSegmentFromKind(this.symbolTable.getKindOf(name)),
                    this.symbolTable.getIndexOf(name)
                );

                this.vmWriter.add();
                this.vmWriter.pop("pointer", 1);
                this.vmWriter.push("that", 0);
            } else {
                // just a variable, not a function or array
                const variable = this.symbolTable.getDefinedVar(name);
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

module.exports = CompilationEngine;
