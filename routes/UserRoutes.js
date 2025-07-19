const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  registrar,
  login,
  obtenerPerfil,
  logout
} = require('../controllers/UserController');
const verificarToken = require('../auth/authMiddleware');
router.get('/', getAllUsers);
router.get('/me', verificarToken, obtenerPerfil);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/register', registrar);
router.post('/login', login);
router.post('/logout', logout);
module.exports = router;























