const { sequelize } = require('../config/database');

// Import all models
const AdmUsuario = require('./AdmUsuario');
const Marca = require('./Marca');
const Categoria = require('./Categoria');
const Dispositivo = require('./Dispositivo');
const Usuario = require('./Usuario');
const Resena = require('./Resena');
const Sesion = require('./Sesion');

// Define associations
// Dispositivo belongs to Marca and Categoria
Dispositivo.belongsTo(Marca, { foreignKey: 'id_marca', as: 'marca' });
Dispositivo.belongsTo(Categoria, { foreignKey: 'id_categoria', as: 'categoria' });

// Marca has many Dispositivos
Marca.hasMany(Dispositivo, { foreignKey: 'id_marca', as: 'dispositivos' });

// Categoria has many Dispositivos
Categoria.hasMany(Dispositivo, { foreignKey: 'id_categoria', as: 'dispositivos' });

// Resena belongs to Dispositivo and Usuario
Resena.belongsTo(Dispositivo, { foreignKey: 'id_dispositivo', as: 'dispositivo' });
Resena.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

// Dispositivo has many Resenas
Dispositivo.hasMany(Resena, { foreignKey: 'id_dispositivo', as: 'resenas' });

// Usuario has many Resenas
Usuario.hasMany(Resena, { foreignKey: 'id_usuario', as: 'resenas' });

// Sesion belongs to AdmUsuario
Sesion.belongsTo(AdmUsuario, { foreignKey: 'id_usuario', as: 'usuario' });

// AdmUsuario has many Sesiones
AdmUsuario.hasMany(Sesion, { foreignKey: 'id_usuario', as: 'sesiones' });

// Export all models
module.exports = {
  sequelize,
  AdmUsuario,
  Marca,
  Categoria,
  Dispositivo,
  Usuario,
  Resena,
  Sesion
};