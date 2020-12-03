// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Здесь нужно написать код, который будет работать 🌞

// 0…32784, 16384…24577 = SCREEN MEMORY MAP; 24578 = KBD MEMORY MAP;

    (RESTART)
@SCREEN // A = SCREEN = 16384
D=A
@screenRow // RAM[screenRow] = 16384
M=D

    (KEYBOARD_CHECK)
@KBD // A=24578
D=M

@SELECT_BLACK_COLOR
D;JGT

@SELECT_WHITE_COLOR
D;JEQ

    (SELECT_BLACK_COLOR)
@color
M=-1 // -1 = 111111…1111111
@PAINT
0;JMP

    (SELECT_WHITE_COLOR)
@color
M=0 // 0 = 00000…000000
@PAINT
0;JMP

    (PAINT)
@color
D=M

@screenRow // RAM[screenRow] = 16384; A=16384
A=M // A=RAM[16384]
M=D

@screenRow
M=M+1 // D=16384++
D=M
@KBD // A=24578
D=A-D

@PAINT
D;JGT

@RESTART
0;JMP