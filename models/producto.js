'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
      Producto.belongsToMany(models.Category, {
        through: models.CategoryProducto,
        as: 'categories',
        foreignKey: 'productoId'
      });

      Producto.belongsToMany(models.Pedido, {
        through: 'PedidoProductos',
        foreignKey: 'productoId',
        otherKey: 'pedidoId',
        as: 'pedidos'
      });

      // ✅ Relación nueva con Review
      Producto.hasMany(models.Review, {
        as: 'reviews',
        foreignKey: 'productoId'
      });
    }
  }

  Producto.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Producto',
    tableName: 'productos'
  });

  return Producto;
};


