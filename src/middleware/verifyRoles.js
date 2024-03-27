const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles)
      return res.status(401).json({ message: 'Roles are required' })
    const rollesArray = [...allowedRoles]
    const result = req.roles
      .map((role) => rollesArray.includes(role))
      .find((val) => val === true)
    if (!result)
      return res
        .status(401)
        .json({ message: 'You do not have permission to access this resource' })
    next()
  }
}

module.exports = verifyRoles
