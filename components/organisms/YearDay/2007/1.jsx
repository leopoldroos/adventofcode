import React, { Component } from 'react'
import inverseCaptcha from '@/helpers/inverse_captcha'
import query from '@/helpers/location'

const Day1 = () => {
  console.log('Query = ', query)
  const input = query.input
  const halfOffset = query.halfoffset
  const offset = (input && ['1', 'true'].includes(halfOffset)) ? input.length / 2 : 1
  const output = inverseCaptcha(input, offset)

  const url = 'http://localhost.1337/2007/1?input=1&halfoffset=2' // `${window.location.oring}${window.location.oring}`
  return (
    <div>
      <p>Example url: </p><a href={url}>{url}</a>
      <p>{`Input: ${input}`}</p>
      <p>{`Offset: ${offset}`}</p>
      <p>{`Output: ${output}`}</p>
    </div>
  )
}
export default Day1