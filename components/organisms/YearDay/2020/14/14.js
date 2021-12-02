import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'
import { toBinary, toDecimal, fillWithChar } from '@/helpers/converters'

export const testData = [
  'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
  'mem[8] = 11',
  'mem[7] = 101',
  'mem[8] = 0'
]

export const testData2 = [
  'mask = 000000000000000000000000000000X1001X',
  'mem[42] = 100',
  'mask = 00000000000000000000000000000000X0XX',
  'mem[26] = 1'
]

export const getMaskAsBin = (maskString) => maskString.replace(/X/g, '0')

export const applyValueBitmask = (maskAsXstring, decimalValue) => {
  const mask = maskAsXstring // getMaskAsBin(maskAsXstring) // => '000000001000010'
  let binaryAsString = toBinary(decimalValue).toString()
  binaryAsString = fillWithChar(binaryAsString, '0', mask.length) // generateZeros(mask.length - binaryAsString.length) + binaryAsString
  let i = 0
  let mergeResult = ''
  while (i < mask.length) {
    mergeResult += mask[i] !== 'X' ? mask[i] : binaryAsString[i]
    i += 1
  }

  return mergeResult
}

export const applyAddressBitmask = (maskAsXstring, decimalValue) => {
  const mask = maskAsXstring // getMaskAsBin(maskAsXstring) // => '000000001000010'
  let binaryAsString = toBinary(decimalValue).toString()
  binaryAsString = fillWithChar(binaryAsString, '0', mask.length) // generateZeros(mask.length - binaryAsString.length) + binaryAsString
  let i = 0
  let mergeResult = ''
  while (i < mask.length) {
    if (mask[i] === '0') {
      mergeResult += binaryAsString[i]
    } else if (mask[i] === '1') {
      mergeResult += '1'
    } else {
      mergeResult += 'X'
    }
    i += 1
  }

  return mergeResult
}

export const getAllFloatingAddresses = (floatingAddress) => {
  let floatingAddresses = ['']
  let i = 0
  while (i < floatingAddress.length) {
    if (floatingAddress[i] !== 'X') {
      floatingAddresses = floatingAddresses.map(a => a + floatingAddress[i])
    } else {
      const ones = floatingAddresses.map(a => a + '1')
      floatingAddresses = ones.concat(floatingAddresses.map(a => a + '0'))
    }
    i += 1
  }

  return floatingAddresses
}
export const prepareData = (data) => {
  const prepData = []
  let maskPart = null
  data.map(i => {
    const parts = i.split(' = ')
    if (parts[0] === 'mask') {
      if (maskPart !== null) {
        prepData.push(maskPart)
      }
      maskPart = {
        mask: parts[1],
        mems: []
      }
    } else {
      maskPart.mems.push({ position: parts[0].replace('mem[', '').replace(']', ''), value: parseInt(parts[1], 10) })
    }
  })
  prepData.push(maskPart)
  return prepData
}

export const runBitmasks = (data, floating = false) => {
  const memory = {}
  data.forEach(({ mask, mems }) => {
    mems.forEach(({ position, value }) => {
      if (floating) {

        const maskedPosition = applyAddressBitmask(mask, parseInt(position, 10))
        const allFloatingAddresses = getAllFloatingAddresses(maskedPosition)
        // memory.test = memory.test ? memory.test + ',' + val : val
        allFloatingAddresses.forEach(f => {
          memory[toDecimal(f)] = value
        })
      } else {
        const val = toDecimal(applyValueBitmask(mask, value))
        memory[position] = val
      }
    })
  })
  return memory
}
export const validate = (data) => {
  const res = runBitmasks(data)
  return Object.values(res).reduce((sum, v) => (sum + v), 0)
}

export const validateTwo = (data) => {
  const res = runBitmasks(data, true)
  return Object.values(res).reduce((sum, v) => (sum + v), 0)
}

const Description = styled(Text)``

const Day14 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)

    setResultOne(validate(preparedData))
    // let sums = validateTwo(preparedData)
    // setResultTwo(sums)
  }

  const taskDescription = `What is the Manhattan distance between that location and the ship's starting position?`

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
export default Day14
