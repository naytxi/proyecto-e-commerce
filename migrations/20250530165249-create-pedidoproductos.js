'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pedidoproductos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pedidoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'pedidos',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      productoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'productos',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      cantidad: {
        type: Sequelize.INTEGER,
        defaultValue: 1
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
    await queryInterface.dropTable('pedidoproductos');
  }
};
