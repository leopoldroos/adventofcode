import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'
import { reallocation } from '@/helpers/memory_reallocation'

export const testData = ['10 3 15 10 5 15 5 15 9 2 5 8 5 2 3 6']
export const prepareData = (data) =>
  (data[0].indexOf(' ') ? data[0].split(' ') : data[0].split('\t')).map((v) =>
    parseInt(v, 10)
  )

export const validate = (data) => {
  const { cycles, loopedBanks, loopIdentifiedAtIndex } = reallocation(data)
  return { cycles, loopedBanks, loopIdentifiedAtIndex }
}

const Description = styled(Text)``

const Day6 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)
    const { cycles, loopedBanks, loopIdentifiedAtIndex } = validate(
      preparedData
    )
    console.log({ cycles, loopedBanks, loopIdentifiedAtIndex })
    setResultOne(cycles)
    setResultTwo(cycles - loopIdentifiedAtIndex)
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
export default Day6
