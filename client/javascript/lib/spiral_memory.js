export const spiralMemory = (input, spiral) => {
  let rows = spiral
  let output = 0
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i]

    output += row[0] - row.pop()
  }
  return output
}

export const createSpiral = (input) => {
  let spiral = []
  for (let i = 1; i <= input; i++) {
    let row = (i)
  }
  spiral[0] = [1]

  spiral[0] = [1, 2]

  spiral[0] = [0, 3]
  spiral[1] = [1, 2]

  spiral[0] = [4, 3]
  spiral[1] = [1, 2]

  spiral[0] = [5, 4, 3]
  spiral[1] = [0, 1, 2]

  spiral[0] = [5, 4, 3]
  spiral[1] = [6, 1, 2]

  spiral[0] = [5, 4, 3]
  spiral[1] = [6, 1, 2]
  spiral[2] = [7, 0, 0]

  spiral[0] = [5, 4, 3]
  spiral[1] = [6, 1, 2]
  spiral[2] = [7, 8, 0]

  spiral[0] = [5, 4, 3]
  spiral[1] = [6, 1, 2]
  spiral[2] = [7, 8, 9]

  spiral[0] = [5, 4, 3, 0]
  spiral[1] = [6, 1, 2, 0]
  spiral[2] = [7, 8, 9, 10]

  spiral[0] = [5, 4, 3, 0]
  spiral[1] = [6, 1, 2, 11]
  spiral[2] = [7, 8, 9, 10]

  spiral[0] = [5, 4, 3, 12]
  spiral[1] = [6, 1, 2, 11]
  spiral[2] = [7, 8, 9, 10]

  spiral[0] = [0, 0, 0, 13]
  spiral[1] = [5, 4, 3, 12]
  spiral[2] = [6, 1, 2, 11]
  spiral[3] = [7, 8, 9, 10]

  return spiral
}
