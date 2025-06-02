const { Pedido, User } = require('../models')

const PedidoController = {
  // Crear nuevo pedido
  async create(req, res) {
    try {
      const userId = req.user.userId // obtenido del token decodificado
      const nuevoPedido = await Pedido.create({ usersId: userId })
      res.status(201).json({ message: 'Pedido creado', pedido: nuevoPedido })
    } catch (error) {
      res.status(500).json({ message: 'Error al crear pedido', error: error.message })
    }
  },

  // Obtener pedidos del usuario logueado
  async getUserPedidos(req, res) {
    try {
      const userId = req.user.userId
      const pedidos = await Pedido.findAll({
        where: { usersId: userId },
        include: [{ model: User, as: 'usuario', attributes: ['id', 'name', 'email'] }]
      })
      res.json(pedidos)
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener pedidos', error: error.message })
    }
  }
}

module.exports = PedidoController
