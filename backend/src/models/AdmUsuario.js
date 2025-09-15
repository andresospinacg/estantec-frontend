const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AdmUsuario = sequelize.define('AdmUsuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  contrasena: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('super_admin', 'manager_inventario', 'manager_ventas', 'manager_marketing'),
    allowNull: false,
    defaultValue: 'manager_inventario'
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  fecha_modificación: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'fecha_modificación'
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'ADM_Usuarios',
  timestamps: false,
  indexes: [
    { fields: ['usuario'] },
    { fields: ['correo'] },
    { fields: ['rol'] }
  ]
});

module.exports = AdmUsuario;