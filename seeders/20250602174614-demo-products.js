'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('productos', [
      {
        name: 'Cargador USB',
        description: 'Cargador USB de alta velocidad',
        price: 19.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mantel de papel',
        description: 'Mantel de papel desechable para fiestas',
        price: 9.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alfombrilla raton',
        description: 'Alfombrilla de ratón ergonómica',
        price: 20.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ventilador portátil',
        description: 'Ventilador portátil recargable',
        price: 19.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pantalla LED 24"',
        description: 'Pantalla LED de 24 pulgadas Full HD',
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