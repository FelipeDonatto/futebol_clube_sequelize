import Matches from '../models/Matches';

export async function findAll() {
  const matches = await Matches.findAll({
    include: {
      all: true,
      attributes: {
        exclude: ['id'],
      },
    },
  });
  return matches;
}

export async function filterFindAll(filter: boolean) {
  const matches = await Matches.findAll({
    where: {
      inProgress: filter,
    },
    include: {
      all: true,
      attributes: {
        exclude: ['id'],
      },
    },
  });
  return matches;
}

export async function findOne(id: number) {
  const match = await Matches.findOne({ where: { id } });
  return match;
}

export async function insertNew(
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
) {
  const match = await Matches.create({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
    inProgress: true,
  });
  return match;
}
