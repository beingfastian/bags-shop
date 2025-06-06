import { Model, DataTypes } from 'sequelize';

export default (sequelize: any) => {
  class Coupon extends Model {
    static associate(models: any) {
      // Define associations here if needed
      // Example:
      // Coupon.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' });
    }
  }

  Coupon.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discount_value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      is_percentage: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      usage_limit: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      status: {
        type: 'enum_coupon_status',
        // type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
      },
      type: {
        type: 'enum_coupon_type',
        // type: DataTypes.ENUM('price', 'delivery'),
        allowNull: false,
        defaultValue: 'price',
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
      modelName: 'Coupon',
      paranoid: true,
    }
  );

  return Coupon;
};
