import { describe, expect, it } from 'vitest';
import { ChessEngine } from './ChessEngine';

describe('ChessEngine', () => {
  it('parses the standard starting position', () => {
    const engine = new ChessEngine('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    expect(engine.getCell(0, 0)).toEqual({ color: 'b', type: 'R' });
    expect(engine.getCell(7, 4)).toEqual({ color: 'w', type: 'K' });
    expect(engine.getCell(3, 3)).toBeNull();
  });

  it('generates correct legal moves for a rook in the open', () => {
    const engine = new ChessEngine('7k/8/8/8/3R4/8/8/K7 w - - 0 1');
    const moves = engine.getLegalMoves(4, 3);
    expect(moves.length).toBe(14);
  });

  it('prevents a move that would leave the king in check', () => {
    const engine = new ChessEngine('4k3/8/8/8/8/8/4r3/4K3 w - - 0 1');
    const kingMoves = engine.getLegalMoves(7, 4);
    expect(kingMoves.some((m) => m.row === 7 && m.col === 5)).toBe(true);
    expect(kingMoves.some((m) => m.row === 6 && m.col === 5)).toBe(false);
  });

  it('detects checkmate correctly', () => {
    const engine = new ChessEngine('6k1/5ppp/8/8/8/K7/8/R7 w - - 0 1');
    engine.applyMove({ row: 7, col: 0 }, { row: 0, col: 0 });
    expect(engine.isCheckmate('b')).toBe(true);
  });

  it('does not falsely report checkmate when a legal escape exists', () => {
    const engine = new ChessEngine('6k1/8/8/8/8/8/8/R6K w - - 0 1');
    engine.applyMove({ row: 7, col: 0 }, { row: 0, col: 0 });
    expect(engine.isCheckmate('b')).toBe(false);
  });

  it('converts between algebraic squares and coordinates losslessly', () => {
    const square = 'e4';
    const coord = ChessEngine.squareToCoordinate(square);
    expect(ChessEngine.coordinateToSquare(coord.row, coord.col)).toBe(square);
  });
});
