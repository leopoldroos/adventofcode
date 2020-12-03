export const findSumPairs = (list, sum) => {
  let result = null
  const res = list.map((l1) => {
    list.map((l2) => {
      if (l1 + l2 === sum) {
        result = l1 * l2
      }
    })
  })
  return result
}

export const findSumThrees = (list, sum) => {
  let result = null
  const res = list.map((l1) => {
    list.map((l2) => {
      list.map((l3) => {
        if (l1 + l2 + l3 === sum) {
          result = l1 * l2 * l3
        }
      })
    })
  })
  return result
}
