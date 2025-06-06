import { Model, DataTypes } from 'sequelize';

export default (sequelize: any) => {
  class Payment extends Model {
    static associate(models: any) {
      Payment.belongsTo(models.Order, {
        foreignKey: 'order_id',
        as: 'Order',
      });
    }
  }

  Payment.init(
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
      payment_method: {
        type: 'enum_payment_method',
        // type: DataTypes.ENUM(
        //   'cash_on_delivery',
        //   'bank_transfer',
        //   'easypaisa',
        //   'raast',
        //   'payfast'
        // ),
        allowNull: false,
      },
      payment_status: {
        type: 'enum_payment_status',
        // type: DataTypes.ENUM('pending', 'completed', 'failed'),
        allowNull: false,
        defaultValue: 'pending',
      },
      transaction_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      payment_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      transfer_screenshot: {
        type: DataTypes.STRING,
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
      modelName: 'Payment',
      paranoid: true,
    }
  );

  return Payment;
};
