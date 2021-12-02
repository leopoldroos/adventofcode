import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'
import Cube from '@/helpers/Cube'

export const testData = [
  '.#.',
  '..#',
  '###',
]

export const testData2 = [
]

export const prepareData = (data) => {
  const activeCubes = []
  // Note: Try to just keep track of active cubes in the beginning...
  data.forEach((row, idy) => {
    row.split('').forEach((isActive, idx) => {
      if (isActive === '#') {
        const cube = new Cube(idx, idy, 0, 0, true)
        activeCubes.push(cube)
      }
    })
  })
  return activeCubes
}

export const updateBasedOnNrOfAdjecentCubes = (cube, cubes, newActiveCubes) => {
  let count = 0
  cubes.forEach((c => {
    count += cube.isAdjecent(c) && c.active ? 1 : 0
  }))
  if ([2, 3].includes(count) && cube.active) {
    newActiveCubes.push(new Cube(cube.x, cube.y, cube.z, cube.w, true))
  } else if ([3].includes(count) && !cube.active) {
    newActiveCubes.push(new Cube(cube.x, cube.y, cube.z, cube.w, true))
    // cube.setAcive()
  }
  return cube
}

export const generateAdjecentInactiveCubes = (activeCubes, keys, wSpace = false) => {
  const inActiveCubes = []

  const xList = [-1, 0, 1]
  const yList = [-1, 0, 1]
  const zList = [-1, 0, 1]
  const wList = wSpace ? [-1, 0, 1] : [0]

  let i = 0
  while (i < activeCubes.length) {
    const activeCube = activeCubes[i]
    wList.forEach((w, idw) => {
      xList.forEach((x, idx) => {
        yList.forEach((y, idy) => {
          zList.forEach((z, idz) => {
            const xToCheck = x + activeCube.x
            const yToCheck = y + activeCube.y
            const zToCheck = z + activeCube.z
            const wToCheck = w + activeCube.w
            const key = `${xToCheck},${yToCheck},${zToCheck},${wToCheck}`
            if (keys[key] === undefined) {
              inActiveCubes.push(new Cube(xToCheck, yToCheck, zToCheck, wToCheck, false))
              keys[key] = false
            }
          })
        })
      })
    })
    i++
  }

  return inActiveCubes
}

export const getActiveKeys = (activeCubes) => {
  const activeKeys = {}
  activeCubes.forEach(activeCube => activeKeys[activeCube.key] = true)
  return activeKeys
}

export const validate = (activeCubes, cycles = 6) => {
  let i = 0
  while (i < cycles) {
    const activeKeys = getActiveKeys(activeCubes)
    const inActiveCubes = generateAdjecentInactiveCubes(activeCubes, activeKeys) // Since we try to just keep the acive ones in 'activecCubes' list
    const allCubes = activeCubes.concat(inActiveCubes)
    const newActiveCubes = []
    allCubes.forEach(cube => updateBasedOnNrOfAdjecentCubes(cube, allCubes, newActiveCubes))
    newActiveCubes.forEach(c => c.setActive())
    activeCubes = newActiveCubes
    i++
  }
  return activeCubes
}

export const validateTwo = (activeCubes, cycles = 6) => {
  let i = 0
  while (i < cycles) {
    const activeKeys = getActiveKeys(activeCubes)
    const inActiveCubes = generateAdjecentInactiveCubes(activeCubes, activeKeys, true) // Since we try to just keep the acive ones in 'activecCubes' list
    const allCubes = activeCubes.concat(inActiveCubes)
    const newActiveCubes = []
    allCubes.forEach(cube => updateBasedOnNrOfAdjecentCubes(cube, allCubes, newActiveCubes))
    newActiveCubes.forEach(c => c.setActive())
    activeCubes = newActiveCubes
    i++
  }
  return activeCubes
}

const Description = styled(Text)``

const Day17 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)
    const res = validate(preparedData, 6)
    setResultOne(res.length)
    const res2 = validateTwo(preparedData, 6)
    console.log(res2)
    setResultTwo(res2.length)
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
      EJ. ... (too low/high?),
      <RunButton onClick={onRun} />
      <Results resultOne={resultOne} resultTwo={resultTwo} />
    </div>
  )
}
export default Day17
