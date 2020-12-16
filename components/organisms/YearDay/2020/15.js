import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'
import { toBinary, toDecimal, fillWithChar } from '@/helpers/converters'

export const testData = [
  '1', '2', '3'

]
//'0', '3', '6'

export const testData2 = [
]

export const prepareData = (data) => data.map(d => parseInt(d, 10))

// 0 = never before
// X = x times back it was spoken before
export const spokenGame = () => {

}

export const validate = (startingNumbers, iterations = 2020) => {
  let spokenNumbers = [...startingNumbers]
  spokenNumbers.reverse()
  let i = startingNumbers.length
  while (i < iterations) {
    let previousNumber = spokenNumbers[0]
    let spokenBeforeIndex = spokenNumbers.slice(1).indexOf(previousNumber)
    if (spokenBeforeIndex === -1) {
      spokenNumbers.unshift(0)
    } else {
      spokenNumbers.unshift(spokenBeforeIndex + 1)
    }

    i++
  }
  // console.log(spokenNumbers.reverse())
  return spokenNumbers
}

export const validateTwo = (startingNumbers) => {
  return validate(startingNumbers, 30000000)
}

const Description = styled(Text)``

const Day15 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)

    // setResultOne(validate(preparedData))
    // let sums = validateTwo(preparedData)

    // setResultTwo(sums[0])
  }

  const taskDescription = `what will be the 2020th number spoken?`

  return (
    <div>
      <p>
        <InputArea onChange={setInputData} defaultValue={inputData}></InputArea>
      </p>
      <p>
        <Description>{taskDescription}</Description>
      </p>
      EJ. ... (too high),
      <RunButton onClick={onRun} />
      <Results resultOne={resultOne} resultTwo={resultTwo} />
    </div>
  )
}
export default Day15
