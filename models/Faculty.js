// Faculty Model.js
module.exports = (sequelize, DataTypes) => {
  const Faculty = sequelize.define('Faculty', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    academicYear: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deanName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chiefSecretarName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  return Faculty
}
