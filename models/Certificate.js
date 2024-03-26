// Certificate Model.js
module.exports = (sequelize, DataTypes) => {
  const Certificate = sequelize.define('Certificate', {
    registrationNr: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    studentEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    certificatePurpose: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  return Certificate
}
