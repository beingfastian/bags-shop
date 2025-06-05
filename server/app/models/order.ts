import { Model, DataTypes } from 'sequelize';

export default (sequelize: any) => {
  class Order extends Model {
    static associate(models: any) {
      Order.hasMany(models.OrderItem, {
        foreignKey: 'order_id',
        as: 'OrderItems',
      });
      Order.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'User',
      });
      Order.belongsTo(models.Address, {
        foreignKey: 'address_id',
        as: 'Address',
      });
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      coupon_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      status: {
        type: 'enum_orders_status',
        // type: DataTypes.ENUM(
        //   'pending',
        //   'confirmed',
        //   'inprogress',
        //   'delivered',
        //   'ontheway',
        //   'cancelled',
        //   'return'
        // ),
        allowNull: false,
        defaultValue: 'pending',
      },
      total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      delivery_fee: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      trackingId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      discount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      address_id: {
        type: DataTypes.UUID,
        allowNull: false,
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
      modelName: 'Order',
      paranoid: true,
    }
  );

  return Order;
};
