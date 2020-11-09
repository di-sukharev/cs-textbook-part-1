package com.dhorvay.nand2tetris;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

class CodeWriter {

    private final Logger logger = LoggerFactory.getLogger(CodeWriter.class);

    StringBuilder output;
    private String filename;
    private Path path;
    private int eqLblNum, gtLblNum, ltLblNum;

    CodeWriter(String filename) {
        this.filename = setFileName(filename);
        this.path = Paths.get(this.filename);
        this.output = new StringBuilder();
        setupStack();
    }

    String setFileName(String filename) {
         return String.format("%s%s",filename.split("\\.vm")[0], ".asm");
    }

    private void setupStack() {
        output.append("// setup\n");
        output.append("@256\n");
        output.append("D=A\n");
        output.append("@SP\n");
        output.append("M=D\n");
    }

    void writeArithmetic(String command) {
        switch(CommandName.valueOf(command.toUpperCase())) {
            case ADD:
                output.append("// add\n");
                output.append("@SP\n");
                output.append("M=M-1\n");
                output.append("A=M\n");
                output.append("D=M\n");
                output.append("@SP\n");
                output.append("M=M-1\n");
                output.append("A=M\n");
                output.append("M=M+D\n");
                output.append("@SP\n");
                output.append("M=M+1\n");
                break;
            case SUB:
                output.append("// sub\n");
                output.append("@SP\n");
                output.append("M=M-1\n");
                output.append("A=M\n");
                output.append("D=M\n");
                output.append("@SP\n");
                output.append("M=M-1\n");
                output.append("A=M\n");
                output.append("M=M-D\n");
                output.append("@SP\n");
                output.append("M=M+1\n");
                break;
            case NEG:
                output.append("// neg\n");
                output.append("@SP\n");
                output.append("M=M-1\n");
                output.append("A=M\n");
                output.append("M=-M\n");
                output.append("@SP\n");
                output.append("M=M+1\n");
                break;
            case EQ:
                output.append("// eq\n");
                output.append("@SP\n");
                output.append("M=M-1\n");
                output.append("A=M\n");
                output.append("D=M\n");
                output.append("@SP\n");
                output.append("M=M-1\n");
                output.append("A=M\n");
                output.append("D=M-D\n");
                output.append("M=-1\n");
                output.append("@EQ_LBL_").append(eqLblNum).append("\n");
                output.append("D;JEQ\n");
                output.append("@SP\n");
                output.append("A=M\n");
                output.append("M=0\n");
                output.append("(EQ_LBL_").append(eqLblNum).append(")\n");
                output.append("@SP\n");
                output.append("M=M+1\n");
                eqLblNum++;
                break;
            case GT:
                output.append("// gt\n");
                output.append("@SP\n");
                output.append("M=M-1\n");
                output.append("A=M\n");
                output.append("D=M\n");
                output.append("@SP\n");
                output.append("M=M-1\n");
                output.append("A=M\n");
                output.append("D=M-D\n");
                output.append("M=-1\n");
                output.append("@GT_LBL_").append(gtLblNum).append("\n");
                output.append("D;JGT\n");
                output.append("@SP\n");
                output.append("A=M\n");
                output.append("M=0\n");
                output.append("(GT_LBL_").append(gtLblNum).append(")\n");
                output.append("@SP\n");
                output.append("M=M+1\n");
                gtLblNum++;
                break;
            case LT:
                output.append("// lt").append("\n");
                output.append("@SP\n");
                output.append("M=M-1\n");
                output.append("A=M\n");
                output.append("D=M\n");
                output.append("@SP\n");
                output.append("M=M-1\n");
                output.append("A=M\n");
                output.append("D=M-D\n");
                output.append("M=-1\n");
                output.append("@LT_LBL_").append(ltLblNum).append("\n");
                output.append("D;JLT\n");
                output.append("@SP\n");
                output.append("A=M\n");
                output.append("M=0\n");
                output.append("(LT_LBL_").append(ltLblNum).append(")\n");
                output.append("@SP\n");
                output.append("M=M+1\n");
                ltLblNum++;
                break;
            case AND:
                output.append("// and\n");
                output.append("@SP\n");
                output.append("M=M-1\n");
                output.append("A=M\n");
                output.append("D=M\n");
                output.append("@SP\n");
                output.append("M=M-1\n");
                output.append("A=M\n");
                output.append("M=M&D\n");
                output.append("@SP\n");
                output.append("M=M+1\n");
                break;
            case OR:
                output.append("// or").append("\n");
                output.append("@SP\n");
                output.append("M=M-1\n");
                output.append("A=M\n");
                output.append("D=M\n");
                output.append("@SP\n");
                output.append("M=M-1\n");
                output.append("A=M\n");
                output.append("M=M|D\n");
                output.append("@SP\n");
                output.append("M=M+1\n");
                break;
            case NOT:
                output.append("// not\n");
                output.append("@SP\n");
                output.append("M=M-1\n");
                output.append("A=M\n");
                output.append("M=!M\n");
                output.append("@SP\n");
                output.append("M=M+1\n");
                break;
        }
    }

    void writePushPop(CommandType commandType, String segment, int index) {
        if(commandType.equals(CommandType.C_PUSH)) {
            output.append("// push ").append(segment).append(" ").append(index).append("\n");
            switch (Segment.valueOf(segment.toUpperCase())) {
                case ARGUMENT:
                    output.append("@ARG\n");
                    output.append("D=M\n");
                    output.append("@").append(index).append("\n");
                    output.append("A=A+D\n");
                    output.append("D=M\n");
                    output.append("@SP\n");
                    output.append("A=M\n");
                    output.append("M=D\n");
                    output.append("@SP\n");
                    output.append("M=M+1\n");
                    break;
                case LOCAL:
                    output.append("@LCL\n");
                    output.append("D=M\n");
                    output.append("@").append(index).append("\n");
                    output.append("A=A+D\n");
                    output.append("D=M\n");
                    output.append("@SP\n");
                    output.append("A=M\n");
                    output.append("M=D\n");
                    output.append("@SP\n");
                    output.append("M=M+1\n");
                    break;
                case STATIC:
                    output.append("@").append(index).append("\n");
                    output.append("D=M\n");
                    output.append("@SP\n");
                    output.append("A=M\n");
                    output.append("M=D\n");
                    output.append("@SP\n");
                    output.append("M=M+1\n");
                    break;
                case CONSTANT:
                    output.append("@").append(index).append("\n");
                    output.append("D=A\n");
                    output.append("@SP\n");
                    output.append("A=M\n");
                    output.append("M=D\n");
                    output.append("@SP\n");
                    output.append("M=M+1\n");
                    break;
                case THAT:
                    output.append("@THAT\n");
                    output.append("D=M\n");
                    output.append("@").append(index).append("\n");
                    output.append("A=A+D\n");
                    output.append("D=M\n");
                    output.append("@SP\n");
                    output.append("A=M\n");
                    output.append("M=D\n");
                    output.append("@SP\n");
                    output.append("M=M+1\n");
                    break;
                case THIS:
                    output.append("@THIS\n");
                    output.append("D=M\n");
                    output.append("@").append(index).append("\n");
                    output.append("A=A+D\n");
                    output.append("D=M\n");
                    output.append("@SP\n");
                    output.append("A=M\n");
                    output.append("M=D\n");
                    output.append("@SP\n");
                    output.append("M=M+1\n");
                    break;
                case POINTER:
                    if (index == 0) {
                        output.append("@THIS\n");
                        output.append("D=M\n");
                        output.append("@SP\n");
                        output.append("A=M\n");
                        output.append("M=D\n");
                        output.append("@SP\n");
                        output.append("M=M+1\n");
                    } else {
                        output.append("@THAT\n");
                        output.append("D=M\n");
                        output.append("@SP\n");
                        output.append("A=M\n");
                        output.append("M=D\n");
                        output.append("@SP\n");
                        output.append("M=M+1\n");
                    }
                    break;
                case TEMP:
                    output.append("@").append(index+5).append("\n");
                    output.append("D=M\n");
                    output.append("@SP\n");
                    output.append("A=M\n");
                    output.append("M=D\n");
                    output.append("D=A+1\n");
                    output.append("@SP\n");
                    output.append("M=D\n");
                    break;
            }
        } else if (commandType.equals(CommandType.C_POP)) {
            output.append("// pop ").append(segment).append(" ").append(index).append("\n");
            switch (Segment.valueOf(segment.toUpperCase())) {
                case ARGUMENT:
                    output.append("@ARG\n");
                    output.append("D=M\n");
                    output.append("@").append(index).append("\n");
                    output.append("D=D+A\n");
                    output.append("@R13\n");
                    output.append("M=D\n");
                    output.append("@SP\n");
                    output.append("AM=M-1\n");
                    output.append("D=M\n");
                    output.append("@R13\n");
                    output.append("A=M\n");
                    output.append("M=D\n");
                    break;
                case LOCAL:
                    output.append("@").append(index).append("\n");
                    output.append("D=A\n");
                    output.append("@LCL\n");
                    output.append("D=D+M\n");
                    output.append("@R13\n");
                    output.append("M=D\n");
                    output.append("@SP\n");
                    output.append("M=M-1\n");
                    output.append("A=M\n");
                    output.append("D=M\n");
                    output.append("@R13\n");
                    output.append("A=M\n");
                    output.append("M=D\n");
                    break;
                case STATIC:
                    output.append("@").append(index).append("\n");
                    output.append("D=A\n");
                    output.append("@R13\n");
                    output.append("M=D\n");
                    output.append("@SP\n");
                    output.append("AM=M-1\n");
                    output.append("D=M\n");
                    output.append("@R13\n");
                    output.append("A=M\n");
                    output.append("M=D\n");
                    break;
                case THAT:
                    output.append("@THAT\n");
                    output.append("D=M\n");
                    output.append("@").append(index).append("\n");
                    output.append("D=D+A\n");
                    output.append("@R13\n");
                    output.append("M=D\n");
                    output.append("@SP\n");
                    output.append("AM=M-1\n");
                    output.append("D=M\n");
                    output.append("@R13\n");
                    output.append("A=M\n");
                    output.append("M=D\n");
                    break;
                case THIS:
                    output.append("@THIS\n");
                    output.append("D=M\n");
                    output.append("@").append(index).append("\n");
                    output.append("D=D+A\n");
                    output.append("@R13\n");
                    output.append("M=D\n");
                    output.append("@SP\n");
                    output.append("AM=M-1\n");
                    output.append("D=M\n");
                    output.append("@R13\n");
                    output.append("A=M\n");
                    output.append("M=D\n");
                    break;
                case POINTER:
                    if (index == 0) {
                        output.append("@THIS\n");
                        output.append("D=A\n");
                        output.append("@R13\n");
                        output.append("M=D\n");
                        output.append("@SP\n");
                        output.append("AM=M-1\n");
                        output.append("D=M\n");
                        output.append("@R13\n");
                        output.append("A=M\n");
                        output.append("M=D\n");
                    } else {
                        output.append("@THAT\n");
                        output.append("D=A\n");
                        output.append("@R13\n");
                        output.append("M=D\n");
                        output.append("@SP\n");
                        output.append("AM=M-1\n");
                        output.append("D=M\n");
                        output.append("@R13\n");
                        output.append("A=M\n");
                        output.append("M=D\n");
                    }
                    break;
                case TEMP:
                    output.append("@SP\n");
                    output.append("M=M-1\n");
                    output.append("A=M\n");
                    output.append("D=M\n");
                    output.append("@").append(index+5).append("\n");
                    output.append("M=D\n");
                    break;

            }
        }
    }

    void close() {
        try {
            output.append("(INFLOOP)\n");
            output.append("@INFLOOP\n");
            output.append("0;JMP\n");
            logger.info("Current output: {}", output.toString());
            logger.info("Writing output to: {}", filename);
            Files.write(path, output.toString().getBytes());
        } catch (IOException e) {
            logger.error("Error: could not find file: {}", filename, e);
            System.exit(1);
        }
    }
}
