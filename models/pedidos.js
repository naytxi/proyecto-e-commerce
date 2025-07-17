'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pedidos extends Model {
    static associate(models) {
      Pedidos.belongsToMany(models.Producto, {
        through: models.Pedidoproductos,
        foreignKey: 'pedidoId'
      });

      Pedidos.belongsTo(models.User, {
        foreignKey: 'usersId',
        as: 'usuario'
      });
    }
  }

  Pedidos.init({
    usersId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pedidos' 
  });

  return Pedidos;
};
