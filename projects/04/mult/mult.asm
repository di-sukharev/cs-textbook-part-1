// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// 7 * 4 = 7 + 7 + 7 + 7 = 28; 4--

// псевдокод: пока R1 > 0, то: R2=R0+R2; R1=R1-1;

//     +----+----+----+
//     | R0 | R1 | R2 |
//     +----+----+----+
//  1. |  2 |  4 |  0 |
//     +----+----+----+
//  2. |  2 |  3 |  2 |
//     +----+----+----+
//  3. |  2 |  2 |  4 |
//     +----+----+----+
//  4. |  2 |  1 |  6 |
//     +----+----+----+
//  5. |  2 |  0 |  8 |
//     +----+----+----+
//  6. |    |    |    |
//     +----+----+----+
//  7. |    |    |    |
//     +----+----+----+

// Здесь нужно написать код, который будет работать 🌞
@R2
M=0

@R1
D=M
@END
D;JEQ

    (LOOP)
@R0 // A=0
D=M // M=RAM[0]=R0
@R2 // A=2
M=D+M // R2=R0+R2

@R1 // A=1
M=M-1 // M=RAM[A]; R1=R1-1

D=M
@LOOP
D;JGT // if R1 > 0, then jump to LOOP, else go down

    (END)
@END
0;JMP
