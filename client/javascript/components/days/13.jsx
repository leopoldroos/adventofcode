import React, { Component } from 'react'
import http from 'services/http'
const EventEmitter3 = require('eventemitter3')
const EventEmitter = new EventEmitter3()

const baseUrl = () => {
  return ''
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
    this.onReset = this.onReset.bind(this)

    EventEmitter.on('movesToLayer', this.onMovesToLayer)
    EventEmitter.on('tick', this.onTick)
    EventEmitter.on('reset', this.onReset)
  }

  onReset () {
    // if (this.state.layer === 0) console.log('RESETS')
    this.state.index = 0
    this.state.direction = 1
  }

  onTick () {
    let {layer, index, direction, depth} = this.state
    // if (layer === 0) console.log('on tick', index)
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
    // if (layer === 0) console.log('on move to layer', currentLayer, index, (currentLayer === layer && 'CAUGHT'))
    if (currentLayer === layer && index === 0) {
      EventEmitter.emit('caught', layer * depth)
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
        for (let i = 0; i < layer; i++) {
          EventEmitter.emit('movesToLayer', i)
          EventEmitter.emit('tick')
        }
        console.log({totalSeverity})
        this.setState({totalSeverity}, () => {
          let homeRun = false
          let delay = 0
          let tick = 0
          totalSeverity = 0
          EventEmitter.emit('reset')
          while (!homeRun) {
            if (tick >= delay) {
              for (let i = 0; i < layer; i++) {
                EventEmitter.emit('movesToLayer', i)
                EventEmitter.emit('tick')

                if (totalSeverity > 0) {
                  console.log('CAUGHT!', JSON.stringify({delay, i}), totalSeverity)
                  break
                }
              }
              if (totalSeverity === 0) {
                homeRun = true
              } else {
                totalSeverity = 0
                tick = 0
                delay++
                EventEmitter.emit('reset')
              }
            } else {
              EventEmitter.emit('tick')
              tick++
            }
            if (delay > 5000) homeRun = true
          }
// inte 1969
          this.setState({layersWithDepth, delay, ready: true})
        })
      })
    } catch (err) {
      console.error('Failed:', err)
    }
  }

  render () {
    const {ready, layersWithDepth, totalSeverity, delay} = this.state

    if (!ready) return null

    return (
      <div>
        ==== totalSeverity: {totalSeverity}, delay: {delay} ====
        <pre>{JSON.stringify(layersWithDepth, null, 2)}</pre>
      </div>
    )
  }
}
