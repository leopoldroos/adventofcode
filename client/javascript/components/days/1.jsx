import React, { Component } from 'react'
import inverseCaptcha from 'lib/inverse_captcha'
import query from 'lib/location'
export default class Day1 extends Component {
  render () {
    const input = query.input
    const halfOffset = query.halfoffset
    const offset = (input && ['1', 'true'].includes(halfOffset)) ? input.length / 2 : 1
    const output = inverseCaptcha(input, offset)
    return (
      <div>
        <p>{`Input: ${input}`}</p>
        <p>{`Offset: ${offset}`}</p>
        <p>{`Output: ${output}`}</p>
      </div>
    )
  }
}
