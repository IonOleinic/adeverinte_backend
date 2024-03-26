const userService = require('../services/userService')

//use instead register function from loginController
const createUser = async (req, res) => {
  try {
    await userService.createUser(req.body)
    res.sendStatus(201)
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
    const updateResult = await userService.updateUserById(
      req.params.id,
      req.body
    )
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
    const updateResult = await userService.updateUserByEmail(
      req.query.email,
      req.body
    )
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
