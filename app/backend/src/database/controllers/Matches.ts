import { Request, Response } from 'express';
import {
  filterFindAll,
  findAll,
  goalsUpdate,
  insertNew,
  statusUpdate,
} from '../services/Matches';

export async function getAllMatches(req: Request, res: Response) {
  const { inProgress } = req.query;
  let teams;
  if (inProgress === undefined) {
    teams = await findAll();
    return res.status(200).json(teams);
  }
  if (inProgress === 'true') {
    teams = await filterFindAll(true);
    return res.status(200).json(teams);
  }
  teams = await filterFindAll(false);
  return res.status(200).json(teams);
}

export async function insertNewMatch(req: Request, res: Response) {
  const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = req.body;
  const match = await insertNew(
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
  );
  return res.status(201).json(match);
}

export async function updateMatch(req: Request, res: Response) {
  const { id } = req.params;
  await statusUpdate(Number(id));
  return res.status(200).json({ message: 'Finished' });
}

export async function updateGoals(req: Request, res: Response) {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  await goalsUpdate(Number(id), homeTeamGoals, awayTeamGoals);
  return res.status(200).json({ message: 'Updated' });
}
