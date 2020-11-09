const {pseudocode} = require('./util')

function handleControlFlow(token, fileName) {
  switch (token.operator) {
    case 'label':
      return handleLabel(token)
    case 'goto':
      return handleGoto(token)
    case 'if-goto':
      return handleIfGoto(token)
    default:
      return ''
  }
}

function handleLabel(token) {
  return `(${token.label})\n`
}

function handleGoto(token) {
  return `@${token.label}\n` + `0;JMP\n`
}

function handleIfGoto(token) {
  return pseudocode('D = pop()') + `@${token.label}\n` + `D;JNE\n`
}

module.exports = handleControlFlow
