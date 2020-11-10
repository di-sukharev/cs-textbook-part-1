// INIT @SP
@256
D=A
@SP
M=D
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
@4
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
// save 0 into D
@0
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// pop that 0
@THAT
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
// push constant 1
// save 1 into D
@1
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// pop that 1
@THAT
D=M
@1
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
// push constant 2
// save 2 into D
@2
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
(FibonacciSeries.$nofunction$MAIN_LOOP_START)
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
// if-goto FibonacciSeries.$nofunction$COMPUTE_ELEMENT
@SP
AM=M-1
D=M
@FibonacciSeries.$nofunction$COMPUTE_ELEMENT
D;JNE
// goto FibonacciSeries.$nofunction$END_PROGRAM
@FibonacciSeries.$nofunction$END_PROGRAM
0;JMP
(FibonacciSeries.$nofunction$COMPUTE_ELEMENT)
// push that 0
// save THAT+0 into D
@THAT
D=M
@0
A=D+A
D=M
// push D on stack
@SP
M=M+1
A=M-1
M=D
// push that 1
// save THAT+1 into D
@THAT
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
// pop that 2
@THAT
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
// push pointer 1
// manage 4 (temp or pointer segment)
@4
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
M=D+M
@4
D=A
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
// goto FibonacciSeries.$nofunction$MAIN_LOOP_START
@FibonacciSeries.$nofunction$MAIN_LOOP_START
0;JMP
(FibonacciSeries.$nofunction$END_PROGRAM)
// ENDLESS LOOP
(FibonacciSeries.$nofunction$genlabel$1)
@FibonacciSeries.$nofunction$genlabel$1
0;JMP
