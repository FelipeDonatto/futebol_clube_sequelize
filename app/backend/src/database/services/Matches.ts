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

export async function statusUpdate(id: number) {
  const match = await findOne(id);
  if (match !== null) {
    const updatedMatch = await match.update({
      inProgress: false,
    });
    return updatedMatch;
  }
}

export async function goalsUpdate(
  id: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
) {
  const match = await findOne(id);
  if (match !== null) {
    const updatedMatch = await match.update({
      homeTeamGoals,
      awayTeamGoals,
    });
    return updatedMatch;
  }
}
