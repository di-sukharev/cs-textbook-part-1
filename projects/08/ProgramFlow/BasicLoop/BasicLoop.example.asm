//initialization-start
@256
D=A
@SP
M=D
@noFile.noFunction$return.0
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
(noFile.noFunction$return.0)
(endlessloop)
@endlessloop
0;JMP
//initialization-end

// push constant 0
@0
D=A
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

// label LOOP_START
($noFile.noFunction$LOOP_START)

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

// push local 0
@LCL
D=M
@0
A=D+A
D=M
@SP
M=M+1
A=M-1
M=D

// add
@SP
AM=M-1
D=M
A=A-1
M=M+D

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
@ARG
D=M
@0
A=D+A
D=M
@SP
M=M+1
A=M-1
M=D

// if-goto LOOP_START
@SP
AM=M-1
D=M
@$noFile.noFunction$LOOP_START
D;JNE

// push local 0
@LCL
D=M
@0
A=D+A
D=M
@SP
M=M+1
A=M-1
M=D