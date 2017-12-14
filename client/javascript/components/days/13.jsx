import React, { Component } from 'react'
import http from 'services/http'
const EventEmitter3 = require('eventemitter3')
const EventEmitter = new EventEmitter3()

const baseUrl = () => {
  return ''
}

class Polygon {
  constructor (height, width) {
    this.height = height
    this.width = width
  }

  get area () {
    return this.calcArea()
  }

  calcArea () {
    return this.height * this.width
  }
}

class Scanner {
  constructor (props) {
    this.state = {
      layer: parseInt(props.layer, 10),
      depth: parseInt(props.depth, 10),
      index: 0,
      direction: 1
    }

    this.onMovesToLayer = this.onMovesToLayer.bind(this)
    this.onTick = this.onTick.bind(this)

    EventEmitter.on('movesToLayer', this.onMovesToLayer)
    EventEmitter.on('tick', this.onTick)
  }

  onTick () {
    let {index, direction, depth} = this.state
    if (index === 0) {
      direction = 1
    } else if (index === (depth - 1)) {
      direction = -1
    }
    this.state.index = index + direction
    this.state.direction = direction
  }

  onMovesToLayer (currentLayer) {
    let {layer, index, depth} = this.state
    if (currentLayer === layer && index === 0) {
      EventEmitter.emit('caught', layer * depth)
      console.log('CAUGHT!!!', layer * depth)
    }
  }
}

export default class Day13 extends Component {
  constructor (props) {
    super(props)
    this.state = {ready: false}
  }

  componentWillMount () {
    try {
      http.get(baseUrl(), '/files/packet_scanner.txt', {}).then(res => res.ok ? res.text() : Promise.resolve('')).then(data => {
        let layersWithDepth = data.split('\n')
        let scanners = []
        let layer
        layersWithDepth.forEach(layerWithDepth => {
          let layerAndDepth = layerWithDepth.split(': ')
          layer = layerAndDepth[0]
          let depth = layerAndDepth[1]
          scanners.push(new Scanner({layer, depth}))
        })

        let totalSeverity = 0
        EventEmitter.on('caught', (severity) => {
          totalSeverity += severity
        })
        setTimeout(() => {
          for (let i = 0; i < layer; i++) {
            EventEmitter.emit('movesToLayer', i)
            EventEmitter.emit('tick')
          }
          this.setState({layersWithDepth, totalSeverity, ready: true})
        }, 1000)
      })
    } catch (err) {
      console.error('Failed:', err)
    }
  }

  render () {
    const {ready, layersWithDepth, totalSeverity} = this.state

    if (!ready) return null

    return (
      <div>
        ==== totalSeverity: {totalSeverity} ====
        <pre>{JSON.stringify(layersWithDepth, null, 2)}</pre>
      </div>
    )
  }
}
