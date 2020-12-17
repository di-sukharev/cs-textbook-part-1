@256
D=A
@SP
M=D
// function Main.fibonacci 0 
undefined
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
// lt 
@SP
AM=M-1
D=M
A=A-1
D=M-D
@FALSE0
D;JGE
@SP
A=M-1
M=-1
@CONTINUE0
0;JMP
(FALSE0)
@SP
A=M-1
M=0
(CONTINUE0)
// if-goto IF_TRUE 
@SP
AM=M-1
D=M
@IF_TRUE
D;JNE
// goto IF_FALSE 
@IF_FALSE
0;JMP
// label IF_TRUE 
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
// return 
undefined
// label IF_FALSE 
(IF_FALSE)
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
// call Main.fibonacci 1 
undefined
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
// call Main.fibonacci 1 
undefined
// add 
@SP
AM=M-1
D=M
A=A-1
M=M+D
// return 
undefined