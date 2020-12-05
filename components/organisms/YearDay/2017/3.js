import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'
import { spiralMemory } from '@/helpers/spiral_memory'
import Spiral from '@/helpers/Spiral'

// export const testData = [
//   [17, 16, 15, 14, 13],
//   [18, 5, 4, 3, 12],
//   [19, 6, 1, 2, 11],
//   [20, 7, 8, 9, 10],
//   [21, 22, 23, 24, 25],
// ]
export const testData = [24] // My data is: 325489

export const prepareData = (data) => {
  return parseInt(data[0], 10)
}

export const validate = (data) => {
  const theSpiral = new Spiral()
  const { spiral, xIndex, yIndex } = theSpiral.generateSpiral(data, false)
  return spiralMemory(spiral, xIndex, yIndex)
}
export const validateTwo = (data) => {
  const theSpiral = new Spiral()
  const { spiral, xIndex, yIndex, number } = theSpiral.generateSpiral(
    data,
    true
  )
  return number
}

const Description = styled(Text)``

const Day3 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)
    setResultOne(validate(preparedData))
    setResultTwo(validateTwo(preparedData))
  }

  const taskDescription = `What is the first value written that is larger than your puzzle input? `

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
export default Day3
