import React, { Component } from 'react'
import {reallocation} from 'lib/memory_reallocation'
import query from 'lib/location'

export default class Day6 extends Component {
  render () {
    const input = query.input
    let banks = input.split(',').map(b => parseInt(b, 10))
    const {cycles, loopedBanks} = reallocation(banks)
    return (
      <div>
        <p>{`Init Banks: ${input}`}</p>
        <p>{`Loop Banks: ${loopedBanks}`}</p>
        <p>{`Cycles: ${cycles}`}</p>
      </div>
    )
  }
}
