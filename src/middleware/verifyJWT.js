const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization
  if (!authHeader?.startsWith('Bearer '))
    return res
      .status(401)
      .json({ message: 'Missing access token or token is not Bearer type' })
  const accessToken = authHeader.split(' ')[1]
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET || 'access',
    (error, decoded) => {
      if (error) {
        return res.status(403).json({ message: 'Invalid access token' })
      }
      req.email = decoded.UserInfo?.email
      req.roles = decoded.UserInfo?.roles
      next()
    }
  )
}

module.exports = verifyJWT
