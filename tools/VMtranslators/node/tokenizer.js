const SegmentRegex = "argument|local|static|constant|this|that|pointer|temp";
const MemoryRegex = new RegExp(`^(push|pop)\\s+(${SegmentRegex})\\s+(\\d+)$`);
const ALRegex = /^(add|sub|neg|eq|gt|lt|and|or|not)$/;
const NameRegex = `([_.\\w:](?:[_.\\w:\\d])*)`;
const FlowRegex = new RegExp(`^(goto|label|if-goto)\\s+${NameRegex}$`);
const FunctionRegex = new RegExp(
  `^(call|function|return)(?:\\s+${NameRegex}\\s+(\\d+))?`
);
const CommentsRegex = /\/\/.*/;

function tokenizer(contents) {
  const commands = contents.split("\n");
  commands.pop();
  let tokens = [];
  for (let i = 0; i < commands.length; i++) {
    let token = getToken(commands[i]);
    if (token) tokens.push(token);
  }
  return tokens;
}

// takes a line, returns a token.
function getToken(line) {
  line = line.replace(CommentsRegex, ""); //remove the comments parts
  line = line.replace(/^\s+|\s+$/, ""); // strip the spaces
  let match;
  if ((match = MemoryRegex.exec(line))) {
    return {
      type: "memory",
      command: match[0],
      operator: match[1],
      segment: match[2],
      index: match[3],
    };
  } else if ((match = ALRegex.exec(line))) {
    return {
      type: "al",
      command: match[0],
      operator: match[1],
    };
  } else if ((match = FunctionRegex.exec(line))) {
    return {
      type: "function",
      command: match[0],
      action: match[1],
      functionName: match[2],
      count: match[3],
    };
  } else if ((match = FlowRegex.exec(line))) {
    return {
      type: "flow",
      command: match[0],
      operator: match[1],
      label: match[2],
    };
  } else if (/^\s*$/.exec(line)) {
    // an empty line
    return null;
  } else {
    throw SyntaxError("Unrecognizable Commmand.");
  }
}

module.exports = tokenizer;
