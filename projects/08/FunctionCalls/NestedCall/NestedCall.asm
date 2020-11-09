// Processing ../../../08/FunctionCalls/NestedCall/Sys.vm
// function Sys.init 0
// FUNCTION Sys.init with 0 local variables
(Sys.init)

// push constant 4000
// Push 4000 onto the stack
@4000
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 0
// Pop the stack into POINTER[0]
@0
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

// push constant 5000
// Push 5000 onto the stack
@5000
D=A
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

// call Sys.main 0
// CALL FUNCTION Sys.main with 0 arguments
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
@Sys.main
0;JMP
(r0)

// pop temp 1
// Pop the stack into TEMP[1]
@1
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

// label LOOP
// Define label: LOOP
(Sys.init$LOOP)

// goto LOOP
// GOTO label: LOOP
@Sys.init$LOOP
0;JMP

// function Sys.main 5
// FUNCTION Sys.main with 5 local variables
(Sys.main)
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
@SP
A=M
M=0
@SP
M=M+1

// push constant 4001
// Push 4001 onto the stack
@4001
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 0
// Pop the stack into POINTER[0]
@0
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

// push constant 5001
// Push 5001 onto the stack
@5001
D=A
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

// push constant 200
// Push 200 onto the stack
@200
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop local 1
// Pop the stack into LCL[1]
@1
D=A
@LCL
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 40
// Push 40 onto the stack
@40
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop local 2
// Pop the stack into LCL[2]
@2
D=A
@LCL
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 6
// Push 6 onto the stack
@6
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop local 3
// Pop the stack into LCL[3]
@3
D=A
@LCL
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 123
// Push 123 onto the stack
@123
D=A
@SP
A=M
M=D
@SP
M=M+1

// call Sys.add12 1
// CALL FUNCTION Sys.add12 with 1 arguments
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
@Sys.add12
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

// push local 2
// Push LCL[2] onto the stack
@2
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push local 3
// Push LCL[3] onto the stack
@3
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push local 4
// Push LCL[4] onto the stack
@4
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

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

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

// function Sys.add12 0
// FUNCTION Sys.add12 with 0 local variables
(Sys.add12)

// push constant 4002
// Push 4002 onto the stack
@4002
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 0
// Pop the stack into POINTER[0]
@0
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

// push constant 5002
// Push 5002 onto the stack
@5002
D=A
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

// push constant 12
// Push 12 onto the stack
@12
D=A
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

