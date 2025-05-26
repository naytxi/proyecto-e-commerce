'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    producto.belongsToMany(models.category, {
    through: models.categoryproducto,
    foreignKey: 'productoId',
    otherKey: 'categoryId',
    as: 'categories'
  });
    }
  }
  producto.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'producto',
  });
  return producto;
};
