# EstanTec Backend API

API REST para el sistema de administración de EstanTec, construida con Node.js, Express y Sequelize.

## 🚀 Características

- **Autenticación JWT** con roles de usuario
- **Base de datos MariaDB** con Sequelize ORM
- **Validación de entrada** con Joi
- **Control de acceso** basado en roles
- **Documentación API** integrada
- **Manejo de errores** robusto
- **CORS** configurado para frontend

## 📋 Prerrequisitos

- Node.js (v16 o superior)
- MariaDB/MySQL
- Base de datos `TiendaEstanTec_BD` creada

## 🛠️ Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   Editar el archivo `.env` con tus configuraciones:
   ```env
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173

   # Base de datos MariaDB
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=TiendaEstanTec_BD
   DB_USER=root
   DB_PASSWORD=^Hr0n0W16MAe@YS

   # JWT
   JWT_SECRET=
   JWT_EXPIRE=24h
   JWT_REFRESH_EXPIRE=7d
   ```

3. **Asegurarse de que la base de datos esté ejecutándose**

4. **Iniciar el servidor:**
   ```bash
   # Producción
   npm start

   # Desarrollo (requiere nodemon)
   npm run dev
   ```

## 🔐 Autenticación

### Inicio de Sesión
```http
POST /api/auth/login
Content-Type: application/json

{
  "usuario": "admin_estantec",
  "contrasena": "contraseña_admin"
}
```

**Respuesta exitosa:**
```json
{
  "message": "Inicio de sesión exitoso",
  "user": {
    "id": 1,
    "usuario": "admin_estantec",
    "correo": "admin@estantec.com",
    "rol": "super_admin"
  },
  "tokens": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 86400
  }
}
```

### Usar Token de Acceso
Incluir el token en el header de Authorization:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

## 👥 Roles de Usuario

- **super_admin**: Acceso completo a todas las funciones
- **manager_inventario**: Gestión de marcas, categorías y dispositivos
- **manager_ventas**: Gestión de ventas (futuro, no implementado)
- **manager_marketing**: Gestión de marketing (futuro,no implementado)

## 📖 Endpoints Principales

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión
- `POST /api/auth/refresh` - Renovar token
- `GET /api/auth/profile` - Obtener perfil

### Marcas
- `GET /api/marcas` - Listar marcas
- `GET /api/marcas/:id` - Obtener marca
- `POST /api/marcas` - Crear marca
- `PUT /api/marcas/:id` - Actualizar marca
- `DELETE /api/marcas/:id` - Eliminar marca

### Categorías
- `GET /api/categorias` - Listar categorías
- `GET /api/categorias/:id` - Obtener categoría
- `POST /api/categorias` - Crear categoría
- `PUT /api/categorias/:id` - Actualizar categoría
- `DELETE /api/categorias/:id` - Eliminar categoría

### Dispositivos
- `GET /api/dispositivos` - Listar dispositivos
- `GET /api/dispositivos/:id` - Obtener dispositivo
- `POST /api/dispositivos` - Crear dispositivo
- `PUT /api/dispositivos/:id` - Actualizar dispositivo
- `DELETE /api/dispositivos/:id` - Eliminar dispositivo

### Documentación
- `GET /api/docs` - Documentación completa de la API

## 🧪 Testing con Postman

1. **Crear un entorno** con las variables:
   - `base_url`: `http://localhost:3001/api`
   - `access_token`: (se actualizará automáticamente)

2. **Login flow**:
   - POST `{{base_url}}/auth/login`
   - Guardar `access_token` en variable de entorno
   - Usar `Authorization: Bearer {{access_token}}` en otras requests


