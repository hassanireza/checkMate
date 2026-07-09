/* eslint-disable no-console */
import { ChessEngine } from '../src/engine/ChessEngine';
import { PUZZLES } from '../src/data/puzzles';
import type { Color } from '../src/types/chess';

let allOk = true;

for (const p of PUZZLES) {
  const engine = new ChessEngine(p.fen);
  let turn: Color = p.turn;
  let ok = true;
  let msg = '';

  for (let i = 0; i < p.solution.length; i += 1) {
    const step = p.solution[i];
    const from = ChessEngine.squareToCoordinate(step.from);
    const to = ChessEngine.squareToCoordinate(step.to);
    const piece = engine.getCell(from.row, from.col);

    if (!piece) {
      ok = false;
      msg = `no piece at ${step.from} (step ${i})`;
      break;
    }
    if (piece.color !== turn) {
      ok = false;
      msg = `wrong color piece to move at step ${i}`;
      break;
    }
    if (!engine.isLegalDestination(from, to)) {
      ok = false;
      msg = `illegal move ${step.notation} at step ${i}`;
      break;
    }

    engine.applyMove(from, to);
    const opponent: Color = turn === 'w' ? 'b' : 'w';
    const isLast = i === p.solution.length - 1;

    if (isLast) {
      if (!engine.isCheckmate(opponent)) {
        ok = false;
        msg = 'final move does not deliver checkmate';
        break;
      }
    } else if (engine.isCheckmate(opponent)) {
      ok = false;
      msg = `checkmate delivered early at step ${i}`;
      break;
    }

    turn = opponent;
  }

  console.log(`${ok ? 'OK  ' : 'FAIL'}  #${p.id} ${p.title}${ok ? '' : ` -- ${msg}`}`);
  if (!ok) allOk = false;
}

console.log(allOk ? 'ALL PUZZLES VALID' : 'VALIDATION FAILED');
if (!allOk) process.exit(1);
