import User from '../models/User';

export async function findOne(email: string) {
  const user = await User.findOne({ where: { email } });
  return user;
}

export function placeholder() {}
