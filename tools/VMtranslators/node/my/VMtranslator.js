const fs = require("fs");

class VMtranslator {
    constructor() {
        return this;
    }

    translate(inputDirectory) {
        fs.readdirSync(inputDirectory).forEach((file) => {
            console.log(file);
        });

        // const file = fs.readFileSync(inputDirectory, "utf8");

        // const binary = this._compile(file);

        // fs.writeFileSync(outputDirectory, binary);
    }

    _compile(file) {}
}

module.exports = VMtranslator;
