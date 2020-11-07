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

// ⬇ сюда вернется выполнение программы, когда sys.init функция вернет return ⬇
(RETURN_LABEL0)

// push argument 1
@ARG
D=M
@1
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 1; that = argument[1]
@THAT
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 0
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop that 0; first element in the series = 0
@THAT
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

// push constant 1
@1
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop that 1; second element in the series = 1
@THAT
D=M
@1
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

// push constant 2
@2
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

// pop argument 0; num_of_elements -= 2 (first 2 elements are set)
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

// label MAIN_LOOP_START
(MAIN_LOOP_START)

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

// if-goto COMPUTE_ELEMENT; if num_of_elements > 0, goto COMPUTE_ELEMENT
@SP
AM=M-1
D=M
A=A-1
@COMPUTE_ELEMENT
D;JNE

// goto END_PROGRAM; otherwise, goto END_PROGRAM
@END_PROGRAM
0;JMP

// label COMPUTE_ELEMENT
(COMPUTE_ELEMENT)

// push that 0
@THAT
D=M
@0
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// push that 1
@THAT
D=M
@1
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

// pop that 2; that[2] = that[0] + that[1]
@THAT
D=M
@2
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push pointer 1
@THAT
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

// pop pointer 1; that += 1
@SP
AM=M-1
D=M
A=A-1
M=M+D
@THAT
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
@ARG
D=M

// push argument 0
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

// pop argument 0; num_of_elements--
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

// goto MAIN_LOOP_START
@MAIN_LOOP_START
0;JMP

// label END_PROGRAM
(END_PROGRAM)
