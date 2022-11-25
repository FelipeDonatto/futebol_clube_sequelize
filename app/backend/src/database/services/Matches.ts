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

export async function findOne(id: number) {
  const teams = await Matches.findOne({ where: { id } });
  return teams;
}
