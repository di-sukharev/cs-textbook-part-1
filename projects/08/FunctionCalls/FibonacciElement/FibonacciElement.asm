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

// здесь начинается Main.fibonacci
(Main.fibonacci)

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

// lt; checks if n<2
@SP
AM=M-1
D=M
A=A-1
D=M-D

@FALSE0 // goto FALSE0, where we write false on stack
D;JGE // if n - 2 > 0

@SP // or if n - 2 < 0, than n is lt 2,
A=M-1 // so we go to the last element in stack
M=-1 // and rewrite it to all ones 11…11, meaning true

@CONTINUE0 // continue program flow
0;JMP

(FALSE0) // if-else; false label
@SP
A=M-1 // rewrite last stack with 0, meaning false
M=0

(CONTINUE0) // program flow continues aftes if/else thing above
@SP
AM=M-1
D=M
A=A-1
@IF_TRUE // if last stack element is true
D;JNE // goto IF_TRUE, JNE is used because true === -1
@IF_FALSE // if last stack el. is false
0;JMP // goto else

// label IF_TRUE; if n<2, return n
(IF_TRUE)

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

//⬇ return ⬇

// save LCL pointer to R11
@LCL
D=M
@R11
M=D

// save return address to R12
@5
A=D-A
D=M
@R12
M=D

// save ARG pointer to R13
@ARG
D=M
@0 // n = 0, as it was in the very begging
D=D+A
@R13
M=D

// save return value to argument 0
@SP
AM=M-1
D=M
@R13 // argument 0
A=M
M=D
// take ARG address
@ARG
D=M
// and set SP to ARG+1
@SP
M=D+1

// take LCL pointer from R11
@R11 // let LCL = 250
D=M-1 // 249
AM=D // R11 = RAM[249]; RAM[249]=249
D=M // D=RAM[249]=249
@THAT
M=D // @THAT = 249
@R11 // 249
D=M-1 // 248
AM=D // R11 = RAM[248]; RAM[248]=248
D=M // D=RAM[248]=248
@THIS
M=D // @THIS = 249
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

// goto return address
@R12
A=M
0;JMP

// label IF_FALSE; if n>=2, returns fib(n-2)+fib(n-1)
(IF_FALSE)
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
@2
D=A
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
@RETURN_LABEL1
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@5
D=D-A
@1
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
@Main.fibonacci
0;JMP
(RETURN_LABEL1)
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
@1
D=A
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
@RETURN_LABEL2
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@5
D=D-A
@1
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
@Main.fibonacci
0;JMP
(RETURN_LABEL2)
@SP
AM=M-1
D=M
A=A-1
M=M+D
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

// здесь начинается function Sys.init 0
(Sys.init)

// push constant 4
@4
D=A
@SP
A=M
M=D
@SP
M=M+1

// return to Sys.Init
@RETURN_LABEL3
D=A
@SP
A=M
M=D
@SP
M=M+1

// push LCL
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1

// push ARG
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1

// push THIS
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1

// push THAT
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1

// moving ARG to 5 and 1 stack indexes back
@SP
D=M
@5
D=D-A
@1 // n=1
D=D-A
@ARG
M=D

// moving SP and LCL to blank stack space
@SP
D=M
@LCL
M=D

// call Main.fibonacci 1; computes the 4'th fibonacci element
@Main.fibonacci
0;JMP

// continue program flow
(RETURN_LABEL3)
(WHILE)

// бесконечный цикл
@WHILE
0;JMP
