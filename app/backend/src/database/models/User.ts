import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    username: {
      allowNull: false,
      type: STRING(30),
    },
    role: {
      allowNull: false,
      type: STRING(30),
    },
    email: {
      allowNull: false,
      type: STRING(50),
    },
    password: {
      type: STRING(100),
    },
  },
  {
    sequelize: db,
    modelName: 'User',
    timestamps: false,
    tableName: 'users',
  },
);

export default User;
