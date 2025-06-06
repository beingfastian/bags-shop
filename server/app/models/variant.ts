import { Model, DataTypes } from 'sequelize';

export default (sequelize: any) => {
  class Variant extends Model {
    static associate(models: any) {
      Variant.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'Product', // Alias for the relationship
      });
    }
  }

  Variant.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      size: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },


      

      comportment: {
        type: DataTypes.STRING,
        allowNull: true,
       
      },

      material: {
        type: DataTypes.STRING,
        allowNull: true,
       
      },

      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true, 
      },
      
      color: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      stock: {
        type: DataTypes.INTEGER,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
          max: 100,
        },
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
      modelName: 'Variant',
      paranoid: true,
    }
  );

  return Variant;
};
