import React, { Component } from 'react'
import {followTrail, furthestAwayInTrail} from 'lib/hex_trail'
import http from 'services/http'

const baseUrl = () => {
  return ''
}

export default class Day11 extends Component {
  constructor (props) {
    super(props)
    this.state = {ready: false}
  }

  componentWillMount () {
    try {
      http.get(baseUrl(), '/files/hexed.txt', {}).then(res => res.ok ? res.text() : Promise.resolve('')).then(data => {
        let trails = data.split('\n')
        let answers = trails.map(followTrail)

        let furthestAwayAnswers = trails.map(furthestAwayInTrail)
        this.setState({answers, furthestAwayAnswers, ready: true})
      })
    } catch (err) {
      console.error('Failed:', err)
    }
  }

  render () {
    const {ready, answers, furthestAwayAnswers} = this.state

    if (!ready) return null

    return (
      <div>
        {answers.map((answer, i) => {
          let {trail, organizedTrail, reducedTrail, nrOfEastSideSteps, nrOfNorthSteps, stepsAway} = answer
          return (
            <div>
              ==== nrOfEastSideSteps: {nrOfEastSideSteps}, nrOfNorthSteps: {nrOfNorthSteps}, Steps Away: {stepsAway}, furthestAwayAnswers: {furthestAwayAnswers[i]} ====
              <pre>{JSON.stringify(reducedTrail, null, 2)}</pre>
              <pre>{JSON.stringify(organizedTrail, null, 2)}</pre>
              <pre>{JSON.stringify(trail, null, 2)}</pre>
            </div>
          )
        })
      }
      </div>
    )
  }
}
