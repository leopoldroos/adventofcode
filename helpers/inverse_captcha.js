export default (input, offset = 1) => {
  let data = input
  let output = 0
  for (let i = 0; i < input.length; i++) {
    let offsetIndex = (i + offset) % input.length
    if (data[i] === data[offsetIndex]) output += parseInt(data[i], 10)
  }
  return output
}
