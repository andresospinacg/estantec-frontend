const { verifyToken } = require('../utils/jwt');
const { AdmUsuario } = require('../models');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        error: 'Acceso denegado',
        message: 'Token de autenticación requerido'
      });
    }

    const decoded = verifyToken(token);

    // Verify user still exists and is active
    const user = await AdmUsuario.findByPk(decoded.id);
    if (!user || !user.activo) {
      return res.status(401).json({
        error: 'Acceso denegado',
        message: 'Usuario no encontrado o inactivo'
      });
    }

    req.user = {
      id: user.id,
      usuario: user.usuario,
      correo: user.correo,
      rol: user.rol
    };

    next();
  } catch (error) {
    return res.status(403).json({
      error: 'Token inválido',
      message: error.message
    });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Acceso denegado',
        message: 'Usuario no autenticado'
      });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({
        error: 'Acceso denegado',
        message: 'No tienes permisos para realizar esta acción'
      });
    }

    next();
  };
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = verifyToken(token);
      const user = await AdmUsuario.findByPk(decoded.id);

      if (user && user.activo) {
        req.user = {
          id: user.id,
          usuario: user.usuario,
          correo: user.correo,
          rol: user.rol
        };
      }
    }

    next();
  } catch (error) {
    // Continue without authentication if token is invalid
    next();
  }
};

module.exports = {
  authenticateToken,
  authorizeRoles,
  optionalAuth
};