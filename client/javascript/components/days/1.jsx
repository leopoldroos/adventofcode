import React, { Component } from 'react'
import inverseCaptcha from 'lib/inverse_captcha'

export default class DayContainer extends Component {
  render () {
    let input = window.location.search.split('=').pop()
    const output = inverseCaptcha(input)
    return (
      <div>
        <p>{`Input: ${input}`}</p>
        <p>{`Output: ${output}`}</p>
      </div>
    )
  }
}
