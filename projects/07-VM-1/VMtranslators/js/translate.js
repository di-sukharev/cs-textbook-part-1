const fs = require("fs");
const writer = require("./writer.js");

function translateDirectory(inputDirectoryName) {
    // Смотрим все файлы в папке inputDirectoryName
    // Читаем только .vm файлы
    // Каждую .vm инструкцию в файле переводим в соответствующие .asm инструкции
    // .asm инструкции записываем друг за другом построчно в новую строку
    // Когда все инструкции во всех .vm файлах переведены, создаем из них один .asm файл
    // Итоговый .asm файл сохраняем по тому же адресу, что инпут файл
    // Если .asm файл предполагает инициализацию стека и сегментов VM, он должен начинаться с инициализирующих инструкций

    const [targetDirectoryName] = inputDirectoryName.match(/[^/]+(?=\/$)/);

    fs.readdirSync(inputDirectoryName)
        .filter(isVmFile)
        .forEach((fileName) => {
            const vmCode = fs.readFileSync(
                `${inputDirectoryName}/${fileName}`,
                "utf8"
            );

            assemblyFile += translateFile(vmCode);
        });

    fs.writeFileSync(
        `${inputDirectoryName}/${targetDirectoryName}.asm`,
        assemblyFile
    );
}

function translateFile(vmCode) {
    const removeComments = (line) =>
        (line.includes("//") ? line.slice(0, line.indexOf("//")) : line).trim();
    const removeWhitespaces = (line) => !!line;
    const intoLines = "\r\n";

    const assemblyFile = vmCode
        .split(intoLines)
        .map(removeComments)
        .filter(removeWhitespaces)
        .map(vm2asm)
        .join(intoLines);

    return assemblyFile;
}

function vm2asm(vmInstruction) {
    let asmInstructions = `\n// ${vmInstruction}\n`;

    const [operation, arg1, arg2] = vmInstruction.split(" ");

    asmInstructions += writer[operation](arg1, arg2);

    return asmInstructions;
}

module.exports = translateDirectory;
