const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()

app.use(express.static('public'))

app.options('*', cors())

// app.get('/', (req, res) => {
//   res.send('Hello world')
// })

app.listen(3000, () => {
  console.log('Express is listening to http://localhost:3000')
})

app.get('*', (req, res) => {
  console.log('Serving request: ', req.url)
  // res.setHeader('Cache-Control', 'public, max-age=120')
  fs.readFile(path.resolve(__dirname, './', 'index.html'), {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      console.log('path.resolve error: ', err)
      res.send(500)
    } else {
      res.send(data)
      // res.send(data
      //   .replace('<title>Köp C More</title>', `<title>${pageTitle(req)}</title>`)
      //   .replace('__CONFIG_GETS_INSERTED_HERE__', JSON.stringify(configVariables(process.env))))
    }
  })
})
