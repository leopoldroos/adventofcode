import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'

export const testData = [
  'light red bags contain 1 bright white bag, 2 muted yellow bags.',
  'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
  'bright white bags contain 1 shiny gold bag.',
  'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
  'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
  'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
  'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
  'faded blue bags contain no other bags.',
  'dotted black bags contain no other bags.',
]

export const buildBags = (data) => {
  let bags = {}
  data.forEach((row) => {
    const [bagData] = row.split(' contain ')

    const [intensity, color] = bagData.split(' ')
    const name = `${color}_${intensity}`
    if (!bags[name]) {
      bags[name] = {
        name,
        color,
        intensity,
        referingTo: [],
        referredTo: [],
      }
    }
  })
  return bags
}

export const addRefs = (bags, data) => {
  data.forEach((row) => {
    const [bagData, refData] = row.split(' contain ')
    // 'light red bags contain 1 bright white bag, 2 muted yellow bags.'
    const [intensity, color] = bagData.split(' ')
    const name = `${color}_${intensity}`
    const bag = bags[name]

    const referals = refData.replace('.', '').split(', ')
    referals.forEach((refString) => {
      const [size, intensity, color] = refString.split(' ')
      if (size !== 'no') {
        bag.referingTo.push({
          size: parseInt(size, 10),
          name: `${color}_${intensity}`,
          color,
        })
      }
    })
  })
  return bags
}

export const prepareData = (data) => {
  const bags = buildBags(data)
  addRefs(bags, data)
  return bags
}

const getReferredToByName = (bags, referingToBagName, colors) => {
  const bagNames = Object.keys(bags)
  bagNames.forEach((bagName) => {
    const bag = bags[bagName]
    const referredTo = bag.referingTo.find((b) => b.name === referingToBagName)
    if (referredTo && colors.indexOf(bag.name) === -1) {
      // recursive goining on
      colors.push(bag.name)
      getReferredToByName(bags, bag.name, colors)
    }
  })
}

const getReferringToByName = (bags, referingToBagName) => {
  const bag = bags[referingToBagName]
  let sums = 1
  bag.referingTo.forEach((ref) => {
    sums += ref.size * getReferringToByName(bags, ref.name)
  })
  return sums
}

export const validate = (bags, name = 'gold_shiny') => {
  let colors = []
  getReferredToByName(bags, name, colors)
  return colors
}

export const validateTwo = (bags, name = 'gold_shiny') => {
  const sums = getReferringToByName(bags, name)
  return sums - 1
}

const Description = styled(Text)``

const Day7 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    const preparedData = prepareData(inputData)

    let colors = validate(preparedData)
    setResultOne(colors.length)

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
      <RunButton onClick={onRun} />
      <Results resultOne={resultOne} resultTwo={resultTwo} />
    </div>
  )
}
export default Day7
