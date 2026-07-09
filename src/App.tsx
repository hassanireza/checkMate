import { useGameEngine } from './hooks/useGameEngine';
import { IntroScreen } from './components/IntroScreen';
import { GameScreen } from './components/GameScreen';
import { WinScreen } from './components/WinScreen';

export function App() {
  const { engine, snapshot } = useGameEngine();

  return (
    <div className="plate" id="app">
      <div className="texture-grain" />
      <div className="texture-condensation" />
      <div className="texture-vignette" />
      <div className="plate-frame-lines" aria-hidden="true" />
      <div className="plate-caption" aria-hidden="true">
        Checkmate &middot; Plate No. {String(snapshot.index + 1).padStart(2, '0')}
      </div>
      <div className="plate-registration" aria-hidden="true">
        135mm &middot; Monochrome
      </div>

      <IntroScreen engine={engine} soundEnabled={snapshot.soundEnabled} hidden={snapshot.screen !== 'intro'} />
      <GameScreen engine={engine} snapshot={snapshot} hidden={snapshot.screen !== 'game'} />
      <WinScreen engine={engine} snapshot={snapshot} hidden={snapshot.screen !== 'win'} />
    </div>
  );
}
