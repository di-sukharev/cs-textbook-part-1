const {pseudocode} = require('./util')

function handleAL(token) {
  switch (token.operator) {
    case 'add':
      return handleAdd(token)
    case 'sub':
      return handleSub(token)
    case 'neg':
      return handleNeg(token)
    case 'and':
      return handleAnd(token)
    case 'or':
      return handleOr(token)
    case 'not':
      return handleNot(token)
    case 'eq':
      return handleEq(token)
    case 'gt':
      return handleGt(token)
    case 'lt':
      return handleLt(token)
    default:
      return ''
  }
}
//=========================//
//=========================//
// stack = [..., x, y]
// stack[sp] = undefined
// stack[sp-1] = y
// stack[sp-2] = x
//=========================//
//=========================//

function handleBinary(op) {
  return pseudocode('D = y; M = x') +
    `M=${op}\n` +
    pseudocode('SP--')
}

function handleUnary(op) {
  return pseudocode('M = y') +
    `M=${op}M\n` + // M is the top of the stack
    pseudocode('SP--')  // sp -> y
}

function handleCompare(compare) {
  return pseudocode('D = y; M = x') +
    pseudocode('D = x - y ? TRUE : FALSE', {compare: compare})
    pseudocode('x = D') +
    pseudocode('SP--')
}

function handleAdd(token) {
  return handleBinary('D+M')
}

function handleSub(token) {
  return handleBinary('M-D')
}

function handleAnd(token) {
  return handleBinary('D&M')
}

function handleOr(token) {
  return handleBinary('D|M')
}

function handleNeg(token) {
  return handleUnary('-')
}

function handleNot(token) {
  return handleUnary('!')
}

function handleEq(token) {
  return handleCompare('JEQ')
}

function handleGt(token) {
  return handleCompare('JGT')
}

function handleLt(token) {
  return handleCompare('JLT')
}

module.exports = handleAL
