class SyntaxAnalyzer {
    XML = "";

    constructor() {
        return this;
    }

    openXmlTag(tag) {
        this.XML += `<${tag}>`;
    }

    closeXmlTag(tag) {
        this.XML += `</${tag}>`;
    }

    createXmlTag({ tag, content }) {
        if (content === "<") content = "&lt;";
        if (content === ">") content = "&gt;";
        this.openXmlTag(tag);
        this.XML += ` ${content} `;
        this.closeXmlTag(tag);
        this.XML += "\n";
    }
}

module.exports = SyntaxAnalyzer;
