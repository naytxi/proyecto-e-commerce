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


module.exports = router

