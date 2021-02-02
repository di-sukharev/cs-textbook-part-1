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
                this.classScope[name] = {
                    kind,
                    type,
                    index: Object.values(this.classScope).filter(
                        (v) => v.kind === "static"
                    ).length,
                };
                break;
            case "field":
                this.classScope[name] = {
                    kind,
                    type,
                    index: Object.values(this.classScope).filter(
                        (v) => v.kind === "field"
                    ).length,
                };
                break;
            case "arg":
                this.subroutineScope[name] = {
                    kind,
                    type,
                    index: Object.values(this.subroutineScope).filter(
                        (v) => v.kind === "arg"
                    ).length,
                };
                break;
            case "var":
                this.subroutineScope[name] = {
                    kind,
                    type,
                    index: Object.values(this.subroutineScope).filter(
                        (v) => v.kind === "var"
                    ).length,
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
