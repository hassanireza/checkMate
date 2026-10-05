import type { GameEngine } from '../core/GameEngine';
import { IconSound } from './icons';

const TICKER_ITEMS = [
  'Morphy · 1858 · Opera House Game',
  'Back-Rank · Rook Ladder',
  'Corner Mate · Queen and Knight',
  'Diagonal Trap · Bishop and Rook',
  'Edge Pattern · Knight and Rook',
  'Pawn-Shield Break · Queen and Bishop',
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
        <span className="intro-piece p1">♜</span>
        <span className="intro-piece p2">♞</span>
        <span className="intro-piece p3">♝</span>
      </div>

      <div className="intro-footer-links">
        <button
          type="button"
          className="icon-btn"
          aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
          onClick={() => engine.toggleSound()}
        >
          <IconSound muted={!soundEnabled} />
        </button>
      </div>

      <div className="intro-content">
        {/* Brand lockup */}
        <div className="intro-brand">
          <span className="intro-brand-mark">♜</span>
          <span className="intro-brand-name">Woodland Chess</span>
        </div>

        <div className="intro-eyebrow">The Grand Masters Collection</div>

        <h1 className="intro-title">
          Check<em>mate</em>
        </h1>

        <p className="intro-sub">
          Twelve classic mating patterns drawn from the history of the game.
          Each position demands a forced line — no room to improvise.
        </p>

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

        <div className="intro-scroll-hint">
          a single position. a forced line. no room to improvise.
        </div>
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
