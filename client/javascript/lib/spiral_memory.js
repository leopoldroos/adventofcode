export const spiralMemory = (value, spiral, xIndexStored, yIndexStored) => {
  let numberOfRows = spiral.length
  let targetIndex = Math.floor(numberOfRows / 2)
  // let output = 0
  // let gatekeeper = 0
  let xIndex = xIndexStored
  let yIndex = yIndexStored

  return Math.abs(xIndex - targetIndex) + Math.abs(yIndex - targetIndex)

  // while (xIndex !== targetIndex && yIndex !== targetIndex && gatekeeper < 100) {
    // CONTINUE HERE!!
    // define logics to know which direction to step.

    // output++
    // gatekeeper++
  // }

  // return output
}
