const { User } = require('../../models')

async function createUser(userData) {
  try {
    return await User.create(userData)
  } catch (error) {
    throw new Error(`Error while creating user: ` + error.message)
  }
}

async function getAllUsers() {
  try {
    return (await User.findAll()).map((user) => user.dataValues)
  } catch (error) {
    throw new Error(`Error while retrieving all users: ` + error.message)
  }
}

async function getUserById(id) {
  try {
    return (await User.findOne({ where: { id } }))?.dataValues
  } catch (error) {
    throw new Error(
      `Error while retrieving user with id='${id}': ` + error.message
    )
  }
}

async function getUserByEmail(email) {
  try {
    return (await User.findOne({ where: { email } }))?.dataValues
  } catch (error) {
    throw new Error(
      `Error while retrieving user with email='${email}': ` + error.message
    )
  }
}
async function getUserByRefreshToken(refreshToken) {
  try {
    return (await User.findOne({ where: { refreshToken } }))?.dataValues
  } catch (error) {
    throw new Error(
      `Error while retrieving user with refreshToken='${refreshToken}': ` +
        error.message
    )
  }
}

async function deleteUserById(id) {
  try {
    return await User.destroy({ where: { id } })
  } catch (error) {
    throw new Error(
      `Error while deleting user with id='${id}': ` + error.message
    )
  }
}

async function deleteUserByEmail(email) {
  try {
    await User.destroy({ where: { email } })
  } catch (error) {
    throw new Error(
      `Error while deleting user with email='${email}': ` + error.message
    )
  }
}

async function updateUserById(id, userData) {
  try {
    return await User.update(userData, { where: { id } })
  } catch (error) {
    throw new Error(
      `Error while updating user with id='${id}': ` + error.message
    )
  }
}

async function updateUserByEmail(email, userData) {
  try {
    return await User.update(userData, { where: { email } })
  } catch (error) {
    throw new Error(
      `Error while updating user with email='${email}': ` + error.message
    )
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByRefreshToken,
  deleteUserById,
  deleteUserByEmail,
  updateUserById,
  updateUserByEmail,
}
