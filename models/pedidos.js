'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    // Asociaciones con otros modelos
    static associate(models) {
      // Un pedido pertenece a un solo usuario
      Pedido.belongsTo(models.User, {
        foreignKey: 'usersId',
        as: 'usuario'
      })

      Pedido.belongsToMany(models.Producto, {
        through: models.PedidoProductos,
        foreignKey: 'pedidoId',
        otherKey: 'productoId',
        as: 'productos'
})

    }
  }

  Pedido.init({
    usersId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Pedido',
    tableName: 'pedidos'
  })

  return Pedido
}
