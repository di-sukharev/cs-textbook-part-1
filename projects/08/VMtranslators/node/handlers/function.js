let {handlePushWithConstantSegment} = require('./push')
let {pseudocode, generateReturnLabel} = require('./util')

//===============================//
//===============================//
// DISPATCHER //
//===============================//
//===============================//

function handleFunction(token) {
  switch (token.action) {
    case 'call':
      return handleCalling(token)
    case 'function':
      return handleDeclaration(token)
    case 'return':
      return handleReturn(token)
    default:
      return ''
  }
}

//===============================//
//===============================//
// CALL NAME ARGS //
//===============================//
//===============================//

//===============================//
//===============================//
// [n ARGs]
// 1. RET ADDR
// 2. OLD LCL
// 3. OLD ARG
// 4. OLD THIS
// 5. OLD THAT
//===============================//
//===============================//

function handleCalling(token) {
  let commands = ''
  let returnAddressLabel = generateReturnLabel()
  if(!token.count) token.count = 0
  commands += pushReturnAddress(returnAddressLabel)
  commands += pushSegment('LCL') // push LCL
  commands += pushSegment('ARG') // push ARG
  commands += pushSegment('THIS') // push THIS
  commands += pushSegment('THAT') // push THAT
  commands += pseudocode('ARG = SP - n - 5', {argsNum: token.count}) // ARG = SP - n - 5
  commands += pseudocode('lhs = rhs', {lhs: 'LCL', rhs: 'SP'}) // LCL = SP
  commands += `@${token.functionName}\n` + `0;JMP\n` // goto functionName
  commands += `(${returnAddressLabel})\n` // which line is the return line
  return commands
}

// stack.push(LABEL_POSITION)
function pushReturnAddress(returnAddressLabel) {
  return `@${returnAddressLabel}\n` + `D=A\n` + pseudocode('push(D)')
}

// stack.push(SEGMENT_POSITION)
// e.g. stack.push(256)
function pushSegment(segment){
  return pseudocode('D=POSITION', {position: segment}) + pseudocode('push(D)')
}

//===============================//
//===============================//
// FUNCTION NAME LOCALS //
//===============================//
//===============================//

function handleDeclaration(token) {
  let commands = ''
  commands += `(${token.functionName})\n`
  for (var i = 0; i < token.count; i++) {
    commands += handlePushWithConstantSegment(i)
  }
  return commands
}

//===============================//
//===============================//
// RETURN //
//===============================//
//===============================//

let FRAME = 'R13'
let RET = 'R14'

function handleReturn(token) {
  let commands = ''
  commands += pseudocode('lhs = rhs', {lhs: FRAME, rhs: 'LCL'}) // FRAME = LCL
  commands += `@5\n`+ `A=D-A\n`+ `D=M\n`+ pseudocode('POSITION=D', {position: RET}) // RET = *(FRAME - 5)
  commands += pseudocode('D = pop()') + pseudocode('*POSITION=D', {position: 'ARG'}) // *ARG = pop()
  commands += pseudocode('D=POSITION', {position: 'ARG'}) + `@SP\n`+ `M=D+1\n` // SP = ARG + 1
  commands += restoreCaller('THAT', 1) // THAT = *(FRAME - 1)
  commands += restoreCaller('THIS', 2) // THIS = *(FRAME - 2)
  commands += restoreCaller('ARG', 3) // ARG = *(FRAME - 3)
  commands += restoreCaller('LCL', 4) // LCL = *(FRAME - 4)
  commands += `@${RET}\n` + `A=M\n` + `0;JMP\n` // goto RET
  return commands
}

function restoreCaller(label, pos) {
  return pseudocode('D = POSITION', {position: FRAME}) + // D = FRAME
    `@${pos}\n` + `D=D-A\n` + // D = FRAME - pos
    pseudocode('D = *D') + // D = *(FRAME - pos)
    pseudocode('POSITION = D', {position: label}) // label = D = *(FRAME - pos)
}

module.exports = {handleFunction, handleCalling}
