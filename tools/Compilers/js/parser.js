/* Parsing process
    1. start reading file with the first token
    2. run compile_class
    3. first token should be "class keyword"
    
*/

const parser = {
    eat(type, token) {
        const { currentToken, currentTokenType } = tokenizer;

        if (currentToken != token || currentTokenType != type) {
            throw Error("Unexpected token: " + currentToken);
        } else {
            tokenizer.next();
        }
    },

    compileClass(code) {
        try {
            // eat("keyword", "class")
            // eat("symbol", "{")
            // eat("symbol", "{")
            // compileClassVarDec()
            // …
            // eat("symbol", "}")
        } catch (e) {
            throw Error("Error in «compile class»: " + e);
        }
    },

    compileClassVarDec() {
        // …
    },
};
