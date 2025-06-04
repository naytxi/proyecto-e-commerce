'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('productos', [
      {
        name: 'Cargador USB',
        price: 19.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mantel de papel',
        price: 9.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alfombrilla raton',
        price: 20.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ventilador portátil',
        price: 19.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pantalla LED 24"',
        price: 159.99,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('productos', null, {});
  }
};
