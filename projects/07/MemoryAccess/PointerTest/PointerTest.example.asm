// this test needs no initialization of SP and segments

// push constant 3030
@3030
D=A
@SP
M=M+1
A=M-1
M=D

// pop pointer 0
@THIS
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 3040
@3040
D=A
@SP
M=M+1
A=M-1
M=D

// pop pointer 1
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

// push constant 32
@32
D=A
@SP
M=M+1
A=M-1
M=D

// pop this 2
@THIS
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

// push constant 46
@46
D=A
@SP
M=M+1
A=M-1
M=D

// pop that 6
@THAT
D=M
@6
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push pointer 0
@THIS
D=M
@SP
M=M+1
A=M-1
M=D

// push pointer 1
@THAT
D=M
@SP
M=M+1
A=M-1
M=D

// add
@SP
AM=M-1
D=M
A=A-1
M=M+D

// push this 2
@THIS
D=M
@2
A=D+A
D=M
@SP
M=M+1
A=M-1
M=D

// sub
@SP
AM=M-1
D=M
A=A-1
M=M-D

// push that 6
@THAT
D=M
@6
A=D+A
D=M
@SP
M=M+1
A=M-1
M=D

// add
@SP
AM=M-1
D=M
A=A-1
M=M+D