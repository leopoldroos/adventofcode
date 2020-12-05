export const binaryHalving = (fulllLength, binaryInput, lessChar, moreChar) => {
  let index
  let currentMin = 0
  let currentMax = fulllLength - 1
  binaryInput.split('').forEach((char) => {
    const diff = (currentMax - currentMin + 1) / 2
    if (char === lessChar) {
      currentMax -= diff
    } else {
      currentMin += diff
    }
  })
  return { min: currentMin, max: currentMax }
}
