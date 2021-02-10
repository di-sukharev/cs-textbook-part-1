class SymbolTable {
    classname = null;
    subroutine = { name: null, type: null, kind: null };

    classScope = {};
    subroutineScope = {};

    constructor() {
        return this;
    }

    setClassname(name) {
        this.classname = name;
    }

    setSubroutine(subroutine) {
        this.subroutine = subroutine;
    }

    define({ kind, type, name }) {
        if (this.doesVarExist(name))
            throw new Error(
                `Variable already exists — kind: ${kind}, type: ${type}, name: ${name}`
            );

        switch (kind) {
            case "static":
                this.classScope[name] = {
                    kind,
                    type,
                    index: Object.values(this.classScope).filter(
                        v => v.kind === "static"
                    ).length
                };
                break;
                
            case "field":
                this.classScope[name] = {
                    kind,
                    type,
                    index: Object.values(this.classScope).filter(
                        v => v.kind === "field"
                    ).length
                };
                break;
                
            case "arg":
                this.subroutineScope[name] = {
                    kind,
                    type,
                    index: Object.values(this.subroutineScope).filter(
                        v => v.kind === "arg"
                    ).length
                };
                break;

            case "var":
                this.subroutineScope[name] = {
                    kind,
                    type,
                    index: Object.values(this.subroutineScope).filter(
                        v => v.kind === "var"
                    ).length
                };
                break;
                
            default:
                throw Error(
                    `Unknown identifier — kind: ${kind}, type: ${type}, name: ${name}`
                );
        }
    }

    getVar(name) {
        const variable = this.subroutineScope[name] || this.classScope[name];

        return variable;
    }

    getDefinedVar(name) {
        const variable = this.getVar(name);
        if (!variable) throw new Error("Variable is not defined: " + name);

        return variable;
    }

    doesVarExist(variable) {
        return Boolean(this.getVar(variable));
    }

    getVarCount(kind) {
        const filterByKind = v => v.kind === kind;
        const getCount = obj =>
            Object.values(obj).filter(filterByKind).length;

        return getCount(this.classScope) + getCount(this.subroutineScope);
    }

    getTypeOf(name) {
        return this.getDefinedVar(name).type;
    }

    getKindOf(name) {
        return this.getDefinedVar(name).kind;
    }

    getIndexOf(name) {
        return this.getDefinedVar(name).index;
    }

    clearSubroutine() {
        this.subroutineScope = {};
    }
}

module.exports = SymbolTable;
