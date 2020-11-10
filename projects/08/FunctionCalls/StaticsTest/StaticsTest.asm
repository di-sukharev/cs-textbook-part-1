// INIT @SP
@256
D=A
@SP
M=D
// push return address before >> call Sys.init 0
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
@4
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
// ENDLESS LOOP
($nofile.$nofunction$genlabel$2)
@$nofile.$nofunction$genlabel$2
0;JMP
// declaring function Class1.set 0
(Class1.set)
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
@Class1.0
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
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
@Class1.1
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
// declaring function Class1.get 0
(Class1.get)
// push static 0
// manage static segment
@Class1.0
D=M
// push D on stack
@SP
M=M+1
A=M-1
M=D
// push static 1
// manage static segment
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
// declaring function Sys.init 0
(Sys.init)
// push constant 6
// save 6 into D
@6
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// push constant 8
// save 8 into D
@8
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// push return address before >> call Class1.set 2
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
@6
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
@5
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// push constant 23
// save 23 into D
@23
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// push constant 15
// save 15 into D
@15
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// push return address before >> call Class2.set 2
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
@6
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
@5
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// push return address before >> call Class1.get 0
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
@4
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
// push return address before >> call Class2.get 0
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
@4
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
(Sys.init$WHILE)
// goto Sys.init$WHILE
@Sys.init$WHILE
0;JMP
// declaring function Class2.set 0
(Class2.set)
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
@Class2.0
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
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
@Class2.1
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
// declaring function Class2.get 0
(Class2.get)
// push static 0
// manage static segment
@Class2.0
D=M
// push D on stack
@SP
M=M+1
A=M-1
M=D
// push static 1
// manage static segment
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
