const express = require('express');
const {
  getAllDispositivos,
  getDispositivoById,
  createDispositivo,
  updateDispositivo,
  deleteDispositivo
} = require('../controllers/dispositivoController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

const router = express.Router();

// Public read operations (no authentication required)
router.get('/', getAllDispositivos);
router.get('/:id', getDispositivoById);

// Write operations require authentication and admin role

// Create dispositivo (admin only)
router.post('/', authenticateToken, authorizeRoles('super_admin', 'manager_inventario'), validate(schemas.dispositivo), createDispositivo);

// Update dispositivo (admin only)
router.put('/:id', authenticateToken, authorizeRoles('super_admin', 'manager_inventario'), validate(schemas.dispositivo), updateDispositivo);

// Delete dispositivo (admin only)
router.delete('/:id', authenticateToken, authorizeRoles('super_admin'), deleteDispositivo);

module.exports = router;