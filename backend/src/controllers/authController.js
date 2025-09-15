const jwt = require('jsonwebtoken');
const { AdmUsuario, Sesion } = require('../models');
const { generateToken, generateRefreshToken, hashPassword, comparePassword } = require('../utils/jwt');
const crypto = require('crypto');

const login = async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    // Validate input
    if (!usuario || !contrasena) {
      return res.status(400).json({
        error: 'Datos incompletos',
        message: 'Usuario y contraseña son requeridos'
      });
    }

    // Find user
    console.log('Looking for user:', usuario);
    const user = await AdmUsuario.findOne({
      where: {
        usuario: usuario,
        activo: true
      }
    });

    console.log('User found:', user ? 'YES' : 'NO');
    if (user) {
      console.log('User data:', { id: user.id, usuario: user.usuario, contrasena: user.contrasena });
    }

    if (!user) {
      return res.status(401).json({
        error: 'Credenciales inválidas',
        message: 'Usuario o contraseña incorrectos'
      });
    }

    // Verify password (temporarily using plain text comparison for testing)
    // TODO: In production, use bcrypt hashed passwords
    const isValidPassword = contrasena === user.contrasena;
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Credenciales inválidas',
        message: 'Usuario o contraseña incorrectos'
      });
    }

    // Generate tokens
    const tokenPayload = {
      id: user.id,
      usuario: user.usuario,
      rol: user.rol
    };

    const accessToken = generateToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Create session record
    const tokenHash = crypto.createHash('sha256').update(accessToken).digest('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await Sesion.create({
      id_usuario: user.id,
      token_hash: tokenHash,
      tipo_usuario: 'admin',
      fecha_expiracion: expiresAt,
      ip_address: req.ip,
      user_agent: req.get('User-Agent'),
      activo: true
    });

    // Update last login (commented out since fecha_modificacion field doesn't exist in database)
    // await user.update({
    //   fecha_modificacion: new Date()
    // });

    res.json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        usuario: user.usuario,
        correo: user.correo,
        rol: user.rol
      },
      tokens: {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: 24 * 60 * 60 // 24 hours in seconds
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al procesar la solicitud de inicio de sesión'
    });
  }
};

const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      // Hash the token to find and deactivate the session
      const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

      await Sesion.update(
        { activo: false },
        { where: { token_hash: tokenHash } }
      );
    }

    res.json({
      message: 'Sesión cerrada exitosamente'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al cerrar la sesión'
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({
        error: 'Token requerido',
        message: 'Refresh token es requerido'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET);

    // Find user
    const user = await AdmUsuario.findByPk(decoded.id);
    if (!user || !user.activo) {
      return res.status(401).json({
        error: 'Usuario no encontrado',
        message: 'El usuario ya no existe o está inactivo'
      });
    }

    // Generate new tokens
    const tokenPayload = {
      id: user.id,
      usuario: user.usuario,
      rol: user.rol
    };

    const newAccessToken = generateToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    res.json({
      message: 'Token renovado exitosamente',
      tokens: {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        expires_in: 24 * 60 * 60
      }
    });

  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({
      error: 'Token inválido',
      message: 'El refresh token es inválido o ha expirado'
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await AdmUsuario.findByPk(req.user.id, {
      attributes: ['id', 'usuario', 'correo', 'rol', 'fecha_creacion']
    });

    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado',
        message: 'El usuario no existe'
      });
    }

    res.json({
      user: user
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al obtener el perfil del usuario'
    });
  }
};

module.exports = {
  login,
  logout,
  refreshToken,
  getProfile
};