export const spiralMemory = (value, spiral, xIndexStored, yIndexStored) => {
  let numberOfRows = spiral.length
  let targetIndex = Math.floor(numberOfRows / 2)

  let xIndex = xIndexStored
  let yIndex = yIndexStored

  return Math.abs(xIndex - targetIndex) + Math.abs(yIndex - targetIndex)
}
