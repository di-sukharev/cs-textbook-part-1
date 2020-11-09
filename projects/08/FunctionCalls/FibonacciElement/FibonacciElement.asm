// Writing bootstrap code
// Initialize stack pointer
@256
D=A
@SP
M=D

// CALL FUNCTION Sys.init with 0 arguments
@r0
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
@LCL
M=D
@5
D=D-A
@0
D=D-A
@ARG
M=D
@Sys.init
0;JMP
(r0)

// Processing ../../../08/FunctionCalls/FibonacciElement/Main.vm
// function Main.fibonacci 0
// FUNCTION Main.fibonacci with 0 local variables
(Main.fibonacci)

// push argument 0
// Push ARG[0] onto the stack
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 2
// Push 2 onto the stack
@2
D=A
@SP
A=M
M=D
@SP
M=M+1

// lt
// Pop 2 from the stack, compare less than, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j0
D;JLT
@SP
A=M-1
M=0
@j0end
0;JMP
(j0)
@SP
A=M-1
M=-1
(j0end)

// if-goto IF_TRUE
// IF-GOTO label: IF_TRUE
@SP
AM=M-1
D=M
@Main.fibonacci$IF_TRUE
D;JNE

// goto IF_FALSE
// GOTO label: IF_FALSE
@Main.fibonacci$IF_FALSE
0;JMP

// label IF_TRUE
// Define label: IF_TRUE
(Main.fibonacci$IF_TRUE)

// push argument 0
// Push ARG[0] onto the stack
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// return
// Return to the calling function.
@LCL
D=M
@R13
M=D
@5
A=D-A
D=M
@R14
M=D
@SP
AM=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@R13
AM=M-1
D=M
@THAT
M=D
@R13
AM=M-1
D=M
@THIS
M=D
@R13
AM=M-1
D=M
@ARG
M=D
@R13
AM=M-1
D=M
@LCL
M=D
@R14
A=M
0;JMP

// label IF_FALSE
// Define label: IF_FALSE
(Main.fibonacci$IF_FALSE)

// push argument 0
// Push ARG[0] onto the stack
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 2
// Push 2 onto the stack
@2
D=A
@SP
A=M
M=D
@SP
M=M+1

// sub
// Pop 2 from the stack, subtract, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=M-D

// call Main.fibonacci 1
// CALL FUNCTION Main.fibonacci with 1 arguments
@r1
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
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Main.fibonacci
0;JMP
(r1)

// push argument 0
// Push ARG[0] onto the stack
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 1
// Push 1 onto the stack
@1
D=A
@SP
A=M
M=D
@SP
M=M+1

// sub
// Pop 2 from the stack, subtract, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=M-D

// call Main.fibonacci 1
// CALL FUNCTION Main.fibonacci with 1 arguments
@r2
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
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Main.fibonacci
0;JMP
(r2)

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// return
// Return to the calling function.
@LCL
D=M
@R13
M=D
@5
A=D-A
D=M
@R14
M=D
@SP
AM=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@R13
AM=M-1
D=M
@THAT
M=D
@R13
AM=M-1
D=M
@THIS
M=D
@R13
AM=M-1
D=M
@ARG
M=D
@R13
AM=M-1
D=M
@LCL
M=D
@R14
A=M
0;JMP

// Processing ../../../08/FunctionCalls/FibonacciElement/Sys.vm
// function Sys.init 0
// FUNCTION Sys.init with 0 local variables
(Sys.init)

// push constant 4
// Push 4 onto the stack
@4
D=A
@SP
A=M
M=D
@SP
M=M+1

// call Main.fibonacci 1
// CALL FUNCTION Main.fibonacci with 1 arguments
@r3
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
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Main.fibonacci
0;JMP
(r3)

// label WHILE
// Define label: WHILE
(Sys.init$WHILE)

// goto WHILE
// GOTO label: WHILE
@Sys.init$WHILE
0;JMP

