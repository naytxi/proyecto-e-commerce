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
      if (!prod.id || !prod.cantidad) {
        return res.status(400).json({ error: 'Cada producto debe tener id y cantidad' });
      }

      await Pedidoproductos.create({
        pedidoId: nuevoPedido.id,
        productoId: prod.id,
        cantidad: prod.cantidad
      });
    }

    return res.status(201).json({ mensaje: 'Pedido creado', pedidoId: nuevoPedido.id });
  } catch (error) {
    console.error('Error creando pedido:', error);  
    return res.status(500).json({ error: 'Error al crear el pedido' });
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

module.exports = {
  crearPedido,
  obtenerPedidos
};
