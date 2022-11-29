import { findAll as findTeams } from './Teams';
import { findAll as findMatches } from './Matches';

export type leaderboard = {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
};

//  type teamsData = [{
//    victories: number;
//    draws: number;
//    defeats: number;
//  }];

export default async function getMatches() {
  const teams = (await findTeams()).map((e) => e.dataValues);
  const matches = (await findMatches())
    .filter((e) => e.inProgress === false)
    .map((e) => ({
      id: e.id,
      homeTeam: e.dataValues.homeTeam,
      homeTeamGoals: e.dataValues.homeTeamGoals,
      awayTeam: e.dataValues.awayTeam,
      awayTeamGoals: e.dataValues.awayTeamGoals,
    }));
  const filteredMatches = teams.map((team) =>
    matches.filter((match) => match.homeTeam === team.id));
  return filteredMatches;
}

export async function getGoals() {
  const filteredMatches = await getMatches();
  const goalsOwn: number[] = []; const goalsFavor: number[] = [];
  let teamGoals = 0; let awayTeamGoals = 0;
  filteredMatches.forEach((teamAr, i) => {
    teamAr.forEach((team) => {
      if (team.homeTeam === i + 1) {
        teamGoals += team.homeTeamGoals;
        awayTeamGoals += team.awayTeamGoals;
      }
    });
    goalsFavor.push(teamGoals);
    teamGoals = 0;
    goalsOwn.push(awayTeamGoals);
    awayTeamGoals = 0;
  });
  return { goalsOwn, goalsFavor };
}

export async function getVictories() {
  const filteredMatches = await getMatches();
  let victories = 0; let draws = 0; let defeats = 0; let points = 0;
  const teamStats = [{ victories: 0, draws: 0, defeats: 0, points: 0 }];
  filteredMatches.forEach((teamAr) => {
    teamAr.forEach((team) => {
      if (team.homeTeamGoals > team.awayTeamGoals) {
        victories += 1; points += 3;
      }
      if (team.homeTeamGoals < team.awayTeamGoals) {
        defeats += 1;
      }
      if (team.homeTeamGoals === team.awayTeamGoals) {
        draws += 1; points += 1;
      }
    });
    teamStats.push({ victories, draws, defeats, points });
    victories = 0; draws = 0; defeats = 0; points = 0;
  }); teamStats.shift(); return teamStats;
}

export async function mountLeaderboard() {
  const victories = await getVictories(); const matches = (await getMatches()).map((e) => e.length);
  const goal = await getGoals(); const team = (await findTeams()).map((e) => e.dataValues.teamName);
  const leaderboard = team.map((teams, i) => ({
    name: teams,
    totalPoints: victories[i].points,
    totalGames: matches[i],
    totalVictories: victories[i].victories,
    totalDraws: victories[i].draws,
    totalLosses: victories[i].defeats,
    goalsFavor: goal.goalsFavor[i],
    goalsOwn: goal.goalsOwn[i],
    goalsBalance: (goal.goalsFavor[i] - goal.goalsOwn[i]),
    efficiency: ((victories[i].points / (matches[i] * 3)) * 100).toFixed(2),
  }));
  return leaderboard;
}
