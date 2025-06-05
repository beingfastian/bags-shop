'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Variants', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        comment: 'Unique identifier for the variant',
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: 'Foreign key linking to the Products table',
      },
      size: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Size of the variant (e.g., S, M, L)',
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Image URL for the variant',
      },


      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        comment: 'Array of image URLs for the product',
      },
      comportment: {
        type: Sequelize.STRING,
        allowNull: true,
       
      },

      material: {
        type: Sequelize.STRING,
        allowNull: true,
       
      },
      color: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Color of the variant',
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
        comment: 'Price of the variant in the default currency',
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
        comment: 'Stock count for the variant',
      },
      discount: {
        type: Sequelize.FLOAT,
        allowNull: true,
        validate: {
          min: 0,
          max: 100,
        },
        comment: 'Discount percentage applicable to the product (0-100)',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        comment: 'Timestamp when the variant was created',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        comment: 'Timestamp when the variant was last updated',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: 'Timestamp when the Items was last deleted',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Variants');
  },
};
