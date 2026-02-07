const express = require('express')
const cors = require('cors')
require('dotenv').config()

const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./config/swagger')

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const wineRoutes = require('./routes/wineRoutes')

app.use('/api/wines', wineRoutes)
