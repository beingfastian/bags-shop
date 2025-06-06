'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_coupon_status" AS ENUM('active', 'inactive');
      CREATE TYPE "enum_coupon_type" AS ENUM('price', 'delivery');
    `);

    await queryInterface.createTable('Coupons', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        comment: 'Unique identifier for the coupon',
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'Unique coupon code used for redemption',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'coupon name',
      },
      discount_value: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'The value of the discount (percentage or fixed amount)',
      },
      is_percentage: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment:
          'Indicates whether the discount is a percentage (true) or a fixed amount (false)',
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: 'The start date of the coupon, when it becomes valid',
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: 'The expiry date of the coupon',
      },
      usage_limit: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Maximum number of times this coupon can be used',
      },
      status: {
        type: 'enum_coupon_status',
        allowNull: false,
        defaultValue: 'active',
        comment: 'The status of the coupon',
      },
      type: {
        type: 'enum_coupon_type',
        allowNull: false,
        defaultValue: 'price',
        comment: 'The type of the coupon',
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
    await queryInterface.dropTable('Coupons');

    await queryInterface.sequelize.query(`
      DROP TYPE "enum_coupon_status";
      DROP TYPE "enum_coupon_type";
    `);
  },
};
