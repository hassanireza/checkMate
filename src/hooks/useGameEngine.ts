import { useEffect, useRef, useSyncExternalStore } from 'react';
import { GameEngine } from '../core/GameEngine';

/**
 * useGameEngine instantiates a single GameEngine for the lifetime of the
 * component tree and subscribes to it via useSyncExternalStore. The
 * engine itself is plain OOP with no React dependency; this hook is the
 * only bridge between the two worlds.
 */
export function useGameEngine() {
  const engineRef = useRef<GameEngine | null>(null);
  if (!engineRef.current) {
    engineRef.current = new GameEngine();
  }
  const engine = engineRef.current;

  const snapshot = useSyncExternalStore(engine.subscribe.bind(engine), engine.getSnapshot);

  useEffect(() => () => engine.dispose(), [engine]);

  return { engine, snapshot };
}
