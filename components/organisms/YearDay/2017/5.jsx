import React, { Component } from 'react'
import offsetGame from '@/helpers/offset_game'
import http from 'services/serverside'
import query from '@/helpers/location'

const baseUrl = () => {
  return ''
}

export default class Day5 extends Component {
  constructor (props) {
    super(props)
    this.state = {ready: false}
  }

  componentWillMount () {
    try {
      http.get(baseUrl(), '/files/offset_game_day5.txt', {}).then(res => res.ok ? res.text() : Promise.resolve('')).then(data => {
        const withATwist = query.withatwist
        let offsets = data.split('\n').map(offset => parseInt(offset, 10))
        const originalOffsets = offsets.slice(0) // clone
        const output = offsetGame(offsets, withATwist)
        this.setState({offsets, originalOffsets, output, ready: true})
      })
    } catch (err) {
      console.error('Failed:', err)
    }
  }

  render () {
    const {ready, offsets, originalOffsets, output} = this.state

    if (!ready) return null

    return (
      <div>
        <p>{`Input: ${originalOffsets}`}</p>
        {/* <p>{`Offset: ${offset}`}</p> */}
        <p>{`Resulting input: ${offsets}`}</p>
        <p>{`Output: ${output}`}</p>
      </div>
    )
  }
}
