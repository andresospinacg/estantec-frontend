const express = require('express');
const router = express.Router();

// API Documentation endpoint
router.get('/', (req, res) => {
  const apiDocs = {
    title: 'EstanTec Admin API',
    version: '1.0.0',
    description: 'API para el sistema de administración de EstanTec',
    baseUrl: `${req.protocol}://${req.get('host')}/api`,
    endpoints: {
      auth: {
        login: {
          method: 'POST',
          path: '/auth/login',
          description: 'Iniciar sesión de administrador',
          body: {
            usuario: 'string (required)',
            contrasena: 'string (required)'
          }
        },
        logout: {
          method: 'POST',
          path: '/auth/logout',
          description: 'Cerrar sesión',
          headers: { Authorization: 'Bearer <token>' }
        },
        refresh: {
          method: 'POST',
          path: '/auth/refresh',
          description: 'Renovar token de acceso',
          body: { refresh_token: 'string (required)' }
        },
        profile: {
          method: 'GET',
          path: '/auth/profile',
          description: 'Obtener perfil del usuario',
          headers: { Authorization: 'Bearer <token>' }
        }
      },
      marcas: {
        list: {
          method: 'GET',
          path: '/marcas',
          description: 'Listar todas las marcas',
          query: {
            page: 'number (optional)',
            limit: 'number (optional)',
            search: 'string (optional)'
          },
          headers: { Authorization: 'Bearer <token>' }
        },
        get: {
          method: 'GET',
          path: '/marcas/:id',
          description: 'Obtener marca por ID',
          headers: { Authorization: 'Bearer <token>' }
        },
        create: {
          method: 'POST',
          path: '/marcas',
          description: 'Crear nueva marca',
          body: {
            nombre: 'string (required)',
            url_logo: 'string (optional)',
            descripcion: 'string (optional)'
          },
          headers: { Authorization: 'Bearer <token>' },
          roles: ['super_admin', 'manager_inventario']
        },
        update: {
          method: 'PUT',
          path: '/marcas/:id',
          description: 'Actualizar marca',
          headers: { Authorization: 'Bearer <token>' },
          roles: ['super_admin', 'manager_inventario']
        },
        delete: {
          method: 'DELETE',
          path: '/marcas/:id',
          description: 'Eliminar marca',
          headers: { Authorization: 'Bearer <token>' },
          roles: ['super_admin']
        }
      },
      categorias: {
        list: {
          method: 'GET',
          path: '/categorias',
          description: 'Listar todas las categorías',
          headers: { Authorization: 'Bearer <token>' }
        },
        get: {
          method: 'GET',
          path: '/categorias/:id',
          description: 'Obtener categoría por ID',
          headers: { Authorization: 'Bearer <token>' }
        },
        create: {
          method: 'POST',
          path: '/categorias',
          description: 'Crear nueva categoría',
          headers: { Authorization: 'Bearer <token>' },
          roles: ['super_admin', 'manager_inventario']
        },
        update: {
          method: 'PUT',
          path: '/categorias/:id',
          description: 'Actualizar categoría',
          headers: { Authorization: 'Bearer <token>' },
          roles: ['super_admin', 'manager_inventario']
        },
        delete: {
          method: 'DELETE',
          path: '/categorias/:id',
          description: 'Eliminar categoría',
          headers: { Authorization: 'Bearer <token>' },
          roles: ['super_admin']
        }
      },
      dispositivos: {
        list: {
          method: 'GET',
          path: '/dispositivos',
          description: 'Listar todos los dispositivos',
          query: {
            page: 'number (optional)',
            limit: 'number (optional)',
            search: 'string (optional)',
            marca: 'number (optional)',
            categoria: 'number (optional)',
            precio_min: 'number (optional)',
            precio_max: 'number (optional)',
            sort_by: 'string (optional)',
            sort_order: 'string (optional)'
          },
          headers: { Authorization: 'Bearer <token>' }
        },
        get: {
          method: 'GET',
          path: '/dispositivos/:id',
          description: 'Obtener dispositivo por ID',
          headers: { Authorization: 'Bearer <token>' }
        },
        create: {
          method: 'POST',
          path: '/dispositivos',
          description: 'Crear nuevo dispositivo',
          headers: { Authorization: 'Bearer <token>' },
          roles: ['super_admin', 'manager_inventario']
        },
        update: {
          method: 'PUT',
          path: '/dispositivos/:id',
          description: 'Actualizar dispositivo',
          headers: { Authorization: 'Bearer <token>' },
          roles: ['super_admin', 'manager_inventario']
        },
        delete: {
          method: 'DELETE',
          path: '/dispositivos/:id',
          description: 'Eliminar dispositivo',
          headers: { Authorization: 'Bearer <token>' },
          roles: ['super_admin']
        }
      }
    },
    roles: {
      super_admin: 'Acceso completo a todas las funciones',
      manager_inventario: 'Gestión de inventario (marcas, categorías, dispositivos)',
      manager_ventas: 'Gestión de ventas (futuro)',
      manager_marketing: 'Gestión de marketing (futuro)'
    },
    response_format: {
      success: {
        message: 'Operación exitosa',
        data: {}
      },
      error: {
        error: 'Tipo de error',
        message: 'Descripción del error',
        details: []
      }
    }
  };

  res.json(apiDocs);
});

module.exports = router;