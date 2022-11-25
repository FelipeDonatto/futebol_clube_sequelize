import { Router, Request, Response } from 'express';
import { getAllMatches } from '../database/controllers/Matches';

const matchesRoute = Router();

matchesRoute.get('/', (req: Request, res: Response) => getAllMatches(req, res));

export default matchesRoute;
