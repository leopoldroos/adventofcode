import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'
import { findSumPairs, findSumsUpTo } from '@/helpers/findSum'

export const testData = [
  '35',
  '20',
  '15',
  '25',
  '47',
  '40',
  '62',
  '55',
  '65',
  '95',
  '102',
  '117',
  '150',
  '182',
  '127',
  '219',
  '299',
  '277',
  '309',
  '576',
]

export const prepareData = (data) => {
  return data.map((number) => parseInt(number, 10))
}

export const isNumberValidByPreamble = (preamble, number) => {
  const pair = findSumPairs(preamble, number)
  return pair ? true : false
}

export const validate = (numbers, preambleLength, considerPreviousLength) => {
  let isValid = true
  let number
  let i = 0
  let preamble
  while (i < numbers.length - preambleLength && isValid) {
    preamble = numbers.slice(i, i + preambleLength)
    number = numbers[i + preambleLength]
    isValid = isNumberValidByPreamble(preamble, number)
    i++
  }
  console.log({ number, preamble })
  return { number, preamble }
}

export const validateTwo = (numbers, number) => {
  const res = findSumsUpTo(numbers, number)
  res.sort()
  const sum = res[0] + res[res.length - 1]
  console.log({ res, sum })
  return sum
}

const Description = styled(Text)``

const Day9 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)
    let res = validate(preparedData, 5)
    setResultOne(res.number)
    res = validateTwo(preparedData, res.number)
    setResultTwo(res)
  }

  const taskDescription = `What is the first number that does not have this property?`

  return (
    <div>
      <p>
        <InputArea onChange={setInputData} defaultValue={inputData}></InputArea>
      </p>
      <p>
        <Description>{taskDescription}</Description>
      </p>
      <RunButton onClick={onRun} />
      Ej: 1295026837
      <Results resultOne={resultOne} resultTwo={resultTwo} />
    </div>
  )
}
export default Day9
