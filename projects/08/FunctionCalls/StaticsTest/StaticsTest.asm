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
// declaring function Class1.set 0 | write_function
(Class1.set)
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
// pop static 0 | write_pop
@Class1.0
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
// pop static 1 | write_pop
@Class1.1
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
// declaring function Class1.get 0 | write_function
(Class1.get)
// push static 0 | write_push
@Class1.0
D=M
// push D on stack
@SP
M=M+1
A=M-1
M=D
// push static 1 | write_push
@Class1.1
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
// push constant 6 | write_push
@6
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// push constant 8 | write_push
@8
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// push return address before >> call Class1.set 2 | write_call
@Sys.init$genlabel$3
D=A
@SP
A=M
M=D
// -- save function context before -- >> call Class1.set 2
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
@6 // arg_shift = num_args + 4, num_args=2
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
@Class1.set
0;JMP
(Sys.init$genlabel$3)
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
// push constant 23 | write_push
@23
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// push constant 15 | write_push
@15
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// push return address before >> call Class2.set 2 | write_call
@Sys.init$genlabel$4
D=A
@SP
A=M
M=D
// -- save function context before -- >> call Class2.set 2
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
@6 // arg_shift = num_args + 4, num_args=2
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
@Class2.set
0;JMP
(Sys.init$genlabel$4)
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
// push return address before >> call Class1.get 0 | write_call
@Sys.init$genlabel$5
D=A
@SP
A=M
M=D
// -- save function context before -- >> call Class1.get 0
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
@Class1.get
0;JMP
(Sys.init$genlabel$5)
// push return address before >> call Class2.get 0 | write_call
@Sys.init$genlabel$6
D=A
@SP
A=M
M=D
// -- save function context before -- >> call Class2.get 0
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
@Class2.get
0;JMP
(Sys.init$genlabel$6)
// write_label
(Sys.init$WHILE)
// goto Sys.init$WHILE | write_goto
@Sys.init$WHILE
0;JMP
// declaring function Class2.set 0 | write_function
(Class2.set)
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
// pop static 0 | write_pop
@Class2.0
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
// pop static 1 | write_pop
@Class2.1
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
// declaring function Class2.get 0 | write_function
(Class2.get)
// push static 0 | write_push
@Class2.0
D=M
// push D on stack
@SP
M=M+1
A=M-1
M=D
// push static 1 | write_push
@Class2.1
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
