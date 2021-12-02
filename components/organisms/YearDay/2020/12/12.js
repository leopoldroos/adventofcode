import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'

export const testData = [
  'F10',
  'N3',
  'F7',
  'R90',
  'F11',
]

export const getNewDirection = (RFL, degrees, previsouDirection) => {
  let newDirection

  let tempDirection
  switch (degrees) {
    case 360:
      tempDirection = 'F'
      break
    case 270:
      tempDirection = RFL === 'L' ? 'R' : 'L'
      break
    case 180:
      tempDirection = 'B'
      break
    default:
      tempDirection = RFL
  }

  switch (tempDirection) {
    case 'R':
      if (previsouDirection === 'E') {
        newDirection = 'S'
      } else if (previsouDirection === 'N') {
        newDirection = 'E'
      } else if (previsouDirection === 'W') {
        newDirection = 'N'
      } else if (previsouDirection === 'S') {
        newDirection = 'W'
      }
      break
    case 'L':
      if (previsouDirection === 'E') {
        newDirection = 'N'
      } else if (previsouDirection === 'N') {
        newDirection = 'W'
      } else if (previsouDirection === 'W') {
        newDirection = 'S'
      } else if (previsouDirection === 'S') {
        newDirection = 'E'
      }
      break
    case 'B':
      if (previsouDirection === 'E') {
        newDirection = 'W'
      } else if (previsouDirection === 'N') {
        newDirection = 'S'
      } else if (previsouDirection === 'W') {
        newDirection = 'E'
      } else if (previsouDirection === 'S') {
        newDirection = 'N'
      }
      break
    default:
      newDirection = previsouDirection
  }
  return newDirection
}

export const moveWP = (position, direction, steps) => {
  switch (direction) {
    case 'E':
      position.wp.x += steps
      break
    case 'N':
      position.wp.y -= steps
      break
    case 'W':
      position.wp.x -= steps
      break
    case 'S':
      position.wp.y += steps
      break
    case 'F':
      position.x += steps * position.wp.x
      position.y += steps * position.wp.y
      break
    default:
      position.wp = getNewDirectionWP(direction, steps, position.wp)
  }
  return position
}

export const move = (position, direction, steps, withWaypoint = false) => {
  switch (direction) {
    case 'E':
      position.x += steps
      break
    case 'N':
      position.y -= steps
      break
    case 'W':
      position.x -= steps
      break
    case 'S':
      position.y += steps
      break
    case 'F':
      position = move(position, position.previousDirection, steps)
      break
    default:
      position.previousDirection = getNewDirection(direction, steps, position.previousDirection)
  }
  return position
}

export const prepareData = (data) => data.map(i => ({
  direction: i[0],
  steps: parseInt(i.slice(1), 10)
}))

export const validate = (directions) => {
  const position = directions.reduce((pos, { direction, steps }) => {
    const p = move(pos, direction, steps)
    console.log(direction + ' ' + steps, p.x, p.y, p.previousDirection)
    return p
  }, { x: 0, y: 0, previousDirection: 'E' })
  position.distance = Math.abs(position.x) + Math.abs(position.y)
  return position
}

export const validateTwo = (directions) => {
  const position = directions.reduce((pos, { direction, steps }) => {
    const p = moveWP(pos, direction, steps, true)
    console.log(direction + ' ' + steps, p.x, p.y, p.previousDirection)
    return p
  }, { x: 0, y: 0, previousDirection: 'E', wp: { x: 10, y: -1 } })
  position.distance = Math.abs(position.x) + Math.abs(position.y)
  return position
}

const Description = styled(Text)``

const Day12 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)

    // let position = validate(preparedData)
    // console.log(position)
    // setResultOne(position.distance)

    let position = validateTwo(preparedData)
    console.log(position)
    setResultTwo(position)
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
      EJ. 2379 (too high), ej 2340, 2115
      <RunButton onClick={onRun} />
      <Results resultOne={resultOne} resultTwo={resultTwo} />
    </div>
  )
}
export default Day12
