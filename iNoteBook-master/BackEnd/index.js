const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors')


connectToMongo();

const app = express()
app.use(express.json()) 
app.use(cors())

app.get('/',  (req, res) => {
  res.send('Hello World this is krishna')
})

app.get('/about',  (req, res) => {
  res.send('this app is all about practise ')
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(5000)