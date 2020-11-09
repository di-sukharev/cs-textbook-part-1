// Processing ../../../08/ProgramFlow/BasicLoop/BasicLoop.vm
// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop local 0
// Pop the stack into LCL[0]
@0
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

