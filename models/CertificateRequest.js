// CertificateRequest Model.js
module.exports = (sequelize, DataTypes) => {
  const CertificateRequest = sequelize.define('CertificateRequest', {
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
      defaultValue: false,
    },
    handledBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rejectedReason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  })

  return CertificateRequest
}
