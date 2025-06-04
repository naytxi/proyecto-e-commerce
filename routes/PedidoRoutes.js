const express = require('express')
const router = express.Router()
const PedidoController = require('../controllers/PedidoController')
const isAuth = require('../middlewares/auth') // Solo usuarios logueados pueden acceder

// Crear un nuevo pedido
router.post('/', isAuth, PedidoController.create)

// Obtener los pedidos del usuario logueado
router.get('/', isAuth, PedidoController.getUserPedidos)

// Ruta protegida para añadir productos a un pedido existente (por ID)
router.post('/:id/productos', isAuth, PedidoController.addProductos)


module.exports = router
