import { PUZZLES } from '../data/puzzles';
import type { Achievement, PlayerProgress } from '../types/chess';

const TOTAL_PUZZLES = PUZZLES.length;

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-blood',
    title: 'First Rite',
    description: 'Solve your first puzzle.',
    icon: 'seal',
    tier: 'bronze',
  },
  {
    id: 'streak-5',
    title: 'Unbroken Line',
    description: 'Reach a streak of five puzzles solved in a row.',
    icon: 'flame',
    tier: 'silver',
  },
  {
    id: 'no-hints',
    title: 'Silent Reading',
    description: 'Solve a puzzle without requesting a hint.',
    icon: 'scroll',
    tier: 'bronze',
  },
  {
    id: 'speed-solver',
    title: 'Quick Hand',
    description: 'Solve a puzzle in under fifteen seconds.',
    icon: 'hourglass',
    tier: 'silver',
  },
  {
    id: 'grandmaster',
    title: 'Grand Master',
    description: `Solve all ${TOTAL_PUZZLES} puzzles in a single run.`,
    icon: 'crown',
    tier: 'gold',
  },
  {
    id: 'streak-25',
    title: 'Long Vigil',
    description: 'Reach a streak of twenty-five puzzles solved in a row.',
    icon: 'flame',
    tier: 'gold',
  },
  {
    id: 'solved-10',
    title: 'Apprentice',
    description: 'Solve ten different puzzles.',
    icon: 'seal',
    tier: 'bronze',
  },
  {
    id: 'solved-50',
    title: 'Journeyman',
    description: `Solve fifty different puzzles out of ${TOTAL_PUZZLES}.`,
    icon: 'scroll',
    tier: 'silver',
  },
  {
    id: 'solved-100',
    title: 'Centurion',
    description: `Solve every one of the ${TOTAL_PUZZLES} puzzles at least once, across any number of runs.`,
    icon: 'crown',
    tier: 'gold',
  },
  {
    id: 'daily-devotion',
    title: 'Daily Devotion',
    description: 'Complete the Daily Challenge three days in a row.',
    icon: 'droplet',
    tier: 'gold',
  },
];

export interface AchievementContext {
  streak: number;
  solvedWithoutHint: boolean;
  solveDurationMs: number;
  allPuzzlesComplete: boolean;
  dailyChallengeStreak: number;
  isFirstSolveEver: boolean;
  /** Distinct puzzles solved over all sessions, including the one just completed. */
  uniqueSolved: number;
}

/**
 * AchievementService evaluates the current run against the achievement
 * catalog and returns any newly unlocked entries. It is intentionally
 * stateless, the caller supplies the player's already-unlocked ids and
 * receives back only what changed, so persistence stays owned by
 * StorageService.
 */
export class AchievementService {
  evaluate(context: AchievementContext, progress: PlayerProgress): Achievement[] {
    const unlocked = new Set(progress.unlockedAchievements);
    const newly: Achievement[] = [];

    const unlock = (id: string) => {
      if (!unlocked.has(id)) {
        unlocked.add(id);
        const achievement = ACHIEVEMENTS.find((a) => a.id === id);
        if (achievement) newly.push(achievement);
      }
    };

    if (context.isFirstSolveEver) unlock('first-blood');
    if (context.streak >= 5) unlock('streak-5');
    if (context.streak >= 25) unlock('streak-25');
    if (context.uniqueSolved >= 10) unlock('solved-10');
    if (context.uniqueSolved >= 50) unlock('solved-50');
    if (context.uniqueSolved >= TOTAL_PUZZLES) unlock('solved-100');
    if (context.solvedWithoutHint) unlock('no-hints');
    if (context.solveDurationMs > 0 && context.solveDurationMs < 15000) unlock('speed-solver');
    if (context.allPuzzlesComplete) unlock('grandmaster');
    if (context.dailyChallengeStreak >= 3) unlock('daily-devotion');

    return newly;
  }
}

export const achievementService = new AchievementService();
