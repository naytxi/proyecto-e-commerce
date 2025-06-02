const express = require('express');
const router = express.Router();
const { crearPedido, obtenerPedidos } = require('../controllers/PedidoController');
const verificarToken = require('../auth/authMiddleware'); 

router.post('/', verificarToken, crearPedido); 
router.get('/', obtenerPedidos);

module.exports = router;