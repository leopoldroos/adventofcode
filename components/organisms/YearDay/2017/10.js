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
    lengthsAsDec: data[0].split(',').map((inp) => parseInt(inp, 10)),
    lengthsAsHex: data[0].split(',').map((inp) => {
      return 'TBD'
    }),
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

export const validate = (data) => {
  let { listOfNumbers, lengthsAsDec } = data
  const listLength = listOfNumbers.length
  let currentPosition = 0
  let skipSize = 0
  lengthsAsDec.forEach((length) => {
    listOfNumbers = reversOrderLengthFromIndex(
      listOfNumbers,
      currentPosition,
      length
    )
    currentPosition = (currentPosition + length + skipSize) % listLength
    skipSize++
    console.log({ listOfNumbers, currentPosition })
  })
  return { listOfNumbers }
}

export const validateTwo = (data) => {}

const Description = styled(Text)``

const Day10 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)
    console.log({ preparedData })
    const { listOfNumbers } = validate(preparedData)
    setResultOne(listOfNumbers[0] * listOfNumbers[1])
    // setResultTwo(maxValue)
  }

  const taskDescription = `However, you should instead use the standard list size of 256 (with values 0 to 255) and the sequence of lengths in your puzzle input. Once this process is complete, what is the result of multiplying the first two numbers in the list?`

  return (
    <div>
      <p>
        <InputArea onChange={setInputData} defaultValue={inputData}></InputArea>
      </p>
      <p>
        <Description>{taskDescription}</Description>
      </p>
      <RunButton onClick={onRun} />
      <Results resultOne={resultOne} resultTwo={resultTwo} />
    </div>
  )
}
export default Day10
