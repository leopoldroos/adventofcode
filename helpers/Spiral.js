const getSurroundingSum = (spiral, xIndex, yIndex) => {
  /*
  a b c   row1
  d e f   row2
  g h i   row3
  e = xIndex, yIndex
  */
  let sum = 0

  let row1 = spiral[yIndex - 1]
  let row2 = spiral[yIndex]
  let row3 = spiral[yIndex + 1]

  if (row1) {
    sum += row1[xIndex - 1] || 0 // a
    sum += row1[xIndex] || 0 // b
    sum += row1.length > xIndex + 1 ? row1[xIndex + 1] || 0 : 0 // c
  }

  sum += row2[xIndex - 1] || 0 // d
  sum += row2.length > xIndex + 1 ? row2[xIndex + 1] || 0 : 0 // f

  if (row3) {
    sum += row3[xIndex - 1] || 0 // g
    sum += row3[xIndex] || 0 // h
    sum += row3.length > xIndex + 1 ? row3[xIndex + 1] || 0 : 0 // i
  }
  return sum
}

class Spiral {
  generateSpiral(value, sumAdjecent) {
    const numberOfRows = Math.ceil(Math.sqrt(value))

    let spiral = []
    for (let i = 0; i < numberOfRows; i++) {
      spiral[i] = []
    }

    let xIndexStored
    let yIndexStored

    // Startpos:
    let xIndex = Math.floor(numberOfRows / 2)
    let yIndex = Math.floor(numberOfRows / 2)

    let number = 1
    spiral[yIndex][xIndex] = number

    let maxStepsInSamDirection = 1 // 1 step x, 1 step y, 2 steps x, 2 steps y .... altering directions per x and y
    let stepper = 0

    let xSign = 1
    let ySign = -1
    let direction = 'x'
    while (number < value) {
      if (direction === 'x') {
        xIndex = xIndex + xSign
      } else {
        yIndex = yIndex + ySign
      }

      if (sumAdjecent) {
        number = getSurroundingSum(spiral, xIndex, yIndex)
      } else {
        number++
      }
      spiral[yIndex][xIndex] = number
      sumAdjecent && console.log({ number, spiral })

      // one step made, lets update all variables:
      stepper++
      if (stepper === maxStepsInSamDirection) {
        if (direction === 'x') {
          // xNumberOfCounts++
          xSign = xSign * -1
        } else {
          // yNumberOfCounts++
          ySign = ySign * -1
          maxStepsInSamDirection++
        }
        direction = direction === 'x' ? 'y' : 'x'
        stepper = 0
      }
    }
    return { spiral, xIndex, yIndex, number }

    // let xNumberOfCounts = 0
    // let yNumberOfCounts = 0

    // let xSign = 1
    // let ySign = -1

    // let direction = 'x'
    // let number = 1
    // let numberOfCounts
    // console.log({ value, numberOfRows, spiral, yIndex, xIndex, number })
    // while (number <= value) {
    //   if (direction === 'x') {
    //     numberOfCounts = xNumberOfCounts
    //   } else {
    //     numberOfCounts = yNumberOfCounts
    //   }

    //   let counter = 0
    //   while (counter < numberOfCounts && number <= value) {
    //     // if (number === 0) {
    //     //   number = 1
    //     // } else {
    //     //   if (withatwist) {
    //     //     number = getSurroundingSum(spiral, xIndex, yIndex)
    //     //   } else {
    //     //     number++
    //     //   }
    //     // }
    //     // if (number >= value) {
    //     //   xIndexStored = xIndex
    //     //   yIndexStored = yIndex
    //     // }
    //     spiral[yIndex][xIndex] = number
    //     console.log({ xIndex, yIndex, number, spiral })

    //     if (direction === 'x') {
    //       xIndex = xIndex + xSign
    //     } else {
    //       yIndex = yIndex + ySign
    //     }
    //     counter++
    //   }

    //   if (direction === 'x') {
    //     xNumberOfCounts++
    //     xSign = xSign * -1
    //   } else {
    //     yNumberOfCounts++
    //     ySign = ySign * -1
    //   }
    //   direction = direction === 'x' ? 'y' : 'x'
    // }
    // console.log(JSON.stringify(spiral))
    return { spiral, xIndexStored, yIndexStored, number }
  }

  run(req) {
    let value = 9
    if (req.query.value) {
      value = parseInt(req.query.value, 10)
    }
    const withatwist = !!req.query.withatwist
    return this.generateSpiral(value, withatwist)
  }
}
// const spiral = new Spiral()
module.exports = Spiral
