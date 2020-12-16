// INIT @SP | write_init
@256
D=A
@SP
M=D
// push constant 0 | write_push
@0
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// pop local 0 | write_pop
@LCL
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
(BasicLoop.$nofunction$LOOP_START)
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
// push local 0 | write_push
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
// pop local 0 | write_pop
@LCL
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
// if-goto BasicLoop.$nofunction$LOOP_START | write_if
@SP
AM=M-1
D=M
@BasicLoop.$nofunction$LOOP_START
D;JNE
// push local 0 | write_push
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
// write_endless_loop
(BasicLoop.$nofunction$genlabel$1)
@BasicLoop.$nofunction$genlabel$1
0;JMP
