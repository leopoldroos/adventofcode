import React, { Component } from 'react'
import {reallocation} from '@/helpers/memory_reallocation'
import query from '@/helpers/location'

export default class Day6 extends Component {
  render () {
    const input = query.input
    let banks = input.split(',').map(b => parseInt(b, 10))
    const {cycles, loopedBanks, loopIdentifiedAtIndex} = reallocation(banks)
    return (
      <div>
        <p>{`Init Banks: ${input}`}</p>
        <p>{`Loop Banks: ${loopedBanks}`}</p>
        <p>{`Cycles: ${cycles}`}</p>
        <p>{`loopIdentifiedAtIndex: ${loopIdentifiedAtIndex} -> ${cycles - loopIdentifiedAtIndex}`}</p>
      </div>
    )
  }
}