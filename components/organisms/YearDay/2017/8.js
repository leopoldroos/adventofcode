import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'
// import { buildTower, balanceTower } from '@/helpers/recursive_circus'

export const testData = [
  'b inc 5 if a > 1',
  'a inc 1 if b < 5',
  'c dec -10 if a >= 1',
  'c inc -20 if c == 10',
]
export const prepareData = (data) => {
  return data.map((instruction) => {
    const [
      registerName,
      incOrDec,
      incrementalValue,
      _if,
      checkedRegisterName,
      condition,
      conditionalValue,
    ] = instruction.split(' ')
    return {
      originalInstruction: instruction,
      registerName,
      incOrDec,
      incrementalValue: parseInt(incrementalValue, 10),
      checkedRegisterName,
      condition,
      conditionalValue: parseInt(conditionalValue, 10),
    }
  })
}

export const validate = (instructions) => {
  let registers = {}
  let values
  let topValue
  let maxValue = 0

  instructions.forEach((instruction) => {
    const {
      registerName,
      incOrDec,
      incrementalValue,
      checkedRegisterName,
      condition,
      conditionalValue,
    } = instruction
    if (!registers[registerName]) {
      registers[registerName] = 0
    }
    if (!registers[checkedRegisterName]) {
      registers[checkedRegisterName] = 0
    }
    let addOrSub = incOrDec === 'inc' ? +1 : -1
    let registerValue = registers[registerName]
    let checkedRegisterValue = registers[checkedRegisterName]
    switch (condition) {
      case '<':
        registerValue =
          checkedRegisterValue < conditionalValue
            ? registerValue + addOrSub * incrementalValue
            : registerValue
        break
      case '>':
        registerValue =
          checkedRegisterValue > conditionalValue
            ? registerValue + addOrSub * incrementalValue
            : registerValue
        break
      case '==':
        registerValue =
          checkedRegisterValue === conditionalValue
            ? registerValue + addOrSub * incrementalValue
            : registerValue
        break
      case '>=':
        registerValue =
          checkedRegisterValue >= conditionalValue
            ? registerValue + addOrSub * incrementalValue
            : registerValue
        break
      case '<=':
        registerValue =
          checkedRegisterValue <= conditionalValue
            ? registerValue + addOrSub * incrementalValue
            : registerValue
        break
      case '!=':
        registerValue =
          checkedRegisterValue !== conditionalValue
            ? registerValue + addOrSub * incrementalValue
            : registerValue
        break
      default:
        console.log('Could not handle:', instruction)
    }
    registers[registerName] = registerValue

    values = Object.values(registers)
    values.sort((a, b) => a - b)
    topValue = values.pop()
    maxValue = Math.max(maxValue, topValue)
  })
  return { values, topValue, maxValue }
}

export const validateTwo = (data) => {}

const Description = styled(Text)``

const Day8 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)
    const { values, topValue, maxValue } = validate(preparedData)
    setResultOne(topValue)
    setResultTwo(maxValue)
  }

  const taskDescription = `What is the largest value in any register after completing the instructions in your puzzle input?`

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
export default Day8
