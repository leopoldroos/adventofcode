import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'
import { findSumPairs, findSumThrees } from '@/helpers/findSum'

const testData = [1721, 979, 366, 299, 675, 1456]

const Description = styled(Text)``

const Day1 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    setResultOne(findSumPairs(inputData, 2020))
    setResultTwo(findSumThrees(inputData, 2020))
  }

  const taskDescription = `In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them together produces 1721 * 299 = 514579, so the correct answer is 514579`
  return (
    <div>
      <p>
        <InputArea onChange={setInputData} defaultValue={inputData}></InputArea>
      </p>
      <p>
        <Description>{taskDescription}</Description>
      </p>
      <RunButton onClick={onRun} />
      <p>
        <Results resultOne={resultOne} resultTwo={resultTwo} />
      </p>
    </div>
  )
}
export default Day1
