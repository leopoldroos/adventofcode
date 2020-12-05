import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'
import {
  maxMin as checksumByMaxMin,
  evenlyDevidend as checksumByEvenlyDevidend,
} from '@/helpers/checksum'

export const testData = ['5 9 2 8', '9 4 7 3', '3 8 6 5']
export const prepareData = (data) => {
  return data.map((row) => {
    if (row.indexOf(' ') > -1) {
      return row.split(' ').map((item) => parseInt(item, 10))
    }
    return row.split('\t').map((item) => parseInt(item, 10))
  })
}
export const validate = (data) => checksumByMaxMin(data)
export const validateTwo = (data) => checksumByEvenlyDevidend(data)

const Description = styled(Text)``

const Day2 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)
    const clone = [...preparedData.map((i) => [...i])]
    setResultOne(validate(preparedData))
    setResultTwo(validateTwo(clone))
  }

  const taskDescription = `What is the checksum for the spreadsheet in your puzzle input?
  What is the sum of each row's result in your puzzle input?`

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
export default Day2
