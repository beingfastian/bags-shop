import { Model, DataTypes } from 'sequelize';

export default (sequelize: any) => {
  class OrderItem extends Model {
    static associate(models: any) {
      OrderItem.belongsTo(models.Order, {
        foreignKey: 'order_id',
        as: 'Order',
      });
      OrderItem.belongsTo(models.Variant, {
        foreignKey: 'variant_id',
        as: 'Variant',
      });
    }
  }

  OrderItem.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      order_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      variant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      unit_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_price: {
        type: DataTypes.INTEGER,
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
      modelName: 'OrderItem',
      paranoid: true,
    }
  );

  return OrderItem;
};
