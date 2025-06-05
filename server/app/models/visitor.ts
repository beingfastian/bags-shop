import { Model, DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  class Visitor extends Model {
    static associate(models: any) {
      // Define associations here if needed
    }
  }

  Visitor.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      visitorId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures visitorId is not an empty string
        },
      },
      visitDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Default value for visitDate
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures country is not an empty string
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Visitor',
      tableName: 'Visitors',
      paranoid: true,
      indexes: [
        {
          fields: ['visitorId'],
        },
        {
          fields: ['visitDate'],
        },
        {
          fields: ['country'],
        },
      ],
    }
  );

  return Visitor;
};
