'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   await queryInterface.createTable('categoryproductos', {
categoryId: {
  type: Sequelize.INTEGER,
  primaryKey: true,
  references: {
    model: 'categories',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
},
productoId: {
  type: Sequelize.INTEGER,
  primaryKey: true,
  references: {
    model: 'productos',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
},
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categoryproductos');
  }
};
