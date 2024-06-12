const useService = require('../services/userService')
const bcrypt = require('bcrypt')

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function createSuperUser() {
  const users = await useService.getAllUsers()
  if (users.length > 0) return

  await useService.createUser({
    email: 'ovidiu.gherman@usm.ro',
    password: await bcrypt.hash('password', 10),
    roles: [1929, 6748],
    firstName: 'Ovidiu',
    lastName: 'Gherman',
  })
}

module.exports = { sleep, createSuperUser }
