undefined@256
D=A
@SP
M=D
undefined
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
@undefined.undefined$IF_TRUE
D;JNE
// goto IF_FALSE 
@undefined.undefined$IF_FALSE
0;JMP
// label IF_TRUE 
(undefined.undefined$IF_TRUE)
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
@5
D=A
@LCL
A=M-D
D=M
@returnAddress
M=D
@SP
A=M-1
D=M
@ARG
A=M
M=D
D=A+1
@SP
M=D
@LCL
D=M
@R13
AM=D-1
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
@returnAddress
A=M
0;JMP
// label IF_FALSE 
(undefined.undefined$IF_FALSE)
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
@5
D=A
@LCL
A=M-D
D=M
@returnAddress
M=D
@SP
A=M-1
D=M
@ARG
A=M
M=D
D=A+1
@SP
M=D
@LCL
D=M
@R13
AM=D-1
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
@returnAddress
A=M
0;JMP@256
D=A
@SP
M=D
undefined
// function Sys.init 0 
undefined
// push constant 4 
@4
D=A
@SP
A=M
M=D
@SP
M=M+1
// call Main.fibonacci 1 
undefined
// label WHILE 
(undefined.undefined$WHILE)
// goto WHILE 
@undefined.undefined$WHILE
0;JMP