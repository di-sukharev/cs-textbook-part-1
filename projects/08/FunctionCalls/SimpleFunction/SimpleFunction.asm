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

// SimpleFunction.test функция
(SimpleFunction.test)
@0
D=A
@SP
A=M
M=D
@SP
M=M+1
@0
D=A
@SP
A=M
M=D
@SP
M=M+1
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
@LCL
D=M
@1
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
A=A-1
M=M+D
@SP
A=M-1
M=!M
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
@SP
AM=M-1
D=M
A=A-1
M=M+D
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
@SP
AM=M-1
D=M
A=A-1
M=M-D
@LCL
D=M
@R11
M=D
@5
A=D-A
D=M
@R12
M=D
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
@ARG
D=M
@SP
M=D+1
@R11
D=M-1
AM=D
D=M
@THAT
M=D
@R11
D=M-1
AM=D
D=M
@THIS
M=D
@R11
D=M-1
AM=D
D=M
@ARG
M=D
@R11
D=M-1
AM=D
D=M
@LCL
M=D
@R12
A=M
0;JMP
