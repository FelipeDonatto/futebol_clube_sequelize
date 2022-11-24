import { Router, Request, Response } from 'express';
import { getTeamById, getAllTeams } from '../database/controllers/Team';

const teamsRoute = Router();

teamsRoute.get('/', (req: Request, res: Response) => getAllTeams(req, res));
teamsRoute.get('/:id', (req: Request, res: Response) => getTeamById(req, res));

export default teamsRoute;
