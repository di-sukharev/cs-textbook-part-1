package com.dhorvay.nand2tetris;

import com.dhorvay.nand2tetris.VMTranslator;

enum CommandType {
    C_ARITHMETIC,
    C_PUSH,
    C_POP,
    C_LABEL,
    C_GOTO,
    C_IF,
    C_FUNCTION,
    C_RETURN,
    C_CALL
}

enum CommandName
{
    ADD,
    SUB,
    NEG,
    EQ,
    GT,
    LT,
    AND,
    OR,
    NOT,

    POP,
    PUSH;
}

enum Segment {
    ARGUMENT,
    LOCAL,
    STATIC,
    CONSTANT,
    THIS,
    THAT,
    POINTER,
    TEMP;
}
