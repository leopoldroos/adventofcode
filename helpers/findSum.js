export const findSum = (list, l1, sum) => list.find((l2) => l1 + l2 === sum)

export const findSumPairs = (list, sum) => {
  let result
  list.find((l1) => {
    const foundSum = findSum(
      list.filter((l) => l !== l1),
      l1,
      sum
    )
    if (foundSum) {
      result = [foundSum, l1]
    }
    return foundSum
  })
  return result
}

export const findSumThrees = (list, sum) => {
  let result = null
  list.find((l1) => {
    const found = findSumPairs(
      list.filter((l) => l !== l1),
      sum - l1
    )
    if (found) {
      found.push(l1)
      result = found
    }
  })
  return result
}

export const findSumFours = (list, sum) => {
  let result = null
  list.find((l1) => {
    const found = findSumThrees(
      list.filter((l) => l !== l1),
      sum - l1
    )
    if (found) {
      found.push(l1)
      result = found
    }
  })
  return result
}

export const findSumsUpTo = (list, sum) => {
  let i = 0
  let sumUpDone = false
  let sumSlice
  while (!sumUpDone && i < list.length) {
    let sumIndexFrom = i
    let sumUp = 0
    while (!sumUpDone && sumIndexFrom < list.length) {
      sumUp += list[sumIndexFrom]
      if (sumUp === sum) {
        sumUpDone = true
        sumSlice = list.slice(i, sumIndexFrom + 1)
      }
      sumIndexFrom++
    }
    i++
  }
  return sumSlice
}
