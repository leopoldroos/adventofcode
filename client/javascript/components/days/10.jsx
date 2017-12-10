import React, { Component } from 'react'
import query from 'lib/location'

export default class Day10 extends Component {
  render () {
    const input = query.input
    const inputs = input.split(',').map(inp => parseInt(inp, 10))
    let nrOfElements = 5
    let elements = []
    let i = 0
    while (i < nrOfElements) {
      elements[i] = i
      i++
    }
    console.log(elements)
    let hashedElements = elements.slice(0)

    let skipSize = 0
    let currentPosition = 0
    for (let i = 0; i < inputs.length; i++) {
      console.log('---------------')
      let operationalLength = inputs[i]
      console.log({currentPosition, skipSize, hashedElements: JSON.stringify(hashedElements), operationalLength})

      let subElements = []
      if ((currentPosition + operationalLength) > hashedElements.length) {
        let overFlow = currentPosition + operationalLength - hashedElements.length
        subElements = hashedElements.slice(currentPosition).concat(hashedElements.slice(0, overFlow))
        subElements = subElements.reverse()
        console.log(JSON.stringify(subElements.slice(overFlow)), JSON.stringify(hashedElements.slice(overFlow, currentPosition)), JSON.stringify(subElements.slice(0, subElements.length - overFlow)))
        hashedElements = subElements.slice(overFlow).concat(hashedElements.slice(overFlow, currentPosition)).concat(subElements.slice(0, subElements.length - overFlow))
      } else {
        subElements = hashedElements.slice(currentPosition, operationalLength)
        subElements = subElements.reverse()
        hashedElements = hashedElements.slice(0, currentPosition).concat(subElements, hashedElements.slice(currentPosition + operationalLength))
      }

      console.log('hashedElements = ', JSON.stringify(hashedElements))

      currentPosition += operationalLength + skipSize
      skipSize++
    }

    let answer = hashedElements[0] * hashedElements[1]

    return (
      <div>
        <p>{`Aswer: ${answer}`}</p>
        <pre>{JSON.stringify(elements, null, 2)}</pre>
        <pre>{JSON.stringify(hashedElements, null, 2)}</pre>
      </div>
    )
  }
}
