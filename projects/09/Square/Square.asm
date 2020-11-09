// Writing bootstrap code
// Initialize stack pointer
@256
D=A
@SP
M=D

// CALL FUNCTION Sys.init with 0 arguments
@r0
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@0
D=D-A
@ARG
M=D
@Sys.init
0;JMP
(r0)

// Processing ../../../09/Square/Square.vm
// function Square.new 0
// FUNCTION Square.new with 0 local variables
(Square.new)

// push constant 3
// Push 3 onto the stack
@3
D=A
@SP
A=M
M=D
@SP
M=M+1

// call Memory.alloc 1
// CALL FUNCTION Memory.alloc with 1 arguments
@r1
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Memory.alloc
0;JMP
(r1)

// pop pointer 0
// Pop the stack into POINTER[0]
@0
D=A
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

// push argument 0
// Push ARG[0] onto the stack
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// pop this 0
// Pop the stack into THIS[0]
@0
D=A
@THIS
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push argument 1
// Push ARG[1] onto the stack
@1
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// pop this 1
// Pop the stack into THIS[1]
@1
D=A
@THIS
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push argument 2
// Push ARG[2] onto the stack
@2
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// pop this 2
// Pop the stack into THIS[2]
@2
D=A
@THIS
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push pointer 0
// Push POINTER[0] onto the stack
@0
D=A
@3
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// call Square.draw 1
// CALL FUNCTION Square.draw with 1 arguments
@r2
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Square.draw
0;JMP
(r2)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push pointer 0
// Push POINTER[0] onto the stack
@0
D=A
@3
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// return
// Return to the calling function.
@LCL
D=M
@R13
M=D
@5
A=D-A
D=M
@R14
M=D
@SP
AM=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@R13
AM=M-1
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
@R14
A=M
0;JMP

// function Square.dispose 0
// FUNCTION Square.dispose with 0 local variables
(Square.dispose)

// push argument 0
// Push ARG[0] onto the stack
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 0
// Pop the stack into POINTER[0]
@0
D=A
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

// push pointer 0
// Push POINTER[0] onto the stack
@0
D=A
@3
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// call Memory.deAlloc 1
// CALL FUNCTION Memory.deAlloc with 1 arguments
@r3
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Memory.deAlloc
0;JMP
(r3)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// return
// Return to the calling function.
@LCL
D=M
@R13
M=D
@5
A=D-A
D=M
@R14
M=D
@SP
AM=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@R13
AM=M-1
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
@R14
A=M
0;JMP

// function Square.draw 0
// FUNCTION Square.draw with 0 local variables
(Square.draw)

// push argument 0
// Push ARG[0] onto the stack
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 0
// Pop the stack into POINTER[0]
@0
D=A
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

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// not
// Pop 1 from the stack, NOT it, and put result on the stack.
@SP
A=M-1
M=!M

// call Screen.setColor 1
// CALL FUNCTION Screen.setColor with 1 arguments
@r4
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Screen.setColor
0;JMP
(r4)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// call Screen.drawRectangle 4
// CALL FUNCTION Screen.drawRectangle with 4 arguments
@r5
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@4
D=D-A
@ARG
M=D
@Screen.drawRectangle
0;JMP
(r5)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// return
// Return to the calling function.
@LCL
D=M
@R13
M=D
@5
A=D-A
D=M
@R14
M=D
@SP
AM=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@R13
AM=M-1
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
@R14
A=M
0;JMP

// function Square.erase 0
// FUNCTION Square.erase with 0 local variables
(Square.erase)

// push argument 0
// Push ARG[0] onto the stack
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 0
// Pop the stack into POINTER[0]
@0
D=A
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

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// call Screen.setColor 1
// CALL FUNCTION Screen.setColor with 1 arguments
@r6
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Screen.setColor
0;JMP
(r6)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// call Screen.drawRectangle 4
// CALL FUNCTION Screen.drawRectangle with 4 arguments
@r7
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@4
D=D-A
@ARG
M=D
@Screen.drawRectangle
0;JMP
(r7)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// return
// Return to the calling function.
@LCL
D=M
@R13
M=D
@5
A=D-A
D=M
@R14
M=D
@SP
AM=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@R13
AM=M-1
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
@R14
A=M
0;JMP

// function Square.incSize 0
// FUNCTION Square.incSize with 0 local variables
(Square.incSize)

// push argument 0
// Push ARG[0] onto the stack
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 0
// Pop the stack into POINTER[0]
@0
D=A
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

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// push constant 254
// Push 254 onto the stack
@254
D=A
@SP
A=M
M=D
@SP
M=M+1

// lt
// Pop 2 from the stack, compare less than, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j0
D;JLT
@SP
A=M-1
M=0
@j0end
0;JMP
(j0)
@SP
A=M-1
M=-1
(j0end)

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// push constant 510
// Push 510 onto the stack
@510
D=A
@SP
A=M
M=D
@SP
M=M+1

// lt
// Pop 2 from the stack, compare less than, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j1
D;JLT
@SP
A=M-1
M=0
@j1end
0;JMP
(j1)
@SP
A=M-1
M=-1
(j1end)

// and
// Pop 2 from the stack, AND them together, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D&M

// if-goto IF_TRUE0
// IF-GOTO label: IF_TRUE0
@SP
AM=M-1
D=M
@Square.incSize$IF_TRUE0
D;JNE

// goto IF_FALSE0
// GOTO label: IF_FALSE0
@Square.incSize$IF_FALSE0
0;JMP

// label IF_TRUE0
// Define label: IF_TRUE0
(Square.incSize$IF_TRUE0)

// push pointer 0
// Push POINTER[0] onto the stack
@0
D=A
@3
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// call Square.erase 1
// CALL FUNCTION Square.erase with 1 arguments
@r8
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Square.erase
0;JMP
(r8)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 2
// Push 2 onto the stack
@2
D=A
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// pop this 2
// Pop the stack into THIS[2]
@2
D=A
@THIS
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push pointer 0
// Push POINTER[0] onto the stack
@0
D=A
@3
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// call Square.draw 1
// CALL FUNCTION Square.draw with 1 arguments
@r9
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Square.draw
0;JMP
(r9)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// label IF_FALSE0
// Define label: IF_FALSE0
(Square.incSize$IF_FALSE0)

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// return
// Return to the calling function.
@LCL
D=M
@R13
M=D
@5
A=D-A
D=M
@R14
M=D
@SP
AM=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@R13
AM=M-1
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
@R14
A=M
0;JMP

// function Square.decSize 0
// FUNCTION Square.decSize with 0 local variables
(Square.decSize)

// push argument 0
// Push ARG[0] onto the stack
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 0
// Pop the stack into POINTER[0]
@0
D=A
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

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 2
// Push 2 onto the stack
@2
D=A
@SP
A=M
M=D
@SP
M=M+1

// gt
// Pop 2 from the stack, compare greater than, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j2
D;JGT
@SP
A=M-1
M=0
@j2end
0;JMP
(j2)
@SP
A=M-1
M=-1
(j2end)

// if-goto IF_TRUE0
// IF-GOTO label: IF_TRUE0
@SP
AM=M-1
D=M
@Square.decSize$IF_TRUE0
D;JNE

// goto IF_FALSE0
// GOTO label: IF_FALSE0
@Square.decSize$IF_FALSE0
0;JMP

// label IF_TRUE0
// Define label: IF_TRUE0
(Square.decSize$IF_TRUE0)

// push pointer 0
// Push POINTER[0] onto the stack
@0
D=A
@3
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// call Square.erase 1
// CALL FUNCTION Square.erase with 1 arguments
@r10
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Square.erase
0;JMP
(r10)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 2
// Push 2 onto the stack
@2
D=A
@SP
A=M
M=D
@SP
M=M+1

// sub
// Pop 2 from the stack, subtract, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=M-D

// pop this 2
// Pop the stack into THIS[2]
@2
D=A
@THIS
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push pointer 0
// Push POINTER[0] onto the stack
@0
D=A
@3
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// call Square.draw 1
// CALL FUNCTION Square.draw with 1 arguments
@r11
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Square.draw
0;JMP
(r11)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// label IF_FALSE0
// Define label: IF_FALSE0
(Square.decSize$IF_FALSE0)

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// return
// Return to the calling function.
@LCL
D=M
@R13
M=D
@5
A=D-A
D=M
@R14
M=D
@SP
AM=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@R13
AM=M-1
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
@R14
A=M
0;JMP

// function Square.moveUp 0
// FUNCTION Square.moveUp with 0 local variables
(Square.moveUp)

// push argument 0
// Push ARG[0] onto the stack
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 0
// Pop the stack into POINTER[0]
@0
D=A
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

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 1
// Push 1 onto the stack
@1
D=A
@SP
A=M
M=D
@SP
M=M+1

// gt
// Pop 2 from the stack, compare greater than, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j3
D;JGT
@SP
A=M-1
M=0
@j3end
0;JMP
(j3)
@SP
A=M-1
M=-1
(j3end)

// if-goto IF_TRUE0
// IF-GOTO label: IF_TRUE0
@SP
AM=M-1
D=M
@Square.moveUp$IF_TRUE0
D;JNE

// goto IF_FALSE0
// GOTO label: IF_FALSE0
@Square.moveUp$IF_FALSE0
0;JMP

// label IF_TRUE0
// Define label: IF_TRUE0
(Square.moveUp$IF_TRUE0)

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// call Screen.setColor 1
// CALL FUNCTION Screen.setColor with 1 arguments
@r12
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Screen.setColor
0;JMP
(r12)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// push constant 1
// Push 1 onto the stack
@1
D=A
@SP
A=M
M=D
@SP
M=M+1

// sub
// Pop 2 from the stack, subtract, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=M-D

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// call Screen.drawRectangle 4
// CALL FUNCTION Screen.drawRectangle with 4 arguments
@r13
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@4
D=D-A
@ARG
M=D
@Screen.drawRectangle
0;JMP
(r13)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 2
// Push 2 onto the stack
@2
D=A
@SP
A=M
M=D
@SP
M=M+1

// sub
// Pop 2 from the stack, subtract, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=M-D

// pop this 1
// Pop the stack into THIS[1]
@1
D=A
@THIS
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// not
// Pop 1 from the stack, NOT it, and put result on the stack.
@SP
A=M-1
M=!M

// call Screen.setColor 1
// CALL FUNCTION Screen.setColor with 1 arguments
@r14
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Screen.setColor
0;JMP
(r14)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 1
// Push 1 onto the stack
@1
D=A
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// call Screen.drawRectangle 4
// CALL FUNCTION Screen.drawRectangle with 4 arguments
@r15
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@4
D=D-A
@ARG
M=D
@Screen.drawRectangle
0;JMP
(r15)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// label IF_FALSE0
// Define label: IF_FALSE0
(Square.moveUp$IF_FALSE0)

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// return
// Return to the calling function.
@LCL
D=M
@R13
M=D
@5
A=D-A
D=M
@R14
M=D
@SP
AM=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@R13
AM=M-1
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
@R14
A=M
0;JMP

// function Square.moveDown 0
// FUNCTION Square.moveDown with 0 local variables
(Square.moveDown)

// push argument 0
// Push ARG[0] onto the stack
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 0
// Pop the stack into POINTER[0]
@0
D=A
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

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// push constant 254
// Push 254 onto the stack
@254
D=A
@SP
A=M
M=D
@SP
M=M+1

// lt
// Pop 2 from the stack, compare less than, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j4
D;JLT
@SP
A=M-1
M=0
@j4end
0;JMP
(j4)
@SP
A=M-1
M=-1
(j4end)

// if-goto IF_TRUE0
// IF-GOTO label: IF_TRUE0
@SP
AM=M-1
D=M
@Square.moveDown$IF_TRUE0
D;JNE

// goto IF_FALSE0
// GOTO label: IF_FALSE0
@Square.moveDown$IF_FALSE0
0;JMP

// label IF_TRUE0
// Define label: IF_TRUE0
(Square.moveDown$IF_TRUE0)

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// call Screen.setColor 1
// CALL FUNCTION Screen.setColor with 1 arguments
@r16
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Screen.setColor
0;JMP
(r16)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 1
// Push 1 onto the stack
@1
D=A
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// call Screen.drawRectangle 4
// CALL FUNCTION Screen.drawRectangle with 4 arguments
@r17
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@4
D=D-A
@ARG
M=D
@Screen.drawRectangle
0;JMP
(r17)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 2
// Push 2 onto the stack
@2
D=A
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// pop this 1
// Pop the stack into THIS[1]
@1
D=A
@THIS
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// not
// Pop 1 from the stack, NOT it, and put result on the stack.
@SP
A=M-1
M=!M

// call Screen.setColor 1
// CALL FUNCTION Screen.setColor with 1 arguments
@r18
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Screen.setColor
0;JMP
(r18)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// push constant 1
// Push 1 onto the stack
@1
D=A
@SP
A=M
M=D
@SP
M=M+1

// sub
// Pop 2 from the stack, subtract, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=M-D

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// call Screen.drawRectangle 4
// CALL FUNCTION Screen.drawRectangle with 4 arguments
@r19
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@4
D=D-A
@ARG
M=D
@Screen.drawRectangle
0;JMP
(r19)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// label IF_FALSE0
// Define label: IF_FALSE0
(Square.moveDown$IF_FALSE0)

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// return
// Return to the calling function.
@LCL
D=M
@R13
M=D
@5
A=D-A
D=M
@R14
M=D
@SP
AM=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@R13
AM=M-1
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
@R14
A=M
0;JMP

// function Square.moveLeft 0
// FUNCTION Square.moveLeft with 0 local variables
(Square.moveLeft)

// push argument 0
// Push ARG[0] onto the stack
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 0
// Pop the stack into POINTER[0]
@0
D=A
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

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 1
// Push 1 onto the stack
@1
D=A
@SP
A=M
M=D
@SP
M=M+1

// gt
// Pop 2 from the stack, compare greater than, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j5
D;JGT
@SP
A=M-1
M=0
@j5end
0;JMP
(j5)
@SP
A=M-1
M=-1
(j5end)

// if-goto IF_TRUE0
// IF-GOTO label: IF_TRUE0
@SP
AM=M-1
D=M
@Square.moveLeft$IF_TRUE0
D;JNE

// goto IF_FALSE0
// GOTO label: IF_FALSE0
@Square.moveLeft$IF_FALSE0
0;JMP

// label IF_TRUE0
// Define label: IF_TRUE0
(Square.moveLeft$IF_TRUE0)

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// call Screen.setColor 1
// CALL FUNCTION Screen.setColor with 1 arguments
@r20
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Screen.setColor
0;JMP
(r20)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// push constant 1
// Push 1 onto the stack
@1
D=A
@SP
A=M
M=D
@SP
M=M+1

// sub
// Pop 2 from the stack, subtract, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=M-D

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// call Screen.drawRectangle 4
// CALL FUNCTION Screen.drawRectangle with 4 arguments
@r21
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@4
D=D-A
@ARG
M=D
@Screen.drawRectangle
0;JMP
(r21)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 2
// Push 2 onto the stack
@2
D=A
@SP
A=M
M=D
@SP
M=M+1

// sub
// Pop 2 from the stack, subtract, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=M-D

// pop this 0
// Pop the stack into THIS[0]
@0
D=A
@THIS
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// not
// Pop 1 from the stack, NOT it, and put result on the stack.
@SP
A=M-1
M=!M

// call Screen.setColor 1
// CALL FUNCTION Screen.setColor with 1 arguments
@r22
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Screen.setColor
0;JMP
(r22)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 1
// Push 1 onto the stack
@1
D=A
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// call Screen.drawRectangle 4
// CALL FUNCTION Screen.drawRectangle with 4 arguments
@r23
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@4
D=D-A
@ARG
M=D
@Screen.drawRectangle
0;JMP
(r23)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// label IF_FALSE0
// Define label: IF_FALSE0
(Square.moveLeft$IF_FALSE0)

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// return
// Return to the calling function.
@LCL
D=M
@R13
M=D
@5
A=D-A
D=M
@R14
M=D
@SP
AM=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@R13
AM=M-1
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
@R14
A=M
0;JMP

// function Square.moveRight 0
// FUNCTION Square.moveRight with 0 local variables
(Square.moveRight)

// push argument 0
// Push ARG[0] onto the stack
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 0
// Pop the stack into POINTER[0]
@0
D=A
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

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// push constant 510
// Push 510 onto the stack
@510
D=A
@SP
A=M
M=D
@SP
M=M+1

// lt
// Pop 2 from the stack, compare less than, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j6
D;JLT
@SP
A=M-1
M=0
@j6end
0;JMP
(j6)
@SP
A=M-1
M=-1
(j6end)

// if-goto IF_TRUE0
// IF-GOTO label: IF_TRUE0
@SP
AM=M-1
D=M
@Square.moveRight$IF_TRUE0
D;JNE

// goto IF_FALSE0
// GOTO label: IF_FALSE0
@Square.moveRight$IF_FALSE0
0;JMP

// label IF_TRUE0
// Define label: IF_TRUE0
(Square.moveRight$IF_TRUE0)

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// call Screen.setColor 1
// CALL FUNCTION Screen.setColor with 1 arguments
@r24
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Screen.setColor
0;JMP
(r24)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 1
// Push 1 onto the stack
@1
D=A
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// call Screen.drawRectangle 4
// CALL FUNCTION Screen.drawRectangle with 4 arguments
@r25
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@4
D=D-A
@ARG
M=D
@Screen.drawRectangle
0;JMP
(r25)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 2
// Push 2 onto the stack
@2
D=A
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// pop this 0
// Pop the stack into THIS[0]
@0
D=A
@THIS
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// not
// Pop 1 from the stack, NOT it, and put result on the stack.
@SP
A=M-1
M=!M

// call Screen.setColor 1
// CALL FUNCTION Screen.setColor with 1 arguments
@r26
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Screen.setColor
0;JMP
(r26)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// push constant 1
// Push 1 onto the stack
@1
D=A
@SP
A=M
M=D
@SP
M=M+1

// sub
// Pop 2 from the stack, subtract, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=M-D

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 2
// Push THIS[2] onto the stack
@2
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
// Pop 2 from the stack, add, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
M=D+M

// call Screen.drawRectangle 4
// CALL FUNCTION Screen.drawRectangle with 4 arguments
@r27
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@4
D=D-A
@ARG
M=D
@Screen.drawRectangle
0;JMP
(r27)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// label IF_FALSE0
// Define label: IF_FALSE0
(Square.moveRight$IF_FALSE0)

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// return
// Return to the calling function.
@LCL
D=M
@R13
M=D
@5
A=D-A
D=M
@R14
M=D
@SP
AM=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@R13
AM=M-1
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
@R14
A=M
0;JMP

// Processing ../../../09/Square/SquareGame.vm
// function SquareGame.new 0
// FUNCTION SquareGame.new with 0 local variables
(SquareGame.new)

// push constant 2
// Push 2 onto the stack
@2
D=A
@SP
A=M
M=D
@SP
M=M+1

// call Memory.alloc 1
// CALL FUNCTION Memory.alloc with 1 arguments
@r28
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Memory.alloc
0;JMP
(r28)

// pop pointer 0
// Pop the stack into POINTER[0]
@0
D=A
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

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 30
// Push 30 onto the stack
@30
D=A
@SP
A=M
M=D
@SP
M=M+1

// call Square.new 3
// CALL FUNCTION Square.new with 3 arguments
@r29
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@3
D=D-A
@ARG
M=D
@Square.new
0;JMP
(r29)

// pop this 0
// Pop the stack into THIS[0]
@0
D=A
@THIS
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop this 1
// Pop the stack into THIS[1]
@1
D=A
@THIS
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push pointer 0
// Push POINTER[0] onto the stack
@0
D=A
@3
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// return
// Return to the calling function.
@LCL
D=M
@R13
M=D
@5
A=D-A
D=M
@R14
M=D
@SP
AM=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@R13
AM=M-1
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
@R14
A=M
0;JMP

// function SquareGame.dispose 0
// FUNCTION SquareGame.dispose with 0 local variables
(SquareGame.dispose)

// push argument 0
// Push ARG[0] onto the stack
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 0
// Pop the stack into POINTER[0]
@0
D=A
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

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// call Square.dispose 1
// CALL FUNCTION Square.dispose with 1 arguments
@r30
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Square.dispose
0;JMP
(r30)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push pointer 0
// Push POINTER[0] onto the stack
@0
D=A
@3
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// call Memory.deAlloc 1
// CALL FUNCTION Memory.deAlloc with 1 arguments
@r31
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Memory.deAlloc
0;JMP
(r31)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// return
// Return to the calling function.
@LCL
D=M
@R13
M=D
@5
A=D-A
D=M
@R14
M=D
@SP
AM=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@R13
AM=M-1
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
@R14
A=M
0;JMP

// function SquareGame.moveSquare 0
// FUNCTION SquareGame.moveSquare with 0 local variables
(SquareGame.moveSquare)

// push argument 0
// Push ARG[0] onto the stack
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 0
// Pop the stack into POINTER[0]
@0
D=A
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

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 1
// Push 1 onto the stack
@1
D=A
@SP
A=M
M=D
@SP
M=M+1

// eq
// Pop 2 from the stack, compare equality, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j7
D;JEQ
@SP
A=M-1
M=0
@j7end
0;JMP
(j7)
@SP
A=M-1
M=-1
(j7end)

// if-goto IF_TRUE0
// IF-GOTO label: IF_TRUE0
@SP
AM=M-1
D=M
@SquareGame.moveSquare$IF_TRUE0
D;JNE

// goto IF_FALSE0
// GOTO label: IF_FALSE0
@SquareGame.moveSquare$IF_FALSE0
0;JMP

// label IF_TRUE0
// Define label: IF_TRUE0
(SquareGame.moveSquare$IF_TRUE0)

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// call Square.moveUp 1
// CALL FUNCTION Square.moveUp with 1 arguments
@r32
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Square.moveUp
0;JMP
(r32)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// label IF_FALSE0
// Define label: IF_FALSE0
(SquareGame.moveSquare$IF_FALSE0)

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 2
// Push 2 onto the stack
@2
D=A
@SP
A=M
M=D
@SP
M=M+1

// eq
// Pop 2 from the stack, compare equality, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j8
D;JEQ
@SP
A=M-1
M=0
@j8end
0;JMP
(j8)
@SP
A=M-1
M=-1
(j8end)

// if-goto IF_TRUE1
// IF-GOTO label: IF_TRUE1
@SP
AM=M-1
D=M
@SquareGame.moveSquare$IF_TRUE1
D;JNE

// goto IF_FALSE1
// GOTO label: IF_FALSE1
@SquareGame.moveSquare$IF_FALSE1
0;JMP

// label IF_TRUE1
// Define label: IF_TRUE1
(SquareGame.moveSquare$IF_TRUE1)

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// call Square.moveDown 1
// CALL FUNCTION Square.moveDown with 1 arguments
@r33
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Square.moveDown
0;JMP
(r33)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// label IF_FALSE1
// Define label: IF_FALSE1
(SquareGame.moveSquare$IF_FALSE1)

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 3
// Push 3 onto the stack
@3
D=A
@SP
A=M
M=D
@SP
M=M+1

// eq
// Pop 2 from the stack, compare equality, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j9
D;JEQ
@SP
A=M-1
M=0
@j9end
0;JMP
(j9)
@SP
A=M-1
M=-1
(j9end)

// if-goto IF_TRUE2
// IF-GOTO label: IF_TRUE2
@SP
AM=M-1
D=M
@SquareGame.moveSquare$IF_TRUE2
D;JNE

// goto IF_FALSE2
// GOTO label: IF_FALSE2
@SquareGame.moveSquare$IF_FALSE2
0;JMP

// label IF_TRUE2
// Define label: IF_TRUE2
(SquareGame.moveSquare$IF_TRUE2)

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// call Square.moveLeft 1
// CALL FUNCTION Square.moveLeft with 1 arguments
@r34
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Square.moveLeft
0;JMP
(r34)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// label IF_FALSE2
// Define label: IF_FALSE2
(SquareGame.moveSquare$IF_FALSE2)

// push this 1
// Push THIS[1] onto the stack
@1
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 4
// Push 4 onto the stack
@4
D=A
@SP
A=M
M=D
@SP
M=M+1

// eq
// Pop 2 from the stack, compare equality, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j10
D;JEQ
@SP
A=M-1
M=0
@j10end
0;JMP
(j10)
@SP
A=M-1
M=-1
(j10end)

// if-goto IF_TRUE3
// IF-GOTO label: IF_TRUE3
@SP
AM=M-1
D=M
@SquareGame.moveSquare$IF_TRUE3
D;JNE

// goto IF_FALSE3
// GOTO label: IF_FALSE3
@SquareGame.moveSquare$IF_FALSE3
0;JMP

// label IF_TRUE3
// Define label: IF_TRUE3
(SquareGame.moveSquare$IF_TRUE3)

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// call Square.moveRight 1
// CALL FUNCTION Square.moveRight with 1 arguments
@r35
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Square.moveRight
0;JMP
(r35)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// label IF_FALSE3
// Define label: IF_FALSE3
(SquareGame.moveSquare$IF_FALSE3)

// push constant 5
// Push 5 onto the stack
@5
D=A
@SP
A=M
M=D
@SP
M=M+1

// call Sys.wait 1
// CALL FUNCTION Sys.wait with 1 arguments
@r36
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Sys.wait
0;JMP
(r36)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// return
// Return to the calling function.
@LCL
D=M
@R13
M=D
@5
A=D-A
D=M
@R14
M=D
@SP
AM=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@R13
AM=M-1
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
@R14
A=M
0;JMP

// function SquareGame.run 2
// FUNCTION SquareGame.run with 2 local variables
(SquareGame.run)
@SP
A=M
M=0
@SP
M=M+1
@SP
A=M
M=0
@SP
M=M+1

// push argument 0
// Push ARG[0] onto the stack
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 0
// Pop the stack into POINTER[0]
@0
D=A
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

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop local 1
// Pop the stack into LCL[1]
@1
D=A
@LCL
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// label WHILE_EXP0
// Define label: WHILE_EXP0
(SquareGame.run$WHILE_EXP0)

// push local 1
// Push LCL[1] onto the stack
@1
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// not
// Pop 1 from the stack, NOT it, and put result on the stack.
@SP
A=M-1
M=!M

// not
// Pop 1 from the stack, NOT it, and put result on the stack.
@SP
A=M-1
M=!M

// if-goto WHILE_END0
// IF-GOTO label: WHILE_END0
@SP
AM=M-1
D=M
@SquareGame.run$WHILE_END0
D;JNE

// label WHILE_EXP1
// Define label: WHILE_EXP1
(SquareGame.run$WHILE_EXP1)

// push local 0
// Push LCL[0] onto the stack
@0
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// eq
// Pop 2 from the stack, compare equality, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j11
D;JEQ
@SP
A=M-1
M=0
@j11end
0;JMP
(j11)
@SP
A=M-1
M=-1
(j11end)

// not
// Pop 1 from the stack, NOT it, and put result on the stack.
@SP
A=M-1
M=!M

// if-goto WHILE_END1
// IF-GOTO label: WHILE_END1
@SP
AM=M-1
D=M
@SquareGame.run$WHILE_END1
D;JNE

// call Keyboard.keyPressed 0
// CALL FUNCTION Keyboard.keyPressed with 0 arguments
@r37
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@0
D=D-A
@ARG
M=D
@Keyboard.keyPressed
0;JMP
(r37)

// pop local 0
// Pop the stack into LCL[0]
@0
D=A
@LCL
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push pointer 0
// Push POINTER[0] onto the stack
@0
D=A
@3
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// call SquareGame.moveSquare 1
// CALL FUNCTION SquareGame.moveSquare with 1 arguments
@r38
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@SquareGame.moveSquare
0;JMP
(r38)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// goto WHILE_EXP1
// GOTO label: WHILE_EXP1
@SquareGame.run$WHILE_EXP1
0;JMP

// label WHILE_END1
// Define label: WHILE_END1
(SquareGame.run$WHILE_END1)

// push local 0
// Push LCL[0] onto the stack
@0
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 81
// Push 81 onto the stack
@81
D=A
@SP
A=M
M=D
@SP
M=M+1

// eq
// Pop 2 from the stack, compare equality, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j12
D;JEQ
@SP
A=M-1
M=0
@j12end
0;JMP
(j12)
@SP
A=M-1
M=-1
(j12end)

// if-goto IF_TRUE0
// IF-GOTO label: IF_TRUE0
@SP
AM=M-1
D=M
@SquareGame.run$IF_TRUE0
D;JNE

// goto IF_FALSE0
// GOTO label: IF_FALSE0
@SquareGame.run$IF_FALSE0
0;JMP

// label IF_TRUE0
// Define label: IF_TRUE0
(SquareGame.run$IF_TRUE0)

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// not
// Pop 1 from the stack, NOT it, and put result on the stack.
@SP
A=M-1
M=!M

// pop local 1
// Pop the stack into LCL[1]
@1
D=A
@LCL
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// label IF_FALSE0
// Define label: IF_FALSE0
(SquareGame.run$IF_FALSE0)

// push local 0
// Push LCL[0] onto the stack
@0
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 90
// Push 90 onto the stack
@90
D=A
@SP
A=M
M=D
@SP
M=M+1

// eq
// Pop 2 from the stack, compare equality, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j13
D;JEQ
@SP
A=M-1
M=0
@j13end
0;JMP
(j13)
@SP
A=M-1
M=-1
(j13end)

// if-goto IF_TRUE1
// IF-GOTO label: IF_TRUE1
@SP
AM=M-1
D=M
@SquareGame.run$IF_TRUE1
D;JNE

// goto IF_FALSE1
// GOTO label: IF_FALSE1
@SquareGame.run$IF_FALSE1
0;JMP

// label IF_TRUE1
// Define label: IF_TRUE1
(SquareGame.run$IF_TRUE1)

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// call Square.decSize 1
// CALL FUNCTION Square.decSize with 1 arguments
@r39
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Square.decSize
0;JMP
(r39)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// label IF_FALSE1
// Define label: IF_FALSE1
(SquareGame.run$IF_FALSE1)

// push local 0
// Push LCL[0] onto the stack
@0
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 88
// Push 88 onto the stack
@88
D=A
@SP
A=M
M=D
@SP
M=M+1

// eq
// Pop 2 from the stack, compare equality, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j14
D;JEQ
@SP
A=M-1
M=0
@j14end
0;JMP
(j14)
@SP
A=M-1
M=-1
(j14end)

// if-goto IF_TRUE2
// IF-GOTO label: IF_TRUE2
@SP
AM=M-1
D=M
@SquareGame.run$IF_TRUE2
D;JNE

// goto IF_FALSE2
// GOTO label: IF_FALSE2
@SquareGame.run$IF_FALSE2
0;JMP

// label IF_TRUE2
// Define label: IF_TRUE2
(SquareGame.run$IF_TRUE2)

// push this 0
// Push THIS[0] onto the stack
@0
D=A
@THIS
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// call Square.incSize 1
// CALL FUNCTION Square.incSize with 1 arguments
@r40
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@Square.incSize
0;JMP
(r40)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// label IF_FALSE2
// Define label: IF_FALSE2
(SquareGame.run$IF_FALSE2)

// push local 0
// Push LCL[0] onto the stack
@0
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 131
// Push 131 onto the stack
@131
D=A
@SP
A=M
M=D
@SP
M=M+1

// eq
// Pop 2 from the stack, compare equality, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j15
D;JEQ
@SP
A=M-1
M=0
@j15end
0;JMP
(j15)
@SP
A=M-1
M=-1
(j15end)

// if-goto IF_TRUE3
// IF-GOTO label: IF_TRUE3
@SP
AM=M-1
D=M
@SquareGame.run$IF_TRUE3
D;JNE

// goto IF_FALSE3
// GOTO label: IF_FALSE3
@SquareGame.run$IF_FALSE3
0;JMP

// label IF_TRUE3
// Define label: IF_TRUE3
(SquareGame.run$IF_TRUE3)

// push constant 1
// Push 1 onto the stack
@1
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop this 1
// Pop the stack into THIS[1]
@1
D=A
@THIS
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// label IF_FALSE3
// Define label: IF_FALSE3
(SquareGame.run$IF_FALSE3)

// push local 0
// Push LCL[0] onto the stack
@0
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 133
// Push 133 onto the stack
@133
D=A
@SP
A=M
M=D
@SP
M=M+1

// eq
// Pop 2 from the stack, compare equality, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j16
D;JEQ
@SP
A=M-1
M=0
@j16end
0;JMP
(j16)
@SP
A=M-1
M=-1
(j16end)

// if-goto IF_TRUE4
// IF-GOTO label: IF_TRUE4
@SP
AM=M-1
D=M
@SquareGame.run$IF_TRUE4
D;JNE

// goto IF_FALSE4
// GOTO label: IF_FALSE4
@SquareGame.run$IF_FALSE4
0;JMP

// label IF_TRUE4
// Define label: IF_TRUE4
(SquareGame.run$IF_TRUE4)

// push constant 2
// Push 2 onto the stack
@2
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop this 1
// Pop the stack into THIS[1]
@1
D=A
@THIS
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// label IF_FALSE4
// Define label: IF_FALSE4
(SquareGame.run$IF_FALSE4)

// push local 0
// Push LCL[0] onto the stack
@0
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 130
// Push 130 onto the stack
@130
D=A
@SP
A=M
M=D
@SP
M=M+1

// eq
// Pop 2 from the stack, compare equality, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j17
D;JEQ
@SP
A=M-1
M=0
@j17end
0;JMP
(j17)
@SP
A=M-1
M=-1
(j17end)

// if-goto IF_TRUE5
// IF-GOTO label: IF_TRUE5
@SP
AM=M-1
D=M
@SquareGame.run$IF_TRUE5
D;JNE

// goto IF_FALSE5
// GOTO label: IF_FALSE5
@SquareGame.run$IF_FALSE5
0;JMP

// label IF_TRUE5
// Define label: IF_TRUE5
(SquareGame.run$IF_TRUE5)

// push constant 3
// Push 3 onto the stack
@3
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop this 1
// Pop the stack into THIS[1]
@1
D=A
@THIS
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// label IF_FALSE5
// Define label: IF_FALSE5
(SquareGame.run$IF_FALSE5)

// push local 0
// Push LCL[0] onto the stack
@0
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 132
// Push 132 onto the stack
@132
D=A
@SP
A=M
M=D
@SP
M=M+1

// eq
// Pop 2 from the stack, compare equality, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j18
D;JEQ
@SP
A=M-1
M=0
@j18end
0;JMP
(j18)
@SP
A=M-1
M=-1
(j18end)

// if-goto IF_TRUE6
// IF-GOTO label: IF_TRUE6
@SP
AM=M-1
D=M
@SquareGame.run$IF_TRUE6
D;JNE

// goto IF_FALSE6
// GOTO label: IF_FALSE6
@SquareGame.run$IF_FALSE6
0;JMP

// label IF_TRUE6
// Define label: IF_TRUE6
(SquareGame.run$IF_TRUE6)

// push constant 4
// Push 4 onto the stack
@4
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop this 1
// Pop the stack into THIS[1]
@1
D=A
@THIS
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// label IF_FALSE6
// Define label: IF_FALSE6
(SquareGame.run$IF_FALSE6)

// label WHILE_EXP2
// Define label: WHILE_EXP2
(SquareGame.run$WHILE_EXP2)

// push local 0
// Push LCL[0] onto the stack
@0
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// eq
// Pop 2 from the stack, compare equality, and put result on the stack.
@SP
AM=M-1
D=M
@SP
A=M-1
D=M-D
@j19
D;JEQ
@SP
A=M-1
M=0
@j19end
0;JMP
(j19)
@SP
A=M-1
M=-1
(j19end)

// not
// Pop 1 from the stack, NOT it, and put result on the stack.
@SP
A=M-1
M=!M

// not
// Pop 1 from the stack, NOT it, and put result on the stack.
@SP
A=M-1
M=!M

// if-goto WHILE_END2
// IF-GOTO label: WHILE_END2
@SP
AM=M-1
D=M
@SquareGame.run$WHILE_END2
D;JNE

// call Keyboard.keyPressed 0
// CALL FUNCTION Keyboard.keyPressed with 0 arguments
@r41
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@0
D=D-A
@ARG
M=D
@Keyboard.keyPressed
0;JMP
(r41)

// pop local 0
// Pop the stack into LCL[0]
@0
D=A
@LCL
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push pointer 0
// Push POINTER[0] onto the stack
@0
D=A
@3
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// call SquareGame.moveSquare 1
// CALL FUNCTION SquareGame.moveSquare with 1 arguments
@r42
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@SquareGame.moveSquare
0;JMP
(r42)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// goto WHILE_EXP2
// GOTO label: WHILE_EXP2
@SquareGame.run$WHILE_EXP2
0;JMP

// label WHILE_END2
// Define label: WHILE_END2
(SquareGame.run$WHILE_END2)

// goto WHILE_EXP0
// GOTO label: WHILE_EXP0
@SquareGame.run$WHILE_EXP0
0;JMP

// label WHILE_END0
// Define label: WHILE_END0
(SquareGame.run$WHILE_END0)

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// return
// Return to the calling function.
@LCL
D=M
@R13
M=D
@5
A=D-A
D=M
@R14
M=D
@SP
AM=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@R13
AM=M-1
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
@R14
A=M
0;JMP

// Processing ../../../09/Square/Main.vm
// function Main.main 1
// FUNCTION Main.main with 1 local variables
(Main.main)
@SP
A=M
M=0
@SP
M=M+1

// call SquareGame.new 0
// CALL FUNCTION SquareGame.new with 0 arguments
@r43
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@0
D=D-A
@ARG
M=D
@SquareGame.new
0;JMP
(r43)

// pop local 0
// Pop the stack into LCL[0]
@0
D=A
@LCL
D=M+D
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push local 0
// Push LCL[0] onto the stack
@0
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// call SquareGame.run 1
// CALL FUNCTION SquareGame.run with 1 arguments
@r44
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@SquareGame.run
0;JMP
(r44)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push local 0
// Push LCL[0] onto the stack
@0
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// call SquareGame.dispose 1
// CALL FUNCTION SquareGame.dispose with 1 arguments
@r45
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@SP
D=M
@LCL
M=D
@5
D=D-A
@1
D=D-A
@ARG
M=D
@SquareGame.dispose
0;JMP
(r45)

// pop temp 0
// Pop the stack into TEMP[0]
@0
D=A
@5
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 0
// Push 0 onto the stack
@0
D=A
@SP
A=M
M=D
@SP
M=M+1

// return
// Return to the calling function.
@LCL
D=M
@R13
M=D
@5
A=D-A
D=M
@R14
M=D
@SP
AM=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@R13
AM=M-1
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
@R14
A=M
0;JMP

