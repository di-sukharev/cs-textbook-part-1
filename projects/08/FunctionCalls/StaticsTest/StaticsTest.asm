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

// Processing ../../../08/FunctionCalls/StaticsTest/Class1.vm
// function Class1.set 0
// FUNCTION Class1.set with 0 local variables
(Class1.set)

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

// pop static 0
// Pop the stack into STATIC[0]
@Class1.0
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

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

// pop static 1
// Pop the stack into STATIC[1]
@Class1.1
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
// Push 0 onto the stack
@0
D=A
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

// function Class1.get 0
// FUNCTION Class1.get with 0 local variables
(Class1.get)

// push static 0
// Push STATIC[0] onto the stack
@Class1.0
D=M
@SP
A=M
M=D
@SP
M=M+1

// push static 1
// Push STATIC[1] onto the stack
@Class1.1
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

// Processing ../../../08/FunctionCalls/StaticsTest/Sys.vm
// function Sys.init 0
// FUNCTION Sys.init with 0 local variables
(Sys.init)

// push constant 6
// Push 6 onto the stack
@6
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 8
// Push 8 onto the stack
@8
D=A
@SP
A=M
M=D
@SP
M=M+1

// call Class1.set 2
// CALL FUNCTION Class1.set with 2 arguments
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
@2
D=D-A
@ARG
M=D
@Class1.set
0;JMP
(r1)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 23
// Push 23 onto the stack
@23
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 15
// Push 15 onto the stack
@15
D=A
@SP
A=M
M=D
@SP
M=M+1

// call Class2.set 2
// CALL FUNCTION Class2.set with 2 arguments
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
@2
D=D-A
@ARG
M=D
@Class2.set
0;JMP
(r2)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// call Class1.get 0
// CALL FUNCTION Class1.get with 0 arguments
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
@0
D=D-A
@ARG
M=D
@Class1.get
0;JMP
(r3)

// call Class2.get 0
// CALL FUNCTION Class2.get with 0 arguments
@r4
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
@Class2.get
0;JMP
(r4)

// label WHILE
// Define label: WHILE
(Sys.init$WHILE)

// goto WHILE
// GOTO label: WHILE
@Sys.init$WHILE
0;JMP

// Processing ../../../08/FunctionCalls/StaticsTest/Class2.vm
// function Class2.set 0
// FUNCTION Class2.set with 0 local variables
(Class2.set)

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

// pop static 0
// Pop the stack into STATIC[0]
@Class2.0
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

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

// pop static 1
// Pop the stack into STATIC[1]
@Class2.1
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
// Push 0 onto the stack
@0
D=A
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

// function Class2.get 0
// FUNCTION Class2.get with 0 local variables
(Class2.get)

// push static 0
// Push STATIC[0] onto the stack
@Class2.0
D=M
@SP
A=M
M=D
@SP
M=M+1

// push static 1
// Push STATIC[1] onto the stack
@Class2.1
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

