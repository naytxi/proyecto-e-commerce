'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {

Producto.belongsToMany(models.Category, {
  through: 'CategoryProducto', 
  as: 'categories',
  foreignKey: 'productoId'
});

Producto.belongsToMany(models.Pedidos, {
  through: 'Pedidoproductos', 
  foreignKey: 'productoId'
});


      
      Producto.hasMany(models.Review, {
        foreignKey: 'productoId',
        otherKey: 'pedidoId',
        as: 'pedidos'
      })
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
  })

  return Producto
}



