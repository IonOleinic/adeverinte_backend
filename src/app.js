require('dotenv').config()
require('./utils/cronJob')
const { createSuperUser } = require('./utils/utils')
const db = require('../database/database')
const server = require('./servers/expressServer')
const SERVER_PORT = process.env.SERVER_PORT || 5000

db.sync().then(async () => {
  console.log('Database connected')
  server.listen(SERVER_PORT, async () => {
    console.log(`Server listening on port ${SERVER_PORT}...`)
  })
  createSuperUser()
})
