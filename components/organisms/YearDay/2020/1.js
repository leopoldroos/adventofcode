import React, { useState } from 'react'
import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import styled from 'styled-components'
import { findSumPairs, findSumThrees } from '@/helpers/findSum'

const testData = [1721, 979, 366, 299, 675, 1456]

const StyledButton = styled(Button.DefaultButton)`
  color: #fff;
`

const InputArea = styled.textarea`
  width: -webkit-fill-available;
`
const Description = styled(Text)``
const Result = styled(Text)`
  font-weight: bold;
`

const Day1 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultPair, setResultPair] = useState(null)
  const [resultThrees, setResultThrees] = useState(null)

  const onRun = () => {
    setResultPair(findSumPairs(inputData, 2020))
    setResultThrees(findSumThrees(inputData, 2020))
  }

  const taskDescription = `In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them together produces 1721 * 299 = 514579, so the correct answer is 514579`
  return (
    <div>
      <p>Data:</p>
      <p>
        <InputArea
          onChange={(e) => {
            const val = e.target.value
              .trim()
              .split('\n')
              .map((v) => parseInt(v, 10))
            console.log({ val })
            setInputData(val)
          }}
          defaultValue={inputData.join('\r\n')}
        ></InputArea>
      </p>
      <p>
        <Description>{taskDescription}</Description>
      </p>
      <StyledButton label="Run!" onClick={onRun} />
      <p>
        <Result>{resultPair || 'no result'}</Result>
      </p>
      <p>
        <Result>{resultThrees || 'no result'}</Result>
      </p>
    </div>
  )
}
export default Day1
