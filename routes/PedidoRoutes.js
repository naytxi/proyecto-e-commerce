const express = require('express')
const router = express.Router()
const PedidoController = require('../controllers/PedidoController')
const isAuth = require('../middlewares/auth') // Solo usuarios logueados pueden acceder

// Crear un nuevo pedido
router.post('/', isAuth, PedidoController.create)

// Obtener los pedidos del usuario logueado
router.get('/', isAuth, PedidoController.getUserPedidos)

module.exports = router
