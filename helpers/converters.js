import convertToBinary from 'binary-machine'
import convertToDecimal from 'bin-to-decimal'

export const fillWithChar = (text, char, length) => {
  for (let i = text.length; i < length; i++) {
    text = char + text
  }
  return text
}

export const xor = (binA, binB, size) => {
  let xored = ''
  binA = fillWithChar(binA, '0', size)
  binB = fillWithChar(binB, '0', size)
  for (let i = 0; i < size; i++) {
    if (binA[i] === binB[i]) {
      xored = xored + '0'
    } else {
      xored = xored + '1'
    }
  }
  return xored
}

export const toBinary = convertToBinary

export const toDecimal = convertToDecimal
