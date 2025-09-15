const express = require('express');
const {
  getAllMarcas,
  getMarcaById,
  createMarca,
  updateMarca,
  deleteMarca
} = require('../controllers/marcaController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

const router = express.Router();

// Public read operations (no authentication required)
router.get('/', getAllMarcas);
router.get('/:id', getMarcaById);

// Write operations require authentication and admin role

// Create marca (admin only)
router.post('/', authorizeRoles('super_admin', 'manager_inventario'), validate(schemas.marca), createMarca);

// Update marca (admin only)
router.put('/:id', authorizeRoles('super_admin', 'manager_inventario'), validate(schemas.marcaUpdate), updateMarca);

// Delete marca (admin only)
router.delete('/:id', authorizeRoles('super_admin'), deleteMarca);

module.exports = router;