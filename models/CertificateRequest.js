// CertificateRequest Model.js
module.exports = (sequelize, DataTypes) => {
  const CertificateRequest = sequelize.define(
    'CertificateRequest',
    {
      studentEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      certificatePurpose: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accepted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null,
      },
      handledBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rejectedReason: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
    }
  )

  return CertificateRequest
}
