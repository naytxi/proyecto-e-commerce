const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const isAuth = require('../middlewares/auth') // Importamos el middleware
const isAdmin = require('../middlewares/isAdmin') // importa el nuevo middleware

// Rutas públicas
router.post('/register', UserController.register)
router.post('/login', UserController.login)

// Ruta privada de prueba con token
router.get('/privado', isAuth, (req, res) => {
  res.json({
    message: 'Ruta privada accedida con éxito',
    user: req.user
  })
})

// Rutas protegidas
router.get('/admin-only', isAuth, isAdmin, (req, res) => {
  res.json({ message: 'Bienvenida administradora Elida' })
})

// router.get('/', isAuth, isAdmin, UserController.getAll)
router.get('/', isAuth, isAdmin, UserController.getAll)

// // Cerrar sesión (logout)
router.post('/logout', isAuth, UserController.logout)

// Obtener perfil del usuario con sus pedidos y productos
router.get('/profile', isAuth, UserController.profile)


router.get('/', getAllUsers);
router.get('/me', verificarToken, obtenerPerfil);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router

router.post('/register', registrar);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
