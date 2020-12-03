import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'
import { inverseCaptcha } from '@/helpers/inverse_captcha'

export const testData = '1122'
export const prepareData = (data) => {
  return data
}
export const validate = (data, offset) => {
  return inverseCaptcha(data, offset)
}

const Description = styled(Text)``

const Day1 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    // const input = query.input
    // const halfOffset = query.halfoffset
    // const offset =
    //   input && ['1', 'true'].includes(halfOffset) ? input.length / 2 : 1
    const offset = 1

    // const preparedData = prepareData(inputData)
    setResultOne(validate(inputData, offset))
    // setResultTwo(multiplyMany(preparedData))
  }

  const taskDescription = `The captcha requires you to review a sequence of digits (your puzzle input) and find the sum of all digits that match the next digit in the list. The list is circular, so the digit after the last digit is the first digit in the list.`

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
export default Day1
