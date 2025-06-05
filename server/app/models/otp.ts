// models/otpModel.ts
import { Model, DataTypes } from 'sequelize';

class OTP extends Model {
  declare id: string;
  declare userId: string;
  declare code: string;
  declare purpose:
    | 'password_reset'
    | 'email_verification'
    | '2fa'
    | 'phone_verification';
  declare expiresAt: Date;
  declare used: boolean;
  declare metadata?: Record<string, unknown>;

  static associate(models) {
    OTP.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }
}

export default (sequelize) => {
  OTP.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      purpose: {
        type: 'enum_otps_purpose',
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      metadata: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      // deletedAt: {
      //   type: DataTypes.DATE,
      // },
    },
    {
      sequelize,
      modelName: 'OTP',
      // paranoid: true,
      indexes: [
        {
          fields: ['userId'],
        },
        {
          fields: ['expiresAt'],
        },
        {
          fields: ['code', 'purpose'],
        },
      ],
    }
  );

  return OTP;
};
