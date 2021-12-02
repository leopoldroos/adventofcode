import React, { useState } from 'react'
import RunButton from '@/components/molecules/RunButton'
import Results from '@/components/molecules/Results'
import Text from '@/components/atoms/Text'
import InputArea from '@/components/atoms/InputArea'
import styled from 'styled-components'
import myData from './16.json'

export const testBoard = [
  ".--------------------------------------------------------.",
  "| ????: 101    ?????: 102   ??????????: 103     ???: 104 |",
  "|                                                        |",
  "| ??: 301  ??: 302             ???????: 303      ??????? |",
  "| ??: 401  ??: 402           ???? ????: 403    ????????? |",
  "'--------------------------------------------------------'",
]
export const testData = {
  locations: [
    'class: 1-3 or 5-7',
    'row: 6-11 or 33-44',
    'seat: 13-40 or 45-50',
  ],
  myTicket:
    ['7,1,14'],

  nearbyTickets: [
    '7,3,47',
    '40,4,50',
    '55,2,20',
    '38,6,12',
  ]
}
export const testData2 = [
]

export const isInLocations = (data, number) => {
  const firstValidLocation = data.locations.find(location => {
    return (location.ranges[0].min <= number && location.ranges[0].max >= number) || (location.ranges[1].min <= number && location.ranges[1].max >= number)
  })
  // console.log(number, firstValidLocation ? firstValidLocation.ranges[0].min + '-' + firstValidLocation.ranges[0].max + ', ' + firstValidLocation.ranges[1].min + '-' + firstValidLocation.ranges[1].max : null)
  return !!firstValidLocation
}

export const prepareData = (data) => {
  data.locations = data.locations.map(row => {
    const [type, part2] = row.split(': ')
    const ranges = part2.split(' or ')
    return {
      type,
      ranges: ranges.map(range => {
        const [min, max] = range.split('-').map(v => parseInt(v, 10))
        return { min, max }
      })
    }
  })
  data.myTicket = data.myTicket.map(row => row.split(',').map(v => parseInt(v, 10)))
  data.nearbyTickets = data.nearbyTickets.map(row => row.split(',').map(v => parseInt(v, 10)))

  return data
}

export const validate = (data) => {
  // identify invalids:
  console.log(data)

  let invalidIds = []
  let i = 0
  const invalids = data.nearbyTickets.reduce((invalids, ticket) => {
    const firstInvalid = ticket.find(number => !isInLocations(data, number))
    if (firstInvalid) {
      invalidIds.push(i)
      invalids.push(firstInvalid)
    }
    i++
    return invalids
  }, [])

  const sum = invalids.reduce((sum, invalid) => sum += invalid, 0)
  console.log('Answer part 1:', { sum }, invalids, invalidIds)
  return invalidIds
}

export const isInWhichLocation = (locs, type) => {
  // console.log('----------------------')
  const allValidLocations = []
  locs.forEach((loc, index) => {
    if (loc) {
      const firstInValidNumber = type.find(number => {
        // console.log(loc.ranges[0], loc.ranges[1], number, (loc.ranges[0].min > number || loc.ranges[0].max < number), (loc.ranges[1].min > number || loc.ranges[1].max < number))
        return (loc.ranges[0].min > number || loc.ranges[0].max < number) &&
          (loc.ranges[1].min > number || loc.ranges[1].max < number)
      })
      if (!firstInValidNumber) {
        allValidLocations.push({ loc, index })
      }
      // console.log({ firstInValidNumber, type, loc })
    }
  })
  // console.log({ allValidLocations })
  return allValidLocations
}

export const validateTwo = (data, invalidIds) => {
  // remove invalids:
  data.nearbyTickets = data.nearbyTickets.filter((ticket, idx) => !invalidIds.includes(idx))

  // Remove locations that is not a departure:
  data.locations = data.locations.filter(loc => loc.type.includes('departure'))

  // Add my ticket to validation:
  data.nearbyTickets.push(data.myTicket)

  data.types = []
  data.nearbyTickets.forEach(ticket => {
    ticket.forEach((number, idx) => {
      if (!data.types[idx]) {
        data.types[idx] = []
      }
      data.types[idx].push(number)
    })
  })
  data.types.map(t => t.sort(((a, b) => a - b)))

  // console.log('data.nearbyTickets', data.nearbyTickets, data.types)
  let answer = {
    sum: 1,
    indexes: [],
    readable: '',
    myTicket: data.myTicket[0].join(', ')
  }

  let types = data.types
  let locs = data.locations
  let i = 0
  let typesLeft = types.length
  let typesIndex = 0
  console.log({ types, locs, invalidIds })
  while (i < 1000 && typesLeft > 0 && answer.indexes.length < 26) {
    const type = types[typesIndex]
    if (type) {
      const foundLocations = isInWhichLocation(locs, type)
      // console.log('WHILE:', { typesIndex, type, foundLocations })
      if (foundLocations.length === 1) {
        // console.log('FOUND:', foundLocations)
        answer[typesIndex] = foundLocations[0].loc
        answer.indexes.push(typesIndex)
        typesLeft -= 1
        types[typesIndex] = null
        locs[foundLocations[0].index] = null
        answer.readable = answer.readable + data.myTicket[0][typesIndex] + ' * '
        answer.sum *= data.myTicket[0][typesIndex]
      }
    }
    i++
    typesIndex = i % types.length
  }
  answer.locations = answer.indexes.sort((a, b) => a - b).map(i => answer[i].type)
  console.log({ answer })
  return null
}

const Description = styled(Text)``

const Day15 = () => {
  const [inputData, setInputData] = useState(testData)
  const [resultOne, setResultOne] = useState(null)
  const [resultTwo, setResultTwo] = useState(null)

  const onRun = () => {
    // const preparedData = prepareData(inputData)

    // const preparedData = prepareData(testData)
    const preparedData = prepareData(myData)
    const invalidIds = validate(preparedData)

    // setResultOne(res)
    let sums = validateTwo(preparedData, invalidIds)

    // setResultTwo(sums[0])
  }

  const taskDescription = `Consider the validity of the nearby tickets you scanned. What is your ticket scanning error rate?`

  return (
    <div>
      {/* <p>
        <InputArea onChange={setInputData} defaultValue={inputData}></InputArea>
      </p> */}
      <p>
        <Description>{taskDescription}</Description>
      </p>
      EJ. 180469238039 (too low),
      <RunButton onClick={onRun} />
      {/* <Results resultOne={resultOne} resultTwo={resultTwo} /> */}
    </div>
  )
}
export default Day15
