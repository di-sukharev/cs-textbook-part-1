// Импортируем File System "fs" модуль для работы с файловой системой
const fs = require("fs");
// Импортируем класс Assembler из файла Assembler.js рядом
const Assembler = require("./Assembler.js");

// Получаем аргументы с которыми был запущен скрипт
const inputFile = process.argv[2];
const outputFile = process.argv[3];

// Выводим аргументы в консоль, чтобы посмотреть на них в момент запуска скрипта
console.log({inputFile, outputFile})

// Если аргумент inputFile не был передан или это не .asm файл, выбрасываем ошибку
if (!inputFile || !inputFile.endsWith(".asm")) {
  throw new Error("инпут файл не .asm")
}

// Если аргумент outputFile не был передан или это не .hack файл, выбрасываем ошибку


// Создаем экземпляр класса Assembler
const assembler = new Assembler(inputFile)

// Пишем в консоль о начале выполнения скрипта
console.log("Начали скрипт")

// Читаем файл по адресу [inputFile], сохраняем содержание файла в переменную assembly
const assembly = fs.readFileSync(inputFile, "utf8");

// Компилируем код на языке ассемблера в машинный язык, сохраняем результат в перменную hack
const hack = assembler.assemble(assembly);

// Создаем файл по адресу [outputFile], записываем результат компиляции в файл
fs.writeFileSync(outputFile, hack);

// Пишем в консоль о завершении выполнения скрипта
console.log("Завершили скрипт");
