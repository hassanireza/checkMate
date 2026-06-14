'use strict';

/* ================================================================
   chess-engine.js  —  Self-contained chess engine for CHECKMATE
   
   API surface (what game.js consumes):
     engine.board[r][c]           → {color:'w'|'b', type:'K'|'Q'|...} | null
     engine.turn                  → 'w' | 'b'
     engine.gameStatus            → 'playing'|'check'|'checkmate'|'stalemate'|'draw'
     engine.winner                → 'w' | 'b' | null
     engine.moveHistory[]         → [{mv, notation}]
     engine.capturedPieces        → {w:[...], b:[...]}
     engine.reset()
     engine.getLegalMoves(color)  → [{from:[r,c], to:[r,c], promo?:'Q'|...}]
     engine.makeMove(mv)
     engine.undoLastMove()        → bool
     engine.getBestMove(diff)     → mv | null
     engine.getEvalScore()        → number (+ = white winning)
================================================================ */

const PIECE_VALUES = { P:100, N:320, B:330, R:500, Q:900, K:20000 };

// Piece-square tables (from white's perspective, row 0 = rank 8)
const PST = {
  P: [
     0,  0,  0,  0,  0,  0,  0,  0,
    50, 50, 50, 50, 50, 50, 50, 50,
    10, 10, 20, 30, 30, 20, 10, 10,
     5,  5, 10, 25, 25, 10,  5,  5,
     0,  0,  0, 20, 20,  0,  0,  0,
     5, -5,-10,  0,  0,-10, -5,  5,
     5, 10, 10,-20,-20, 10, 10,  5,
     0,  0,  0,  0,  0,  0,  0,  0
  ],
  N: [
   -50,-40,-30,-30,-30,-30,-40,-50,
   -40,-20,  0,  0,  0,  0,-20,-40,
   -30,  0, 10, 15, 15, 10,  0,-30,
   -30,  5, 15, 20, 20, 15,  5,-30,
   -30,  0, 15, 20, 20, 15,  0,-30,
   -30,  5, 10, 15, 15, 10,  5,-30,
   -40,-20,  0,  5,  5,  0,-20,-40,
   -50,-40,-30,-30,-30,-30,-40,-50
  ],
  B: [
   -20,-10,-10,-10,-10,-10,-10,-20,
   -10,  0,  0,  0,  0,  0,  0,-10,
   -10,  0,  5, 10, 10,  5,  0,-10,
   -10,  5,  5, 10, 10,  5,  5,-10,
   -10,  0, 10, 10, 10, 10,  0,-10,
   -10, 10, 10, 10, 10, 10, 10,-10,
   -10,  5,  0,  0,  0,  0,  5,-10,
   -20,-10,-10,-10,-10,-10,-10,-20
  ],
  R: [
     0,  0,  0,  0,  0,  0,  0,  0,
     5, 10, 10, 10, 10, 10, 10,  5,
    -5,  0,  0,  0,  0,  0,  0, -5,
    -5,  0,  0,  0,  0,  0,  0, -5,
    -5,  0,  0,  0,  0,  0,  0, -5,
    -5,  0,  0,  0,  0,  0,  0, -5,
    -5,  0,  0,  0,  0,  0,  0, -5,
     0,  0,  0,  5,  5,  0,  0,  0
  ],
  Q: [
   -20,-10,-10, -5, -5,-10,-10,-20,
   -10,  0,  0,  0,  0,  0,  0,-10,
   -10,  0,  5,  5,  5,  5,  0,-10,
    -5,  0,  5,  5,  5,  5,  0, -5,
     0,  0,  5,  5,  5,  5,  0, -5,
   -10,  5,  5,  5,  5,  5,  0,-10,
   -10,  0,  5,  0,  0,  0,  0,-10,
   -20,-10,-10, -5, -5,-10,-10,-20
  ],
  K: [
   -30,-40,-40,-50,-50,-40,-40,-30,
   -30,-40,-40,-50,-50,-40,-40,-30,
   -30,-40,-40,-50,-50,-40,-40,-30,
   -30,-40,-40,-50,-50,-40,-40,-30,
   -20,-30,-30,-40,-40,-30,-30,-20,
   -10,-20,-20,-20,-20,-20,-20,-10,
    20, 20,  0,  0,  0,  0, 20, 20,
    20, 30, 10,  0,  0, 10, 30, 20
  ]
};

function pst(type, r, c, color) {
  const idx = color === 'w' ? r * 8 + c : (7 - r) * 8 + c;
  return PST[type] ? PST[type][idx] : 0;
}

/* ── Move object ── */
function createMove(fr, fc, tr, tc, promo) {
  return { from:[fr,fc], to:[tr,tc], promo: promo || null };
}

/* ================================================================
   ChessEngine
================================================================ */
class ChessEngine {
  constructor() {
    this.board = [];
    this.turn = 'w';
    this.gameStatus = 'playing';
    this.winner = null;
    this.moveHistory = [];
    this.capturedPieces = { w:[], b:[] };
    this._castling = { w:{K:true,Q:true}, b:{K:true,Q:true} };
    this._enPassant = null;   // {r,c} target square
    this._stateStack = [];    // for undo
    this.reset();
  }

  /* ── Reset to starting position ── */
  reset() {
    this.board = this._startBoard();
    this.turn = 'w';
    this.gameStatus = 'playing';
    this.winner = null;
    this.moveHistory = [];
    this.capturedPieces = { w:[], b:[] };
    this._castling = { w:{K:true,Q:true}, b:{K:true,Q:true} };
    this._enPassant = null;
    this._stateStack = [];
  }

  _startBoard() {
    const B = Array.from({length:8}, () => Array(8).fill(null));
    const back = ['R','N','B','Q','K','B','N','R'];
    for (let c=0;c<8;c++) {
      B[0][c] = {color:'b', type:back[c]};
      B[1][c] = {color:'b', type:'P'};
      B[6][c] = {color:'w', type:'P'};
      B[7][c] = {color:'w', type:back[c]};
    }
    return B;
  }

  /* ── Get all legal moves for a color ── */
  getLegalMoves(color) {
    const pseudo = this._pseudoMoves(color);
    return pseudo.filter(mv => !this._leavesInCheck(mv, color));
  }

  /* ── Make a move ── */
  makeMove(mv) {
    // Save full state for undo
    const state = {
      board: this.board.map(row => row.map(p => p ? {...p} : null)),
      turn: this.turn,
      gameStatus: this.gameStatus,
      winner: this.winner,
      capturedPieces: { w:[...this.capturedPieces.w], b:[...this.capturedPieces.b] },
      castling: JSON.parse(JSON.stringify(this._castling)),
      enPassant: this._enPassant ? {...this._enPassant} : null
    };
    this._stateStack.push(state);

    const [fr, fc] = mv.from;
    const [tr, tc] = mv.to;
    const piece = this.board[fr][fc];
    const captured = this.board[tr][tc];
    const opp = color => color === 'w' ? 'b' : 'w';

    // Track captures
    if (captured) {
      this.capturedPieces[opp(captured.color)].push({...captured});
    }

    // En passant capture
    this._enPassant = null;
    if (piece.type === 'P') {
      const ep = state.enPassant;
      if (ep && tr === ep.r && tc === ep.c) {
        // Remove the captured pawn
        const capR = fr; // same rank as moving pawn
        this.capturedPieces[opp(this.turn)].push({...this.board[capR][tc]});
        this.board[capR][tc] = null;
      }
      // Set en passant square
      if (Math.abs(tr - fr) === 2) {
        this._enPassant = { r: (fr+tr)/2, c: fc };
      }
    }

    // Castling move
    if (piece.type === 'K' && Math.abs(tc - fc) === 2) {
      if (tc > fc) { // Kingside
        this.board[fr][7] = null;
        this.board[fr][5] = {color:this.turn, type:'R'};
      } else { // Queenside
        this.board[fr][0] = null;
        this.board[fr][3] = {color:this.turn, type:'R'};
      }
    }

    // Move piece
    this.board[tr][tc] = mv.promo ? {color:this.turn, type:mv.promo} : {...piece};
    this.board[fr][fc] = null;

    // Update castling rights
    if (piece.type === 'K') { this._castling[this.turn].K = false; this._castling[this.turn].Q = false; }
    if (piece.type === 'R') {
      if (fr === 7 && fc === 7) this._castling.w.K = false;
      if (fr === 7 && fc === 0) this._castling.w.Q = false;
      if (fr === 0 && fc === 7) this._castling.b.K = false;
      if (fr === 0 && fc === 0) this._castling.b.Q = false;
    }
    // Rook captured on its starting square removes castling right
    if (captured && captured.type === 'R') {
      if (tr === 7 && tc === 7) this._castling.w.K = false;
      if (tr === 7 && tc === 0) this._castling.w.Q = false;
      if (tr === 0 && tc === 7) this._castling.b.K = false;
      if (tr === 0 && tc === 0) this._castling.b.Q = false;
    }

    // Generate notation
    const notation = this._notation(mv, piece, captured, state.board);

    // Switch turn
    this.turn = opp(this.turn);

    // Push to history
    this.moveHistory.push({ mv, notation });

    // Update game status
    this._updateStatus();
  }

  /* ── Undo last move ── */
  undoLastMove() {
    if (this._stateStack.length === 0) return false;
    const state = this._stateStack.pop();
    this.board = state.board;
    this.turn = state.turn;
    this.gameStatus = state.gameStatus;
    this.winner = state.winner;
    this.capturedPieces = state.capturedPieces;
    this._castling = state.castling;
    this._enPassant = state.enPassant;
    this.moveHistory.pop();
    this._updateStatus();
    return true;
  }

  /* ── AI: get best move ── */
  getBestMove(difficulty) {
    const moves = this.getLegalMoves(this.turn);
    if (moves.length === 0) return null;

    if (difficulty === 'easy') {
      return moves[Math.floor(Math.random() * moves.length)];
    }

    const depth = difficulty === 'hard' ? 4 : 2;
    const isMax = this.turn === 'w';

    let bestMove = null;
    let bestScore = isMax ? -Infinity : Infinity;
    const alpha = -Infinity, beta = Infinity;

    // Shuffle for variety
    const shuffled = moves.slice().sort(() => Math.random() - 0.5);

    for (const mv of shuffled) {
      this.makeMove(mv);
      const score = this._minimax(depth - 1, -Infinity, Infinity, !isMax);
      this.undoLastMove();
      if (isMax ? score > bestScore : score < bestScore) {
        bestScore = score;
        bestMove = mv;
      }
    }
    return bestMove || moves[0];
  }

  _minimax(depth, alpha, beta, isMax) {
    if (depth === 0) return this._evaluate();

    const color = isMax ? 'w' : 'b';
    const moves = this.getLegalMoves(color);

    if (moves.length === 0) {
      if (this._isInCheck(color)) {
        return isMax ? -50000 + (10 - depth) : 50000 - (10 - depth);
      }
      return 0; // stalemate
    }

    if (isMax) {
      let best = -Infinity;
      for (const mv of moves) {
        this.makeMove(mv);
        best = Math.max(best, this._minimax(depth-1, alpha, beta, false));
        this.undoLastMove();
        alpha = Math.max(alpha, best);
        if (beta <= alpha) break;
      }
      return best;
    } else {
      let best = Infinity;
      for (const mv of moves) {
        this.makeMove(mv);
        best = Math.min(best, this._minimax(depth-1, alpha, beta, true));
        this.undoLastMove();
        beta = Math.min(beta, best);
        if (beta <= alpha) break;
      }
      return best;
    }
  }

  /* ── Evaluation ── */
  _evaluate() {
    let score = 0;
    for (let r=0;r<8;r++) {
      for (let c=0;c<8;c++) {
        const p = this.board[r][c];
        if (!p) continue;
        const val = PIECE_VALUES[p.type] + pst(p.type, r, c, p.color);
        score += p.color === 'w' ? val : -val;
      }
    }
    return score;
  }

  getEvalScore() {
    const raw = this._evaluate();
    return parseFloat((raw / 100).toFixed(1));
  }

  /* ── Status update ── */
  _updateStatus() {
    const opp = this.turn;
    const myMoves = this.getLegalMoves(opp);
    const inCheck = this._isInCheck(opp);

    if (myMoves.length === 0) {
      if (inCheck) {
        this.gameStatus = 'checkmate';
        this.winner = opp === 'w' ? 'b' : 'w';
      } else {
        this.gameStatus = 'stalemate';
        this.winner = null;
      }
    } else if (inCheck) {
      this.gameStatus = 'check';
    } else if (this._isInsufficientMaterial()) {
      this.gameStatus = 'draw';
    } else {
      this.gameStatus = 'playing';
    }
  }

  _isInsufficientMaterial() {
    const pieces = {w:[], b:[]};
    for (let r=0;r<8;r++)
      for (let c=0;c<8;c++)
        if (this.board[r][c]) pieces[this.board[r][c].color].push(this.board[r][c].type);
    const check = arr => arr.length === 1 ||
      (arr.length === 2 && (arr.includes('N') || arr.includes('B')));
    return check(pieces.w) && check(pieces.b);
  }

  /* ── Check detection ── */
  _isInCheck(color) {
    const king = this._findKing(color);
    if (!king) return false;
    return this._isAttacked(king[0], king[1], color);
  }

  _leavesInCheck(mv, color) {
    this._applyTemp(mv);
    const inCheck = this._isInCheck(color);
    this._undoTemp();
    return inCheck;
  }

  _applyTemp(mv) {
    const [fr,fc]=[...mv.from], [tr,tc]=[...mv.to];
    const piece = this.board[fr][fc];
    // En passant
    if (piece && piece.type === 'P' && this._enPassant && tr === this._enPassant.r && tc === this._enPassant.c) {
      this._tempEP = {r:fr, c:tc, piece: this.board[fr][tc]};
      this.board[fr][tc] = null;
    } else {
      this._tempEP = null;
    }
    this._tempFrom = [fr,fc,this.board[fr][fc]];
    this._tempTo = [tr,tc,this.board[tr][tc]];
    this.board[tr][tc] = mv.promo ? {color:this.turn, type:mv.promo} : piece;
    this.board[fr][fc] = null;
    // Castling rook
    if (piece && piece.type === 'K' && Math.abs(tc-fc)===2) {
      if (tc>fc) { this._tempRook=[fr,5,fr,7]; this.board[fr][5]=this.board[fr][7]; this.board[fr][7]=null; }
      else { this._tempRook=[fr,3,fr,0]; this.board[fr][3]=this.board[fr][0]; this.board[fr][0]=null; }
    } else { this._tempRook=null; }
  }

  _undoTemp() {
    const [fr,fc,fp] = this._tempFrom;
    const [tr,tc,tp] = this._tempTo;
    this.board[fr][fc] = fp;
    this.board[tr][tc] = tp;
    if (this._tempEP) { this.board[this._tempEP.r][this._tempEP.c] = this._tempEP.piece; }
    if (this._tempRook) {
      const [nr,nc,or,oc] = this._tempRook;
      this.board[or][oc] = this.board[nr][nc];
      this.board[nr][nc] = null;
    }
  }

  _findKing(color) {
    for (let r=0;r<8;r++)
      for (let c=0;c<8;c++)
        if (this.board[r][c]?.color===color && this.board[r][c]?.type==='K')
          return [r,c];
    return null;
  }

  _isAttacked(r, c, defColor) {
    const opp = defColor==='w'?'b':'w';
    // Check by knights
    for (const [dr,dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
      const nr=r+dr, nc=c+dc;
      if (nr>=0&&nr<8&&nc>=0&&nc<8&&this.board[nr][nc]?.color===opp&&this.board[nr][nc]?.type==='N') return true;
    }
    // Check by sliding pieces + pawns + king
    const dirs = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]];
    for (const [dr,dc] of dirs) {
      let nr=r+dr, nc=c+dc, dist=1;
      while (nr>=0&&nr<8&&nc>=0&&nc<8) {
        const p = this.board[nr][nc];
        if (p) {
          if (p.color===opp) {
            const diag = Math.abs(dr)===Math.abs(dc);
            if (p.type==='Q') return true;
            if (p.type==='R' && !diag) return true;
            if (p.type==='B' && diag) return true;
            if (dist===1 && p.type==='K') return true;
            // Pawn attacks
            if (dist===1 && p.type==='P') {
              const pawnDir = defColor==='w'?1:-1; // opp pawns attack toward defColor
              if (dr===pawnDir && diag) return true;
            }
          }
          break;
        }
        dist++;
        nr+=dr; nc+=dc;
      }
    }
    return false;
  }

  /* ── Pseudo-legal move generation ── */
  _pseudoMoves(color) {
    const moves = [];
    for (let r=0;r<8;r++)
      for (let c=0;c<8;c++)
        if (this.board[r][c]?.color===color)
          this._pieceMoves(r, c, color, moves);
    return moves;
  }

  _pieceMoves(r, c, color, moves) {
    const p = this.board[r][c];
    const opp = color==='w'?'b':'w';
    const add = (tr,tc,promo) => {
      if (tr<0||tr>=8||tc<0||tc>=8) return;
      moves.push(createMove(r,c,tr,tc,promo||null));
    };
    const slide = (dirs) => {
      for (const [dr,dc] of dirs) {
        let nr=r+dr, nc=c+dc;
        while(nr>=0&&nr<8&&nc>=0&&nc<8) {
          if (this.board[nr][nc]) {
            if (this.board[nr][nc].color===opp) add(nr,nc);
            break;
          }
          add(nr,nc);
          nr+=dr; nc+=dc;
        }
      }
    };

    switch(p.type) {
      case 'P': {
        const dir = color==='w'?-1:1;
        const startR = color==='w'?6:1;
        const promoR = color==='w'?0:7;
        // Push
        if (!this.board[r+dir]?.[c] && r+dir>=0 && r+dir<8) {
          if (r+dir===promoR) { ['Q','R','B','N'].forEach(pt=>add(r+dir,c,pt)); }
          else {
            add(r+dir,c);
            if (r===startR && !this.board[r+dir*2]?.[c]) add(r+dir*2,c);
          }
        }
        // Captures
        for (const dc of [-1,1]) {
          const tr=r+dir, tc=c+dc;
          if (tr<0||tr>=8||tc<0||tc>=8) continue;
          if (this.board[tr][tc]?.color===opp) {
            if (tr===promoR) { ['Q','R','B','N'].forEach(pt=>add(tr,tc,pt)); }
            else add(tr,tc);
          }
          // En passant
          if (this._enPassant && tr===this._enPassant.r && tc===this._enPassant.c) {
            add(tr,tc);
          }
        }
        break;
      }
      case 'N':
        for (const [dr,dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
          const tr=r+dr, tc=c+dc;
          if (tr<0||tr>=8||tc<0||tc>=8) continue;
          if (this.board[tr][tc]?.color!==color) add(tr,tc);
        }
        break;
      case 'B': slide([[1,1],[1,-1],[-1,1],[-1,-1]]); break;
      case 'R': slide([[0,1],[0,-1],[1,0],[-1,0]]); break;
      case 'Q': slide([[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]]); break;
      case 'K':
        for (const [dr,dc] of [[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]]) {
          const tr=r+dr, tc=c+dc;
          if (tr<0||tr>=8||tc<0||tc>=8) continue;
          if (this.board[tr][tc]?.color!==color) add(tr,tc);
        }
        // Castling
        this._addCastling(r, c, color, moves);
        break;
    }
  }

  _addCastling(r, c, color, moves) {
    const backR = color==='w'?7:0;
    if (r!==backR || c!==4) return;
    if (this._isAttacked(r, 4, color)) return;

    if (this._castling[color].K) {
      if (!this.board[r][5] && !this.board[r][6] && this.board[r][7]?.type==='R') {
        if (!this._isAttacked(r,5,color) && !this._isAttacked(r,6,color)) {
          moves.push(createMove(r,4,r,6));
        }
      }
    }
    if (this._castling[color].Q) {
      if (!this.board[r][3] && !this.board[r][2] && !this.board[r][1] && this.board[r][0]?.type==='R') {
        if (!this._isAttacked(r,3,color) && !this._isAttacked(r,2,color)) {
          moves.push(createMove(r,4,r,2));
        }
      }
    }
  }

  /* ── Algebraic notation ── */
  _notation(mv, piece, captured, prevBoard) {
    const files = 'abcdefgh';
    const [fr,fc]=[...mv.from], [tr,tc]=[...mv.to];
    const toSq = files[tc] + (8-tr);

    if (piece.type==='K' && Math.abs(tc-fc)===2) {
      return tc>fc ? 'O-O' : 'O-O-O';
    }

    let n = piece.type==='P' ? '' : piece.type;
    if (piece.type==='P' && captured) n = files[fc];
    if (captured || (piece.type==='P' && this._enPassant && tr===this._enPassant?.r && tc===this._enPassant?.c)) n += 'x';
    n += toSq;
    if (mv.promo) n += '=' + mv.promo;

    // Check/checkmate suffix — move already applied to board, turn not yet switched
    const enemyColor = this.turn === 'w' ? 'b' : 'w';
    if (this._isInCheck(enemyColor)) {
      const nextMoves = this.getLegalMoves(enemyColor);
      n += nextMoves.length === 0 ? '#' : '+';
    }

    return n;
  }
}

/* ── Global constants used by game.js ── */
const FILES = ['a','b','c','d','e','f','g','h'];

const DIFFICULTY_CONFIG = {
  easy:   { name: 'Novice',      depth: 1 },
  medium: { name: 'Knight',      depth: 2 },
  hard:   { name: 'Grandmaster', depth: 4 }
};
