import * as JWT from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

type MyToken = {
  data: {
    userData: {
      role: string;
    };
  };
  iat: number;
  exp: number;
};

export default async function Token(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET as string;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const payload = JWT.verify(token, secret) as MyToken;
    if (payload) {
      return next();
    }
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
}
