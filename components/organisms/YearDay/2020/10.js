import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'

export const testData = [
  '16',
  '10',
  '15',
  '5',
  '1',
  '11',
  '7',
  '19',
  '6',
  '12',
  '4',
]

export const testData2 = [
  '28',
  '33',
  '18',
  '42',
  '31',
  '14',
  '46',
  '20',
  '48',
  '47',
  '24',
  '23',
  '49',
  '45',
  '19',
  '38',
  '39',
  '11',
  '1',
  '32',
  '25',
  '35',
  '8',
  '17',
  '7',
  '9',
  '4',
  '2',
  '34',
  '10',
  '3',
]

export const prepareData = (data) => {
  return data.map((number) => parseInt(number, 10)).sort((a, b) => a - b)
}

export const givesAcceptedVoltage = (joltage, targetJoltage) => {
  const diff = targetJoltage - joltage
  return { valid: diff < 4 && diff > -1, diff }
}

export const highestAdapterVoltage = (listOfJoltages) => listOfJoltages.reduce((max, joltage) => (max < joltage ? joltage : max), 0) + 3

export const findFirstValidAdapter = (joltage, adapters) => adapters.find(adapter => givesAcceptedVoltage(joltage, adapter).valid)
export const findLowestValidAdapter = (joltage, adapters) => adapters.reduce((lowestAdapter, adapter) => givesAcceptedVoltage(joltage, adapter).valid ? Math.min(lowestAdapter, adapter) : lowestAdapter, 1000000)
export const findAllValidAdaptersFromStart = (joltage, adapters) => {
  // Asuming its sorted list
  const valids = []
  let i = 0
  let skipLoop = false
  while (i < adapters.length && !skipLoop) {
    const adapter = adapters[i]
    if (givesAcceptedVoltage(joltage, adapter).valid) {
      valids.push(adapter)
    } else {
      skipLoop = true
    }
    i++
  }
  return valids
}

export const getValidAdaptersChainByLowest = (adapters, startJoltage = 0) => {
  let validChain = []
  let skipLoop = false
  let seatJoltage = startJoltage
  let i = 0
  while (i < adapters.length && !skipLoop) {
    const foundAdapter = findLowestValidAdapter(seatJoltage, adapters)
    if (foundAdapter) {
      // console.log({ adapters, foundAdapter })
      validChain.push(foundAdapter)
      seatJoltage = foundAdapter + 1
      // const index = adapters.findIndex(foundAdapter)
    } else {
      skipLoop = true
    }
    i++
  }
  return validChain
}

let nrOfDifferentAdapterCombos = 0
export const getValidAdaptersChains = (remainingAdapters, seatJoltage = 0) => {
  const nearestSlice = remainingAdapters.slice(0, 3)
  const founds = findAllValidAdaptersFromStart(seatJoltage, nearestSlice)

  founds.forEach((found, idx) => {
    const remainingAdaptersSice = remainingAdapters.slice(idx + 1)
    if (remainingAdaptersSice.length === 0) {
      nrOfDifferentAdapterCombos += 1
      if (!(nrOfDifferentAdapterCombos % 10000000)) {
        console.log(nrOfDifferentAdapterCombos)
      }
    }
    getValidAdaptersChains(remainingAdaptersSice, found)
  })

  return nrOfDifferentAdapterCombos
}

export const countDifferencesBetweenItems = (list) => {
  let i = 0
  let diff
  const diffs = {}
  while (i < (list.length - 1)) {
    diff = list[i + 1] - list[i]
    diffs[diff] = typeof diffs[diff] === 'undefined' ? 1 : diffs[diff] + 1
    i++
  }
  return diffs
}
export const validate = (adapters) => {
  const validAdapterChain = getValidAdaptersChainByLowest(adapters)
  const maxAdapter = highestAdapterVoltage(validAdapterChain)
  validAdapterChain.push(maxAdapter)
  const diffs = countDifferencesBetweenItems([0].concat(validAdapterChain))
  return diffs
}

export const validateTwo = (adapters) => {
  const validAdapterChain = getValidAdaptersChainByLowest(adapters)
  const maxAdapter = highestAdapterVoltage(validAdapterChain)

  validAdapterChain.push(maxAdapter)
  const answer = getValidAdaptersChains(validAdapterChain)

  console.log({ answer })

  return answer
}

const Description = styled(Text)``

const Day10 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)

    // getValidAdaptersChains([1, 2, 3, 4])


    // const maxAdaptor = highestAdapterVoltage(preparedData)
    // let res = validate(preparedData)
    // setResultOne(res['1'] * res['3'])
    const answer = validateTwo(preparedData)
    setResultTwo(answer)
  }

  const taskDescription = `What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?`

  return (
    <div>
      <p>
        <InputArea onChange={setInputData} defaultValue={inputData}></InputArea>
      </p>
      <p>
        <Description>{taskDescription}</Description>
      </p>
      <RunButton onClick={onRun} />
      Ej: 219680000000 (too low)
      <Results resultOne={resultOne} resultTwo={resultTwo} />
    </div>
  )
}
export default Day10
