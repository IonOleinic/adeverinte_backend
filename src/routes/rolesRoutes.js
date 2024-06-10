const rolesRoutes = require('express').Router()
const ROLES_LIST = require('../../config/rolesList')

rolesRoutes.get('/roles', (req, res) => {
  res.json(ROLES_LIST)
})

module.exports = rolesRoutes
