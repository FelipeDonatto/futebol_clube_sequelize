import { Router, Request, Response } from 'express';
import getLeaderboard from '../database/controllers/leaderboard';

const leaderboardRoute = Router();

leaderboardRoute.get('/home', (_req: Request, _res: Response) => {
  getLeaderboard(_req, _res);
});

export default leaderboardRoute;
