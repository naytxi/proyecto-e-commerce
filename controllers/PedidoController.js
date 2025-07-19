const { Pedidos, Producto, Pedidoproductos } = require('../models');

const crearPedido = async (req, res) => {
  try {
    const usersId = req.user.id;
    const productosData = req.body.productos;

    if (!productosData || !Array.isArray(productosData) || productosData.length === 0) {
      return res.status(400).json({ error: 'Debe enviar un array de productos con id y cantidad' });
    }

    const nuevoPedido = await Pedidos.create({ usersId });
 

    for (const prod of productosData) {
      const { id, cantidad } = prod;

      if (!id || !cantidad) {
        return res.status(400).json({ error: 'Cada producto debe tener id y cantidad' });
      }

      const productoExiste = await Producto.findByPk(id);

      if (!productoExiste) {
        return res.status(404).json({ error: `Producto con ID ${id} no encontrado` });
      }

      await Pedidoproductos.create({
        pedidoId: nuevoPedido.id,
        productoId: id,
        cantidad
      });

    }

    return res.status(201).json({ mensaje: 'Pedido creado', pedidoId: nuevoPedido.id });

  } catch (error) {
    console.error('🟥 Error creando pedido:', error);
    return res.status(500).json({ error: 'Error al crear el pedido', detalle: error.message });
  }
};

const obtenerPedidos = async (req, res) => {
  try {
    const listaPedidos = await Pedidos.findAll({
      include: {
        model: Producto,
        through: {
          attributes: ['cantidad']
        }
      }
    });

    return res.json(listaPedidos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
};

const obtenerPedidosUsuario = async (req, res) => {
  try {
    const usersId = req.user.id;

    const pedidosUsuario = await Pedidos.findAll({
      where: { usersId },
      include: {
        model: Producto,
        attributes: ['id', 'name'],   
        through: {
          attributes: ['cantidad'],   
        }
      },
      order: [['createdAt', 'DESC']]
    });

    res.json(pedidosUsuario);
  } catch (error) {
    console.error('Error obteniendo pedidos del usuario:', error);
    res.status(500).json({ error: 'Error al obtener pedidos del usuario' });
  }
};


module.exports = {
  crearPedido,
  obtenerPedidos,
  obtenerPedidosUsuario 
};
