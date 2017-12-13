import React, { Component } from 'react'
import charToAscii from 'char-to-ascii'
import query from 'lib/location'
import convertToBinary from 'binary-machine'
import convertToDecimal from 'bin-to-decimal'

export default class Day10 extends Component {
  render () {
    const withATwist = query.withatwist
    let input = query.input
    let inputs
    if (withATwist) {
      input = '1,2,3' // test
      inputs = charToAscii(input)
      inputs = inputs.concat([17, 31, 73, 47, 23])
      console.log(JSON.stringify(inputs))
      let newInputs = []
      for (let i = 0; i < 64; i++) {
        newInputs = newInputs.concat(inputs)
      }
      inputs = newInputs
    } else {
      inputs = input.split(',').map(inp => parseInt(inp, 10))
    }

    let nrOfElements = 256
    let elements = []
    let i = 0
    while (i < nrOfElements) {
      elements[i] = i
      i++
    }
    console.log('operationalLengths length:', inputs.length, ', elements length:', elements.length)
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
    console.log({hashedElements})

    let dense
    let denseBinary
    if (withATwist) {
      const fillWithChar = (text, char, length) => {
        for (let i = text.length; i < length; i++) {
          text = char + text
        }
        return text
      }

      const xor = (binA, binB, size) => {
        let xored = ''
        binA = fillWithChar(binA, '0', size)
        binB = fillWithChar(binB, '0', size)
        for (i = 0; i < size; i++) {
          if (binA[i] === binB[i]) {
            xored = xored + '0'
          } else {
            xored = xored + '1'
          }
        }
        return xored
      }
      window.xor = xor
      denseBinary = []
      dense = []
      let size = 16
      let block
      // hashedElements = [65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22] // Should give 64

      for (let i = 0; i < hashedElements.length; i++) {
        if (!(i % 16)) {
          block = fillWithChar('', '0', size)
        }

        let currentBinary = convertToBinary(hashedElements[i])
        // console.log(block, fillWithChar(currentBinary, '0', size), '(' + hashedElements[i] + ')')
        block = xor(block, currentBinary, size)
        // console.log('->', block, '(' + convertToDecimal(block) + ')')

        if (i !== 0 && !(i % 16)) {
          // console.log('pushes block: ' + block)
          denseBinary.push(block)
          dense.push(convertToDecimal(block))
        }
      }
      // console.log('pushes block: ' + block)
      denseBinary.push(block)
      dense.push(convertToDecimal(block))
      console.log({dense, denseBinary})
      const dec2hexString = (dec) => {
        // return '0x' + (dec + 0x10000).toString(16).substr(-4).toUpperCase()
        return (dec + 0x10000).toString(16).substr(-2)
      }
      window.dec2hexString = dec2hexString
      let hexadecAnswer = dense.map(dec2hexString).join('')
      console.log({hexadecAnswer})
    }

    let answer = hashedElements[0] * hashedElements[1]

    return (
      <div>
        <p>{`Aswer: ${answer}`}</p>
        <pre>{JSON.stringify(denseBinary, null, 2)}</pre>
        <pre>{JSON.stringify(dense, null, 2)}</pre>
        <pre>{JSON.stringify(hashedElements, null, 2)}</pre>
      </div>
    )
  }
}
