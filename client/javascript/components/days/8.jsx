import React, { Component } from 'react'
import {buildTower, balanceTower} from 'lib/recursive_circus'
import http from 'services/http'

const baseUrl = () => {
  return ''
}

export default class Day8 extends Component {
  constructor (props) {
    super(props)
    this.state = {ready: false}
  }

  componentWillMount () {
    try {
      http.get(baseUrl(), '/files/register_instructions.txt', {}).then(res => res.ok ? res.text() : Promise.resolve('')).then(data => {
        let instructions = data.split('\n')
        let registers = {}
        let values
        let topValue
        let maxValue = 0

        instructions.forEach(instruction => {
          const parts = instruction.split(' ')
          let registerName = parts[0]
          let checkedRegisterName = parts[4]
          if (!registers[registerName]) {
            registers[registerName] = 0
          }
          if (!registers[checkedRegisterName]) {
            registers[checkedRegisterName] = 0
          }
          let addOrSub = parts[1] === 'inc' ? +1 : -1
          let registerValue = registers[registerName]
          let checkedRegisterValue = registers[checkedRegisterName]
          let conditionalValue = parseInt(parts[6], 10)
          let incrementalValue = parseInt(parts[2], 10)
          switch (parts[5]) {
            case '<':
              registerValue = (checkedRegisterValue < conditionalValue) ? registerValue + addOrSub * incrementalValue : registerValue
              break
            case '>':
              registerValue = (checkedRegisterValue > conditionalValue) ? registerValue + addOrSub * incrementalValue : registerValue
              break
            case '==':
              registerValue = (checkedRegisterValue === conditionalValue) ? registerValue + addOrSub * incrementalValue : registerValue
              break
            case '>=':
              registerValue = (checkedRegisterValue >= conditionalValue) ? registerValue + addOrSub * incrementalValue : registerValue
              break
            case '<=':
              registerValue = (checkedRegisterValue <= conditionalValue) ? registerValue + addOrSub * incrementalValue : registerValue
              break
            case '!=':
              registerValue = (checkedRegisterValue !== conditionalValue) ? registerValue + addOrSub * incrementalValue : registerValue
              break
            default:
              console.log('Could not handle:', parts.join(' '))
          }
          registers[registerName] = registerValue

          values = Object.values(registers)
          values.sort((a, b) => a - b)
          topValue = values.pop()
          maxValue = Math.max(maxValue, topValue)
        })

        this.setState({registers, topValue, maxValue, ready: true})
      })
    } catch (err) {
      console.error('Failed:', err)
    }
  }

  render () {
    const {ready, topValue, maxValue, registers} = this.state

    if (!ready) return null

    return (
      <div>
        Top value: {topValue}<br />
        Max value: {maxValue}
        <pre>{JSON.stringify(registers, null, 2)}</pre>
      </div>
    )
  }
}
