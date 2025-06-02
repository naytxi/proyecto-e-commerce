const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const isAuth = require('../middlewares/auth') // Importamos el middleware

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

// Rutas protegidas (las usaremos más adelante)
// router.get('/', isAuth, isAdmin, UserController.getAll)

module.exports = router

