import { Request, Response } from 'express';
import { findAll, findOne } from '../services/Teams';

export async function getAllTeams(req: Request, res: Response) {
  const teams = await findAll();
  return res.status(200).json(teams);
}
export async function getTeamById(req: Request, res: Response) {
  const { id } = req.params;
  const team = await findOne(Number(id));
  return res.status(200).json(team);
}
