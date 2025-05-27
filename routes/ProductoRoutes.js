const express = require('express')
const router = express.Router()
const ProductoController = require('../controllers/ProductoController')
const auth = require('../middlewares/auth')

router.post('/', auth, ProductoController.create) 
router.put('/:id', auth, ProductoController.update)   
router.delete('/:id', auth, ProductoController.delete) 
router.get('/', ProductoController.getAll)             
router.get('/:id', ProductoController.getById)          

module.exports = router
