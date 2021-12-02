import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'
import myData from './18.json'

export const testData = [
  '1 + 2 * 3 + 4 * 5 + 6',
  '1 + (2 * 3) + (4 * (5 + 6))',
  '2 * 3 + (4 * 5)',
  '5 + (8 * 3 + 9 + 3 * 4 * 3)',
  '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))',
  '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'
]

export const testData2 = [
]

export const calculateSubExpression = (expression) => {
  const parts = expression.split(' ')
  let sum = parseInt(parts[0], 10)
  let i = 1
  console.log(expression + ' =>')
  while (i < parts.length) {
    sum = eval(sum + parts[i] + parts[i + 1])
    i += 2
  }
  console.log('=>', sum)
  return sum
}

export const calculateAdvancedSubExpression = (expression) => {
  const parts = expression.split(' ')

  let reducedParts = parts
  let index = reducedParts.indexOf('+')
  console.log('NEW EXPRESSION:', expression)
  while (index !== -1) {
    // console.log({ index })
    const sum = eval(reducedParts[index - 1] + reducedParts[index] + reducedParts[index + 1])
    // console.log({ sum })
    // console.log(reducedParts.slice(0, index - 1))
    // console.log(reducedParts.slice(index + 2))

    reducedParts = reducedParts.slice(0, index - 1).concat([sum], reducedParts.slice(index + 2))
    console.log('=>', reducedParts.join(' '))
    index = reducedParts.indexOf('+')
  }
  console.log('end sum:', eval(reducedParts.join(' ')))
  return eval(reducedParts.join(' '))
}

export const calculateExpressions = (expression, advanced = false) => {
  let reducedExpression = expression
  let endSubIndex = reducedExpression.indexOf(')')
  let i = 0

  while (endSubIndex !== -1 && i < 10) {
    let tempSubExpression = reducedExpression.substr(0, endSubIndex)
    const startSubIndex = tempSubExpression.lastIndexOf('(') + 1
    const subExpression = reducedExpression.substr(startSubIndex, endSubIndex - startSubIndex)
    const value = advanced ? calculateAdvancedSubExpression(subExpression) : calculateSubExpression(subExpression)
    reducedExpression = reducedExpression.substr(0, startSubIndex - 1) + value + reducedExpression.substr(endSubIndex + 1)

    endSubIndex = reducedExpression.indexOf(')')

    console.log({ reducedExpression })
    i++
  }
  return advanced ? calculateAdvancedSubExpression(reducedExpression) : calculateSubExpression(reducedExpression)
}

export const prepareData = (data) => {
  return data
}

export const validate = (data) => {
  return data.reduce((sum, e) => sum + calculateExpressions(e), 0)
}

export const validateTwo = (data) => {
  return data.reduce((sum, e) => sum + calculateExpressions(e, true), 0)
}

const Description = styled(Text)``

const Day18 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(myData)

    // let res = validate(preparedData)
    // console.log(res)
    // setResultOne()
    let res = validateTwo(preparedData)
    console.log(res)
    // setResultTwo(sums)
  }

  const taskDescription = `Evaluate the expression on each line of the homework; what is the sum of the resulting values?`

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
export default Day18
