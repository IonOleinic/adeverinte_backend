const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization']
  if (!authHeader)
    return res.status(401).json({ message: 'Missing access token' })
  const accessToken = authHeader.split(' ')[1]
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: 'Invalid token' })
    }
    req.email = decoded.email
    next()
  })
}

module.exports = verifyJWT
