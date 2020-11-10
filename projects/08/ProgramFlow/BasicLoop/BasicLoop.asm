// INIT @SP
@256
D=A
@SP
M=D
// push constant 0
// save 0 into D
@0
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// pop local 0
@LCL
D=M
@0
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
(BasicLoop.$nofunction$LOOP_START)
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
@SP
AM=M-1
D=M
A=A-1
M=D+M
// pop local 0
@LCL
D=M
@0
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
// push constant 1
// save 1 into D
@1
D=A
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
// pop argument 0
@ARG
D=M
@0
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
// if-goto BasicLoop.$nofunction$LOOP_START
@SP
AM=M-1
D=M
@BasicLoop.$nofunction$LOOP_START
D;JNE
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
// ENDLESS LOOP
(BasicLoop.$nofunction$genlabel$1)
@BasicLoop.$nofunction$genlabel$1
0;JMP
