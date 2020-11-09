package com.dhorvay.nand2tetris;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

class Parser {

    private final Logger logger = LoggerFactory.getLogger(Parser.class);

    private Scanner scanner;
    private String[] command;

    Parser(String filename) {
        try {
            File file = new File(filename);
            this.scanner = new Scanner(file);
        } catch (FileNotFoundException e) {
            logger.error("Error: could not open file: {}", filename, e);
            System.exit(1);
        }
    }

    boolean hasMoreCommands() {
        return scanner.hasNext();
    }

    void advance() {
        // Get next command and trim trailing white space
        // We will consider this the 'full command'
        String fullCommand = scanner.nextLine().trim();
        //logger.debug("Advancing parser - full command: {}", fullCommand);

        // Split the full command where there is a space
        command = fullCommand.split("\\s+");
    }

    CommandType commandType() {
        if (command[0].length() == 0 || command[0].startsWith("//")) {
            return null;
        }

        switch(CommandName.valueOf(command[0].toUpperCase())) {
            case ADD:
            case SUB:
            case NEG:
            case EQ:
            case GT:
            case LT:
            case AND:
            case OR:
            case NOT:
                return CommandType.C_ARITHMETIC;
            case POP:
                return CommandType.C_POP;
            case PUSH:
                return CommandType.C_PUSH;
            default:
                return null;
        }
    }

    String arg1() {
       return (command.length > 1) ? command[1] : command[0];
    }

    Integer arg2() {
        return (command.length > 2) ? Integer.parseInt(command[2]) : null;
    }
}
