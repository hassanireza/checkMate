import { describe, expect, it } from 'vitest';
import { ScoreService } from './ScoreService';
import { PuzzleRepository } from './PuzzleRepository';
import { PUZZLES } from '../data/puzzles';

describe('ScoreService', () => {
  const scoreService = new ScoreService();

  it('rewards a fast, unaided solve more than a hinted one', () => {
    const fast = scoreService.computePuzzleScore('easy', false, 5000);
    const hinted = scoreService.computePuzzleScore('easy', true, 5000);
    expect(fast > hinted).toBe(true);
  });

  it('adds a difficulty bonus for harder puzzles', () => {
    const easy = scoreService.computePuzzleScore('easy', false, 20000);
    const hard = scoreService.computePuzzleScore('hard', false, 20000);
    expect(hard > easy).toBe(true);
  });
});

describe('PuzzleRepository', () => {
  it('produces the same Daily Challenge puzzle for the same calendar date', () => {
    const repo = new PuzzleRepository(PUZZLES);
    const date = new Date('2026-07-09T00:00:00.000Z');
    const first = repo.getDailyChallenge(date);
    const second = repo.getDailyChallenge(date);
    expect(first.id === second.id).toBe(true);
  });

  it('includes every puzzle exactly once in a shuffled run', () => {
    const repo = new PuzzleRepository(PUZZLES);
    const run = repo.buildShuffledRun(() => 0.5);
    expect(run.length === PUZZLES.length).toBe(true);
    const ids = new Set(run.map((p) => p.id));
    expect(ids.size === PUZZLES.length).toBe(true);
  });
});
