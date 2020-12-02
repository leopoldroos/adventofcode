import React, { Component } from 'react'
import {toBinary, toDecimal, fillWithChar} from '@/helpers/converters'

class Generator {
  constructor (props) {
    this.props = props
    this.state = {
      currentValue: props.initialValue
    }
    // this.generateValue = this.generateValue.bind(this)
    // EventEmitter.on('reset', this.onReset)
  }

  generateValue () {
    let newValue = (this.state.currentValue * this.props.factor) % this.props.dividing
    this.state.currentValue = newValue
    return newValue
  }

  getCurrentValueAsBinary () {
    return fillWithChar(toBinary(this.state.currentValue), '0', 32)
  }
}

export default class Day15 extends Component {
  constructor (props) {
    super(props)
    this.state = {ready: false}
  }

  componentWillMount () {
    const generatorA = new Generator({factor: 16807, dividing: 2147483647, initialValue: 65}) // start: 512
    const generatorB = new Generator({factor: 48271, dividing: 2147483647, initialValue: 8921}) // start: 191

    for (let i = 0; i < 5; i++) {
      generatorA.generateValue()
      generatorB.generateValue()

      let binA = generatorA.getCurrentValueAsBinary()
      let binB = generatorB.getCurrentValueAsBinary()
      if (binA.substring(16) === binB.substring(16)) {
        console.log('MATCH!')
      } else {
        console.log('no match...', binA, binB, binA.substring(16), binB.substring(16))
      }
    }

    // EventEmitter.on('caught', (severity) => {
    let answer = 1337
    this.setState({answer, ready: true})
  }

  render () {
    const {answer, ready} = this.state

    if (!ready) return null

    return (
      <div>
        ==== answer: {answer} ====
      </div>
    )
  }
}
