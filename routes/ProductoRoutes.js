const express = require('express')
const router = express.Router()
const ProductoController = require('../controllers/ProductoController')


router.post('/', verificarToken, isAdmin, ProductoController.create);
router.put('/:id', verificarToken, isAdmin, ProductoController.update);
router.delete('/:id', verificarToken, isAdmin, ProductoController.delete);
router.get('/', ProductoController.getAll)             
router.get('/:id', ProductoController.getById)          

module.exports = router
