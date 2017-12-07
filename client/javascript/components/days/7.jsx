import React, { Component } from 'react'
import recursiveCircus from 'lib/recursive_circus'
import http from 'services/http'
import query from 'lib/location'

const baseUrl = () => {
  return ''
}

export default class Day7 extends Component {
  constructor (props) {
    super(props)
    this.state = {ready: false}
  }

  componentWillMount () {
    try {
      http.get(baseUrl(), '/files/recursive_circus_dryrun.txt', {}).then(res => res.ok ? res.text() : Promise.resolve('')).then(data => {
        const withATwist = query.withatwist
        let programs = data.split('\n').map(program => {
          const parts = program.split(' -> ')
          const nameAndWeight = parts[0].split(' ')
          let name = nameAndWeight[0]
          let weight = parseInt(nameAndWeight[1].replace(/\(|\)/g, ''), 10)
          let childNames = false
          if (parts[1]) {
            childNames = parts[1].split(', ')
          }
          return {name, weight, childNames}
        })
        console.log({programs})
        const output = recursiveCircus(programs, withATwist)
        this.setState({output, ready: true})
      })
    } catch (err) {
      console.error('Failed:', err)
    }
  }

  render () {
    const {ready, output} = this.state

    if (!ready) return null

    return (
      <div>
        {/* <p>{`Input: ${originalOffsets}`}</p> */}
        <p>{`Output: ${output}`}</p>
      </div>
    )
  }
}
