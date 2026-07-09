import type { GameEngine, GameSnapshot } from '../core/GameEngine';
import { Header } from './Header';
import { Board } from './Board';
import { InfoPanel } from './InfoPanel';
import { AchievementToastStack } from './AchievementToast';

interface GameScreenProps {
  engine: GameEngine;
  snapshot: GameSnapshot;
  hidden: boolean;
}

export function GameScreen({ engine, snapshot, hidden }: GameScreenProps) {
  return (
    <section className={`screen screen-game${hidden ? ' hidden' : ''}`} aria-hidden={hidden}>
      <Header engine={engine} snapshot={snapshot} />
      <main className="game-main">
        <div className="board-col">
          <Board snapshot={snapshot} onSelectSquare={(r, c) => engine.selectSquare(r, c)} />
          <div className="board-footer">
            <div className="turn-badge">{snapshot.puzzle.turn === 'w' ? 'White' : 'Black'} to move</div>
            <div className="move-dots">
              {snapshot.puzzle.solution
                .map((_, i) => i)
                .filter((i) => i % 2 === 0)
                .map((stepIdx) => (
                  <div
                    key={stepIdx}
                    className={`move-dot${stepIdx < snapshot.moveNum ? ' used' : stepIdx === snapshot.moveNum ? ' filled' : ''}`}
                  />
                ))}
            </div>
          </div>
        </div>
        <InfoPanel engine={engine} snapshot={snapshot} />
      </main>
      <AchievementToastStack achievements={snapshot.newAchievements} />
    </section>
  );
}
