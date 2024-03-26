require('dotenv').config() // Import dotenv package to load environment variables
const db = require('../database/database')
const server = require('./servers/expressServer')

db.sync().then(async () => {
  console.log('Database connected')
  server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on port ${process.env.SERVER_PORT}...`)
  })
})
