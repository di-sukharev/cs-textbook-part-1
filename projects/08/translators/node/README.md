# VM translator
A node.js implementation of [Project 7](http://nand2tetris.org/07.php) in the [Nand2Tetris course](http://nand2tetris.org/) (part 2) that translates a stack based VM code to the Hack assembly language.

<details>
  <summary>Example VM code to Hack assembly</summary>
  <table>
  <tr>
  <th>VM code</th>
  <th>Hack ASM</th>
  </tr>
  <tr>
  <td style="vertical-align: top">
  <pre>
  push constant 10
  push constant 21
  add
  pop argument 2
  </pre>
  </td>
  <td>
  <pre>
// C_PUSH constant 10
@10
D=A
@SP
A=M
M=D
@SP
M=M+1
// C_PUSH constant 21
@21
D=A
@SP
A=M
M=D
@SP
M=M+1
// add
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=D+M
@SP
A=M
M=D
@SP
M=M+1
// C_POP argument 2
@ARG
D=M
@2
D=D+A
@addr
M=D
@SP
M=M-1
@SP
A=M
D=M
@addr
A=M
M=D
  </pre>
  </td>
  </tr>
  </table>
</details>

## Code structure
Object oriented, follows the recommended API specified in the course:

### trans
main program coordinates parsing and translation

### Parser
parses vm file line by line extracting commands, memory segment and index

|Method|Args|Function|
|--|---|---|
|constructor|filename:string|input vm filename|
|hasMoreCommands|n/a|returns true if more lines can be read|
|advance|n/a|gets the next line that is not blank or a comment|
|commandType|n/a|returns the vm command as a  Parser.commands property|
|arg1|n/a|returns the 1st arg in the vm command. eg. `local` in `push local 1`|
|arg2|n/a|returns the 2nd arg in the vm command. returns undefined if command doesn't have one.|

Parser.commands: Constant object with properties {C_ARITHMETIC, C_PUSH, C_POP, C_LABEL, C_GOTO, C_IF, C_FUNCTION, C_RETURN, C_CALL} that describes the command parsed.

### CodeWriter
Converts the VM code to Hack assembly and writes to a file with the same name as the input but with `.asm` extension

|Method|Args|Function|
|--|--|--|
|constructor|filename|output asm filename|
|writeInit|n/a|VM initialisation aka bootstrap code|
|writeArithmetic|command:string|Receives an arithmitic command (eg. add/sub) and writes assembly to file|
|writePushPop|command:Parser.commands, segment:string, index: string|Receives a push/pop command (eg. push LCL 2) and writes assembly to file|
|writeLabel|label:string|assembly for label command|
|writeIf|label:string|assembly for if-goto command|
|writeGoto|label:string|assembly for goto command|
|writeFunction|functionName:string, numLocals:int|assembly for function command|
|writeReturn|n/a|assembly for return command|
|writeCall|functionName:string, numArgs:int|assembly for call command|
|setFilename|filename:string|informs when a new file is being translated|

## Usage
```
npm install
node --experimental-modules trans.mjs <input.vm | dir with vm files>
```

## Test
The code can be tested using the CPUEmulator tool from the [course page](http://nand2tetris.org/software.php).

The course supplies the following test folders:
```
MemoryAccess
StackArithmetic
ProgramFlow
FunctionCalls
```
each containing 2 `.tst` files. `*VME.tst` is used by the VMEmulator tool which lets you step through and understand the VM stack abstraction. `*.tst` is used by the CPUEmulator to test the translated `.asm` file.

To avoid manually running the translator against each and every test directory, `regressTest.sh` can be run to automatically do it for you.


