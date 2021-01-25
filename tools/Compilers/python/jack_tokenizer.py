#!/usr/bin/env python

import re
import sys
from pathlib import Path
from xml.sax.saxutils import escape as xml_escape

TOKENS_RE = re.compile(
    r"""(?sx)
     (?P<comment> // .*? \n | /\* .*? \*/ )
    |(?P<whitespace> \s+ )
    |(?P<keyword> (?: class|constructor|function|method|field|static|var|int|char|boolean|void|true|false|null|this|let|do|if|else|while|return) \b)
    |(?P<symbol> [{}()[\].,;+\-*/&|<>=~] )
    |(?P<integerConstant> \d+ )
    |(?: " (?P<stringConstant> [^"]*? ) " )
    |(?P<identifier> [a-zA-Z]\w* )
    |(?P<unknown>.)
"""
)

IGNORED_GROUPS = {"comment", "whitespace"}
UNKNOWN_GROUP = "unknown"


def tokenize(s: str):
    for match in TOKENS_RE.finditer(s):
        groupdict = match.groupdict()
        matched_groups = [(k, v) for k, v in groupdict.items() if v is not None]
        if len(matched_groups) == 1:
            group, match_str = matched_groups[0]
            if group == UNKNOWN_GROUP:
                raise RuntimeError("Unknown character matched")

            if group not in IGNORED_GROUPS:
                yield (group, match_str)

        else:
            raise RuntimeError("Matched more than one group", matched_groups)


def main(input_file, out_stream):
    input_file = Path(input_file)
    out_stream.write("<tokens>\n")
    for group, match in tokenize(input_file.read_text()):
        match = xml_escape(match)
        out_stream.write(f"<{group}> {match} </{group}>\n")
    out_stream.write("</tokens>\n")


if __name__ == "__main__":
    main(sys.argv[1], sys.stdout)
