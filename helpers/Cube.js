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

class Cube {
  constructor(x, y, z, w, active) {
    this.x = x
    this.y = y
    this.z = z
    this.w = w
    this.active = active
    this.key = `${x},${y},${z},${w}`
  }

  isSelf(cube) {
    return (cube.x === this.x && cube.y === this.y && cube.z === this.z && cube.w === this.w)
  }
  isAdjecent(cube) {
    if (this.isSelf(cube)) {
      return false
    }
    if (Math.abs(cube.x - this.x) > 1) {
      return false
    }
    if (Math.abs(cube.y - this.y) > 1) {
      return false
    }
    if (Math.abs(cube.z - this.z) > 1) {
      return false
    }
    if (Math.abs(cube.w - this.w) > 1) {
      return false
    }
    return true
  }

  setInActive() {
    this.active = false
  }
  setActive() {
    this.active = true
  }
}
module.exports = Cube
