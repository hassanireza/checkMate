import type { GameEngine } from '../core/GameEngine';
import { IconSound } from './icons';

const TICKER_ITEMS = [
  'Morphy \u00b7 1858 \u00b7 Opera House Game',
  'Back-Rank \u00b7 Rook Ladder',
  'Corner Mate \u00b7 Queen and Knight',
  'Diagonal Trap \u00b7 Bishop and Rook',
  'Edge Pattern \u00b7 Knight and Rook',
  'Pawn-Shield Break \u00b7 Queen and Bishop',
];

interface IntroScreenProps {
  engine: GameEngine;
  soundEnabled: boolean;
  hidden: boolean;
}

export function IntroScreen({ engine, soundEnabled, hidden }: IntroScreenProps) {
  return (
    <section className={`screen screen-intro${hidden ? ' hidden' : ''}`} aria-hidden={hidden}>
      <div className="intro-field" />
      <div className="intro-pieces" aria-hidden="true">
        <span className="intro-piece p1">&#9819;</span>
        <span className="intro-piece p2">&#9822;</span>
        <span className="intro-piece p3">&#9821;</span>
      </div>

      <div className="intro-footer-links">
        <button type="button" className="icon-btn" aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'} onClick={() => engine.toggleSound()}>
          <IconSound muted={!soundEnabled} />
        </button>
      </div>

      <div className="intro-content">
        <div className="intro-eyebrow">The Grand Masters Collection</div>
        <h1 className="intro-title">
          Check<em>mate</em>
        </h1>
        <p className="intro-sub">Twelve classic mating patterns, drawn from the history of the game. Checkmate in two.</p>
        <div className="intro-meta">
          <span className="meta-pill">12 Puzzles</span>
          <span className="meta-dot" />
          <span className="meta-pill">Classic Patterns</span>
          <span className="meta-dot" />
          <span className="meta-pill">Checkmate in 2</span>
        </div>
        <div className="intro-actions">
          <button type="button" className="btn-start" onClick={() => engine.startRun()}>
            Begin Playing
          </button>
          <button type="button" className="btn-daily" onClick={() => engine.startDaily()}>
            Daily Challenge
          </button>
        </div>
        <div className="intro-scroll-hint">a single position. a forced line. no room to improvise.</div>
      </div>

      <div className="intro-ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={`${item}-${i}`}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
