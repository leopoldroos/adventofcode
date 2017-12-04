export default (input) => {
  let data = input
  let output = 0
  for (let i = 0; i < input.length; i++) {
    if (data[i] === data[i + 1]) output += parseInt(data[i], 10)
  }
  if (data[0] === data[input.length - 1]) output += parseInt(data[0], 10)
  return output
}
