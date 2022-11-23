import { Router, Request, Response } from 'express';
import * as User from '../database/controllers/User';

const loginRoute = Router();

loginRoute.post('/', (req: Request, res: Response) => User.userLogin(req, res));

export default loginRoute;
