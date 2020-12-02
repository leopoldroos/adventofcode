import React, { Component } from 'react'
import inverseCaptcha from '@/helpers/inverse_captcha'
import query from '@/helpers/location'

const Day1 = () => {
  console.log('LETs do this!', query)

  const url = 'http://localhost.1337/2007/1?input=1&halfoffset=2' // `${window.location.oring}${window.location.oring}`
  return (
    <div>
      <p>Example url: </p><a href={url}>{url}</a>
    </div>
  )
}
export default Day1