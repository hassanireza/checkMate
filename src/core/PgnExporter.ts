import type { MoveHistoryEntry, Puzzle } from '../types/chess';

/**
 * Builds a minimal, standards-shaped PGN transcript for a solved puzzle so
 * a player can export the line and paste it into any chess software.
 */
export class PgnExporter {
  build(puzzle: Puzzle, history: MoveHistoryEntry[], solvedAt: Date = new Date()): string {
    const headers = [
      `[Event "CHECKMATE Puzzle Collection"]`,
      `[Site "checkmate.app"]`,
      `[Date "${solvedAt.toISOString().slice(0, 10).replace(/-/g, '.')}"]`,
      `[Round "${puzzle.id}"]`,
      `[White "${puzzle.turn === 'w' ? 'Player' : 'Puzzle'}"]`,
      `[Black "${puzzle.turn === 'b' ? 'Player' : 'Puzzle'}"]`,
      `[FEN "${puzzle.fen}"]`,
      `[SetUp "1"]`,
      `[Result "*"]`,
    ].join('\n');

    const movetext = history
      .reduce<string[]>((lines, entry, i) => {
        if (i % 2 === 0) {
          lines.push(`${Math.floor(i / 2) + 1}. ${entry.notation}`);
        } else {
          lines[lines.length - 1] += ` ${entry.notation}`;
        }
        return lines;
      }, [])
      .join(' ');

    return `${headers}\n\n${movetext} *\n`;
  }

  download(puzzle: Puzzle, history: MoveHistoryEntry[]): void {
    const pgn = this.build(puzzle, history);
    const blob = new Blob([pgn], { type: 'application/x-chess-pgn' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `checkmate-puzzle-${puzzle.id}.pgn`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export const pgnExporter = new PgnExporter();
