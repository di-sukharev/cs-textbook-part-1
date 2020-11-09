import fs from "fs";
import path from "path";
import Parser from "./Parser.mjs";

const { TEMP_BASE_ADDR, SYMBOL } = Object.freeze({
  TEMP_BASE_ADDR: 5, // fixed base addr for TEMP memory segment
  SYMBOL: {
    // vm memory segment to asm symbol mapping
    local: "LCL",
    argument: "ARG",
    this: "THIS",
    that: "THAT",
  },
});

const { pop, push, setD } = Object.freeze({
  pop: [
    "@SP",
    "M=M-1", // point to top of stack
    "A=M",
    "D=M", // pop in D
  ],
  push: [
    "@SP",
    "A=M",
    "M=D", // *SP = D
    "@SP",
    "M=M+1",
  ],
  setD: (baseAddr, offset) => [
    // baseAddr: mem segment variable / integer
    `@${baseAddr}`,
    Number.isInteger(parseInt(baseAddr)) ? "D=A" : "D=M",
    ...(offset ? [`@${offset}`, "A=D+A", "D=M"] : ""),
  ],
});

const genId = ((id = 0) => () => id++)();
const genReturnLabel = (() => {
  let labels = {};
  return (functionName) => {
    labels[functionName] = (labels[functionName] || 0) + 1;
    return `${functionName}$ret.${labels[functionName]}`;
  };
})();

export default class CodeWriter {
  constructor(filename) {
    console.log("Output file:", path.relative(process.cwd(), filename));
    this.lineCount = 0;
    try {
      this.fd = fs.openSync(filename, "w+");
    } catch (err) {
      console.log(err);
    }
  }

  setFilename(filename) {
    this.className = path.basename(filename, ".vm");
    console.log("classname", this.className);
  }

  writeInit() {
    fs.appendFileSync(this.fd, "// BEGIN BOOTSTRAP\n");

    this.writeCode([
      "@256",
      "D=A",
      "@SP",
      "M=D", // SP = 256
    ]);

    this.writeCall("Sys.init", 0);
    fs.appendFileSync(this.fd, "// END BOOTSTRAP\n");
  }

  writeCode(asm, { countLine = true } = {}) {
    const notLabel = (line) => line[0] !== "(";

    if (countLine) {
      if (Array.isArray(asm)) {
        this.lineCount += asm.filter(notLabel).length;
      } else if (notLabel(asm)) {
        this.lineCount++;
      }
    }
    fs.appendFileSync(
      this.fd,
      (Array.isArray(asm) ? asm.join("\n") : asm) + "\n"
    );
  }

  /*
    VM: add
    ASM pseudocode: SP--, D = *SP, SP--, D = D + *SP, *SP = D

    VM: sub
    ASM pseudocode: SP--, D = *SP, SP--, D = *SP - D, *SP = D
  */
  writeArithmetic(command) {
    try {
      fs.appendFileSync(this.fd, `// ${this.lineCount} ${command}\n`);

      var { pop, push, compare } = {
        pop: ({ setD = true } = {}) => [
          "@SP",
          "M=M-1",
          "A=M",
          ...(setD ? ["D=M"] : []),
        ],
        push: ["@SP", "A=M", "M=D", "@SP", "M=M+1"],
        compare: (command, _labelId) => (
          (_labelId = genId()),
          [
            // compares M with D
            "D=M-D",
            `@TRUE_${_labelId}`,
            `D;J${command.toUpperCase()}`,
            "D=0",
            `@THEN_${_labelId}`,
            `0;JMP`,
            `(TRUE_${_labelId})`,
            "D=-1",
            `(THEN_${_labelId})`,
          ]
        ),
      };

      let asm;
      if (command === "add") {
        asm = [].concat(pop(), pop({ setD: false }), "D=D+M", push);
      } else if (command === "sub") {
        asm = [].concat(pop(), pop({ setD: false }), "D=M-D", push);
      } else if (command === "eq" || command === "lt" || command === "gt") {
        asm = [].concat(pop(), pop({ setD: false }), compare(command), push);
      } else if (command === "neg" || command === "not") {
        asm = [].concat(pop(), `D=${command === "neg" ? "-" : "!"}D`, push);
      } else if (command === "and" || command === "or") {
        asm = [].concat(
          pop(),
          pop({ setD: false }),
          `D=D${command === "and" ? "&" : "|"}M`,
          push
        );
      }

      this.writeCode(asm);
    } catch (err) {
      console.log(err);
    }
  }

  /*
    VM: push segment i
    ASM pseudocode: addr = segment + i, *SP = *addr, SP++

    VM: push pointer 0/1
    ASM pseudocode: *SP = THIS/THAT, SP++

    VM: pop segment i
    ASM pseudocode: addr = segment + i, SP--, *addr = *SP

    VM: pop pointer 0/1
    ASM pseudocode: SP--, THIS/THAT=*SP
  */
  writePushPop(command, segment, index) {
    try {
      fs.appendFileSync(
        this.fd,
        `// ${this.lineCount} ${command} ${segment} ${index}\n`
      );

      let asm;
      if (command === Parser.commands.C_PUSH) {
        if (segment === "constant") {
          asm = [].concat(setD(index), push);
        } else if (segment === "temp") {
          asm = [].concat(setD(TEMP_BASE_ADDR, index), push);
        } else if (segment === "pointer") {
          asm = [].concat(setD(index == 0 ? "THIS" : "THAT"), push);
        } else if (segment === "static") {
          asm = [].concat(setD(`${this.className}.${index}`), push);
        } else {
          asm = [].concat(setD(SYMBOL[segment], index), push);
        }
      } else if (command === Parser.commands.C_POP) {
        if (segment === "constant") {
          throw new Error("Cannot pop constant. Exiting...");
        }

        // set up temp variables to impl pop
        const { ADDR } = Object.freeze({
          ADDR: "R13",
        });

        let { addr, addrPtr } = {
          addr: (baseAddr, offset) => [
            // baseAddr: mem segment variable / integer
            `@${baseAddr}`,
            Number.isInteger(parseInt(baseAddr)) ? "D=A" : "D=M",
            `@${offset}`,
            "D=D+A", // baseAddr + offset
            `@${ADDR}`,
            "M=D",
          ],
          addrPtr: [
            `@${ADDR}`,
            "A=M",
            "M=D", // *addr = D
          ],
        };

        if (segment === "temp") {
          asm = [].concat(addr(TEMP_BASE_ADDR, index), pop, addrPtr);
        } else if (segment === "pointer") {
          asm = [].concat(pop, `@${index == 0 ? "THIS" : "THAT"}`, "M=D");
        } else if (segment === "static") {
          asm = [].concat(pop, `@${this.className}.${index}`, "M=D");
        } else {
          asm = [].concat(addr(SYMBOL[segment], index), pop, addrPtr);
        }
      }
      this.writeCode(asm);
    } catch (err) {
      console.log(err);
    }
  }

  writeLabel(label) {
    this.writeCode(`(${this.functionName + "$" + label})`);
  }

  writeIf(label) {
    fs.appendFileSync(this.fd, `// ${this.lineCount} C_IF ${label}\n`);

    this.writeCode([
      "@SP",
      "M=M-1",
      "A=M",
      "D=M",
      `@${this.functionName + "$" + label}`,
      "D;JNE",
    ]);
  }

  writeGoto(label) {
    fs.appendFileSync(this.fd, `// ${this.lineCount} C_GOTO ${label}\n`);

    this.writeCode([`@${this.functionName + "$" + label}`, "0;JMP"]);
  }

  writeFunction(functionName, numLocals) {
    this.functionName = functionName;
    fs.appendFileSync(
      this.fd,
      `// ${this.lineCount} C_FUNCTION ${functionName} ${numLocals}\n`
    );

    this.writeCode(`(${functionName})`);

    if (numLocals > 0) {
      this.writeCode([
        ...Array(parseInt(numLocals))
          .fill()
          .reduce((p, c) => p.concat(setD(0), push), []),
      ]);
    }
  }

  writeReturn() {
    // set up temp variables to impl return
    const { END_FRAME, RETURN_ADDR } = Object.freeze({
      END_FRAME: "R13",
      RETURN_ADDR: "R14",
    });

    let { setVarFromFrame } = {
      setVarFromFrame: (target, offset) => [
        `@${END_FRAME}`,
        "D=M",
        `@${offset}`,
        "A=D-A",
        "D=M",
        `@${target}`,
        "M=D",
      ],
    };

    fs.appendFileSync(this.fd, `// ${this.lineCount} C_RETURN\n`);

    this.writeCode(
      [].concat(
        "@LCL",
        "D=M",
        `@${END_FRAME}`,
        "M=D", // END_FRAME = LCL
        setVarFromFrame(RETURN_ADDR, 5), // RETURN_ADDR = END_FRAME - 5
        pop,
        "@ARG",
        "A=M",
        "M=D", // *ARG = *SP
        "@ARG",
        "D=M+1",
        "@SP",
        "M=D", // SP = ARG + 1
        setVarFromFrame("THAT", 1), // THAT = *(END_FRAME - 1)
        setVarFromFrame("THIS", 2), // THIS = *(END_FRAME - 2)
        setVarFromFrame("ARG", 3), // ARG = *(END_FRAME - 3)
        setVarFromFrame("LCL", 4), // LCL = *(END_FRAME - 4)
        `@${RETURN_ADDR}`,
        "A=M",
        "0;JMP"
      )
    );
  }

  writeCall(functionName, numArgs) {
    const pushVal = (addr) =>
      [].concat(
        `@${addr}`,
        /LCL|ARG|THIS|THAT/.test(addr) ? "D=M" : "D=A",
        push
      );
    const FRAME_SIZE = 5;

    fs.appendFileSync(
      this.fd,
      `// ${this.lineCount} C_CALL ${functionName} ${numArgs}\n`
    );

    const RETURN_LABEL = genReturnLabel(functionName);
    this.writeCode(
      [].concat(
        pushVal(RETURN_LABEL), // push return address
        pushVal("LCL"), // push local segment base address
        pushVal("ARG"), // push arg segment base address
        pushVal("THIS"), // push this segment base address
        pushVal("THAT"), // push that segment base address
        `@${FRAME_SIZE + parseInt(numArgs)}`,
        "D=A",
        "@SP",
        "D=M-D",
        "@ARG",
        "M=D", // ARG = SP - 5 - numArgs
        "@SP",
        "D=M",
        "@LCL",
        "M=D", // LCL = SP
        `@${functionName}`,
        "0;JMP", // goto functionName
        `(${RETURN_LABEL})`
      )
    );
  }

  close() {
    try {
      fs.closeSync(this.fd);
    } catch (err) {
      console.log(err);
    }
  }
}
