const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Sesion = sequelize.define('Sesion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ADM_Usuarios',
      key: 'id'
    }
  },
  token_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  tipo_usuario: {
    type: DataTypes.ENUM('admin', 'cliente'),
    allowNull: false
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  fecha_expiracion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  ip_address: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  user_agent: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'Sesiones',
  timestamps: false,
  indexes: [
    { fields: ['id_usuario'] },
    { fields: ['token_hash'] },
    { fields: ['fecha_expiracion'] },
    { fields: ['activo'] }
  ]
});

module.exports = Sesion;