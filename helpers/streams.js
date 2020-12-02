export const cleanStream = (stream) => {
  let cleanedStream = ''
  let isInIgnoreState = false
  let isInGarbageState = false
  let depth = 0
  let score = 0
  let groups = 0
  let nrOfGarbageCharacters = 0
  for (let i = 0; i < stream.length; i++) {
    let currentCharacter = stream[i]

    if (isInIgnoreState || currentCharacter === '!') {
      isInIgnoreState = !isInIgnoreState
      continue
    }

    if (!isInGarbageState) {
      if (currentCharacter === '{') {
        depth++
        groups++
        cleanedStream += currentCharacter
      } else if (currentCharacter === '}') {
        score += depth
        depth--
        cleanedStream += currentCharacter
      } else if (currentCharacter === '<') {
        isInGarbageState = true
      } else {
        cleanedStream += currentCharacter
      }
    } else {
      if (currentCharacter === '>') {
        isInGarbageState = false
      } else {
        nrOfGarbageCharacters++
      }
    }
  }

  return {cleanedStream, score, groups, nrOfGarbageCharacters}
}
