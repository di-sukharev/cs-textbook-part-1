// INIT @SP
@256
D=A
@SP
M=D
// declaring function SimpleFunction.test 2
(SimpleFunction.test)
// initialize LCL segment values
@2
D=A
@SP
AM=D+M
// declaring local 0
A=A-1
M=0
// declaring local 1
A=A-1
M=0
// push local 0
// save LCL+0 into D
@LCL
D=M
@0
A=D+A
D=M
// push D on stack
@SP
M=M+1
A=M-1
M=D
// push local 1
// save LCL+1 into D
@LCL
D=M
@1
A=D+A
D=M
// push D on stack
@SP
M=M+1
A=M-1
M=D
@SP
AM=M-1
D=M
A=A-1
M=D+M
// not
@SP
A=M-1
M=!M
// push argument 0
// save ARG+0 into D
@ARG
D=M
@0
A=D+A
D=M
// push D on stack
@SP
M=M+1
A=M-1
M=D
@SP
AM=M-1
D=M
A=A-1
M=D+M
// push argument 1
// save ARG+1 into D
@ARG
D=M
@1
A=D+A
D=M
// push D on stack
@SP
M=M+1
A=M-1
M=D
@SP
AM=M-1
D=M
A=A-1
M=M-D
// save return address in R14
@5
D=A
@LCL
A=M-D
D=M
@R14
M=D
// move return value on caller stack, reset SP
@SP
A=M-1
D=M
@ARG
A=M
M=D
D=A+1
@SP
M=D
// pop contexts of previous function
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
// jump to return address
@R14
A=M
0;JMP
// ENDLESS LOOP
(SimpleFunction.test$genlabel$1)
@SimpleFunction.test$genlabel$1
0;JMP
