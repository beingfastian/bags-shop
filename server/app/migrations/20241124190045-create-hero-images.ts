'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hero_images', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        comment: 'Unique identifier for the hero image',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Name of the hero image',
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
        default: 'hero',
        comment: 'type of the hero image',
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Image URL or path representing the hero image',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        comment: 'Timestamp when the hero image was created',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        comment: 'Timestamp when the hero image was last updated',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: 'Timestamp when the Items was last deleted',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hero_images');
  },
};
