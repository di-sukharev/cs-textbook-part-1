let TRUE  = 0x0000.toString(10)
let FALSE = 0xFFFF.toString(10)

let jumpLabelCount = 0

function generateJumpLabel(){
  return `JUMP.LABEL.${jumpLabelCount++}`
}

let returnLabelCount = 0

function generateReturnLabel(){
  return `RETURN.LABEL.${returnLabelCount++}`
}

function pseudocode(pseudocode, options) {
  let code = pseudocode.replace(/\s/g, '')
  let compareLabel = generateJumpLabel()
  let endCompareLabel = generateJumpLabel()
  switch(code) {
    case 'POSITION=D':
      return `@${options.position}\n` + `M=D\n`
    case 'D=POSITION':
      return `@${options.position}\n` + `D=M\n`
    case '*POSITION=D':
      return `@${options.position}\n` + 'A=M\n' + `M=D\n`
    case 'D=*D':
      return `A=D\n` + `D=M\n`
    case '*SP=D;SP++':
    case 'push(D)':
      return `@SP\n` + `A=M\n` + `M=D\n` + `@SP\n` + `M=M+1\n`
    case 'D=SEGMENT+i':
      return `@${options.segment}\n` + `D=M\n` +
      `@${options.index}\n` + `D=D+A\n`
    case 'SP--;D=*SP':
    case 'D=pop()':
      return `@SP\n` + `M=M-1\n` + `A=M\n` + `D=M\n`
    case 'SP--':
      return `@SP\n` + `M=M-1\n`
    case 'D=*(SP-1);A=*(SP-2)':
    case 'D=y;M=x':
      return `@SP\n` +`A=M\n` + `A=A-1\n` + `D=M\n` + `A=A-1\n`
    case 'A=*(SP-1)':
    case 'M=y':
      return `@SP\n` + `A=M\n` + `A=A-1\n`
    case '*(SP-2)=D':
    case 'x=D':
      return `@SP\n` + `A=M\n` + `A=A-1\n` + `A=A-1\n` + `M=D\n`
    case 'D=M-D?TRUE:FALSE':
    case 'D=x-y?TRUE:FALSE':
      return `D=M-D\n` + // second top - top
      `@${compareLabel}\n` +
      `D;${options.compare}\n` +
      `@${FALSE}\n` +
      `D=A\n` + // D = false
      `@${endCompareLabel}\n` +
      `0;JMP\n` +
      `(${compareLabel})\n` +
      `@${TRUE}\n` +
      `D=A\n` + // D = M - D ? TRUE : FALSE
      `(${endCompareLabel})\n`
    case 'ARG=SP-n-5':
      return `@SP\n` +
      `D=M\n` +
      `@${options.argsNum}\n` +
      `D=D-A\n` +
      `@5\n` +
      `D=D-A\n` +
      `@ARG\n` +
      `A=M\n` +
      `M=D\n`
    case 'lhs=rhs':
      return `@${options.rhs}\n`+ `D=M\n`+ `@${options.lhs}\n`+ `M=D\n`
    default:
      throw Error('Unrecognizable pseudo code')
  }
}

let commonSegments = ['local', 'argument', 'this', 'that']

let segmentSymbolMap = {
  'local': "LCL",
  'argument': 'ARG',
  'this': 'THIS',
  'that': 'THAT'
}

let pointerMap = {
  0: 'THIS',
  1: 'THAT'
}

module.exports = {commonSegments, segmentSymbolMap, pointerMap, pseudocode, generateReturnLabel}
