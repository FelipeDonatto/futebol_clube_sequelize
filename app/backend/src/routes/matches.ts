import { Router, Request, Response } from 'express';
import Token from '../database/middlewares/token';
import { getAllMatches, insertNewMatch } from '../database/controllers/Matches';

const matchesRoute = Router();

matchesRoute.get('/', (req: Request, res: Response) => getAllMatches(req, res));
matchesRoute.post('/', Token, (req: Request, res: Response) => {
  console.log();
  insertNewMatch(req, res);
});

export default matchesRoute;
