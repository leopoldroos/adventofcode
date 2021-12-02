import React, { useState } from 'react'
import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import Results from '@/components/molecules/Results'
import styled from 'styled-components'
import { removeAllExcept } from '@/helpers/createRegularExpression'

export const testData = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc']
export const prepareData = (data) => {
  return data.map((l) => l.split(': '))
}
export const validateRegExpOnValues = (data) => {
  let nrOfValids = 0
  data.map((parts) => {
    const [counts, chars] = parts[0].split(' ')
    const len = parts[1].replace(removeAllExcept(chars), '').length
    const [min, max] = counts.split('-')
    if (len >= min && len <= max) {
      nrOfValids++
    }
  })
  return nrOfValids
}

export const validateByIndexOnValues = (data) => {
  return data.filter((parts) => {
    let valid = false
    const [counts, char] = parts[0].split(' ')
    const [min, max] = counts.split('-')
    if (parts[1][min - 1] === char && parts[1][max - 1] !== char) {
      valid = true
    } else if (parts[1][min - 1] !== char && parts[1][max - 1] === char) {
      valid = true
    }
    return valid
  })
}

const StyledButton = styled(Button.DefaultButton)`
  color: #fff;
`
const Description = styled(Text)``

const Day2 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)
  const [resultTwoMeta, setResultTwoMeta] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)
    setResultOne(validateRegExpOnValues(preparedData))
    const resTwo = validateByIndexOnValues(preparedData)
    setResultTwo(resTwo.length)
    setResultTwoMeta(resTwo)
  }

  const taskDescription = `Each line gives the password policy and then the password. The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid. For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.

  In the above example, 2 passwords are valid. The middle password, cdefg, is not; it contains no instances of b, but needs at least 1. The first and third passwords are valid: they contain one a or nine c, both within the limits of their respective policies.`

  return (
    <div>
      <p>
        <InputArea onChange={setInputData} defaultValue={inputData}></InputArea>
      </p>
      <p>
        <Description>{taskDescription}</Description>
      </p>
      <StyledButton label="Run!" onClick={onRun} />
      <p>
        <Results resultOne={resultOne} resultTwo={resultTwo} />
      </p>
    </div>
  )
}
export default Day2
