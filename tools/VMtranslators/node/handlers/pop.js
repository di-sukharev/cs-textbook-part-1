const {commonSegments, segmentSymbolMap, pointerMap, pseudocode} = require('./util')

function handlePop(token, fileName) {
  switch (token.segment) {
    case 'temp':
    case 'argument':
    case 'this':
    case 'that':
    case 'local':
      return handlePopWithCommonSegment(token)
    case 'static':
    case 'pointer':
      return handlePopWithFixedSegment(token, fileName)
    default:
      return ''
  }
}

// pop pointer / static 17 === POSITION = pop()
function handlePopWithFixedSegment(token, fileName) {
  let position = token.segment === 'static' ? `${fileName}.${token.index}` : pointerMap[token.index]
  // THIS/THAT/STATIC = top of the stack
  return pseudocode('D = pop()') + pseudocode('POSITION = D', {position})
}

// pop local 5 === *(SEGMENT + i) = pop()
function handlePopWithCommonSegment(token) {
  let segment = token.segment === 'temp' ? 'R5' : segmentSymbolMap[token.segment]
  return pseudocode(`D = SEGMENT + i`, {segment, index: token.index}) +
    pseudocode('POSITION = D', {position: 'R13'}) + // R13 = SEGMENT + i
    pseudocode('D = pop()') +                       // D => *(--SP)
    pseudocode('*POSITION = D', {position: 'R13'})  // *(SEGMENT + i) = *SP
}

module.exports = handlePop
