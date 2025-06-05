import { Model, DataTypes } from 'sequelize';

class User extends Model {
  role: string | undefined;
  static associate(models) {
    // define associations here
  }
}

export default (sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      profile: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      display_name: DataTypes.STRING,
      email: DataTypes.STRING,
      status: {
        // type: DataTypes.ENUM('active', 'blocked'),
        type: 'enum_users_status',
        allowNull: false,
        defaultValue: 'active',
      },
      role: {
        // type: DataTypes.ENUM('admin', 'buyer'),
        type: 'enum_users_role',
        allowNull: false,
        defaultValue: 'buyer',
      },
      password: DataTypes.STRING,
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
      modelName: 'User',
      paranoid: true,
    }
  );

  return User; // Returning the User model here
};
