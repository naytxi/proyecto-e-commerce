'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: 'userId', as: 'usuario' });
      Review.belongsTo(models.Producto, { foreignKey: 'productoId', as: 'producto' });
    }
  }

  Review.init({
    comentario: DataTypes.STRING,
    puntuacion: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews'
  });

  return Review;
};
