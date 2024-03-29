const db = require('../models')
// const { Student, Certificate } = require('../models')

// Certificate.belongsTo(Student, {
//   foreignKey: 'studentEmail',
//   targetKey: 'email',
//   as: 'student',
// })

module.exports = db.sequelize
