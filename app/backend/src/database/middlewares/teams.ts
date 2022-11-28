import { Request, Response, NextFunction } from 'express';

export default async function EqualTeams(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { homeTeam, awayTeam } = req.body;
  if (Number(homeTeam) === Number(awayTeam)) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }
  next();
}
