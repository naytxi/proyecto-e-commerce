'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pedidoproductos extends Model {
    static associate(models) {}
  }

  Pedidoproductos.init({
    pedidoId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pedidoproductos',
    tableName: 'pedidoproductos'
  });

  return Pedidoproductos;
};
