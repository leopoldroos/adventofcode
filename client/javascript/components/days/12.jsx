import React, { Component } from 'react'
import {followTrail, furthestAwayInTrail} from 'lib/hex_trail'
import http from 'services/http'

const baseUrl = () => {
  return ''
}

export default class Day12 extends Component {
  constructor (props) {
    super(props)
    this.state = {ready: false}
  }

  componentWillMount () {
    try {
      http.get(baseUrl(), '/files/digital_plumber.txt', {}).then(res => res.ok ? res.text() : Promise.resolve('')).then(data => {
        let pipes = data.split('\n')
        let agregatedPipes = {}
        pipes.forEach(pipe => {
          let parentChildren = pipe.split(' <-> ')
          let parent = parentChildren[0]
          let children = parentChildren[1].split(',').map(child => child.trim())
          if (!agregatedPipes[parent]) {
            agregatedPipes[parent] = []
          }
          agregatedPipes[parent] = agregatedPipes[parent].concat(children)
        })

        const getPipesToParent = (parent) => {
          if (agregatedPipes[parent].length) {
            relatedPipes = relatedPipes.concat(agregatedPipes[parent])
            let childPipes = agregatedPipes[parent].slice(0)
            agregatedPipes[parent] = []
            childPipes.map(getPipesToParent)
          }
        }

        let relatedPipes = []
        let parent = '0'
        getPipesToParent(parent)

        relatedPipes = relatedPipes.filter((elem, pos, arr) => arr.indexOf(elem) === pos)
        let nrOfPipesToZero = relatedPipes.length
        console.log({relatedPipes, nrOfPipesToZero})
        // let nrOfPipesToZero = Object.values(agregatedPipes).filter(children => children.includes('0')).length

        this.setState({agregatedPipes, nrOfPipesToZero, ready: true})
      })
    } catch (err) {
      console.error('Failed:', err)
    }
  }

  render () {
    const {ready, agregatedPipes, nrOfPipesToZero} = this.state

    if (!ready) return null

    return (
      <div>
        ==== nrOfPipesToZero: {nrOfPipesToZero} ====
        <pre>{JSON.stringify(agregatedPipes, null, 2)}</pre>
      </div>
    )
  }
}
