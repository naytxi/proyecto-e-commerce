'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('productos', [
      {
        name: 'MacBook Pro M2',
        price: 1999.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'iPhone 14 Pro',
        price: 1299.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Samsung Galaxy Tab S8',
        price: 799.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'AirPods Pro 2',
        price: 249.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Teclado Logitech MX Keys',
        price: 99.99,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('productos', null, {})
  }
}
