import React, { Component } from 'react'
import {countValidByWord as countValidPassphrasesByWord, countValidByAnagram as countValidPassphrasesByAnagram} from 'lib/passphrase'
import http from 'services/http'
import query from 'lib/location'

const baseUrl = () => {
  return ''
}

export default class Day4 extends Component {
  constructor (props) {
    super(props)
    this.state = {ready: false}
  }

  componentWillMount () {
    try {
      http.get(baseUrl(), '/files/passphrases_day4.txt', {
        // queryParams: {client: site.getClient(), asset_ids: assetId}
      }).then(res => res.ok ? res.text() : Promise.resolve('')).then(data => {
        let passphrases = data.split('\n')
        let output
        if (query.byanagram) {
          output = countValidPassphrasesByAnagram(passphrases)
        } else {
          output = countValidPassphrasesByWord(passphrases)
        }
        this.setState({output, passphrases, ready: true})
      })
    } catch (err) {
      console.error('Failed:', err)
    }
  }

  render () {
    const {ready, passphrases, output} = this.state

    if (!ready) return null

    return (
      <div>
        <p>Input:</p>
        <p style={{color: 'grey', fontFamily: 'monospace'}} dangerouslySetInnerHTML={{__html: passphrases.map(row => row + '<br/>')}} />
        {/* <p>{`Offset: ${offset}`}</p> */}
        <p>{`Output: ${output}`}</p>
      </div>
    )
  }
}
