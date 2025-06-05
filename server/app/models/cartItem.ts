// import { Model, DataTypes, Sequelize } from 'sequelize';

// // Define CartItem class with extended type
// interface CartItemAttributes {
//   id: string;
//   cart_id: string;
//   variant_id: string;
//   quantity: number;
//   price: number;
//   total_price: number;
// }

// export default (sequelize: Sequelize) => {
//   class CartItem
//     extends Model<CartItemAttributes>
//     implements CartItemAttributes
//   {
//     public id!: string;
//     public cart_id!: string;
//     public variant_id!: string;
//     public quantity!: number;
//     public price!: number;
//     public total_price!: number;

//     // Method to calculate the total price
//     calculateTotalPrice(): number {
//       this.total_price = this.price * this.quantity;
//       return this.total_price;
//     }

//     static associate(models: any) {
//       CartItem.belongsTo(models.Cart, {
//         foreignKey: 'cart_id',
//         as: 'cart',
//       });
//       CartItem.belongsTo(models.Variant, {
//         foreignKey: 'variant_id',
//         as: 'variant',
//       });
//     }
//   }

//   CartItem.init(
//     {
//       id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//       },
//       cart_id: {
//         type: DataTypes.UUID,
//         allowNull: false,
//       },
//       variant_id: {
//         type: DataTypes.UUID,
//         allowNull: false,
//       },
//       quantity: {
//         type: DataTypes.INTEGER,
//         defaultValue: 1,
//         allowNull: false,
//       },
//       price: {
//         type: DataTypes.FLOAT,
//         allowNull: false,
//       },
//       total_price: {
//         type: DataTypes.FLOAT,
//         allowNull: false,
//         defaultValue: 0,
//       },
//     },
//     {
//       sequelize,
//       modelName: 'CartItem',
//     }
//   );

//   return CartItem;
// };

import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

// Define CartItem attributes and creation attributes
interface CartItemAttributes {
  id: string;
  cart_id: string;
  variant_id: string;
  quantity: number;
  price: number;
  total_price: number;
  createdAt: string;
  updatedAt: string;
  // deletedAt: string;
}

interface CartItemCreationAttributes
  extends Optional<CartItemAttributes, 'id' | 'total_price'> {}

export default (sequelize: Sequelize) => {
  class CartItem
    extends Model<CartItemAttributes, CartItemCreationAttributes>
    implements CartItemAttributes
  {
    public id!: string;
    public cart_id!: string;
    public variant_id!: string;
    public quantity!: number;
    public price!: number;
    public total_price!: number;
    public createdAt: string;
    public updatedAt: string;
    // public deletedAt: string;

    // Method to calculate the total price
    calculateTotalPrice(): number {
      this.total_price = this.price * this.quantity;
      return this.total_price;
    }

    static associate(models: any) {
      CartItem.belongsTo(models.Cart, {
        foreignKey: 'cart_id',
        as: 'cart',
      });
      CartItem.belongsTo(models.Variant, {
        foreignKey: 'variant_id',
        as: 'Variant',
      });
    }
  }

  CartItem.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      cart_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      variant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
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
      modelName: 'CartItem',
      paranoid: true,
      hooks: {
        beforeSave: (cartItem) => {
          cartItem.total_price = cartItem.price * cartItem.quantity;
        },
      },
    }
  );

  return CartItem;
};
