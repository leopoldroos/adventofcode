import express from 'express'

const app = express()

app.use(express.static('generic'))

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(3000, () => {
  console.log('Express is listening to http://localhost:3000')
})
