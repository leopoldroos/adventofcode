import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'
import { binaryHalving } from '@/helpers/binaryHalving'

export const testData = [
  'nop +0',
  'acc +1',
  'jmp +4',
  'acc +3',
  'jmp -3',
  'acc -99',
  'acc +1',
  'jmp -4',
  'acc +6',
]

export const prepareData = (data) => {
  return data.map((instruction) => {
    const [operationName, steps] = instruction.split(' ')
    return { operationName, steps: parseInt(steps, 10) }
  })
}

export const runOperation = (
  operationName,
  steps,
  accumulator,
  nextInstructionIndex
) => {
  switch (operationName) {
    case 'acc':
      accumulator += steps
      nextInstructionIndex += 1
      break
    case 'jmp':
      nextInstructionIndex += steps
      break
    case 'nop':
      nextInstructionIndex += 1
      break
    default:
      console.warn(`No mapped operation: ${operationName}`)
  }
  return { accumulator, nextInstructionIndex }
}

export const validate = (operations) => {
  let acc = 0
  let index = 0

  let loopIdentified = false
  let codeHasNoLoop = false
  let storedIndexes = []
  let i = 0
  while (!codeHasNoLoop && !loopIdentified && i < 20000) {
    const operation = operations[index]
    const { accumulator, nextInstructionIndex } = runOperation(
      operation.operationName,
      operation.steps,
      acc,
      index
    )
    acc = accumulator
    index = nextInstructionIndex
    if (nextInstructionIndex === operations.length) {
      codeHasNoLoop = true
    } else if (storedIndexes.indexOf(nextInstructionIndex) !== -1) {
      console.log('Has loop :(', { acc, index })
      loopIdentified = true
    } else {
      storedIndexes.push(nextInstructionIndex)
    }
    i++
  }
  return { accumulator: acc, nextInstructionIndex: index, codeHasNoLoop }
}

export const validateTwo = (operations) => {
  let index = 0
  let repairedCode = null
  let acc
  while (index < operations.length && !repairedCode) {
    const operationsLeft = operations.slice(index)
    const indexToChange = operationsLeft.findIndex((o) =>
      ['jmp', 'nop'].includes(o.operationName)
    )
    if (indexToChange === -1) {
      index = operations.length
    } else {
      operations[indexToChange + index].operationName =
        operations[indexToChange + index].operationName === 'jmp'
          ? 'nop'
          : 'jmp'
      const { accumulator, codeHasNoLoop } = validate(operations)
      if (codeHasNoLoop) {
        console.log('== GREAT SUCCESS!!!')
        repairedCode = codeHasNoLoop
        acc = accumulator
      }
      // change the op back:
      operations[indexToChange + index].operationName =
        operations[indexToChange + index].operationName === 'jmp'
          ? 'nop'
          : 'jmp'

      index = index + indexToChange + 1
    }
  }

  return { accumulator: acc, repairedCode, repairedIndex: index }
}

const Description = styled(Text)``

const Day8 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)
    let res = validate(preparedData)
    setResultOne(res.accumulator)
    res = validateTwo(preparedData)
    setResultTwo(res.accumulator)
  }

  const taskDescription = `Run your copy of the boot code. Immediately before any instruction is executed a second time, what value is in the accumulator?`

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
