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

    call(subroutineName, args) {
        this.write(`call ${subroutineName} ${args}`);
    }

    return() {
        this.write("return");
    }

    function(subroutineName, args) {
        this.write(`function ${subroutineName} ${args}`);
    }

    operation(op) {
        // if (op === "+") this.write("add");
        // if (op === "*") this.call("Math.mult", 2);
        switch (op) {
            case "+":
                this.write("add");
                break;
            case "*":
                this.call("Math.multiply", 2);
                break;
        }
    }
}

module.exports = VMWriter;
