class Spiral {
  generateSpiral (value) {
    const numberOfRows = Math.ceil(Math.sqrt(value))
    console.log({numberOfRows})
    let spiral = []
    for (let i = 0; i < numberOfRows; i++) {
      spiral[i] = []
    }

    let xIndexStored
    let yIndexStored

    let xIndex = Math.floor(numberOfRows / 2)
    let yIndex = Math.floor(numberOfRows / 2)
    let xNumberOfCounts = 1
    let yNumberOfCounts = 1
    let xSign = 1
    let ySign = -1

    let direction = 'x'
    let number = 1
    let numberOfCounts
    while (number <= value) {
      if (direction === 'x') {
        numberOfCounts = xNumberOfCounts
      } else {
        numberOfCounts = yNumberOfCounts
      }

      let counter = 0
      while (counter < numberOfCounts && number <= value) {
        if (number === value) {
          xIndexStored = xIndex
          yIndexStored = yIndex
        }
        spiral[xIndex][yIndex] = number
        if (direction === 'x') {
          xIndex = xIndex + xSign
        } else {
          yIndex = yIndex + ySign
        }
        number++
        counter++
      }

      if (direction === 'x') {
        xNumberOfCounts++
        xSign = xSign * -1
      } else {
        yNumberOfCounts++
        ySign = ySign * -1
      }
      direction = direction === 'x' ? 'y' : 'x'
    }
    return {spiral, xIndexStored, yIndexStored}
  }

  run (req) {
    let value = 9
    if (req.query.value) {
      value = parseInt(req.query.value, 10)
    }
    return this.generateSpiral(value)
  }
}
const spiral = new Spiral()
module.exports = spiral
