import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'
import {
  countValidByWord as countValidPassphrasesByWord,
  countValidByAnagram as countValidPassphrasesByAnagram,
} from '@/helpers/passphrase'

export const testData = ['aa bb cc dd ee']

export const validate = (data) => countValidPassphrasesByWord(data)

export const validateTwo = (data) => countValidPassphrasesByAnagram(data)

const Description = styled(Text)``

const Day4 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    setResultOne(validate(inputData))
    setResultTwo(validateTwo(inputData))
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
export default Day4
