// initialization-start

// init @SP
@256
D=A
@SP
M=D
// call Sys.init 0
@noFunction$return.0
D=A
@SP
A=M
M=D
@LCL
D=M
@SP
AM=M+1
M=D
@ARG
D=M
@SP
AM=M+1
M=D
@THIS
D=M
@SP
AM=M+1
M=D
@THAT
D=M
@SP
AM=M+1
M=D
@4
D=A
@SP
D=M-D
@ARG
M=D
@SP
MD=M+1
@LCL
M=D
@Sys.init
0;JMP
(noFunction$return.0)
// endless loop
(endlessloop)
@endlessloop
0;JMP
// initialization-end

// function Main.fibonacci 0
(Main.fibonacci)

// push argument 0
@ARG
D=M
@0
A=D+A
D=M
@SP
M=M+1
A=M-1
M=D

// push constant 2
@2
D=A
@SP
M=M+1
A=M-1
M=D

// lt
@SP
AM=M-1
D=M
A=A-1
D=M-D
M=-1
@$Main.fibonacci$CONTINUE.1
D;JLT
@SP
A=M-1
M=0
($Main.fibonacci$CONTINUE.1)

// if-goto IF_TRUE
@SP
AM=M-1
D=M
@$Main.fibonacci$IF_TRUE
D;JNE

// goto IF_FALSE
@$Main.fibonacci$IF_FALSE
0;JMP

// label IF_TRUE
($Main.fibonacci$IF_TRUE)

// push argument 0
@ARG
D=M
@0
A=D+A
D=M
@SP
M=M+1
A=M-1
M=D

// return
@5
D=A
@LCL
A=M-D
D=M
@returnAddress
M=D
@SP
A=M-1
D=M
@ARG
A=M
M=D
D=A+1
@SP
M=D
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
@returnAddress
A=M
0;JMP

// label IF_FALSE
($Main.fibonacci$IF_FALSE)

// push argument 0
@ARG
D=M
@0
A=D+A
D=M
@SP
M=M+1
A=M-1
M=D

// push constant 2
@2
D=A
@SP
M=M+1
A=M-1
M=D

// sub
@SP
AM=M-1
D=M
A=A-1
M=M-D

// call Main.fibonacci 1
@Main.fibonacci$return.2
D=A
@SP
A=M
M=D
@LCL
D=M
@SP
AM=M+1
M=D
@ARG
D=M
@SP
AM=M+1
M=D
@THIS
D=M
@SP
AM=M+1
M=D
@THAT
D=M
@SP
AM=M+1
M=D
@5
D=A
@SP
D=M-D
@ARG
M=D
@SP
MD=M+1
@LCL
M=D
@Main.fibonacci
0;JMP
(Main.fibonacci$return.2)

// push argument 0
@ARG
D=M
@0
A=D+A
D=M
@SP
M=M+1
A=M-1
M=D

// push constant 1
@1
D=A
@SP
M=M+1
A=M-1
M=D

// sub
@SP
AM=M-1
D=M
A=A-1
M=M-D

// call Main.fibonacci 1
@Main.fibonacci$return.3
D=A
@SP
A=M
M=D
@LCL
D=M
@SP
AM=M+1
M=D
@ARG
D=M
@SP
AM=M+1
M=D
@THIS
D=M
@SP
AM=M+1
M=D
@THAT
D=M
@SP
AM=M+1
M=D
@5
D=A
@SP
D=M-D
@ARG
M=D
@SP
MD=M+1
@LCL
M=D
@Main.fibonacci
0;JMP
(Main.fibonacci$return.3)

// add
@SP
AM=M-1
D=M
A=A-1
M=M+D

// return
@5
D=A
@LCL
A=M-D
D=M
@returnAddress
M=D
@SP
A=M-1
D=M
@ARG
A=M
M=D
D=A+1
@SP
M=D
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
@returnAddress
A=M
0;JMP
// function Sys.init 0
(Sys.init)

// push constant 4
@4
D=A
@SP
M=M+1
A=M-1
M=D

// call Main.fibonacci 1
@Sys.init$return.4
D=A
@SP
A=M
M=D
@LCL
D=M
@SP
AM=M+1
M=D
@ARG
D=M
@SP
AM=M+1
M=D
@THIS
D=M
@SP
AM=M+1
M=D
@THAT
D=M
@SP
AM=M+1
M=D
@5
D=A
@SP
D=M-D
@ARG
M=D
@SP
MD=M+1
@LCL
M=D
@Main.fibonacci
0;JMP
(Sys.init$return.4)

// label WHILE
($Sys.init$WHILE)

// goto WHILE
@$Sys.init$WHILE
0;JMP