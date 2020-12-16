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
// declaring function Sys.init 0 | write_function
(Sys.init)
// push constant 4000 | write_push
@4000
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// pop pointer 0 | write_pop
@3
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
// push constant 5000 | write_push
@5000
D=A
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
// push return address before >> call Sys.main 0 | write_call
@Sys.init$genlabel$3
D=A
@SP
A=M
M=D
// -- save function context before -- >> call Sys.main 0
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
@Sys.main
0;JMP
(Sys.init$genlabel$3)
// pop temp 1 | write_pop
@6
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
// write_label
(Sys.init$LOOP)
// goto Sys.init$LOOP | write_goto
@Sys.init$LOOP
0;JMP
// declaring function Sys.main 5 | write_function
(Sys.main)
// initialize LCL segment values
@5
D=A
@SP
AM=D+M
// declaring local 0
A=A-1
M=0
// declaring local 1
A=A-1
M=0
// declaring local 2
A=A-1
M=0
// declaring local 3
A=A-1
M=0
// declaring local 4
A=A-1
M=0
// push constant 4001 | write_push
@4001
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// pop pointer 0 | write_pop
@3
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
// push constant 5001 | write_push
@5001
D=A
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
// push constant 200 | write_push
@200
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// pop local 1 | write_pop
@LCL
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
// push constant 40 | write_push
@40
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// pop local 2 | write_pop
@LCL
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
// push constant 6 | write_push
@6
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// pop local 3 | write_pop
@LCL
D=M
@3
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
// push constant 123 | write_push
@123
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// push return address before >> call Sys.add12 1 | write_call
@Sys.main$genlabel$4
D=A
@SP
A=M
M=D
// -- save function context before -- >> call Sys.add12 1
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
@Sys.add12
0;JMP
(Sys.main$genlabel$4)
// pop temp 0 | write_pop
@5
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
// push local 1 | write_push
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
// push local 2 | write_push
@LCL
D=M
@2
A=D+A
D=M
// push D on stack
@SP
M=M+1
A=M-1
M=D
// push local 3 | write_push
@LCL
D=M
@3
A=D+A
D=M
// push D on stack
@SP
M=M+1
A=M-1
M=D
// push local 4 | write_push
@LCL
D=M
@4
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
@SP
AM=M-1
D=M
A=A-1
M=D+M
@SP
AM=M-1
D=M
A=A-1
M=D+M
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
// declaring function Sys.add12 0 | write_function
(Sys.add12)
// push constant 4002 | write_push
@4002
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// pop pointer 0 | write_pop
@3
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
// push constant 5002 | write_push
@5002
D=A
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
// push constant 12 | write_push
@12
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
