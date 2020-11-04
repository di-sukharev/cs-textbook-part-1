// устанавливаем значение SP = 256
@256
D=A
@SP
M=D

// сохраняем в стек return адрес строки
@RETURN_LABEL0
D=A
@SP
A=M
M=D

// увеличиваем SP
@SP
M=M+1

// сохраняем в стек LCL (как часть frame)
@LCL
D=M
@SP
A=M
M=D

// увеличиваем SP
@SP
M=M+1

// сохраняем в стек ARG (как часть frame)
@ARG
D=M
@SP
A=M
M=D

// увеличиваем SP
@SP
M=M+1

// сохраняем в стек THIS (как часть frame)
@THIS
D=M
@SP
A=M
M=D

// SP ++
@SP
M=M+1

// сохраняем в стек THAT (как часть frame)
@THAT
D=M
@SP
A=M
M=D

// SP++
@SP
M=M+1

// переключаем ARG на n аргументов назад, здесь n = 0
@SP
D=M
@5 // контекст функции (frame)
D=D-A
@0 // n = 0
D=D-A
@ARG // переключаем ARG
M=D

// переключаем LCL и SP на начало нового контекста (frame)
@SP
D=M
@LCL
M=D

// переходим к выполнению sys.init функции
@Sys.init
0;JMP

// сюда вернется sys.init функция
(RETURN_LABEL0)

// push constant 0
@0
D=A
@SP
A=M
M=D
// SP ++
@SP
M=M+1

// pop local 0
@LCL
D=M
@0
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// label LOOP_START
(LOOP_START)

// push argument 0
@ARG
D=M
@0
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// push local 0
@LCL
D=M
@0
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
@SP
AM=M-1
D=M
A=A-1
M=M+D

// pop local 0
@LCL
D=M
@0
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push argument 0
@ARG
D=M
@0
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 1
@1
D=A
@SP
A=M
M=D
@SP
M=M+1

// sub
@SP
AM=M-1
D=M
A=A-1
M=M-D

// pop argument 0 (counter --)
@ARG
D=M
@0
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push argument 0
@ARG
D=M
@0
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// if-goto LOOP_START
@SP
AM=M-1 // флекс
D=M
@LOOP_START
D;JGT // if last stack el is gt 0 -> goto LOOP_START

// push local 0
@LCL
D=M
@0
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
