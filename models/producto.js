'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
      Producto.belongsToMany(models.Pedidos, {
        through: models.Pedidoproductos,  // Usa el modelo, no string
        foreignKey: 'productoId',
        otherKey: 'pedidoId'
      });

      Producto.belongsToMany(models.Category, {
        through: 'CategoryProducto',
        as: 'categories',
        foreignKey: 'productoId'
      });

      Producto.hasMany(models.Review, {
        foreignKey: 'productoId',
        as: 'reviews'
      });
    }
  }

  Producto.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Producto',
    tableName: 'productos'
  });

  return Producto;
};
