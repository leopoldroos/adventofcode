import React, { Component } from 'react'
import {maxMin as checksumByMaxMin, evenlyDevidend as checksumByEvenlyDevidend} from '@/helpers/checksum'
import http from 'services/serverside'
import query from '@/helpers/location'

const baseUrl = () => {
  return ''
}

export default class Day2 extends Component {
  constructor (props) {
    super(props)
    this.state = {ready: false}
  }

  componentWillMount () {
    try {
      http.get(baseUrl(), '/files/spreadsheet_day2.tsv', {
        // queryParams: {client: site.getClient(), asset_ids: assetId}
      }).then(res => res.ok ? res.text() : Promise.resolve('')).then(data => {
        let spreadSheet = data.split('\n')
        spreadSheet = spreadSheet.map(row => row.split('\t').map(item => parseInt(item, 10)))
        let output
        if (query.byevenlydevidend) {
          output = checksumByEvenlyDevidend(spreadSheet)
        } else {
          output = checksumByMaxMin(spreadSheet)
        }
        this.setState({output, spreadSheet, ready: true})
      })
    } catch (err) {
      console.error('Failed:', err)
    }
  }

  render () {
    const {ready, spreadSheet, output} = this.state

    if (!ready) return null

    return (
      <div>
        <p>Input:</p>
        <p style={{color: 'grey', fontFamily: 'monospace'}} dangerouslySetInnerHTML={{__html: spreadSheet.map(row => row + '<br/>')}} />
        {/* <p>{`Offset: ${offset}`}</p> */}
        <p>{`Output: ${output}`}</p>
      </div>
    )
  }
}
