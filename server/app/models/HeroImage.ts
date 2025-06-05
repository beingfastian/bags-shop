import { Model, DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  class HeroImage extends Model {
    static associate(models: any) {
      // Define associations here if needed
    }
  }

  HeroImage.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true, // name can be null
        validate: {
          notEmpty: true, // Ensures name is not an empty string if provided
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true, // name can be null
        defaultValue: 'hero',
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false, // image cannot be null
        validate: {
          notEmpty: true, // Ensures image path or URL is not an empty string
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
    },
    {
      sequelize,
      modelName: 'HeroImage',
      tableName: 'hero_images',
      paranoid: true,
      indexes: [
        {
          fields: ['name'],
        },
      ],
    }
  );

  return HeroImage;
};
