const express = require('express')
const cors = require('cors')
require('dotenv').config()

const connectDB = require('./config/db')

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Wine API Server Running 🍷')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
