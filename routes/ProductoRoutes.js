const express = require('express')
const router = express.Router()
const ProductoController = require('../controllers/ProductoController')
const isAuth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

//Crear producto (solo admins)
router.post('/', isAuth, isAdmin, ProductoController.create)

//Actualizar producto (solo admins)
router.put('/:id', isAuth, isAdmin, ProductoController.update) 

//Eliminar producto (solo admins)
router.delete('/:id', isAuth, isAdmin, ProductoController.delete)

//Obtener todos los productos (público)
router.get('/', ProductoController.getAll) 

//Obtener producto por ID (público)
router.get('/:id', ProductoController.getById)          

module.exports = router
