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

  if (user === null) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  const userData = user?.dataValues;
  const checkPassword = await compare(password, userData.password);

  if (!checkPassword) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  return res.status(200).json({
    token: JWT.sign({ data: { userData } }, process.env.JWT_SECRET as string, {
      expiresIn: '24h',
    }),
  });
}

type MyToken = {
  data: {
    userData: {
      role: string;
    };
  };
  iat: number;
  exp: number;
};

export async function validateToken(req: Request, res: Response) {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET as string;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const payload = JWT.verify(token, secret) as MyToken;
    if (payload) {
      return res.status(200).json({ role: payload.data.userData.role });
    }
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
}
