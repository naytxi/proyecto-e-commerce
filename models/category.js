'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsToMany(models.Producto, {
        through: models.CategoryProducto,
        as: 'productos',
        foreignKey: 'categoryId'
      });
    }
  }

  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories'
  });

  return Category;
};
