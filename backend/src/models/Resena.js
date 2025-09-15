const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Resena = sequelize.define('Resena', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_dispositivo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Dispositivos',
      key: 'id'
    }
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuarios',
      key: 'id'
    }
  },
  calificacion: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  titulo: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'Resenas',
  timestamps: false,
  indexes: [
    { fields: ['id_dispositivo'] },
    { fields: ['id_usuario'] },
    { fields: ['calificacion'] },
    { fields: ['fecha_creacion'] }
  ],
  // Unique constraint for one review per user per device
  uniqueKeys: {
    unique_usuario_dispositivo: {
      fields: ['id_usuario', 'id_dispositivo']
    }
  }
});

module.exports = Resena;