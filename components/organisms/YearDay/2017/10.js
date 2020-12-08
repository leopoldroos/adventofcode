import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'
import charToAscii from 'char-to-ascii'
import convertToBinary from 'binary-machine'
import convertToDecimal from 'bin-to-decimal'

export const testData = [
  '18,1,0,161,255,137,254,252,14,95,165,33,181,168,2,188',
]
export const prepareData = (data, nrOfElements = 256) => {
  let listOfNumbers = []
  let i = 0
  while (i < nrOfElements) {
    listOfNumbers[i] = i
    i++
  }
  return {
    listOfNumbers,
    currentPosition: 0,
    skipSize: 0,
    lengthsAsDec: data[0].split(',').map((inp) => parseInt(inp, 10)),
    lengthsAsHex: data[0]
      .split('')
      .map((int) => charToAscii(int).pop())
      .concat([17, 31, 73, 47, 23]),
  }
}

export const reversOrderLengthFromIndex = (list, index, length) => {
  let reverseSlice
  if (index + length > list.length) {
    // Wrapping situation!
    let wrapLength = index + length - list.length
    reverseSlice = list.slice(index).concat(list.slice(0, wrapLength)).reverse()
    return reverseSlice
      .slice(length - wrapLength)
      .concat(list.slice(wrapLength, index))
      .concat(reverseSlice.slice(0, length - wrapLength))
  } else {
    reverseSlice = list.slice(index, index + length).reverse()
    return list
      .slice(0, index)
      .concat(reverseSlice)
      .concat(list.slice(index + length))
  }
}

export const generateZeros = (nrOfZeros) => {
  let zeros = ''
  let i = 0
  while (i < nrOfZeros) {
    zeros += '0'
    i++
  }
  return zeros
}

export const xor = (binary1, binary2) => {
  if (typeof binary1 !== 'string') {
    binary1 = binary1.toString()
  }
  if (typeof binary2 !== 'string') {
    binary2 = binary2.toString()
  }
  if (binary1.length > binary2.length) {
    binary2 = generateZeros(binary1.length - binary2.length) + binary2
  }
  if (binary1.length < binary2.length) {
    binary1 = generateZeros(binary2.length - binary1.length) + binary1
  }
  return binary1
    .split('')
    .map((bit1, idx) => (bit1 !== binary2[idx] ? '1' : '0'))
    .join('')
}

export const xorList = (list) => {
  let i = 1
  let xorResult = list[0]
  while (i < list.length) {
    xorResult = xor(xorResult, list[i])
    i++
  }
  return xorResult
}

export const denseHash = (bits) => {
  let i = 0
  const dense = []
  while ((i + 1) * 16 <= bits.length) {
    const section = bits.slice(i * 16, 16).map(convertToBinary)
    console.log({ section, bits })
    dense.push(xorList(section))
    i++
  }
  console.log({ dense })
  return dense.map(convertToDecimal)
}

const add_pows = (base, dec, num) => {
  return Math.pow(base, num) <= dec ? add_pows(base, dec, num + 1) : num
}

const decToHexie = (dec, length) => {
  if (dec === 0) {
    return '' + dec
  }
  var hexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
  var hexie = ''
  var pows = add_pows(16, dec, 0)
  for (var i = pows; i > 0; --i) {
    var hexie_chunk = Math.pow(16, i - 1)
    var hex_loc = Math.floor(dec / hexie_chunk)
    var next_hexie = hexes[hex_loc % 16]

    if (!hexie_chunk > dec) {
      dec -= hexie_chunk
    }
    hexie += next_hexie
  }
  hexie = generateZeros(length - hexie.length) + hexie
  return hexie
}

export const decToHex = (decimal) => {
  return decToHexie(decimal, 2)
}

export const validate = (data) => {
  let { listOfNumbers, lengthsAsDec, currentPosition, skipSize } = data
  const listLength = listOfNumbers.length
  lengthsAsDec.forEach((length) => {
    listOfNumbers = reversOrderLengthFromIndex(
      listOfNumbers,
      currentPosition,
      length
    )
    currentPosition = (currentPosition + length + skipSize) % listLength
    skipSize++
  })
  return { listOfNumbers, lengthsAsDec, currentPosition, skipSize }
}

const validateHex = (data) => {
  let { listOfNumbers, lengthsAsHex, currentPosition, skipSize } = data
  const listLength = listOfNumbers.length
  lengthsAsHex.forEach((length) => {
    listOfNumbers = reversOrderLengthFromIndex(
      listOfNumbers,
      currentPosition,
      length
    )
    currentPosition = (currentPosition + length + skipSize) % listLength
    skipSize++
  })
  return { listOfNumbers, lengthsAsHex, currentPosition, skipSize }
}

export const validateTwo = (data) => {
  // 64 runs of validateHex:
  let i = 0
  // let { listOfNumbers, lengthsAsHex, currentPosition, skipSize } = data
  while (i < 1) {
    data = validateHex(data)
    // data.skipSize = 0
    i++
  }
  const sparse = data.listOfNumbers
  console.log({ sparse })
  // const dense = denseHash(sparse)
  // const hashie = dense.map(decToHex)
  // console.log({ sparse, dense, hashie })

  // return hashie
}

const Description = styled(Text)``

const Day10 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)
    console.log({ preparedData })

    // const { listOfNumbers } = validate({ ...preparedData })
    // console.log({ listOfNumbers })
    // setResultOne(listOfNumbers[0] * listOfNumbers[1])
    validateTwo(preparedData)
    // setResultTwo(validateTwo(preparedData))
  }

  const taskDescription = `However, you should instead use the standard list size of 256 (with values 0 to 255) and the sequence of lengths in your puzzle input. Once this process is complete, what is the result of multiplying the first two numbers in the list?`

  return (
    <div>
      <p>
        <InputArea onChange={setInputData} defaultValue={inputData}></InputArea>
      </p>
      <p>
        Ej: 15232
        <Description>{taskDescription}</Description>
      </p>
      <RunButton onClick={onRun} />
      <Results resultOne={resultOne} resultTwo={resultTwo} />
    </div>
  )
}
export default Day10
