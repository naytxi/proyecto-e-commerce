const express = require('express');
const router = express.Router();
const { crearPedido, obtenerPedidos, obtenerPedidosUsuario  } = require('../controllers/PedidoController');
const verificarToken = require('../auth/authMiddleware'); 

router.post('/', verificarToken, crearPedido); 
router.get('/', obtenerPedidos);
router.get('/usuario', verificarToken, obtenerPedidosUsuario);

// Obtener los pedidos del usuario logueado
router.get('/', isAuth, PedidoController.getUserPedidos)

// Ruta protegida para añadir productos a un pedido existente (por ID)
router.post('/:id/productos', isAuth, PedidoController.addProductos)


module.exports = router
