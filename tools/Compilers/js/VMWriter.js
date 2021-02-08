class VMWriter {
    VM = "";

    constructor() {
        return this;
    }

    write(command) {
        this.VM += command + "\n";
    }

    push(segment, value) {
        this.write(`push ${segment} ${value}`);
    }

    pop(segment, value) {
        this.write(`pop ${segment} ${value}`);
    }

    add() {
        this.write("add");
    }

    call(functionName, args) {
        this.write(`call ${functionName} ${args}`);
    }

    return() {
        this.write("return");
    }

    function(functionName, args) {
        this.write(`function ${functionName} ${args}`);
    }

    ifgoto(label) {
        this.write(`if-goto ${label}`);
    }

    goto(label) {
        this.write(`goto ${label}`);
    }

    label(label) {
        this.write(`label ${label}`);
    }

    operation(op) {
        // if (op === "+") this.write("add");
        // if (op === "*") this.call("Math.mult", 2);
        switch (op) {
            case "+":
                this.add();
                break;
            case "-":
                this.write("sub");
                break;
            case ">":
                this.write("gt");
                break;
            case "<":
                this.write("lt");
                break;
            case "&":
                this.write("and");
                break;
            case "|":
                this.write("or");
                break;
            case "=":
                this.write("eq");
                break;
            case "*":
                this.call("Math.multiply", 2);
                break;
            case "/":
                this.call("Math.divide", 2);
                break;
            case "neg":
                this.write("neg");
                break;
            case "not":
                this.write("not");
                break;
            default:
                throw new Error("Unknown op: " + op);
        }
    }

    keywordConstant(keyword) {
        switch (keyword) {
            case "true":
                this.push("constant", 0);
                this.operation("not");
                break;
            case "false":
                this.push("constant", 0);
                break;
            case "null":
                this.push("constant", 0);
                break;
            case "this":
                // todo: call Memory.alloc
                break;

            default:
                throw new Error("Unknown keyword constant: " + keyword);
        }
    }
}

module.exports = VMWriter;
