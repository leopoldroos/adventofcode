import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'

export const testData = [
  'L.LL.LL.LL',
  'LLLLLLL.LL',
  'L.L.L..L..',
  'LLLL.LL.LL',
  'L.LL.LL.LL',
  'L.LLLLL.LL',
  '..L.L.....',
  'LLLLLLLLLL',
  'L.LLLLLL.L',
  'L.LLLLL.LL',
]


export const prepareData = (data) => {
  return data.map((row) => row.split(''))
}
export const getRecommendedChange = (data, x, y, test) => {
  const seat = data[y][x]
  if (seat === '.') {
    return '.'
  }

  const yLength = data.length
  const xLength = data[0].length
  let adjecentOccupied = 0
  if (y > 0 && x > 0 && data[y - 1][x - 1] === '#') {
    adjecentOccupied += 1
  }
  if (y > 0 && data[y - 1][x] === '#') {
    adjecentOccupied += 1
  }
  if (y > 0 && x < xLength - 1 && data[y - 1][x + 1] === '#') {
    adjecentOccupied += 1
  }

  if (x > 0 && data[y][x - 1] === '#') {
    adjecentOccupied += 1
  }
  if (x < xLength - 1 && data[y][x + 1] === '#') {
    adjecentOccupied += 1
  }

  if (y < yLength - 1 && x > 0 && data[y + 1][x - 1] === '#') {
    adjecentOccupied += 1
  }
  if (y < yLength - 1 && data[y + 1][x] === '#') {
    adjecentOccupied += 1
  }
  if (y < yLength - 1 && x < xLength - 1 && data[y + 1][x + 1] === '#') {
    adjecentOccupied += 1
  }

  if (test) {
    return adjecentOccupied
  }

  if (seat === 'L') {
    return adjecentOccupied === 0 ? '#' : 'L'
  }

  if (adjecentOccupied > 3) {
    return 'L'
  }
  return '#'
}

export const getRecommendedChange2 = (data, x, y, test) => {
  const seat = data[y][x]
  if (seat === '.') {
    return '.'
  }

  const yLength = data.length
  const xLength = data[0].length
  let adjecentOccupied = 0

  const row = data[y]
  let char = '.'
  let i = 1
  while ((i + x) <= xLength && char === '.') {
    char = data[y][x + i]
    i++
  }
  if (char === '#') adjecentOccupied += 1

  char = '.'
  i = 1
  while ((x - i) >= 0 && char === '.') {
    char = data[y][x - i]
    i++
  }
  if (char === '#') adjecentOccupied += 1

  char = '.'
  i = 1
  while ((i + y) < yLength && char === '.') {
    char = data[y + i][x]
    i++
  }
  if (char === '#') adjecentOccupied += 1

  char = '.'
  i = 1
  while ((y - i) >= 0 && char === '.') {
    char = data[y - i][x]
    i++
  }
  if (char === '#') adjecentOccupied += 1

  // XXXXX

  char = '.'
  i = 1
  while ((i + x) < xLength && (y - i) >= 0 && char === '.') {
    char = data[y - i][x + i]
    i++
  }
  if (char === '#') adjecentOccupied += 1

  char = '.'
  i = 1
  while (0 <= (x - i) && (y - i) >= 0 && char === '.') {
    char = data[y - i][x - i]
    i++
  }
  if (char === '#') adjecentOccupied += 1

  char = '.'
  i = 1
  while ((x - i) >= 0 && (y + i) < yLength && char === '.') {
    char = data[y + i][x - i]
    i++
  }
  if (char === '#') adjecentOccupied += 1

  char = '.'
  i = 1
  while ((x + i) < xLength && (y + i) < yLength && char === '.') {
    char = data[y + i][x + i]
    i++
  }
  if (char === '#') adjecentOccupied += 1

  if (test) {
    return adjecentOccupied
  }
  if (seat === 'L') {
    return adjecentOccupied === 0 ? '#' : 'L'
  }

  if (adjecentOccupied > 4) {
    return 'L'
  }
  return '#'
}


export const runOneRound = (data, ver2 = false, test) => {
  return data.map((row, y) => {
    return row.map((seat, x) => {
      seat = ver2 ? getRecommendedChange2(data, x, y, test) : getRecommendedChange(data, x, y, test)
      return seat
    })
  })
}
export const validate = (data) => {
  let i = 0
  let previous
  let exitLoop = false
  while (i < 100 && !exitLoop) {
    data = runOneRound(data)
    const fingerprint = data.map(r => r.join('')).join('')
    if (fingerprint === previous) {
      exitLoop = true
    }
    previous = fingerprint
    i++
  }
  return {
    rounds: i - 1, fingerprint: previous,
    available: previous.match(/L/g).length,
    occupied: previous.match(/#/g).length,
  }
}

export const validateTwo = (data) => {
  let i = 0
  let previous
  let exitLoop = false
  while (i < 100 && !exitLoop) {
    data = runOneRound(data, true)
    const fingerprint = data.map(r => r.join('')).join('')
    if (fingerprint === previous) {
      exitLoop = true
    }
    previous = fingerprint
    i++
  }
  return {
    rounds: i - 1, fingerprint: previous,
    available: previous.match(/L/g).length,
    occupied: previous.match(/#/g).length,
  }
}

const Description = styled(Text)``

const Day11 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)
    // console.log(preparedData)
    // const res = validate(preparedData)
    // console.log(res)
    // setResultOne(res.occupied)
    const answer = validateTwo(preparedData)
    console.log(answer)
    // setResultTwo(answer)
  }

  const taskDescription = `How many seats end up occupied?`

  return (
    <div>
      <p>
        <InputArea onChange={setInputData} defaultValue={inputData}></InputArea>
      </p>
      <p>
        <Description>{taskDescription}</Description>
      </p>
      <RunButton onClick={onRun} />
      Ej:
      <Results resultOne={resultOne} resultTwo={resultTwo} />
    </div>
  )
}
export default Day11
