const userService = require('../services/userService')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
  try {
    const { roles, firstName, lastName, email, password } = req.body
    if (!roles || !firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Missing required information' })
    }
    const duplicate = await userService.getUserByEmail(email)
    if (duplicate) {
      return res
        .status(409)
        .json({ message: `User with email='${email}' already exists.` })
    }
    const newUser = await userService.createUser({
      ...req.body,
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, 10),
      roles,
    })
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id)
    if (user) {
      res.json(user)
    } else {
      res
        .status(404)
        .json({ message: `User with id='${req.params.id}' doesn't exist` })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getUserByEmail = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.query.email)
    if (user) {
      res.json(user)
    } else {
      res
        .status(404)
        .json({ message: `User with email='${req.query.email}' doesn't exist` })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateUserById = async (req, res) => {
  try {
    const updateResult = await userService.updateUserById(req.params.id, {
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    })
    if (updateResult && updateResult != 0) {
      res.status(204).json(updateResult)
    } else {
      res
        .status(404)
        .json({ message: `User with id='${req.params.id}' doesn't exist` })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const updateUserByEmail = async (req, res) => {
  try {
    const updateResult = await userService.updateUserByEmail(req.query.email, {
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    })
    if (updateResult && updateResult != 0) {
      res.status(204).json(updateResult)
    } else {
      res
        .status(404)
        .json({ message: `User with email='${req.query.email}' doesn't exist` })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteUserById = async (req, res) => {
  try {
    const deleteResult = await userService.deleteUserById(req.params.id)
    if (deleteResult) {
      res
        .status(204)
        .json({ message: `User with id='${req.params.id}' was deleted` })
    } else {
      res
        .status(404)
        .json({ message: `User with id='${req.params.id}' doesn't exist` })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const deleteUserByEmail = async (req, res) => {
  try {
    const deleteResult = await userService.deleteUserByEmail(req.query.email)
    if (deleteResult) {
      res
        .status(204)
        .json({ message: `User with email='${req.query.email}' was deleted` })
    } else {
      res
        .status(404)
        .json({ message: `User with email='${req.query.email}' doesn't exist` })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUserById,
  updateUserByEmail,
  deleteUserById,
  deleteUserByEmail,
}
