#!/usr/bin/env python

import collections
import itertools
import sys
from dataclasses import dataclass
from pathlib import Path

from jack_tokenizer import tokenize


def pairwise(iterable):
    a, b = itertools.tee(iterable)
    next(b, None)
    return zip(a, b)


@dataclass
class Symbol:
    kind: str
    type: str
    number: int


class SymbolTable:
    def __init__(self):
        self.kind_map = {"local": {}, "argument": {}, "field": {}, "static": {}}
        self.all_vars = collections.ChainMap(*self.kind_map.values())

    def clear_class(self):
        for val in self.kind_map.values():
            val.clear()

    def clear_method(self):
        for kind in ("local", "argument"):
            self.kind_map[kind].clear()

    def get_kind_size(self, kind):
        return len(self.kind_map[kind])

    def declare_var(self, kind, var_type, var_name):
        self.kind_map[kind][var_name] = Symbol(kind, var_type, self.get_kind_size(kind))

    def __getitem__(self, name):
        return self.all_vars.get(name)


class Compiler:
    def __init__(self, token_stream, out_stream):
        token_stream = itertools.chain(token_stream, [(None, None), (None, None)])
        self.pairwise_stream = pairwise(token_stream)
        self.token_type, self.token_value, self.next_token_type, self.next_token_value = (
            None,
            None,
            None,
            None,
        )
        self.out_stream = out_stream
        self.class_name = "UNKNOWN"
        self.symbol_table = SymbolTable()
        self.advance()

    def advance(self):
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

    def compile_class(self):
        self.consume("keyword", "class")
        self.class_name = self.consume("identifier")
        self.symbol_table.clear_class()
        self.consume("symbol", "{")
        self.compile_class_var_dec()
        self.compile_subroutine()
        self.consume("symbol", "}")
        self.class_name = "UNKNOWN"

    def compile_class_var_dec(self):
        while self.is_at_keyword("static", "field"):
            kind = self.consume("keyword")
            var_type = self.consume_type()

            has_more = True
            while has_more:
                var_name = self.consume("identifier")
                self.symbol_table.declare_var(kind, var_type, var_name)
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
            subroutine_type = self.consume("keyword")
            func_res_type = self.consume_type(allow_void=True)
            func_name = self.consume("identifier")
            self.symbol_table.clear_method()
            self.consume("symbol", "(")
            if subroutine_type == "method":
                self.symbol_table.declare_var("argument", self.class_name, "this")
            self.compile_parameter_list()
            param_count = self.symbol_table.get_kind_size("argument")
            self.out_stream.write(
                f"function {self.class_name}.{func_name} {param_count}\n"
            )
            self.consume("symbol", ")")
            self.consume("symbol", "{")
            self.compile_var_dec()
            if subroutine_type == "constructor":
                # TODO: initialize `this` pointer
                pass
            if subroutine_type == "method":
                # TODO: unpack `this` argument into `pointer 0` vm register
                pass
            self.compile_statements()
            self.consume("symbol", "}")

    def compile_parameter_list(self):
        has_more = self.token_type != "symbol"
        while has_more:
            param_type = self.consume_type()
            param_name = self.consume("identifier")
            self.symbol_table.declare_var("argument", param_type, param_name)
            has_more = self.try_consume("symbol", ",")

    def compile_var_dec(self):
        while self.is_at_keyword("var"):
            self.consume("keyword", "var")
            var_type = self.consume_type()
            has_more = True
            while has_more:
                var_name = self.consume("identifier")
                self.symbol_table.declare_var("local", var_type, var_name)
                has_more = self.try_consume("symbol", ",")
            self.consume("symbol", ";")

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

    def compile_do(self):
        self.consume("keyword", "do")
        num_args = 0
        subroutine = self.consume("identifier")
        if self.try_consume("symbol", "."):
            var_name = subroutine
            var = self.symbol_table[var_name]
            subroutine = self.consume("identifier")
            if var is None:
                callable_name = f"{var_name}.{subroutine}"
            else:
                callable_name = f"{var.type}.{subroutine}"
                self.out_stream.write(f"push {var.kind} {var.number}\n")
                num_args += 1
        else:
            callable_name = f"{self.class_name}.{subroutine}"
            self.out_stream.write(f"push pointer 0\n")
            num_args += 1
        self.consume("symbol", "(")
        num_args += self.compile_expression_list()
        self.consume("symbol", ")")
        self.consume("symbol", ";")
        self.out_stream.write(f"call {callable_name} {num_args}\n")

    def compile_let(self):
        self.consume("keyword", "let")
        var_name = self.consume("identifier")
        var = self.symbol_table[var_name]
        if self.try_consume("symbol", "["):
            index = self.compile_expression()
            self.consume("symbol", "]")
        self.consume("symbol", "=")
        value = self.compile_expression()
        self.consume("symbol", ";")

    def compile_while(self):
        self.consume("keyword", "while")
        self.consume("symbol", "(")
        self.compile_expression()
        self.consume("symbol", ")")
        self.consume("symbol", "{")
        self.compile_statements()
        self.consume("symbol", "}")

    def compile_return(self):
        self.consume("keyword", "return")
        if not self.try_consume("symbol", ";"):
            self.compile_expression()
            self.consume("symbol", ";")

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

    def compile_expression(self):
        binary_ops = {
            "+": "add",
            "-": "sub",
            "*": "call Math.multiply 2",
            "/": "call Math.divide 2",
            "&": "and",
            "|": "or",
            "<": "lt",
            ">": "gt",
            "=": "eq",
        }
        self.compile_term()
        while (self.token_type == "symbol") and (self.token_value in binary_ops):
            op = self.consume()
            self.compile_term()
            self.out_stream.write(binary_ops[op] + "\n")

    def compile_term(self):
        if self.token_type == "integerConstant":
            val = self.consume("integerConstant")
            self.out_stream.write(f"push constant {val}\n")
        elif self.token_type == "stringConstant":
            self.consume("stringConstant")
            # TODO: string
        elif self.token_type == "keyword":
            if self.token_value == "true":
                self.consume("keyword")
                self.out_stream.write("push constant 1\n")
                self.out_stream.write("neg\n")
            elif self.token_value == "false":
                self.consume("keyword")
                self.out_stream.write("push constant 0\n")
            elif self.token_value in "null":
                self.consume("keyword")
                self.out_stream.write("push constant 0\n")
            elif self.token_value == "this":
                self.consume("keyword")
                self.out_stream.write("push pointer 0\n")
            else:
                assert False
        elif self.token_type == "identifier":
            next_sym = self.term_next_symbol_lookahead()
            if next_sym is None:
                var_name = self.consume("identifier")
                var = self.symbol_table[var_name]
            elif next_sym == "[":
                var_name = self.consume("identifier")
                var = self.symbol_table[var_name]
                self.consume("symbol", "[")
                self.compile_expression()
                self.consume("symbol", "]")
            elif next_sym == "(":
                fn_name = self.consume("identifier")
                self.consume("symbol", "(")
                self.compile_expression_list()
                self.consume("symbol", ")")
            elif next_sym == ".":
                var_name = self.consume("identifier")
                var = self.symbol_table[var_name]
                self.consume("symbol", ".")
                fun_name = self.consume("identifier")
                self.consume("symbol", "(")
                self.compile_expression_list()
                self.consume("symbol", ")")
            else:
                assert False
        elif self.token_type == "symbol":
            unary_ops = {"-": "neg", "~": "not"}
            if self.token_value == "(":
                self.consume("symbol", "(")
                self.compile_expression()
                self.consume("symbol", ")")
            elif self.token_value in unary_ops:
                op = self.consume("symbol")
                self.compile_term()
                self.out_stream.write(unary_ops[op] + "\n")
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

    def compile_expression_list(self):
        num_exprs = 0
        has_more = (self.token_type, self.token_value) != ("symbol", ")")
        while has_more:
            self.compile_expression()
            num_exprs += 1
            has_more = self.try_consume("symbol", ",")
        return num_exprs


def main(input_file, out_stream):
    input_file = Path(input_file)
    compiler = Compiler(tokenize(input_file.read_text()), out_stream)
    compiler.compile_class()


if __name__ == "__main__":
    main(sys.argv[1], sys.stdout)
