'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categoryproductos', [
      
      { productoId: 11, categoryId: 1, createdAt: new Date(), updatedAt: new Date() },

     
      { productoId: 12, categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productoId: 12, categoryId: 3, createdAt: new Date(), updatedAt: new Date() },

      
      { productoId: 13, categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productoId: 13, categoryId: 1, createdAt: new Date(), updatedAt: new Date() },

      
      { productoId: 14, categoryId: 1, createdAt: new Date(), updatedAt: new Date() },

      
      { productoId: 15, categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },
};
