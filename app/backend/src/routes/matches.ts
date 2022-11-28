import { Router, Request, Response } from 'express';
import teamsIds from '../database/middlewares/matches';
import EqualTeams from '../database/middlewares/teams';
import Token from '../database/middlewares/token';
import {
  getAllMatches,
  insertNewMatch,
  updateMatch,
} from '../database/controllers/Matches';

const matchesRoute = Router();

matchesRoute.get('/', (req: Request, res: Response) => getAllMatches(req, res));
matchesRoute.post(
  '/',
  Token,
  EqualTeams,
  teamsIds,
  (req: Request, res: Response) => {
    console.log();
    insertNewMatch(req, res);
  },
);
matchesRoute.patch('/:id/finish', (req: Request, res: Response) => {
  console.log();
  updateMatch(req, res);
});

export default matchesRoute;
