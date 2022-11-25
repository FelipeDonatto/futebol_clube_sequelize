import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
  declare teamHome?: { teamName: string };
  declare teamAway?: { teamName: string };
}

Matches.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    homeTeam: {
      type: INTEGER,
      references: {
        model: 'Matches',
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: false,
    },
    homeTeamGoals: {
      allowNull: false,
      type: INTEGER,
    },
    awayTeam: {
      type: INTEGER,
      references: {
        model: 'Matches',
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: false,
    },
    awayTeamGoals: {
      allowNull: false,
      type: INTEGER,
    },
    inProgress: {
      allowNull: false,
      type: BOOLEAN,
    },
  },
  {
    sequelize: db,
    modelName: 'Matches',
    timestamps: false,
    underscored: true,
    tableName: 'matches',
  },
);

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });
Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Matches;
