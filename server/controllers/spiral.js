const getSurroundingSum = (spiral, xIndex, yIndex) => {
  /*
  a b c   row1
  d e f   row2
  g h i   row3
  e = xIndex, yIndex
  */
  let sum = 0

  let row1 = spiral[xIndex - 1]
  let row2 = spiral[xIndex]
  let row3 = spiral[xIndex + 1]

  if (row1) {
    sum += row1[yIndex - 1] || 0  // a
    sum += row1[yIndex] || 0  // b
    sum += (row1.length > yIndex + 1) ? (row1[yIndex + 1] || 0) : 0 // c
  }

  sum += row2[yIndex - 1] || 0  // d
  sum += (row2.length > yIndex + 1) ? (row2[yIndex + 1] || 0) : 0 // f

  if (row3) {
    sum += row3[yIndex - 1] || 0  // g
    sum += row3[yIndex] || 0  // h
    sum += (row3.length > yIndex + 1) ? row3[yIndex + 1] || 0 : 0 // i
  }
  return sum
}

class Spiral {
  generateSpiral (value, withatwist) {
    const numberOfRows = Math.ceil(Math.sqrt(value))

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
    let number = 0
    let numberOfCounts
    while (number <= value) {
      if (direction === 'x') {
        numberOfCounts = xNumberOfCounts
      } else {
        numberOfCounts = yNumberOfCounts
      }

      let counter = 0
      while (counter < numberOfCounts && number <= value) {
        if (number === 0) {
          number = 1
        } else {
          if (withatwist) {
            number = getSurroundingSum(spiral, xIndex, yIndex)
          } else {
            number++
          }
        }
        if (number >= value) {
          xIndexStored = xIndex
          yIndexStored = yIndex
        }
        spiral[xIndex][yIndex] = number

        if (direction === 'x') {
          xIndex = xIndex + xSign
        } else {
          yIndex = yIndex + ySign
        }
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
    return {spiral, xIndexStored, yIndexStored, number}
  }

  run (req) {
    let value = 9
    if (req.query.value) {
      value = parseInt(req.query.value, 10)
    }
    const withatwist = !!req.query.withatwist
    return this.generateSpiral(value, withatwist)
  }
}
const spiral = new Spiral()
module.exports = spiral
