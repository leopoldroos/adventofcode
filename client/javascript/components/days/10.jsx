import React, { Component } from 'react'
import charToAscii from 'char-to-ascii'
import query from 'lib/location'
import {converter as decimalToBinaryConverter} from 'decimal-to-binary-converter'

export default class Day10 extends Component {
  render () {
    const withATwist = query.withatwist
    const input = query.input
    let inputs = input.split(',').map(inp => parseInt(inp, 10))

    if (withATwist) {
      inputs = inputs.map(input => charToAscii)
      inputs = inputs.concat([17, 31, 73, 47, 23])
      let newInputs = []
      for (let i = 0; i < 63; i++) { // THINK THIS THROUGH!!!
        console.log({newInputs})
        newInputs = newInputs.concat(inputs)
      }
    }

    let nrOfElements = 256
    let elements = []
    let i = 0
    while (i < nrOfElements) {
      elements[i] = i
      i++
    }
    console.log('operationalLengths:', inputs, ', elements:', elements)
    let hashedElements = elements.slice(0)

    let skipSize = 0
    let currentPosition = 0
    for (let i = 0; i < inputs.length; i++) {
      // console.log('---------------')

      let operationalLength = inputs[i]
      // console.log({currentPosition, skipSize, hashedElements: JSON.stringify(hashedElements), operationalLength})

      let subElements = []
      if ((currentPosition + operationalLength) > hashedElements.length) {
        let overFlow = currentPosition + operationalLength - hashedElements.length
        subElements = hashedElements.slice(currentPosition).concat(hashedElements.slice(0, overFlow))
        // console.log('subelements:' + JSON.stringify(subElements))
        subElements = subElements.reverse()
        // console.log('reversed subelements:' + JSON.stringify(subElements))
        // console.log('overflow: ' + overFlow,
        //   'startpart: ' + JSON.stringify(subElements.slice(subElements.length - overFlow)),
        //   'middle: ' + JSON.stringify(hashedElements.slice(overFlow, elements.length - subElements.length + overFlow)),
        //   'endpart: ' + JSON.stringify(subElements.slice(0, subElements.length - overFlow)))
        hashedElements = subElements.slice(subElements.length - overFlow).concat(hashedElements.slice(overFlow, elements.length - subElements.length + overFlow)).concat(subElements.slice(0, subElements.length - overFlow))
      } else {
        subElements = hashedElements.slice(currentPosition, currentPosition + operationalLength)
        subElements = subElements.reverse()
        // console.log('no overflow',
        //   'startpart: ' + JSON.stringify(hashedElements.slice(0, currentPosition)),
        //   'sub: ' + JSON.stringify(subElements),
        //   'endpart: ' + JSON.stringify(hashedElements.slice(currentPosition + operationalLength)))
        hashedElements = hashedElements.slice(0, currentPosition).concat(subElements, hashedElements.slice(currentPosition + operationalLength))
      }

      // console.log('hashedElements = ', JSON.stringify(hashedElements))

      currentPosition = (currentPosition + operationalLength + skipSize) % elements.length
      skipSize++
      // console.log('currentpos is now set to: (previousCurrentPos + operationalLength=' + operationalLength + ' + skipSize=' + (skipSize - 1) + ') %' + elements.length + ' = ' + currentPosition + ' and skipSize is set to ' + skipSize)
    }
    // console.log({hashedElements})

    let dense
    if (withATwist) {
      const xor = (binA, binB, size) => {
        let xored = ''
        if (binA.length < size) {
          // TODO FILL UP WITH '0'!!!!!
        }
        if (binB.length < size) {
          // TODO FILL UP WITH '0'!!!!!
        }
        for (i = 0; i < size; i++) {
          if ((binA[i] === '1' && binB[i] === '1') || (binA[i] === '0' && binB[i] === '1') || (binA[i] === '1' && binB[i] === '0')) {
            xored = xored + '1'
          } else {
            xored = xored + '0'
          }
        }
        return xored
      }

      dense = []
      let block
      for (let i = 0; i < hashedElements.length - 1; i++) {
        let currentBinary = decimalToBinaryConverter(hashedElements[i])
        let nextBinary = decimalToBinaryConverter(hashedElements[i + 1])
        if (!i % 16) {
          console.log('pushes block: ' + block)
          dense.push(block)
          block = currentBinary
        }
        block = xor(block, nextBinary, 16)
      }
    }

    let answer = hashedElements[0] * hashedElements[1]

    return (
      <div>
        <p>{`Aswer: ${answer}`}</p>
        <pre>{JSON.stringify(dense, null, 2)}</pre>
        <pre>{JSON.stringify(elements, null, 2)}</pre>
        <pre>{JSON.stringify(hashedElements, null, 2)}</pre>
      </div>
    )
  }
}
