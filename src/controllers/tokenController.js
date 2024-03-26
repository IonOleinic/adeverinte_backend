const userService = require('../services/userService')
const jwt = require('jsonwebtoken')

const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies
    if (!cookies?.jwt) {
      return res
        .status(401)
        .json({ message: 'Missing refresh token or missing cookies' })
    }
    const refreshToken = req.cookies.jwt
    const foundUser = await userService.getUserByRefreshToken(refreshToken)
    if (!foundUser) {
      return res.status(403).json({ message: 'Invalid refresh token' })
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        if (error || decoded.email !== foundUser.email) {
          return res.status(403).json({
            message: 'Invalid refresh token or refresh token has expired.',
          })
        }
        const accessToken = jwt.sign(
          { email: foundUser.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.ACCESS_TOKEN_LIFE }
        )
        res.json({ accessToken })
      }
    )
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { handleRefreshToken }
