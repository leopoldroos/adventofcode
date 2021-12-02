import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'
// import { binaryHalving } from '@/helpers/binaryHalving'

export const testData = [
  'abc',
  '',
  'a',
  'b',
  'c',
  '',
  'ab',
  'ac',
  '',
  'a',
  'a',
  'a',
  'a',
  '',
  'b',
]

export const prepareData = (data) => {
  const prepData = []
  let groupAnswers = { nrInGroup: 0, answers: {} }
  data.forEach((row) => {
    if (row.length === 0) {
      prepData.push({ ...groupAnswers })
      groupAnswers = { nrInGroup: 0, answers: {} }
      return
    }
    groupAnswers.nrInGroup++

    row.split('').forEach((oneAnswer) => {
      if (!groupAnswers.answers[oneAnswer]) {
        groupAnswers.answers[oneAnswer] = 0
      }
      groupAnswers.answers[oneAnswer]++
    })
  })
  console.log(prepData, groupAnswers)
  prepData.push({ ...groupAnswers })
  return prepData
}

export const validate = (data) => {
  return data.reduce(
    (sum, groupAnswers) => sum + Object.keys(groupAnswers.answers).length,
    0
  )
}

export const validateTwo = (data) => {
  return data.reduce((sum, groupAnswers) => {
    const partSum = Object.values(groupAnswers.answers).reduce((partSum, v) => {
      if (v === groupAnswers.nrInGroup) {
        return partSum + 1
      }
      return partSum
    }, 0)
    return sum + partSum
  }, 0)
}

const Description = styled(Text)``

const Day6 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)
    console.log(preparedData)
    setResultOne(validate(preparedData))
    setResultTwo(validateTwo(preparedData))
  }

  const taskDescription = ``

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
