import { useGameEngine } from './hooks/useGameEngine';
import { IntroScreen } from './components/IntroScreen';
import { GameScreen } from './components/GameScreen';
import { WinScreen } from './components/WinScreen';

export function App() {
  const { engine, snapshot } = useGameEngine();

  return (
    <div className="plate" id="app">
      {/* Subtle noise texture layer */}
      <div className="texture-grain" />

      <IntroScreen engine={engine} soundEnabled={snapshot.soundEnabled} hidden={snapshot.screen !== 'intro'} />
      <GameScreen engine={engine} snapshot={snapshot} hidden={snapshot.screen !== 'game'} />
      <WinScreen engine={engine} snapshot={snapshot} hidden={snapshot.screen !== 'win'} />
    </div>
  );
}
