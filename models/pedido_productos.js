'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class PedidoProducto extends Model {
    static associate(models) {
      // No requiere asociaciones directas aquí
    }
  }

  PedidoProducto.init({
    pedidoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'pedidos',
        key: 'id'
      }
    },
    productoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'productos',
        key: 'id'
      }
    },
    cantidad: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'PedidoProducto',
    tableName: 'pedido_productos'
  })

  return PedidoProducto
}
