import React, { Component } from 'react'
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

        let nrOfPipesToZero = relatedPipes.filter((elem, pos, arr) => arr.indexOf(elem) === pos).length

        const reduceAgregatedPipes = () => {
          let reducedPipes = {}
          Object.keys(agregatedPipes).map(parent => {
            if (agregatedPipes[parent].length > 0) {
              reducedPipes[parent] = agregatedPipes[parent]
            }
          })
          agregatedPipes = reducedPipes
        }

        let nrOfGroups = 1  // the '0' group above :)
        let hasMoreGroups = true
        let guard = 0
        while (hasMoreGroups && guard < 10000) {
          guard++
          reduceAgregatedPipes()

          let parents = Object.keys(agregatedPipes)
          if (parents.length > 0) {
            nrOfGroups++
            parent = parents.pop()
            getPipesToParent(parent)
          } else {
            hasMoreGroups = false
          }
        }
        this.setState({agregatedPipes, nrOfPipesToZero, nrOfGroups, ready: true})
      })
    } catch (err) {
      console.error('Failed:', err)
    }
  }

  render () {
    const {ready, agregatedPipes, nrOfGroups, nrOfPipesToZero} = this.state

    if (!ready) return null

    return (
      <div>
        ==== nrOfPipesToZero: {nrOfPipesToZero}, nrOfGroups: {nrOfGroups} ====
        <pre>{JSON.stringify(agregatedPipes, null, 2)}</pre>
      </div>
    )
  }
}
