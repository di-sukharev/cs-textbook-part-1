// Processing ../../../08/FunctionCalls/SimpleFunction/SimpleFunction.vm
// function SimpleFunction.test 2
// FUNCTION SimpleFunction.test with 2 local variables
(SimpleFunction.test)
@SP
A=M
M=0
@SP
M=M+1
@SP
A=M
M=0
@SP
M=M+1

// push local 0
// Push LCL[0] onto the stack
@0
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push local 1
// Push LCL[1] onto the stack
@1
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// not
// Pop 1 from the stack, NOT it, and put result on the stack.
@SP
A=M-1
M=!M

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

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// push argument 1
// Push ARG[1] onto the stack
@1
D=A
@ARG
A=M+D
D=M
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

