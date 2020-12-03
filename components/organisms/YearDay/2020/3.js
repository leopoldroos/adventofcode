import React, { useState } from 'react'
import Button from '@/components/atoms/Button'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'

export const testData = [
  '..##.......',
  '#...#...#..',
  '.#....#..#.',
  '..#.#...#.#',
  '.#...##..#.',
  '..#.##.....',
  '.#.#.#....#',
  '.#........#',
  '#.##...#...',
  '#...##....#',
  '.#..#...#.#',
]
export const prepareData = (data) => {
  return data
}
export const validate = (data, right, down) => {
  let nrOfTrees = 0
  let rowIndex = 0
  let columnIndex = 0
  while (rowIndex < data.length) {
    const arrangedColumnIndex = columnIndex % data[0].length
    if (data[rowIndex][arrangedColumnIndex] === '#') {
      nrOfTrees++
    }
    columnIndex += right
    rowIndex += down
  }
  return nrOfTrees
}
export const multiplyMany = (data) => {
  const setup = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]
  return setup.reduce((res, s) => {
    return res * validate(data, s[0], s[1])
  }, 1)
}

const StyledButton = styled(Button.DefaultButton)`
  color: #fff;
`

const Description = styled(Text)``

const Day3 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)
    setResultOne(validate(preparedData, 3, 1))
    setResultTwo(multiplyMany(preparedData))
  }

  const taskDescription = `In this example, traversing the map using this slope would cause you to encounter 7 trees.

  Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?`

  return (
    <div>
      <p>
        <InputArea onChange={setInputData} defaultValue={inputData}></InputArea>
      </p>
      <p>
        <Description>{taskDescription}</Description>
      </p>
      <StyledButton label="Run!" onClick={onRun} />
      <p>
        <Results resultOne={resultOne} resultTwo={resultTwo} />
      </p>
    </div>
  )
}
export default Day3
