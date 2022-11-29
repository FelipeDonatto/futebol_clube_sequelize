import { Request, Response } from 'express';
import sort from '../middlewares/leaderboard';
import { mountLeaderboard } from '../services/leaderboards';

export default async function getLeaderboard(_req: Request, res: Response) {
  const leaderboard = await mountLeaderboard();
  const sortedLeaderboard = sort(leaderboard);
  return res.status(200).json(sortedLeaderboard);
}
