import { Request, Response } from 'express';
import { findAll } from '../services/Matches';

export async function getAllMatches(req: Request, res: Response) {
  const teams = await findAll();
  return res.status(200).json(teams);
}

export async function getTeamById(req: Request, res: Response) {
  const { id } = req.params;
  return res.status(200).json(id);
}
