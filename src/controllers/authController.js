const userService = require('../services/userService')
const bcrypt = require('bcrypt')
const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken')
const ROLES_LIST = require('../../config/rolesList')

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage'
)

async function verifyGoogleToken(idToken) {
  try {
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    const payload = ticket.getPayload()
    return { email: payload.email, profileImage: payload.picture }
  } catch (error) {
    console.error('Error verifying Google token:', error)
    throw new Error('Failed to verify Google token')
  }
}

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
      { UserInfo: { email: foundUser.email, roles: foundUser.roles } },
      process.env.ACCESS_TOKEN_SECRET || 'access',
      { expiresIn: process.env.ACCESS_TOKEN_LIFE || '20m' }
    )
    const refreshToken = jwt.sign(
      { UserInfo: { email: foundUser.email } },
      process.env.REFRESH_TOKEN_SECRET || 'refresh',
      { expiresIn: process.env.ACCESS_TOKEN_LIFE || '1d' }
    )
    foundUser.refreshToken = refreshToken
    await userService.updateUserByEmail(email, foundUser)
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    res.json({
      accessToken,
      roles: foundUser.roles,
      email: foundUser.email,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const handleGoogleLogin = async (req, res) => {
  const { tokens } = await oAuth2Client.getToken(req.body.code) // exchange code for tokens
  const { email, profileImage } = await verifyGoogleToken(tokens.id_token)
  const foundUser = await userService.getUserByEmail(email)
  if (!foundUser) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const accessToken = jwt.sign(
    { UserInfo: { email: foundUser.email, roles: foundUser.roles } },
    process.env.ACCESS_TOKEN_SECRET || 'access',
    { expiresIn: process.env.ACCESS_TOKEN_LIFE || '20m' }
  )
  const refreshToken = jwt.sign(
    { UserInfo: { email: foundUser.email } },
    process.env.REFRESH_TOKEN_SECRET || 'refresh',
    { expiresIn: process.env.ACCESS_TOKEN_LIFE || '1d' }
  )
  foundUser.refreshToken = refreshToken
  if (!foundUser.profileImage) foundUser.profileImage = profileImage
  await userService.updateUserByEmail(email, foundUser)
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })
  res.json({
    accessToken,
    roles: foundUser.roles,
    email: foundUser.email,
  })
}

const handleLogout = async (req, res) => {
  try {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)

    const refreshToken = req.cookies.jwt
    const foundUser = await userService.getUserByRefreshToken(refreshToken)
    res.clearCookie('jwt', {
      httpOnly: true,
    })
    if (!foundUser) {
      return res.sendStatus(204)
    }
    foundUser.refreshToken = null
    await userService.updateUserById(foundUser.id, foundUser)
    return res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllRoles = async (req, res) => {
  try {
    res.json(ROLES_LIST)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { handleLogin, handleGoogleLogin, handleLogout, getAllRoles }
