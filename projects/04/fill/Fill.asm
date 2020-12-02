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

// ⬇ pseudo-code ⬇

// endlessLoop
//     if RAM[24576] === 1
//        RAM[16,384 - 24575] = 1 (make all pixels black)
// END

// ⬆ pseudo-code ⬆

// Здесь нужно написать код, который будет работать 🌞

    (RESTART)
@SCREEN
D=A
@screenRow
M=D

/////////////////////////// CHECK IF USER PRESSED A KEY AND GOTO SELECT COLOR
    (KEYBOARD_CHECK)
@KBD
D=M

@SELECT_BLACK_COLOR
D;JGT	// Goto select black color

@SELECT_WHITE_COLOR
D;JEQ	// Goto select color

@KEYBOARD_CHECK // Endlessly repeat keyboard check
0;JMP

/////////////////////////// SELECT BLACK OR WHITE COLOR
    (SELECT_BLACK_COLOR)
@color
M=-1	// -1=11111111111111, -1 means make all pixels black
@PAINT_SCREEN
0;JMP

    (SELECT_WHITE_COLOR)
@color
M=0	// 0 means make all pixels white

@PAINT_SCREEN
0;JMP

//////////////////////////
    (PAINT_SCREEN)
@color	// CHECK WHAT TO FILL SCREEN WITH
D=M	// D CONTAINS BLACK OR WHITE

@screenRow
A=M	// GET ADRESS OF SCREEN PIXEL TO FILL
M=D	// FILL IT

@screenRow
D=M+1	// INC TO NEXT PIXEL
@KBD
D=A-D	// KBD-SCREEN=A

@screenRow
M=M+1	// INC TO NEXT PIXEL

    @PAINT_SCREEN
D;JGT	// IF A=0 EXIT AS THE WHOLE SCREEN IS BLACK
/////////////////////////
    @RESTART
0;JMP