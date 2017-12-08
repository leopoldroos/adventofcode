import React, { Component } from 'react'
import {buildTower, balanceTower} from 'lib/recursive_circus'
import http from 'services/http'

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
      http.get(baseUrl(), '/files/recursive_circus.txt', {}).then(res => res.ok ? res.text() : Promise.resolve('')).then(data => {
        let programs = data.split('\n')
        let programsInStruct = {}
        programs.forEach(program => {
          const parts = program.split(' -> ')
          const nameAndWeight = parts[0].split(' ')
          let name = nameAndWeight[0]
          let weight = parseInt(nameAndWeight[1].replace(/\(|\)/g, ''), 10)
          let childNames = false
          if (parts[1]) {
            childNames = parts[1].split(', ')
          }
          programsInStruct[name] = {name, weight, childNames}
        })
        let tower = buildTower(programsInStruct)

        const wrongWeight = balanceTower(tower)
        console.log('Part 2:', {wrongWeight})
        this.setState({tower, ready: true})
      })
    } catch (err) {
      console.error('Failed:', err)
    }
  }

  render () {
    const {ready, tower} = this.state

    if (!ready) return null

    return (
      <div>
        <pre>{JSON.stringify(tower, null, 2)}</pre>
      </div>
    )
  }
}
