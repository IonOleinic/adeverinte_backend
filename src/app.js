require('dotenv').config() // Import dotenv package to load environment variables
const db = require('../database/database')
const server = require('./servers/expressServer')
const SERVER_PORT = process.env.SERVER_PORT || 5000

db.sync().then(async () => {
  console.log('Database connected')
  server.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}...`)
  })
})
