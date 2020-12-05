import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'
import { buildTower, balanceTower } from '@/helpers/recursive_circus'

export const testData = [
  'pbga (66)',
  'xhth (57)',
  'ebii (61)',
  'havc (66)',
  'ktlj (57)',
  'fwft (72) -> ktlj, cntj, xhth',
  'qoyq (66)',
  'padx (45) -> pbga, havc, qoyq',
  'tknk (41) -> ugml, padx, fwft',
  'jptl (61)',
  'ugml (68) -> gyxo, ebii, jptl',
  'gyxo (61)',
  'cntj(57)',
]
export const prepareData = (data) => {
  let programsInStruct = {}
  programs.forEach((program) => {
    const parts = program.split(' -> ')
    const nameAndWeight = parts[0].split(' ')
    let name = nameAndWeight[0]
    let weight = parseInt(nameAndWeight[1].replace(/\(|\)/g, ''), 10)
    let childNames = false
    if (parts[1]) {
      childNames = parts[1].split(', ')
    }
    programsInStruct[name] = { name, weight, childNames }
  })
  return programsInStruct
}

export const validate = (data) => buildTower(data)

export const validateTwo = (tower) => balanceTower(tower)

const Description = styled(Text)``

const Day7 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)
    const tower = validate(preparedData)
    setResultOne(tower)
    setResultTwo(validateTwo(tower))
  }

  const taskDescription = `Given that exactly one program is the wrong weight, what would its weight need to be to balance the entire tower?`

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
export default Day7
