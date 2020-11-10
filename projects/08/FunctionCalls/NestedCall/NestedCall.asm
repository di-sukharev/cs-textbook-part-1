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
// declaring function Sys.init 0
(Sys.init)
// push constant 4000
// save 4000 into D
@4000
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
@3
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// push constant 5000
// save 5000 into D
@5000
D=A
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
// push return address before >> call Sys.main 0
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
@Sys.main
0;JMP
(Sys.init$genlabel$3)
@6
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
(Sys.init$LOOP)
// goto Sys.init$LOOP
@Sys.init$LOOP
0;JMP
// declaring function Sys.main 5
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
// push constant 4001
// save 4001 into D
@4001
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
@3
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// push constant 5001
// save 5001 into D
@5001
D=A
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
// push constant 200
// save 200 into D
@200
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// pop local 1
@LCL
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
// push constant 40
// save 40 into D
@40
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// pop local 2
@LCL
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
// push constant 6
// save 6 into D
@6
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// pop local 3
@LCL
D=M
@3
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// push constant 123
// save 123 into D
@123
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
// push return address before >> call Sys.add12 1
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
@5
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
// push local 2
// save LCL+2 into D
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
// push local 3
// save LCL+3 into D
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
// push local 4
// save LCL+4 into D
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
// declaring function Sys.add12 0
(Sys.add12)
// push constant 4002
// save 4002 into D
@4002
D=A
// push D on stack
@SP
M=M+1
A=M-1
M=D
@3
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// push constant 5002
// save 5002 into D
@5002
D=A
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
// push constant 12
// save 12 into D
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
