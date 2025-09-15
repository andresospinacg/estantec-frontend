const express = require('express');
const {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria
} = require('../controllers/categoriaController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

const router = express.Router();

// Public read operations (no authentication required)
router.get('/', getAllCategorias);
router.get('/:id', getCategoriaById);

// Write operations require authentication and admin role

// Create categoria (admin only)
router.post('/', authorizeRoles('super_admin', 'manager_inventario'), validate(schemas.categoria), createCategoria);

// Update categoria (admin only)
router.put('/:id', authorizeRoles('super_admin', 'manager_inventario'), validate(schemas.categoria), updateCategoria);

// Delete categoria (admin only)
router.delete('/:id', authorizeRoles('super_admin'), deleteCategoria);

module.exports = router;