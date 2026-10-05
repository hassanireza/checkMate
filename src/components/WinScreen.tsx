import type { GameEngine, GameSnapshot } from '../core/GameEngine';
import { IconCrown } from './icons';

interface WinScreenProps {
  engine: GameEngine;
  snapshot: GameSnapshot;
  hidden: boolean;
}

export function WinScreen({ engine, snapshot, hidden }: WinScreenProps) {
  const isDaily = snapshot.mode === 'daily';

  return (
    <section className={`screen screen-win${hidden ? ' hidden' : ''}`} aria-hidden={hidden}>
      <div className="win-content">
        {/* Brand */}
        <div className="win-brand">
          <span className="win-brand-mark">♜</span>
          <span className="win-brand-name">Woodland Chess</span>
        </div>

        <div className="win-crown">
          <IconCrown />
        </div>

        <div className="win-label">
          {isDaily ? 'Daily Challenge Complete' : 'All Puzzles Solved'}
        </div>

        <h2 className="win-title">
          {isDaily ? 'Return' : 'Grand Master'}
        </h2>

        <div className="win-score-wrap">
          <span className="win-score-num">{snapshot.score}</span>
          <span className="win-score-lbl">points</span>
        </div>

        <div className="win-actions">
          <button type="button" className="btn-start" onClick={() => engine.startRun()}>
            Play Again
          </button>
          <button type="button" className="btn-daily" onClick={() => engine.goHome()}>
            Return Home
          </button>
        </div>
      </div>
    </section>
  );
}
