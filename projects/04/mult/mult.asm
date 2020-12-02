// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// ⬇ как программировать ⬇

// пока R1 не равно нулю: R2=R0+R2, уменьшить R1 на единицу
// в результате R1 станет 0, а R2 станет результатом сложения R0+R0+R0+…

// ⬆ как программировать ⬆

// Здесь нужно написать код, который будет работать 🌞

    (LOOP) // label
// multiplication as a sum of R0+R0+R0+R0+… R1 times
@R0
D=M
@R2
M=M+D

@R1
M=M-1

D=M
@LOOP
D;JGT

    (END) // label
@END
0;JMP // infinite loop