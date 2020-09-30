// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// ⬇ pseudo-code ⬇

// i = 0
// R2 = 0
// while (i < R1)
//     R2 = R2 + R0
//     i++
// END

// ⬆ pseudo-code ⬆

// Здесь нужно написать код, который будет работать 🌞

// set i = 0 as a variable, our loop counter
@i
M=0

// Set R2 = 0
@R2
M=0

// if R0 == 0, then 0 * R1 = 0, so R2 = 0 as it is here, so we goto END
@R0
D=M
@END
D;JEQ

// if R1 == 0, then R0 * 0 = 0, so R2 = 0 as it is here, so we goto END
@R1
D=M
@END
D;JEQ

    (LOOP)
// multiplication as a sum of R0+R0+R0+R0+…
@R0
D=M
@R2
M=M+D
// i++
@i
M=M+1

// goto LOOP if i <= R1
D=M
@R1
D=D-M
@LOOP
D;JLT

    (END)
@END
0;JMP // infinite loop