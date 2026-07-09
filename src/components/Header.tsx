import type { GameEngine, GameSnapshot } from '../core/GameEngine';

interface HeaderProps {
  engine: GameEngine;
  snapshot: GameSnapshot;
}

export function Header({ engine, snapshot }: HeaderProps) {
  const progressPct = (snapshot.index / snapshot.puzzles.length) * 100;

  return (
    <header className="hdr">
      <button type="button" className="hdr-brand" onClick={() => engine.goHome()}>
        CHECK<em>MATE</em>
      </button>
      <div className="hdr-center">
        <div className="hdr-puzzle-num">{String(snapshot.index + 1).padStart(2, '0')}</div>
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>
      <div className="hdr-score">
        <span className="score-label">Score</span>
        <span className="score-val">{snapshot.score}</span>
      </div>
    </header>
  );
}
