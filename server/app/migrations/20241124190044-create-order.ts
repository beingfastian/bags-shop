'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Step 1: Create Enum for order status
    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_orders_status" AS ENUM('pending','confirmed','inprogress','ontheway','delivered','cancelled','return');
    `);

    // Step 2: Create the Orders table
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        comment: 'Unique identifier for the order',
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Users', // References Users table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: 'The user who placed the order',
      },
      coupon_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Coupons', // References Coupons table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        comment: 'The coupon applied to the order (if any)',
      },
      status: {
        type: 'enum_orders_status',
        allowNull: false,
        defaultValue: 'pending',
        comment: 'The status of the order',
      },
      total_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'The total price of the order',
      },
      delivery_fee: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0,
        comment: 'The delivery fee of the order',
      },
      trackingId: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'tracking Id of the order',
      },
      discount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: 'The discount applied to the order (if any)',
      },
      address_id: {
        type: Sequelize.UUID,
        allowNull: false, // assuming it's mandatory
        references: {
          model: 'Address', // References Shipments table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // or 'CASCADE' based on your logic
        comment: 'The shipping address associated with the order',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        comment: 'Timestamp when the record was created',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        comment: 'Timestamp when the record was last updated',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: 'Timestamp when the Items was last deleted',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Step 1: Drop the Orders table
    await queryInterface.dropTable('Orders');

    // Step 2: Drop the enum type when rolling back
    await queryInterface.sequelize.query(`
      DROP TYPE "enum_orders_status";
    `);
  },
};
