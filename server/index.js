require('dotenv').config({
  path: '.env',
})
const express = require('express')
const nextJs = require('next')
const bodyParser = require('body-parser')

const port = process.env.LOCAL_PORT || 1337
const app = nextJs({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

const adventOfCodeService = require('../services/adventofcode')
;(async () => {
  try {
    await app.prepare()
    let server = express()
    server.use(bodyParser.json())

    server.use((req, res, next) => {
      res.removeHeader('X-Powered-By')
      next()
    })

    server.get('/api/adventOfCode', async (req, res) => {
      console.log('ok', req.url, req.query)
      const data = await adventOfCodeService.getStars(req.query)
      console.log('data', data)
      const responseJson = { healthChecked: true }
      res.json(responseJson)
    })

    server.get('*', async (req, res) => {
      return handle(req, res)
    })

    server = await server.listen(port)

    console.info(`AdventOfCode app listening on port ${port}!`)
  } catch (e) {
    cosnole.error(e)
    throw e
  }
})()
