const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

// Rutas públicas
router.post('/register', UserController.register)
router.post('/login', UserController.login)

// Rutas protegidas (las usaremos más adelante)
// router.get('/', isAuth, isAdmin, UserController.getAll)

module.exports = router
