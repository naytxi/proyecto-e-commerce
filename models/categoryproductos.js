'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class categoryproducto extends Model {
    static associate(models) {

    }
  }

  categoryproducto.init({
    productoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'productos',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  }, {
    sequelize,
    modelName: 'categoryproducto', 
    tableName: 'categoryproductos', 
    timestamps: false 
  });

  return categoryproducto;
};
