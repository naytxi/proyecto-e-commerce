const express = require('express')
const router = express.Router()
const ProductoController = require('../controllers/ProductoController')
const isAuth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')
const upload = require('../middlewares/upload')



// Crear producto con imagen
router.post('/', isAuth, isAdmin, upload.single('image'), ProductoController.create)

// Actualizar producto con imagen
router.put('/:id', isAuth, isAdmin, upload.single('image'), ProductoController.update)

//Eliminar producto (solo admins)
router.delete('/:id', isAuth, isAdmin, ProductoController.delete)

//Obtener todos los productos (público)
router.get('/', ProductoController.getAll) 

//Obtener producto por ID (público)
router.get('/:id', ProductoController.getById)          

module.exports = router
