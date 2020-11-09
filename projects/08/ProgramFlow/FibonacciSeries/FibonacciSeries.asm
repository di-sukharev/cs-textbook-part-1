// Processing ../../../08/ProgramFlow/FibonacciSeries/FibonacciSeries.vm
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

// pop pointer 1
// Pop the stack into POINTER[1]
@1
D=A
@3
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop that 0
// Pop the stack into THAT[0]
@0
D=A
@THAT
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 1
// Push 1 onto the stack
@1
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop that 1
// Pop the stack into THAT[1]
@1
D=A
@THAT
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

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

// pop argument 0
// Pop the stack into ARG[0]
@0
D=A
@ARG
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

