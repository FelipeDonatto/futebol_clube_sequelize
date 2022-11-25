import { Request, Response } from 'express';
import { filterFindAll, findAll } from '../services/Matches';

export async function getAllMatches(req: Request, res: Response) {
  const { inProgress } = req.query;
  let teams;
  if (!inProgress) {
    teams = await findAll();
  } else {
    teams = await filterFindAll(Boolean(inProgress));
  }
  return res.status(200).json(teams);
}

export async function getTeamById(req: Request, res: Response) {
  const { id } = req.params;
  return res.status(200).json(id);
}
