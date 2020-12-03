import React, { Component } from 'react'
import {spiralMemory} from '@/helpers/spiral_memory'
import http from 'services/serverside'
import query from '@/helpers/location'

const baseUrl = () => {
  return ''
}

export default class Day3 extends Component {
  constructor (props) {
    super(props)
    this.state = {ready: false}
  }

  componentWillMount () {
    const value = query.value
    const withatwist = query.withatwist
    try {
      if (withatwist) {
        http.get(baseUrl(), `/generic/spiral?value=${value}&withatwist=1`, {}).then(res => res.ok ? res.json() : Promise.resolve('')).then(data => {
          const {spiral, xIndexStored, yIndexStored, number} = data
          const output = `${number} @${xIndexStored},${yIndexStored}`
          this.setState({output, spiral, value, ready: true})
        })
      } else {
        http.get(baseUrl(), `/generic/spiral?value=${value}`, {}).then(res => res.ok ? res.json() : Promise.resolve('')).then(data => {
          const {spiral, xIndexStored, yIndexStored} = data
          const output = spiralMemory(value, spiral, xIndexStored, yIndexStored)
          this.setState({output, spiral, value, ready: true})
        })
      }
    } catch (err) {
      console.error('Failed:', err)
    }
  }

  render () {
    const {ready, spiral, value, output} = this.state

    if (!ready) return null

    return (
      <div>
        <p>{`Input: ${value}`}</p>
        <p>{`Output: ${output}`}</p>
        <p style={{color: 'grey', fontFamily: 'monospace'}} dangerouslySetInnerHTML={{__html: spiral.map(row => row + '<br/>')}} />
      </div>
    )
  }
}
