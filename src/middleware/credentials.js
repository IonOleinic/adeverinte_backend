const allowedOrigins = require('../../config/allowedOrigins')

const credentials = (req, res, next) => {
  const origin = req.headers.origin
  if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
    // res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', true)
  }
  next()
}

module.exports = credentials
