import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'
import offsetGame from '@/helpers/offset_game'

export const testData = ['0', '3', '0', '1', '-3']
export const prepareData = (data) => data.map((v) => parseInt(v, 10))

export const validate = (data) => offsetGame(data, false)

export const validateTwo = (data) => offsetGame(data, true)

const Description = styled(Text)``

const Day5 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)
    setResultOne(validate([...preparedData]))
    setResultTwo(validateTwo(preparedData))
  }

  const taskDescription = `Under this new system policy, how many passphrases are valid?`

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
export default Day5
