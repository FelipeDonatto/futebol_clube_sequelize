import Teams from '../models/Teams';

export async function findAll() {
  const teams = await Teams.findAll();
  return teams;
}
export async function findOne(id: number) {
  const teams = await Teams.findOne({ where: { id } });
  return teams;
}
