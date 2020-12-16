// INIT @SP | write_init
@256
D=A
@SP
M=D
// push return address before >> call Sys.init 0 | write_call
@$nofile.$nofunction$genlabel$1
D=A
@SP
A=M
M=D
// -- save function context before -- >> call Sys.init 0
// save segment LCL
@LCL
D=M
@SP
AM=M+1
M=D
// save segment ARG
@ARG
D=M
@SP
AM=M+1
M=D
// save segment THIS
@THIS
D=M
@SP
AM=M+1
M=D
// save segment THAT
@THAT
D=M
@SP
AM=M+1
M=D
// ARG = SP - num_args - 5; SP is off by one now
@4 // arg_shift = num_args + 4, num_args=0
D=A
@SP
D=M-D
@ARG
M=D
// LCL = SP; fix SP being off by one
@SP
MD=M+1
@LCL
M=D
// goto callee, set up a return label
@Sys.init
0;JMP
($nofile.$nofunction$genlabel$1)
// write_endless_loop
($nofile.$nofunction$genlabel$2)
@$nofile.$nofunction$genlabel$2
0;JMP
// declaring function Main.fibonacci 0 | write_function
(Main.fibonacci)
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
D=M-D
M=-1
@Main.fibonacci$genlabel$3
D;JLT
@SP
A=M-1
M=0
(Main.fibonacci$genlabel$3)
// if-goto Main.fibonacci$IF_TRUE | write_if
@SP
AM=M-1
D=M
@Main.fibonacci$IF_TRUE
D;JNE
// goto Main.fibonacci$IF_FALSE | write_goto
@Main.fibonacci$IF_FALSE
0;JMP
// write_label
(Main.fibonacci$IF_TRUE)
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
// save return address in R14 | write_return
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
// write_label
(Main.fibonacci$IF_FALSE)
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
// push return address before >> call Main.fibonacci 1 | write_call
@Main.fibonacci$genlabel$4
D=A
@SP
A=M
M=D
// -- save function context before -- >> call Main.fibonacci 1
// save segment LCL
@LCL
D=M
@SP
AM=M+1
M=D
// save segment ARG
@ARG
D=M
@SP
AM=M+1
M=D
// save segment THIS
@THIS
D=M
@SP
AM=M+1
M=D
// save segment THAT
@THAT
D=M
@SP
AM=M+1
M=D
// ARG = SP - num_args - 5; SP is off by one now
@5 // arg_shift = num_args + 4, num_args=1
D=A
@SP
D=M-D
@ARG
M=D
// LCL = SP; fix SP being off by one
@SP
MD=M+1
@LCL
M=D
// goto callee, set up a return label
@Main.fibonacci
0;JMP
(Main.fibonacci$genlabel$4)
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
// push return address before >> call Main.fibonacci 1 | write_call
@Main.fibonacci$genlabel$5
D=A
@SP
A=M
M=D
// -- save function context before -- >> call Main.fibonacci 1
// save segment LCL
@LCL
D=M
@SP
AM=M+1
M=D
// save segment ARG
@ARG
D=M
@SP
AM=M+1
M=D
// save segment THIS
@THIS
D=M
@SP
AM=M+1
M=D
// save segment THAT
@THAT
D=M
@SP
AM=M+1
M=D
// ARG = SP - num_args - 5; SP is off by one now
@5 // arg_shift = num_args + 4, num_args=1
D=A
@SP
D=M-D
@ARG
M=D
// LCL = SP; fix SP being off by one
@SP
MD=M+1
@LCL
M=D
// goto callee, set up a return label
@Main.fibonacci
0;JMP
(Main.fibonacci$genlabel$5)
@SP
AM=M-1
D=M
A=A-1
M=D+M
// save return address in R14 | write_return
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
// declaring function Sys.init 0 | write_function
(Sys.init)
// push constant 4 | write_push
@4
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// push return address before >> call Main.fibonacci 1 | write_call
@Sys.init$genlabel$6
D=A
@SP
A=M
M=D
// -- save function context before -- >> call Main.fibonacci 1
// save segment LCL
@LCL
D=M
@SP
AM=M+1
M=D
// save segment ARG
@ARG
D=M
@SP
AM=M+1
M=D
// save segment THIS
@THIS
D=M
@SP
AM=M+1
M=D
// save segment THAT
@THAT
D=M
@SP
AM=M+1
M=D
// ARG = SP - num_args - 5; SP is off by one now
@5 // arg_shift = num_args + 4, num_args=1
D=A
@SP
D=M-D
@ARG
M=D
// LCL = SP; fix SP being off by one
@SP
MD=M+1
@LCL
M=D
// goto callee, set up a return label
@Main.fibonacci
0;JMP
(Sys.init$genlabel$6)
// write_label
(Sys.init$WHILE)
// goto Sys.init$WHILE | write_goto
@Sys.init$WHILE
0;JMP
