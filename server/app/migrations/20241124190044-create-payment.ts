'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Step 1: Create enum types for payment status and payment method
    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_payment_status" AS ENUM('pending', 'completed', 'failed');
      CREATE TYPE "enum_payment_method" AS ENUM('cash_on_delivery', 'bank_transfer', 'easypaisa', 'raast', 'payfast');
    `);

    // Step 2: Create the Payments table with the payment_method enum
    await queryInterface.createTable('Payments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      order_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Orders',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      payment_method: {
        type: 'enum_payment_method',
        allowNull: false,
      },
      payment_status: {
        type: 'enum_payment_status',
        defaultValue: 'pending',
        allowNull: false,
      },
      transaction_id: {
        type: Sequelize.STRING,
      },
      payment_date: {
        type: Sequelize.DATE,
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      transfer_screenshot: {
        type: Sequelize.STRING, // Store the file path or URL of the screenshot
        allowNull: true, // This can be null for other payment methods like COD
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
    // Step 1: Drop the Payments table
    await queryInterface.dropTable('Payments');

    // Step 2: Drop the enums for payment status and payment method
    await queryInterface.sequelize.query(`
      DROP TYPE "enum_payment_status";
      DROP TYPE "enum_payment_method";
    `);
  },
};
