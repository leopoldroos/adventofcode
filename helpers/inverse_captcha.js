export const inverseCaptcha = (input, offset = 1) => {
  let data = input
  let output = 0
  for (let i = 0; i < input.length; i++) {
    let offsetIndex = (i + offset) % input.length
    console.log({ i, offsetIndex, data, output }, data[i] === data[offsetIndex])
    if (data[i] === data[offsetIndex]) output += parseInt(data[i], 10)
  }
  return output
}
