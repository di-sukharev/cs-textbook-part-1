class SymbolTable {
    classScope = {};
    subroutineScope = {};

    constructor() {
        return this;
    }

    define({ kind, type, name }) {
        if (this.classScope[name] || this.subroutineScope[name])
            throw new Error(
                `Duplicated variable — kind: ${kind}, type: ${type}, name: ${name}`
            );

        switch (kind) {
            case "static":
            case "field":
                this.classScope[name] = {
                    kind,
                    type,
                    index: Object.keys(this.classScope).length,
                };
                break;
            case "arg":
            case "var":
                this.subroutineScope[name] = {
                    kind,
                    type,
                    index: Object.keys(this.subroutineScope).length,
                };
                break;
            default:
                throw Error(
                    `Unknown identifier — kind: ${kind}, type: ${type}, name: ${name}`
                );
        }
    }

    getVarCount(kind) {
        const filterByKind = (v) => v.kind === kind;
        const getCount = (obj) =>
            Object.values(obj).filter(filterByKind).length;

        return getCount(this.classScope) + getCount(this.subroutineScope);
    }

    getTypeOf(name) {
        return this.classScope[name]?.type || this.subroutineScope[name]?.type;
    }

    getKindOf(name) {
        return this.classScope[name]?.kind || this.subroutineScope[name]?.kind;
    }

    getIndexOf(name) {
        return (
            this.classScope[name]?.index || this.subroutineScope[name]?.index
        );
    }

    clearSubroutine() {
        this.subroutineScope = {};
    }
}

module.exports = SymbolTable;
