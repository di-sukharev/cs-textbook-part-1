// INIT @SP | write_init
@256
D=A
@SP
M=D
// push argument 1 | write_push
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
// pop pointer 1 | write_pop
@4
D=A
// Write D to R13, pop from stack, write to *R13
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// push constant 0 | write_push
@0
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// pop that 0 | write_pop
@THAT
D=M
@0
D=D+A
// Write D to R13, pop from stack, write to *R13
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// push constant 1 | write_push
@1
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// pop that 1 | write_pop
@THAT
D=M
@1
D=D+A
// Write D to R13, pop from stack, write to *R13
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// push argument 0 | write_push
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
// push constant 2 | write_push
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
// pop argument 0 | write_pop
@ARG
D=M
@0
D=D+A
// Write D to R13, pop from stack, write to *R13
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// write_label
(FibonacciSeries.$nofunction$MAIN_LOOP_START)
// push argument 0 | write_push
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
// if-goto FibonacciSeries.$nofunction$COMPUTE_ELEMENT | write_if
@SP
AM=M-1
D=M
@FibonacciSeries.$nofunction$COMPUTE_ELEMENT
D;JNE
// goto FibonacciSeries.$nofunction$END_PROGRAM | write_goto
@FibonacciSeries.$nofunction$END_PROGRAM
0;JMP
// write_label
(FibonacciSeries.$nofunction$COMPUTE_ELEMENT)
// push that 0 | write_push
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
// push that 1 | write_push
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
// pop that 2 | write_pop
@THAT
D=M
@2
D=D+A
// Write D to R13, pop from stack, write to *R13
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// push pointer 1 | write_push
@4
D=M
// push D on stack
@SP
M=M+1
A=M-1
M=D
// push constant 1 | write_push
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
// pop pointer 1 | write_pop
@4
D=A
// Write D to R13, pop from stack, write to *R13
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// push argument 0 | write_push
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
// push constant 1 | write_push
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
// pop argument 0 | write_pop
@ARG
D=M
@0
D=D+A
// Write D to R13, pop from stack, write to *R13
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// goto FibonacciSeries.$nofunction$MAIN_LOOP_START | write_goto
@FibonacciSeries.$nofunction$MAIN_LOOP_START
0;JMP
// write_label
(FibonacciSeries.$nofunction$END_PROGRAM)
// write_endless_loop
(FibonacciSeries.$nofunction$genlabel$1)
@FibonacciSeries.$nofunction$genlabel$1
0;JMP
