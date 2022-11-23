import * as JWT from 'jsonwebtoken';
import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { findOne } from '../services/User';

export async function userLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const user = await findOne(email);
  const userData = user?.dataValues;
  const checkPassword = await compare(password, userData.password);

  if (user === null || !checkPassword) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  return res.status(200).json({
    token: JWT.sign({ data: { userData } }, process.env.JWT_SECRET as string, {
      expiresIn: '24h',
    }),
  });
}

export function placeholder() {}
