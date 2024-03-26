// Certificate Model.js
module.exports = (sequelize, DataTypes) => {
  const CertificateOptions = sequelize.define(
    'CertificateOptions',
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.NOW,
      },
      NR: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dailyCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      mask: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false, // Disable automatic timestamps
    }
  )

  return CertificateOptions
}
