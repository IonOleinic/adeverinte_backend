const FRONT_URL = process.env.CLIENT_URL || 'http://localhost:3000'

const allowedOrigins = [FRONT_URL, 'http://127.0.0.1:3000']

module.exports = allowedOrigins
