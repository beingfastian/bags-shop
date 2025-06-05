'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Address', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      street_address: {
        type: Sequelize.STRING,
        allowNull: false, // assuming the street address is mandatory
      },
      address_line2: {
        type: Sequelize.STRING,
        allowNull: true, // optional, for apartment numbers, etc.
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true, // address name
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false, // assuming city is mandatory
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false, // assuming state is mandatory
      },
      postal_code: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false, // assuming country is mandatory
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: 'Timestamp when the Items was last deleted',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Address');
  },
};
