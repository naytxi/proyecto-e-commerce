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

      Producto.belongsToMany(models.Pedidos, {
        through: models.Pedidoproductos,
        foreignKey: 'productoId'
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
