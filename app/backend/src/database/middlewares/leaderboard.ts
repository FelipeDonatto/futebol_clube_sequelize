import { leaderboard } from '../services/leaderboards';

export default function sort(arrToSort: leaderboard[]) {
  const values = [
    'totalPoints',
    'totalVictories',
    'goalsBalance',
    'goalsFavor',
    'goalsOwn',
  ];
  return arrToSort.sort((a: any, b: any) => {
    for (let i = 0; i < values.length; i += 1) {
      if (a[`${values[i]}`] < b[`${values[i]}`]) return 1;
      if (a[`${values[i]}`] > b[`${values[i]}`]) return -1;
    }
    return 0;
  });
}
