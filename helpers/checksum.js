export const maxMin = (input) => {
  let rows = input
  let output = 0
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i]
    row.sort((a, b) => b - a)
    output += row[0] - row.pop()
  }
  return output
}

export const evenlyDevidend = (input) => {
  let rows = input
  let output = 0
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i]
    let evenlyDevidend = false
    row.map((item, index) => {
      if (evenlyDevidend) return

      evenlyDevidend = row.find(o => item !== o && !(o % item))
      if (evenlyDevidend) {
        output += evenlyDevidend / item
      }
    })
  }
  return output
}
