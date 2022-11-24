import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    teamName: {
      allowNull: false,
      type: STRING(30),
      field: 'team_name',
    },
  },
  {
    sequelize: db,
    modelName: 'Teams',
    timestamps: false,
    tableName: 'teams',
  },
);

export default Teams;
