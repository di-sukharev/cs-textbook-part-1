const fs = require("fs");
const { writer } = require("repl");

function tranlateDirectory(inputDirectoryName) {
    const onlyVmFiles = (file) => file.endsWith(".vm");

    let assembly = "";

    // читаем папку c .vm файлами
    const vmFiles = fs.readdirSync(inputDirectoryName).filter(onlyVmFiles);

    vmFiles.forEach((vmFileName) => {
        const vmCode = fs.readFileSync(
            inputDirectoryName + "/" + vmFileName,
            "utf8"
        );

        // все инструкции .vm файла переводим в .asm инструкции
        assembly += translateFile(vmCode);
    });
    // когда перевели последний .vm файл, складываем все .asm инструкции в один файл
    fs.writeFileSync(inputDirectoryName + "/" + "main.asm", assembly);
}

function translateFile(vmCode) {
    const removeComments = (line) => !line.includes("//");
    const noEmptyLines = (line) => Boolean(line);
    const intoLines = "\r\n";

    const assemblyFile = vmCode
        .split(intoLines)
        .filter(removeComments)
        .filter(noEmptyLines)
        .map(vm2asm)
        .join(intoLines);

    return assemblyFile;
}

function vm2asm(vmInstruction) {
    let asmInstructions = "";

    const [operation, arg1, arg2] = vmInstruction.split(" ");

    asmInstructions += writer[operation](arg1, arg2);

    return asmInstructions;
}

module.exports = tranlateDirectory;
