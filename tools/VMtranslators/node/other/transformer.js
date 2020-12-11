const { handlePush } = require("./handlers/push");
const handlePop = require("./handlers/pop");
const handleAL = require("./handlers/al");
const handleControlFlow = require("./handlers/controlFlow");
const { handleFunction, handleCalling } = require("./handlers/function");

function transformer(tokens, fileName) {
    let output = "";
    output += init();
    for (var i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (token.command) output += `// ${token.command}\n`;
        let commands =
            token.type == "memory" && token.operator == "push"
                ? handlePush(token, fileName)
                : token.type == "memory" && token.operator == "pop"
                ? handlePop(token)
                : token.type == "al"
                ? handleAL(token)
                : token.type == "flow"
                ? handleControlFlow(token)
                : token.type == "function"
                ? handleFunction(token)
                : "";
        output += commands;
    }
    return output;
}

function init() {
    return (
        `// Initiation \n` +
        `@256\n` +
        `D=A\n` + // D = 256
        `@SP\n` +
        `M=D\n` + // SP = 256
        handleCalling({ functionName: "System.init" })
    );
}

module.exports = transformer;
