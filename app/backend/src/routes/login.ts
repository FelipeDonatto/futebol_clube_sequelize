import { Router, Request, Response } from 'express';
import * as User from '../database/controllers/User';

const loginRoute = Router();

loginRoute.post('/', (req: Request, res: Response) => User.userLogin(req, res));

loginRoute.get(
  '/validate',
  (req: Request, res: Response) => User.validateToken(req, res),
  // eslint-disable-next-line function-paren-newline
);

export default loginRoute;
