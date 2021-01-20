const INSTRUCTIONS = {
  A: "ADDRESS",
  C: "COMPUTE",
  L: "LABEL",
};

class Assembler {
  // Все кастомные переменные начинаются с 16ого регистра. С RAM[16] до RAM[256].
  freeVariableAddress = 16;

  // Предустановленные переменные
  VARIABLES = {
    R0: 0, // RAM[0];
    R1: 1,
    R2: 2,
    R3: 3,
    R4: 4,
    R5: 5,
    R6: 6,
    R7: 7,
    R8: 8,
    R9: 9,
    R10: 10,
    R11: 11,
    R12: 12,
    R13: 13,
    R14: 14,
    R15: 15,
    // IO
    SCREEN: 16384,
    KBD: 24578,
    // VM
    SP: 0,
    LCL: 1,
    ARG: 2,
    THIS: 3,
    THAT: 4,
  };

  // Объект LABELS={[название лейбла]: [номер строки]}
  LABELS = {};
  // labelsCount используется для корректировки номеров строки лейблов после их фильтрации
  labelsCount = 0;

  constructor() {
    return this;
  }

  // получаем содержимое .asm файла в аргументе asm, как строку
  assemble(asm) {
    const noComments = (line) => !line.includes("//");
    const noEmptyLines = (lines) => Boolean(lines);
    // 1. Разбиваем строку asm на массив строк, так с кодом будет удобнее работать
    // 2. Вырезаем из каждой строки комментарии
    // 3. Фильтруем пустые строки из asm кода
    const lines = asm
                  .split("\r\n")
                  .filter(noComments)
                  .filter(noEmptyLines);
    
    console.log(lines);

    // 4. В методе this.initLabels: записываем все лейблы в таблицу LABELS: {[название лейбла]: [номер строки]}
    lines.forEach(this.initLabels);
    // 5. Фильтруем лейблы из asm кода
    // 6. В методе this.asm2hack: переводим каждую строку из языка ассемблера (asm) в машинный код (hack)
    // 7. Возвращаем hack код
  }

  initLabels(instruction, lineNumber) {
    // Если инструкция не LABEL, пропускаем ее
    if (this.getType(instruction) != INSTRUCTIONS.L) return;

    // Вырезаем название лейбла из инструкции (SOME)
    const [_, value] = instruction.match(
      /\((.+)\)/i
    );

    // Сохраняем в "LABELS[название лейбла]" = "номер строки на которую он ссылается"
    this.LABELS[value] = lineNumber - this.labelsCount;

    // Когда все лейблы будут вырезаны из asm кода, строки сдвинутся вверх (код станет меньше)
    // labelsCount — это корректировка номера строки каждого лейбла
    this.labelsCount++;
  }

  asm2hack(instruction) {
    // Если this.getType(instruction) === INSTRUCTIONS.A: переводим инструкцию, как А, в методе translateA
    // Если this.getType(instruction) === INSTRUCTIONS.C: переводим инструкцию, как С, в методе translateC
    // Если неизвестная инструкция: выбрасываем ошибку
  }

  getType(instruction) {
    // Определяем тип инструкции по ее содержанию, всего 4 варианта:
    // 1. Инструкция А, если содержит символ "@"
    // 2. Лейбл, если содержит символ "(" и символ ")"
    // 3. Инструкция С, если содержит символы "=" или ";"
    // 4. Неизвестная инструкция

    // возвращаем тип инструкции
    return type;
  }

  translateA(instruction) {
    const decToBin = (dec) => {
      /* Переводит десятичное число в двоичное */
    };
    const fillWith15EmptyBits = (bin) => {
      /* Заполняет число нулями слева, до 16 бит */
    };
    const getValueOfInstructionA = (instruction) => {
      /* Возвращает значение из инструкции А, @12345 вернет 12345 */
    };

    let value = getValueOfInstructionA(instruction);

    // Если в значении инструкции А есть "не число", то это лейбл или переменная
    const isLabelOrVariable = value.match(
      /напишите регулярное выражение проверки значения на "не число"/i
    );

    // Если значение инструкции А это лейбл или переменная
    if (isLabelOrVariable) {
      value =
        // Если существует такой лейбл
        // Присваиваем лейблу его номер строки
        getLabel(value) ||
        // Если существует такая переменная
        // Присваиваем переменной ее адрес в памяти
        this.getVariable(value) ||
        // Во всех остальных случаях инициализируем новую переменную
        this.initVariable(value);
    }

    const hack = `0${fillWith15EmptyBits(decToBin(value))}`;

    return hack;
  }

  getLabel(labelName) {
    // Возвращает значение лейбла из this.LABELS по ключу labelName
    // Если такого лейбла нет, возвращает undefined
  }

  getVariable(variableName) {
    // Возвращает адрес регистра переменной из this.VARIABLES по ключу variableName
    // Если такой переменной нет, возвращает undefined
  }

  initVariable(variableName) {
    // 1. Сохраняем адрес переменной в объект this.VARIABLES: {[название переменной]: [адрес в памяти]}
    // Адреса переменных начинаются с 16ого регистра и хранятся в свойстве freeVariableAddress

    // 2. Следующую переменную будем записывать в следующий регистр, поэтому увеличиваем freeVariableAddress на единицу

    // 3. Возвращаем адрес инициализированной переменной
    return address;
  }

  translateC(instruction) {
    // В методе translatePartsOfC: Переводим инструкцию в машинный код по частям, получаем три части { comp, dest, jump }
    const { comp, dest, jump } = this.translatePartsOfC(instruction);

    // Возвращаем переведенную в машинный код инструкцию, как строку
    return `111${comp}${dest}${jump}`;
  }

  translatePartsOfC(instruction) {
    // Разделяем инструкцию на три части { comp, dest, jump }

    // Каждую часть переводим в соответствущем методе _translate____

    // Возвращаем три переведенные части отдельно, как свойства объекта
    return { comp, dest, jump };
  }

  _translateDest(symbols) {
    // prettier-ignore
    switch (symbols) {
            case "M":   return '001';
            case "D":   return '010';
            case "MD":  return 'переведите эту инструкцию сами';
            case "A":   return '100';
            case "AM":  return '101';
            case "AD":  return '110';
            case "AMD": return 'переведите эту инструкцию сами';
            case null:  return '000';
            default:    return null;
        }
  }

  _translateComp(symbols) {
    // prettier-ignore
    switch (symbols) {
            // a = 0
            case "0":   return '0101010';
            case "1":   return '0111111';
            case "-1":  return '0111010';
            case "D":   return '0001100';
            case "A":   return '0110000';
            case "!D":  return '0001101';
            case "!A":  return '0110001';
            case "-D":  return '0001111';
            case "-A":  return '0110011';
            case "D+1": return 'переведите эту инструкцию сами';
            case "A+1": return '0110111';
            case "D-1": return '0001110';
            case "A-1": return '0110010';
            case "D+A": return '0000010';
            case "D-A": return 'переведите эту инструкцию сами';
            case "A-D": return '0000111';
            case "D&A": return '0000000';
            case "D|A": return '0010101';
            // a = 1
            case "M":   return '1110000';
            case "!M":  return '1110001';
            case "-M":  return 'переведите эту инструкцию сами';
            case "M+1": return '1110111';
            case "M-1": return '1110010';
            case "D+M": return 'переведите эту инструкцию сами';
            case "D-M": return '1000010';
            case "M-D": return '1000111';
            case "D&M": return '1000000';
            case "D|M": return '1010101';
            case null:  return '';
            default:    return null;
        }
  }

  _translateJump(symbols) {
    // prettier-ignore
    switch (symbols) {
            case "JGT":     return '001';
            case "JEQ":     return 'переведите эту инструкцию сами';
            case "JGE":     return '011';
            case "JLT":     return '100';
            case "JNE":     return 'переведите эту инструкцию сами';
            case "JLE":     return '110';
            case "JMP":     return '111';
            case null:      return '000';
            default:        return null;
        }
  }
}

module.exports = Assembler;
