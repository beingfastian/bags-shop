module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Drop the existing enum type if it exists
      await queryInterface.sequelize.query(`
        DROP TYPE IF EXISTS "enum_otps_purpose";
      `);

      // Create enum type
      await queryInterface.sequelize.query(`
        CREATE TYPE "enum_otps_purpose" AS ENUM (
          'password_reset', 
          'email_verification', 
          '2fa', 
          'phone_verification'
        );
      `);

      // Create OTPs table
      await queryInterface.createTable(
        'OTPs',
        {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          userId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          code: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          purpose: {
            type: 'enum_OTPs_purpose',
            allowNull: false,
          },
          expiresAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          used: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          },
          metadata: {
            type: Sequelize.JSONB,
            allowNull: true,
            comment: 'Additional context like IP, user agent, etc.',
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
        },
        { transaction }
      );

      // Add indexes
      await queryInterface.addIndex('OTPs', ['userId'], { transaction });
      await queryInterface.addIndex('OTPs', ['expiresAt'], { transaction });
      await queryInterface.addIndex('OTPs', ['code', 'purpose'], {
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable('OTPs', { transaction });

      // Drop enum type if exists
      await queryInterface.sequelize.query(
        `DROP TYPE IF EXISTS "enum_otps_purpose";`,
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
