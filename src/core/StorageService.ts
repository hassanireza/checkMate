import type { PlayerProgress } from '../types/chess';

const STORAGE_KEY = 'checkmate.progress.v1';

const DEFAULT_PROGRESS: PlayerProgress = {
  totalSolved: 0,
  bestStreak: 0,
  bestScore: 0,
  fastestSolveMs: null,
  unlockedAchievements: [],
  soundEnabled: true,
  theme: 'parchment',
  lastDailyChallengeDate: null,
  dailyChallengeStreak: 0,
};

/**
 * StorageService is the single place the app touches localStorage. All
 * reads are defensive: a corrupt or missing record silently falls back to
 * defaults rather than throwing, so a bad payload never crashes the app.
 */
export class StorageService {
  private cache: PlayerProgress | null = null;

  load(): PlayerProgress {
    if (this.cache) return this.cache;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this.cache = { ...DEFAULT_PROGRESS };
        return this.cache;
      }
      const parsed = JSON.parse(raw) as Partial<PlayerProgress>;
      this.cache = { ...DEFAULT_PROGRESS, ...parsed };
      return this.cache;
    } catch {
      this.cache = { ...DEFAULT_PROGRESS };
      return this.cache;
    }
  }

  save(progress: PlayerProgress): void {
    this.cache = progress;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Storage may be unavailable (private browsing, quota exceeded, etc).
      // The app continues to function in-memory for the session.
    }
  }

  update(patch: Partial<PlayerProgress>): PlayerProgress {
    const next = { ...this.load(), ...patch };
    this.save(next);
    return next;
  }
}

export const storageService = new StorageService();
