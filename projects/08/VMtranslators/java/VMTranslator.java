package com.dhorvay.nand2tetris;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class VMTranslator {

    private final static Logger logger = LoggerFactory.getLogger(VMTranslator.class);

    public static void main(String[] args) {
        VMTranslator translator = new VMTranslator();
        translator.run(args);
        System.exit(0);
    }

    VMTranslator() { }

    void run(String[] args) {
        if(args.length > 0) {
            String filename = args[0];
            Parser parser = new Parser(filename);
            CodeWriter codeWriter = new CodeWriter(filename);

            while(parser.hasMoreCommands()) {
                parser.advance();
                CommandType commandType = parser.commandType();
                if (commandType == null) {
                    logger.debug("Processing command type resulted in blank line or comment - skipping");
                    continue;
                }
                String arg1 = parser.arg1();
                Integer arg2 = parser.arg2();
                switch(commandType) {
                    case C_ARITHMETIC:
                        codeWriter.writeArithmetic(arg1);
                        break;
                    case C_PUSH:
                    case C_POP:
                        codeWriter.writePushPop(commandType, arg1, arg2);
                        break;
                }
            }
            codeWriter.close();
        } else {
            logger.error("Proper usage: VMTranslator.java /path/to/Foo.vm");
            System.exit(1);
        }
        logger.info("VMTranslator completed successfully - exiting...");
    }
}
