import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Cart extends Model {
    static associate(models) {
      Cart.hasMany(models.CartItem, {
        foreignKey: 'cart_id',
        as: 'items',
      });
      Cart.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
      Cart.belongsTo(models.Coupon, {
        foreignKey: 'coupon_id',
        as: 'coupon',
      });
    }
  }

  Cart.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      coupon_id: {
        type: DataTypes.UUID,
      },
      status: {
        type: DataTypes.ENUM('active', 'abandoned', 'completed'),
        defaultValue: 'active',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Cart',
      paranoid: true,
    }
  );

  return Cart;
};
