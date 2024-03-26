const userService = require('../services/userService')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing required information' })
    }
    const foundUser = await userService.getUserByEmail(email)
    if (!foundUser) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const isValid = await bcrypt.compare(password, foundUser.password)
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const accessToken = jwt.sign(
      { email: foundUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_LIFE }
    )
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_LIFE }
    )
    await userService.updateUserByEmail(email, { ...foundUser, refreshToken })
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 20 * 60 * 1000, // 20 minutes
    })
    res.json({ accessToken })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const handleLogout = async (req, res) => {
  try {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)

    const refreshToken = req.cookies.jwt
    const foundUser = await userService.getUserByRefreshToken(refreshToken)
    res.clearCookie('jwt', {
      httpOnly: true,
      maxAge: 20 * 60 * 1000, // 20 minutes
    })
    if (!foundUser) {
      return res.sendStatus(204)
    }
    await userService.updateUserById(foundUser.id, {
      ...foundUser,
      refreshToken: null,
    })
    return res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { handleLogin, handleLogout }
