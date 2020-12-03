import React, { Component } from 'react'
import {cleanStream} from '@/helpers/streams'
import http from 'services/serverside'

const baseUrl = () => {
  return ''
}

export default class Day9 extends Component {
  constructor (props) {
    super(props)
    this.state = {ready: false}
  }

  componentWillMount () {
    try {
      http.get(baseUrl(), '/files/garbage_stream.txt', {}).then(res => res.ok ? res.text() : Promise.resolve('')).then(data => {
        let streams = data.split('\n')
        let answers = streams.map(cleanStream)
        this.setState({answers, ready: true})
      })
    } catch (err) {
      console.error('Failed:', err)
    }
  }

  render () {
    const {ready, answers} = this.state

    if (!ready) return null

    return (
      <div>
        {answers.map(answer => {
          let {cleanedStream, score, groups, nrOfGarbageCharacters} = answer
          return (
            <div>
              ==== Groups: {groups}, Score: {score}, NrOfGarbageCharacters: {nrOfGarbageCharacters} ====
              <pre>{JSON.stringify(cleanedStream, null, 2)}</pre>
            </div>
          )
        })
      }
      </div>
    )
  }
}
