// Импортируем File Storage "fs" модуль для работы с файловой системой
const fs = require("fs");
// Импортируем класс Assembler из файла рядом Assembler.js
const Assembler = require("./Assembler.js");

// Получаем аргументы с которыми был запущен скрипт
const inputFile = process.argv[3];
const outputFile = process.argv[4];

// Выводим аргументы в консоль, чтобы посмотреть на них в момент запуска скрипта
console.log("args: ", { inputFile, outputFile });

// Если аргумент inputFile не был передан или это не .asm файл, выбрасываем ошибку
if (!inputFile || !inputFile.endsWith(".asm"))
  throw new Error("Only .asm file can be assembled into .hack");

// Если аргумент outputFile не был передан или это не .hack файл, выбрасываем ошибку
if (!outputFile || !outputFile.endsWith(".hack"))
  throw new Error("Only .hack file can be served as output");

// Создаем экземпляр класса Assembler
const assembler = new Assembler();

// Пишем в консоль о начале выполнения скрипта
console.log("Started assembling ⏳");

// Читаем файл по адресу [inputFile], сохраняем содержание файла в переменную assembly
const assembly = fs.readFileSync(inputFile, "utf8");
// Компилируем код на языке ассемблера в машинный язык, сохраняем результат в перменную binary
const binary = assembler.assemble(assembly);
// Создаем файл по адресу [outputFile], записываем результат компиляции в файл
fs.writeFileSync(outputFile, binary);

// Пишем в консоль о завершении выполнения скрипта
console.log(`Finished assembling 🌞`);
