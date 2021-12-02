import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'
import { toBinary, toDecimal, fillWithChar } from '@/helpers/converters'

export const testData = [
  '939',
  '7,13,x,x,59,x,31,19'
]

export const testData2 = [
]

export const prepareData = (data) => {
  const buses = data[1].split(',').map(b => parseInt(b, 10))
  const busesWithTime = buses.map((number, idx) => number ? ({
    number,
    timeOffset: idx
  }) : null)
  const prepData = {
    arrives: parseInt(data[0], 10),
    buses: buses.filter(b => !!b),
    busesWithTime: busesWithTime.filter(b => !!b),
  }
  return prepData
}

export const getEarliestBusAndTime = ({ arrives, buses }) => {
  let earliestBus = {
    arrives: 10000000
  }
  buses.forEach(bus => {
    const busArrives = Math.ceil(arrives / bus) * bus
    if (earliestBus.arrives > busArrives) {
      earliestBus = {
        arrives: busArrives, busNumber: bus, waitingTime: busArrives - arrives
      }
    }
  })
  // buses.reduce((earliestBus, bus) => {
  //   return Math.min(earliestBus, Math.ceil(arrives / bus) * bus)
  // }, 10000000)
  return earliestBus
}

export const getWaitingTime = (data) => {
  const earliestBus = getEarliestBusAndTime(data)
  return earliestBus.waitingTime
}
export const validate = (data) => {
  const earliestBus = getEarliestBusAndTime(data)
  return earliestBus.busNumber * earliestBus.waitingTime
}

export const validateTwo = (data) => {
  const buses = data.busesWithTime
  console.log({ buses })
  const starttime = 0
  let time = starttime
  let ready = false
  let checks = 0
  let busIndexOk = -1
  let accumulativeStepsize = buses[0].number
  while (!ready && checks < 3500 && time < 3500) {
    console.log('-----start over:', time, accumulativeStepsize)
    let currentBusIndex = 0
    ready = buses.reduce((ready, bus) => {
      if (!ready) {
        return ready
      }

      // const diff = (time - bus.timeOffset) % (bus.number) This is when they all allign...
      const diff = (time + bus.timeOffset) % (bus.number)
      console.log({ time, diff, bus: bus.number, ready: diff === 0, accumulativeStepsize })
      if (diff !== 0) {
        // time = accumulativeStepsize
        return false
      }
      if (currentBusIndex > busIndexOk) {
        busIndexOk = currentBusIndex
        // accumulativeStepsize += bus.number //  + bus.timeOffset
        accumulativeStepsize = 1 // time ? time : buses[0].number //  - starttime//  + bus.timeOffset
      }
      currentBusIndex++
      return true
    }, true)
    if (!ready) {
      time += accumulativeStepsize
    }
    checks++
  }
  return time
}

const Description = styled(Text)``

const Day13 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)

    // setResultOne(validate(preparedData))
    let sums = validateTwo(preparedData)
    setResultTwo(sums)
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
      EJ. ... (too high),
      <RunButton onClick={onRun} />
      <Results resultOne={resultOne} resultTwo={resultTwo} />
    </div>
  )
}
export default Day13
