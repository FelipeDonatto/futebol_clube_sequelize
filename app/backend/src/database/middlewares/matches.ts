import { Request, Response, NextFunction } from 'express';
import { findOne } from '../services/Teams';

export default async function teamsIds(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { homeTeam, awayTeam } = req.body;

  const teamOne = await findOne(Number(homeTeam));
  const teamTwo = await findOne(Number(awayTeam));
  if (teamOne === null || teamTwo === null) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  return next();
}
