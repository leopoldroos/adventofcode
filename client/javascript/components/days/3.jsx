import React, { Component } from 'react'
import {spiralMemory, createSpiral} from 'lib/spiral_memory'
import query from 'lib/location'

export default class Day3 extends Component {
  render () {
    const input = query.input
    const spiral = createSpiral(input)
    console.log({spiral})
    const output = spiralMemory(input, spiral)
    return (
      <div>
        <p>{`Input: ${input}`}</p>
        <p style={{color: 'grey', fontFamily: 'monospace'}} dangerouslySetInnerHTML={{__html: spiral.map(row => row + '<br/>')}} />
        <p>{`Output: ${output}`}</p>
      </div>
    )
  }
}
