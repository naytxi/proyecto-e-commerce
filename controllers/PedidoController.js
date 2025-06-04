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
  },
// Agrega una lista de productos a un pedido existente
// Espera un array en req.body con { productoId, cantidad }
// Asocia los productos al pedido usando la tabla intermedia

    async addProductos(req, res) {
      try {
        const { id } = req.params
        const { productos } = req.body // productos: [{ productoId, cantidad }]

        const pedido = await Pedido.findByPk(id)
      if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' })
    }

    // Recorremos los productos y los asociamos al pedido
      for (const item of productos) {
        await pedido.addProducto(item.productoId, {
          through: { cantidad: item.cantidad || 1 }
      })
    }

    // Devolvemos el pedido actualizado con los productos
    const pedidoConProductos = await Pedido.findByPk(id, {
      include: { association: 'productos' }
    })

    res.json({ message: 'Productos agregados al pedido', pedido: pedidoConProductos })
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar productos', error: error.message })
  }
}

}

module.exports = PedidoController
