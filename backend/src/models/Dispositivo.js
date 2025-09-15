const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Dispositivo = sequelize.define('Dispositivo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nomre: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  id_marca: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Marcas',
      key: 'id'
    }
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categorias',
      key: 'id'
    }
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  especificaciones: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  url_imagen: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  imagenes_galeria: {
    type: DataTypes.JSON,
    allowNull: true
  },
  fecha_actualizacion: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  cantidad_stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  estado_activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  calificacion_promedio: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0.00
  },
  total_reseñas: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Dispositivos',
  timestamps: false,
  indexes: [
    { fields: ['id_marca'] },
    { fields: ['id_categoria'] },
    { fields: ['precio'] },
    { fields: ['estado_activo'] },
    { fields: ['calificacion_promedio'] },
    { fields: ['fecha_actualizacion'] }
  ]
});

module.exports = Dispositivo;