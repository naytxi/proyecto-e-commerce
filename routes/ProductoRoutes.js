const express = require('express')
const router = express.Router()
const ProductoController = require('../controllers/ProductoController')


router.post('/', ProductoController.create) 
router.put('/:id', ProductoController.update)   
router.delete('/:id', ProductoController.delete) 
router.get('/', ProductoController.getAll)             
router.get('/:id', ProductoController.getById)          

module.exports = router
