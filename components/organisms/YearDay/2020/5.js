import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'
import { binaryHalving } from '@/helpers/binaryHalving'

export const testData = ['FBFBBFFRLR']

// Front, Back, Left, Right
// 0-6 chars, only F or B, maps to one of 128 rows (owIndex: 0-127)
// <= 63 = Front, >= 64 = Back

export const prepareData = (data) => {
  return data.map((binaryString) => {
    const rowBinaryString = binaryString.substr(0, 7)
    const columnBinaryString = binaryString.substr(7, 3)
    return { rowBinaryString, columnBinaryString }
  })
}

export const validate = (binaryStrings) => {
  const seatIds = binaryStrings.map(
    ({ rowBinaryString, columnBinaryString }) => {
      const { min: rowIndex } = binaryHalving(128, rowBinaryString, 'F')
      const { min: columnIndex } = binaryHalving(8, columnBinaryString, 'L')
      return rowIndex * 8 + columnIndex
    }
  )
  return {
    seatIds,
    max: seatIds.reduce((max, seatId) => Math.max(max, seatId), 0),
  }
}

export const validateTwo = (seatIds) => {
  seatIds.sort((a, b) => a - b)
  let i = 1
  let found = false
  while (!found && i < seatIds.length) {
    const seatId = seatIds[i]
    if (seatId + 1 !== seatIds[i + 1]) {
      found = seatId + 1
    }
    i++
  }
  return found
}

const Description = styled(Text)``

const Day5 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)
    const { seatIds, max } = validate(preparedData)
    setResultOne(max)
    setResultTwo(validateTwo(seatIds))
  }

  const taskDescription = `Count the number of valid passports - those that have all required fields. Treat cid as optional. In your batch file, how many passports are valid?`

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
export default Day5
