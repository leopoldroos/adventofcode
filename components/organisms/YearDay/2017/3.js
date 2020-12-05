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
export const testData = [24]

export const validate = (data) => {
  const theSpiral = new Spiral()
  const {
    spiral,
    xIndexStored,
    yIndexStored,
    number,
  } = theSpiral.generateSpiral(data, false)
  const output = spiralMemory(spiral, xIndexStored, yIndexStored)
  console.log({ spiral, xIndexStored, yIndexStored, number, output })
  return number
}
export const validateTwo = (data) => {
  const theSpiral = new Spiral()
  const {
    spiral,
    xIndexStored,
    yIndexStored,
    number,
  } = theSpiral.generateSpiral(data, false)
  const output = spiralMemory(value, spiral, xIndexStored, yIndexStored)
}

const Description = styled(Text)``

const Day3 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    // const output = `${number} @${xIndexStored},${yIndexStored}`
    setResultOne(validate(parseInt(inputData[0], 10)))
    // setResultTwo(validateTwo(clone, true))
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
export default Day3
