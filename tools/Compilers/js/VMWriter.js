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

    operation = {
        "+": this.write("add"),
        "*": this.call("Math.mult", 2),
    };
}

module.exports = VMWriter;
