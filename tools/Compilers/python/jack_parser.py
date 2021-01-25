#!/usr/bin/env python

import contextlib
import functools
import itertools
import sys
from pathlib import Path
from xml.sax.saxutils import escape as xml_escape

from jack_tokenizer import tokenize


def pairwise(iterable):
    a, b = itertools.tee(iterable)
    next(b, None)
    return zip(a, b)


def with_tag(name):
    def inner_f(f):
        @functools.wraps(f)
        def result(self, *args, **kwargs):
            with self.tag(name):
                f(self, *args, **kwargs)

        return result

    return inner_f


class Parser:
    def __init__(self, token_stream, out_stream):
        token_stream = itertools.chain(token_stream, [(None, None), (None, None)])
        self.pairwise_stream = pairwise(token_stream)
        self.out_stream = out_stream
        self.advance(first_call=True)

    @contextlib.contextmanager
    def tag(self, name):
        self.out_stream.write(f"<{name}>\n")
        yield
        self.out_stream.write(f"</{name}>\n")

    def advance(self, first_call=False):
        if not first_call:
            escaped_value = xml_escape(self.token_value)
            self.out_stream.write(
                f"<{self.token_type}> {escaped_value} </{self.token_type}>\n"
            )
        current, peek = next(self.pairwise_stream)
        self.token_type, self.token_value = current
        self.next_token_type, self.next_token_value = peek

    def consume(self, assert_type=None, assert_value=None):
        value = self.token_value
        if assert_type is not None:
            assert assert_type == self.token_type
        if assert_value is not None:
            assert assert_value == self.token_value
        self.advance()
        return value

    def try_consume(self, assert_type, assert_value):
        if (self.token_type, self.token_value) != (assert_type, assert_value):
            return False

        self.advance()
        return True

    def is_at_keyword(self, *kws):
        return self.token_type == "keyword" and self.token_value in kws

    @with_tag("class")
    def compile_class(self):
        self.consume("keyword", "class")
        name = self.consume("identifier")
        self.consume("symbol", "{")
        self.compile_class_var_dec()
        self.compile_subroutine()
        self.consume("symbol", "}")

    def compile_class_var_dec(self):
        while self.is_at_keyword("static", "field"):
            with self.tag("classVarDec"):
                visibility = self.consume("keyword")
                var_type = self.consume_type()

                has_more = True
                while has_more:
                    var_name = self.consume("identifier")
                    has_more = self.try_consume("symbol", ",")

                self.consume("symbol", ";")

    def consume_type(self, allow_void=False):
        assert self.is_at_type(allow_void)
        return self.consume()

    def is_at_type(self, allow_void=False):
        allowed_types = ["int", "char", "boolean"]
        if allow_void:
            allowed_types.append("void")
        return self.is_at_keyword(*allowed_types) or self.token_type == "identifier"

    def compile_subroutine(self):
        while self.is_at_keyword("constructor", "function", "method"):
            with self.tag("subroutineDec"):
                subroutine_type = self.consume("keyword")
                res_type = self.consume_type(allow_void=True)
                name = self.consume("identifier")
                self.consume("symbol", "(")
                param_list = self.compile_parameter_list()
                self.consume("symbol", ")")
                with self.tag("subroutineBody"):
                    self.consume("symbol", "{")
                    self.compile_var_dec()
                    self.compile_statements()
                    self.consume("symbol", "}")

    @with_tag("parameterList")
    def compile_parameter_list(self):
        has_more = self.token_type != "symbol"
        while has_more:
            param_type = self.consume_type()
            param_name = self.consume("identifier")
            has_more = self.try_consume("symbol", ",")

    def compile_var_dec(self):
        while self.is_at_keyword("var"):
            with self.tag("varDec"):
                self.consume("keyword", "var")
                var_type = self.consume_type()
                has_more = True
                while has_more:
                    var_name = self.consume("identifier")
                    has_more = self.try_consume("symbol", ",")
                self.consume("symbol", ";")

    @with_tag("statements")
    def compile_statements(self):
        has_more = True
        while has_more:
            if self.is_at_keyword("do"):
                self.compile_do()
            elif self.is_at_keyword("let"):
                self.compile_let()
            elif self.is_at_keyword("while"):
                self.compile_while()
            elif self.is_at_keyword("return"):
                self.compile_return()
            elif self.is_at_keyword("if"):
                self.compile_if()
            else:
                has_more = False

    @with_tag("doStatement")
    def compile_do(self):
        self.consume("keyword", "do")
        obj = None
        subroutine = self.consume("identifier")
        if self.try_consume("symbol", "."):
            obj = subroutine
            subroutine = self.consume("identifier")
        self.consume("symbol", "(")
        self.compile_expression_list()
        self.consume("symbol", ")")
        self.consume("symbol", ";")

    @with_tag("letStatement")
    def compile_let(self):
        self.consume("keyword", "let")
        var_name = self.consume("identifier")
        if self.try_consume("symbol", "["):
            index = self.compile_expression()
            self.consume("symbol", "]")
        self.consume("symbol", "=")
        value = self.compile_expression()
        self.consume("symbol", ";")

    @with_tag("whileStatement")
    def compile_while(self):
        self.consume("keyword", "while")
        self.consume("symbol", "(")
        self.compile_expression()
        self.consume("symbol", ")")
        self.consume("symbol", "{")
        self.compile_statements()
        self.consume("symbol", "}")

    @with_tag("returnStatement")
    def compile_return(self):
        self.consume("keyword", "return")
        if not self.try_consume("symbol", ";"):
            self.compile_expression()
            self.consume("symbol", ";")

    @with_tag("ifStatement")
    def compile_if(self):
        self.consume("keyword", "if")
        self.consume("symbol", "(")
        self.compile_expression()
        self.consume("symbol", ")")
        self.consume("symbol", "{")
        self.compile_statements()
        self.consume("symbol", "}")
        if self.try_consume("keyword", "else"):
            self.consume("symbol", "{")
            self.compile_statements()
            self.consume("symbol", "}")

    @with_tag("expression")
    def compile_expression(self):
        has_more = True
        while has_more:
            self.compile_term()
            if (self.token_type == "symbol") and (self.token_value in "+-*/&|<>="):
                self.consume()
            else:
                has_more = False

    @with_tag("term")
    def compile_term(self):
        if self.token_type == "integerConstant":
            self.consume("integerConstant")
        elif self.token_type == "stringConstant":
            self.consume("stringConstant")
        elif self.token_type == "keyword":
            if self.token_value in {"true", "false", "null", "this"}:
                self.consume("keyword")
            else:
                assert False
        elif self.token_type == "identifier":
            next_sym = self.term_next_symbol_lookahead()
            if next_sym is None:
                self.consume("identifier")
            elif next_sym == "[":
                self.consume("identifier")
                self.consume("symbol", "[")
                self.compile_expression()
                self.consume("symbol", "]")
            elif next_sym == "(":
                self.consume("identifier")
                self.consume("symbol", "(")
                self.compile_expression_list()
                self.consume("symbol", ")")
            elif next_sym == ".":
                self.consume("identifier")
                self.consume("symbol", ".")
                self.consume("identifier")
                self.consume("symbol", "(")
                self.compile_expression_list()
                self.consume("symbol", ")")
            else:
                assert False
        elif self.token_type == "symbol":
            if self.token_value == "(":
                self.consume("symbol", "(")
                self.compile_expression()
                self.consume("symbol", ")")
            elif self.token_value in "-~":
                self.consume("symbol")
                self.compile_term()
            else:
                assert False
        else:
            assert False

    def term_next_symbol_lookahead(self):
        if self.next_token_type != "symbol":
            return None

        elif self.next_token_value not in "[(.":
            return None

        else:
            return self.next_token_value

    @with_tag("expressionList")
    def compile_expression_list(self):
        has_more = (self.token_type, self.token_value) != ("symbol", ")")
        while has_more:
            self.compile_expression()
            has_more = self.try_consume("symbol", ",")


def main(input_file, out_stream):
    input_file = Path(input_file)
    parser = Parser(tokenize(input_file.read_text()), out_stream)
    parser.compile_class()


if __name__ == "__main__":
    main(sys.argv[1], sys.stdout)
