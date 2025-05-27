'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class CategoryProducto extends Model {
    static associate(models) {
    }
  }

  CategoryProducto.init({
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    productoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'productos',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'CategoryProducto',
    tableName: 'categoryproducto'
  })

  return CategoryProducto
}
