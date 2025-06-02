'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
      Producto.belongsToMany(models.Category, {
        through: models.CategoryProducto,
        as: 'categories',
        foreignKey: 'productoId'
      })
      
      Producto.belongsToMany(models.Pedido, {
        through: models.PedidoProducto,
        foreignKey: 'productoId',
        otherKey: 'pedidoId',
        as: 'pedidos'
})

    }
  }

  Producto.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Producto',
    tableName: 'productos'
  })

  return Producto
}
