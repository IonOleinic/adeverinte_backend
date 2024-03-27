const rolesRouter = require('express').Router()
const ROLES_LIST = require('../../config/rolesList')

rolesRouter.get('/roles', (req, res) => {
  res.json(ROLES_LIST)
})

module.exports = rolesRouter
