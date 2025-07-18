const express = require('express');
const router = express.Router();
const { crearPedido, obtenerPedidos, obtenerPedidosUsuario  } = require('../controllers/PedidoController');
const verificarToken = require('../auth/authMiddleware'); 

router.post('/', verificarToken, crearPedido); 
router.get('/', obtenerPedidos);
router.get('/usuario', verificarToken, obtenerPedidosUsuario);

module.exports = router;