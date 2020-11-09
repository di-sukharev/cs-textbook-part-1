const {commonSegments, segmentSymbolMap, pointerMap, pseudocode} = require('./util')

function handlePush(token, fileName) {
  switch (token.segment) {
    case 'argument':
    case 'this':
    case 'that':
    case 'local':
    case 'temp':
      return handlePushWithCommonSegments(token)
    case 'static':
    case 'pointer':
      return handlePushWithFixedSegment(token, fileName)
    case 'constant':
      return handlePushWithConstantSegment(token)
    default:
      return ''
  }
}

// push local i === push(*(SEGMENT + i))
function handlePushWithCommonSegments(token) {
  let segment = token.segment === 'temp' ? 'R5' : segmentSymbolMap[token.segment]
  return pseudocode(`D = SEGMENT + i`, {segment, index: token.index}) +
    pseudocode('D = *D') + // D = *(SEGMENT + i)
    pseudocode('push(D)') // push(*(SEGMENT + i))
}

// push static or pointer i === push(POSITION)
function handlePushWithFixedSegment(token, fileName) {
  let position = token.segment === 'static' ? `${fileName}.${token.index}` : pointerMap[token.index]
  // push(FileName.i) or push(THIS) or push(THAT)
  return pseudocode('D=POSITION', {position}) + pseudocode('push(D)')
}

// push constant i === push(i)
function handlePushWithConstantSegment(tokenOrIndex) {
  let index = typeof tokenOrIndex === 'object' ? tokenOrIndex.index : tokenOrIndex
  return `@${index}\n` + `D=A\n` + pseudocode('push(D)')
}

module.exports = {handlePush, handlePushWithConstantSegment}
