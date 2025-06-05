'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Visitors', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Unique identifier for each visitor',
      },
      visitorId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false, // This allows multiple visits but tracks unique visitors separately
        comment: 'Identifier for the visitor',
      },
      visitDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        comment: 'The date and time when the visitor visited',
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Country of the visitor',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
        comment: 'Timestamp when the visitor record was created',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
        comment: 'Timestamp when the visitor record was last updated',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: 'Timestamp when the Items was last deleted',
      },
    });

    // Add indexes for efficient querying
    await queryInterface.addIndex('Visitors', ['visitorId']);
    await queryInterface.addIndex('Visitors', ['visitDate']);
    await queryInterface.addIndex('Visitors', ['country']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Visitors');
  },
};
