'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Step 1: Create enum types for status and role
    // await queryInterface.sequelize.query(`
    //   CREATE TYPE "enum_users_status" AS ENUM('active', 'blocked');
    //   CREATE TYPE "enum_users_role" AS ENUM('admin', 'buyer');
    // `);

    await queryInterface.sequelize.query(`
      DO $$ 
      BEGIN
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_users_status') THEN
          -- Update the enum type to add missing values if needed
          -- Example: Uncomment and add values as needed:
          -- ALTER TYPE "enum_users_status" ADD VALUE IF NOT EXISTS 'new_status';
        ELSE
          CREATE TYPE "enum_users_status" AS ENUM('active', 'blocked');
        END IF;
      END $$;
    `);

    // Step 2: Create or update "enum_users_role"
    await queryInterface.sequelize.query(`
      DO $$ 
      BEGIN
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_users_role') THEN
          -- Update the enum type to add missing values if needed
          -- Example: Uncomment and add values as needed:
          -- ALTER TYPE "enum_users_role" ADD VALUE IF NOT EXISTS 'new_role';
        ELSE
          CREATE TYPE "enum_users_role" AS ENUM('admin', 'buyer');
        END IF;
      END $$;
    `);

    // Step 2: Create the Users table using the created enum types
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        comment: 'Unique identifier for the user',
      },
      profile: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Profile of the user',
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'First name of the user',
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Last name of the user',
      },
      display_name: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Display name for the user',
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'Email address of the user, must be unique',
      },
      status: {
        type: 'enum_users_status',
        defaultValue: 'active',
        allowNull: false,
        comment: 'User status (active or blocked)',
      },
      role: {
        type: 'enum_users_role',
        defaultValue: 'buyer',
        allowNull: false,
        comment: 'User role (admin or buyer)',
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Hashed password of the user',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        comment: 'Timestamp when the user was created',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        comment: 'Timestamp when the user was last updated',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: 'Timestamp when the Items was last deleted',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Step 1: Drop the Users table
    await queryInterface.dropTable('Users');

    // Step 2: Drop the enum types when rolling back
    await queryInterface.sequelize.query(`
      DROP TYPE "enum_users_status";
      DROP TYPE "enum_users_role";
    `);
  },
};
