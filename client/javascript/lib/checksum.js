export default (input) => {
  let rows = input
  let output = 0
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i]
    row.sort((a, b) => b - a)
    output += row[0] - row.pop()
  }
  return output
}
