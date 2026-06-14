'use strict';

// ─── PIECE RENDERING ────────────────────────────────────────────────────────
// Championship-quality SVG pieces based on Merida/Staunton style.
// CRITICAL: Every gradient/filter uses a globally unique ID to prevent
// SVG ID collision when multiple pieces of the same type are on the board.

function _makePieceSVG(id, paths) { return `<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">${paths}</svg>`; }

// White piece fill: warm ivory highlight → gold mid → rich amber base
const _wFill = (uid) => `<defs>
  <linearGradient id="wg${uid}" x1="0.3" y1="0" x2="0.7" y2="1">
    <stop offset="0%"   stop-color="#ffffff"/>
    <stop offset="45%"  stop-color="#eeeeff"/>
    <stop offset="100%" stop-color="#c8cae0"/>
  </linearGradient>
  <linearGradient id="wgh${uid}" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%"   stop-color="rgba(255,255,255,0)"/>
    <stop offset="45%"  stop-color="rgba(255,255,255,0.4)"/>
    <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
  </linearGradient>
</defs>`;
// Black piece fill: cool periwinkle highlight → deep indigo → near-black
const _bFill = (uid) => `<defs>
  <linearGradient id="bg${uid}" x1="0.3" y1="0" x2="0.7" y2="1">
    <stop offset="0%"   stop-color="#1a1d33"/>
    <stop offset="45%"  stop-color="#0d0f1f"/>
    <stop offset="100%" stop-color="#07080f"/>
  </linearGradient>
  <linearGradient id="bgh${uid}" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%"   stop-color="rgba(100,110,200,0)"/>
    <stop offset="45%"  stop-color="rgba(100,110,200,0.18)"/>
    <stop offset="100%" stop-color="rgba(100,110,200,0)"/>
  </linearGradient>
</defs>`;

let _pieceUID = 0;
function _uid() { return ++_pieceUID; }

// Generate pieces with unique gradient IDs each call
function _wK() { const u=_uid(); return `<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">${_wFill(u)}<g stroke="#9090b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6" stroke-width="1.5" fill="none"/><path d="M20 8h5" stroke-width="1.5" fill="none"/><path d="M22.5 25c0 0 4.5-7.5 3-10.5 0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5z" fill="url(#wg${u})"/><path d="M12.5 37c5.5 3.5 15.5 3.5 21 0l1-3.5c-6-1.5-14-1.5-21 0z" fill="url(#wg${u})"/><path d="M11.5 30c5.5-3 15.5-3 21 0" fill="none"/><path d="M12 30.5c0 0 1 2.5 10.5 2.5s10.5-2.5 10.5-2.5" fill="url(#wg${u})"/><path d="M20.5 26.5c0 1.5.5 2 2 2s2-.5 2-2" fill="url(#wg${u})" stroke="none"/><path d="M11.5 37c0 2 2 3 11 3s11-1 11-3" fill="url(#wg${u})" stroke="#9090b8"/></g></svg>`; }
function _wQ() { const u=_uid(); return `<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">${_wFill(u)}<g stroke="#9090b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="12" r="2.75" fill="url(#wg${u})"/><circle cx="14" cy="9" r="2.75" fill="url(#wg${u})"/><circle cx="22.5" cy="8" r="2.75" fill="url(#wg${u})"/><circle cx="31" cy="9" r="2.75" fill="url(#wg${u})"/><circle cx="39" cy="12" r="2.75" fill="url(#wg${u})"/><path d="M9 26c8.5-8.5 15.5-8.5 27 0l2.5-13L31 25l-.3-14.1L22.5 24l-7.2-13.1L15 25 6.5 13z" fill="url(#wg${u})"/><path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" fill="url(#wg${u})"/><line x1="9" y1="26" x2="36" y2="26" stroke="#9090b8" stroke-width="1"/></g></svg>`; }
function _wR() { const u=_uid(); return `<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">${_wFill(u)}<g fill="url(#wg${u})" stroke="#9090b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3z"/><path d="M12.5 32l1.5-2.5h17l1.5 2.5H12.5z"/><path d="M12 36v-4h21v4H12z"/><path d="M14 29.5V17h17v12.5"/><path d="M11 14V9h4v2h5V9h5v2h5V9h4v5l-2.5 3H13.5L11 14z"/><path d="M11 14h23" fill="none" stroke="#9090b840" stroke-width="1"/></g></svg>`; }
function _wB() { const u=_uid(); return `<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">${_wFill(u)}<g stroke="#9090b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 36c3.4-1 10.1.4 13.5-2 3.4 2.4 10.1 1 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.4-1-10.1.46-13.5-1-3.4 1.46-10.1.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.94 3-2 3-2z" fill="url(#wg${u})"/><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" fill="url(#wg${u})"/><path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" fill="url(#wg${u})"/><path d="M17.5 26h10" fill="none"/></g></svg>`; }
function _wN() {
  const u=_uid();
  return `<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">${_wFill(u)}<g fill="url(#wg${u})" stroke="#9090b8" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 39.5 Q11 41.5 22.5 41.5 Q34 41.5 34 39.5 L32.5 35 Q22.5 33.5 12.5 35 Z"/><path d="M12.5 35 L14 29 L32.5 29 L34 35 Q22.5 33.5 12.5 35 Z"/><path d="M14 29 Q14.5 23.5 18 21 Q15 19 14 16.5 Q13.5 14 15 12.5 Q18 10 21 12 Q22.5 9.5 25 9 Q28 8.5 30.5 10.5 Q33 13 32 16.5 Q34 18 34 21 Q34 25 30 27.5 Q28 29 27 29 L14 29 Z"/><circle cx="27" cy="13.5" r="1.5" fill="#22244a" stroke="none"/><path d="M21 12 Q22 16 20 20" fill="none" stroke="#a0a0c0" stroke-width="0.6"/><path d="M25.5 9 Q24 12 24.5 15 Q25 18 23 21" fill="none" stroke="#a0a0c0" stroke-width="0.6"/><path d="M14 16.5 Q16.5 15.5 18 16 Q19.5 17 18 21" fill="none"/><ellipse cx="25" cy="11.5" rx="1.3" ry="0.8" fill="url(#wgh${u})" stroke="none"/></g></svg>`;
}
function _wP() {
  const u=_uid();
  return `<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">${_wFill(u)}<g fill="url(#wg${u})" stroke="#9090b8" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12.5 40.5 Q12.5 42 22.5 42 Q32.5 42 32.5 40.5 L31 35.5 Q22.5 34 14 35.5 Z"/><path d="M14 35.5 Q16.5 30 18 27.5 L27 27.5 Q28.5 30 31 35.5 Q22.5 34 14 35.5 Z"/><ellipse cx="22.5" cy="27.5" rx="5" ry="1.5"/><path d="M18 27.5 Q18.5 23 20 21 L25 21 Q26.5 23 27 27.5 Z"/><circle cx="22.5" cy="15.5" r="5.5"/><ellipse cx="20.5" cy="13.5" rx="2" ry="1.3" fill="url(#wgh${u})" stroke="none"/></g></svg>`;
}

function _bK() { const u=_uid(); return `<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">${_bFill(u)}<g stroke="#5a5c8a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6" stroke-width="1.5" fill="none"/><path d="M20 8h5" stroke-width="1.5" fill="none"/><path d="M22.5 25c0 0 4.5-7.5 3-10.5 0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5z" fill="url(#bg${u})"/><path d="M12.5 37c5.5 3.5 15.5 3.5 21 0l1-3.5c-6-1.5-14-1.5-21 0z" fill="url(#bg${u})"/><path d="M11.5 30c5.5-3 15.5-3 21 0" fill="none"/><path d="M12 30.5c0 0 1 2.5 10.5 2.5s10.5-2.5 10.5-2.5" fill="url(#bg${u})"/><path d="M20.5 26.5c0 1.5.5 2 2 2s2-.5 2-2" fill="url(#bg${u})" stroke="none"/><path d="M11.5 37c0 2 2 3 11 3s11-1 11-3" fill="url(#bg${u})" stroke="#5a5c8a"/></g></svg>`; }
function _bQ() { const u=_uid(); return `<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">${_bFill(u)}<g stroke="#5a5c8a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="12" r="2.75" fill="url(#bg${u})"/><circle cx="14" cy="9" r="2.75" fill="url(#bg${u})"/><circle cx="22.5" cy="8" r="2.75" fill="url(#bg${u})"/><circle cx="31" cy="9" r="2.75" fill="url(#bg${u})"/><circle cx="39" cy="12" r="2.75" fill="url(#bg${u})"/><path d="M9 26c8.5-8.5 15.5-8.5 27 0l2.5-13L31 25l-.3-14.1L22.5 24l-7.2-13.1L15 25 6.5 13z" fill="url(#bg${u})"/><path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" fill="url(#bg${u})"/><line x1="9" y1="26" x2="36" y2="26" stroke="#5a5c8a" stroke-width="1"/></g></svg>`; }
function _bR() { const u=_uid(); return `<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">${_bFill(u)}<g fill="url(#bg${u})" stroke="#5a5c8a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3z"/><path d="M12.5 32l1.5-2.5h17l1.5 2.5H12.5z"/><path d="M12 36v-4h21v4H12z"/><path d="M14 29.5V17h17v12.5"/><path d="M11 14V9h4v2h5V9h5v2h5V9h4v5l-2.5 3H13.5L11 14z"/><path d="M11 14h23" fill="none" stroke="#5a5c8a60" stroke-width="1"/></g></svg>`; }
function _bB() { const u=_uid(); return `<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">${_bFill(u)}<g stroke="#5a5c8a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 36c3.4-1 10.1.4 13.5-2 3.4 2.4 10.1 1 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.4-1-10.1.46-13.5-1-3.4 1.46-10.1.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.94 3-2 3-2z" fill="url(#bg${u})"/><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" fill="url(#bg${u})"/><path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" fill="url(#bg${u})"/><path d="M17.5 26h10" fill="none"/></g></svg>`; }
function _bN() {
  const u=_uid();
  return `<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">${_bFill(u)}<g fill="url(#bg${u})" stroke="#5a5c8a" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 39.5 Q11 41.5 22.5 41.5 Q34 41.5 34 39.5 L32.5 35 Q22.5 33.5 12.5 35 Z"/><path d="M12.5 35 L14 29 L32.5 29 L34 35 Q22.5 33.5 12.5 35 Z"/><path d="M14 29 Q14.5 23.5 18 21 Q15 19 14 16.5 Q13.5 14 15 12.5 Q18 10 21 12 Q22.5 9.5 25 9 Q28 8.5 30.5 10.5 Q33 13 32 16.5 Q34 18 34 21 Q34 25 30 27.5 Q28 29 27 29 L14 29 Z"/><circle cx="27" cy="13.5" r="1.5" fill="#9090cc" stroke="none"/><path d="M21 12 Q22 16 20 20" fill="none" stroke="#6060a0" stroke-width="0.6"/><path d="M25.5 9 Q24 12 24.5 15 Q25 18 23 21" fill="none" stroke="#6060a0" stroke-width="0.6"/><ellipse cx="25" cy="11.5" rx="1.3" ry="0.8" fill="url(#bgh${u})" stroke="none"/></g></svg>`;
}
function _bP() {
  const u=_uid();
  return `<svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">${_bFill(u)}<g fill="url(#bg${u})" stroke="#5a5c8a" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12.5 40.5 Q12.5 42 22.5 42 Q32.5 42 32.5 40.5 L31 35.5 Q22.5 34 14 35.5 Z"/><path d="M14 35.5 Q16.5 30 18 27.5 L27 27.5 Q28.5 30 31 35.5 Q22.5 34 14 35.5 Z"/><ellipse cx="22.5" cy="27.5" rx="5" ry="1.5"/><path d="M18 27.5 Q18.5 23 20 21 L25 21 Q26.5 23 27 27.5 Z"/><circle cx="22.5" cy="15.5" r="5.5"/><ellipse cx="20.5" cy="13.5" rx="2" ry="1.3" fill="url(#bgh${u})" stroke="none"/></g></svg>`;
}

// Map piece codes to generator functions
const PIECE_SVG_FN = {
  wK:_wK, wQ:_wQ, wR:_wR, wB:_wB, wN:_wN, wP:_wP,
  bK:_bK, bQ:_bQ, bR:_bR, bB:_bB, bN:_bN, bP:_bP
};
// PIECE_SVG is called as a function now; kept as object for compat where needed
const PIECE_SVG = new Proxy({}, {
  get(_, key) { return PIECE_SVG_FN[key] ? PIECE_SVG_FN[key]() : ''; }
});

// Unicode fallback for captured pieces display
const PIECE_UNICODE = {
  wK:'♔',wQ:'♕',wR:'♖',wB:'♗',wN:'♘',wP:'♙',
  bK:'♚',bQ:'♛',bR:'♜',bB:'♝',bN:'♞',bP:'♟'
};

// ─── PUZZLE DATA ─────────────────────────────────────────────────────────────

const PUZZLES_DATA = [
  { id:1, title:"Paul Morphy", subtitle:"Opera Game", year:"1858", difficulty:"easy", turn:"w", desc:"White to move. Checkmate in 2.", hint:"The Queen delivers from the d-file.", fen:"4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR3R w k - 0 1", solution:[{from:"b3",to:"b8",notation:"Qb8+"},{from:"d8",to:"b8",notation:"Rxb8#"}] },
  { id:2, title:"Adolf Anderssen", subtitle:"The Immortal Game", year:"1851", difficulty:"easy", turn:"w", desc:"White to move. Checkmate in 2.", hint:"The Bishop on b3 creates a lethal diagonal.", fen:"r1bk3r/p2pBpNp/n4n2/1p1NP2P/6P1/3P4/P1P1K3/q5b1 w - - 0 1", solution:[{from:"d7",to:"c8",notation:"Bd8+"},{from:"c8",to:"d8",notation:"Rxd8#"}] },
  { id:3, title:"Robert James Fischer", subtitle:"Game of the Century", year:"1956", difficulty:"medium", turn:"b", desc:"Black to move. Checkmate in 3.", hint:"The Queen sacrifices herself for the rooks to act.", fen:"1Q6/5pk1/2p3p1/1p2N2p/1b5P/1bn5/2r3P1/2K5 b - - 0 1", solution:[{from:"c3",to:"e1",notation:"Ne1+"},{from:"c1",to:"d2",notation:"Kd2"},{from:"b3",to:"a2",notation:"Ba2#"}] },
  { id:4, title:"Garry Kasparov", subtitle:"vs. Topalov, 1999", year:"1999", difficulty:"medium", turn:"w", desc:"White to move. Find the decisive combination.", hint:"Rook sacrifice opens the king's defenses.", fen:"r3r1k1/pp3pbp/1qp3p1/2B5/2BP2b1/Q5P1/PP3nKP/R4R2 w - - 0 1", solution:[{from:"f1",to:"f2",notation:"Rxf2+"},{from:"g2",to:"f2",notation:"Kxf2"},{from:"a1",to:"d1",notation:"Rd1+"}] },
  { id:5, title:"Mikhail Tal", subtitle:"vs. Botvinnik, 1960", year:"1960", difficulty:"medium", turn:"w", desc:"White to move. Sacrifice for checkmate.", hint:"Knight leaps to h5 opening the attack.", fen:"r1bqr1k1/pp3ppp/2n2n2/3p4/1bpP4/2NBPN2/PP3PPP/R1BQR1K1 w - - 0 1", solution:[{from:"d3",to:"e5",notation:"Nxe5"},{from:"c6",to:"e5",notation:"Nxe5"},{from:"d4",to:"e5",notation:"dxe5#"}] },
  { id:6, title:"Anatoly Karpov", subtitle:"vs. Spassky, 1974", year:"1974", difficulty:"easy", turn:"w", desc:"White to move. Mate in 2.", hint:"The Queen to h7 is crushing.", fen:"5rk1/pp4pp/4p3/2R3Q1/3n4/2q4r/P1P2PPP/1R4K1 w - - 0 1", solution:[{from:"g5",to:"g7",notation:"Qxg7+"},{from:"g8",to:"g7",notation:"Kxg7"}] },
  { id:7, title:"Magnus Carlsen", subtitle:"vs. Morozevich, 2008", year:"2008", difficulty:"hard", turn:"w", desc:"White to move. The definitive combination.", hint:"The knight on f5 is the key piece.", fen:"r1b2rk1/pp4pp/2n1p3/3pN2Q/3P2b1/2PB4/PP4PP/R4RK1 w - - 0 1", solution:[{from:"h5",to:"h7",notation:"Qxh7+"},{from:"g8",to:"h7",notation:"Kxh7"},{from:"e5",to:"f7",notation:"Nxf7#"}] },
  { id:8, title:"Wilhelm Steinitz", subtitle:"vs. Bardeleben, 1895", year:"1895", difficulty:"hard", turn:"w", desc:"White to move. The famous combination.", hint:"The Rook to e7 starts the decisive attack.", fen:"1r4k1/2p2pp1/1bq2n1p/p1p5/P3NB2/1B5P/2P2PP1/3Q1RK1 w - - 0 1", solution:[{from:"f4",to:"d6",notation:"Bxd6"},{from:"c6",to:"d6",notation:"Qxd6"},{from:"e4",to:"f6",notation:"Nxf6+"}] },
  { id:9, title:"Boris Spassky", subtitle:"vs. Bronstein, 1960", year:"1960", difficulty:"medium", turn:"w", desc:"White to move. Brilliant queen sacrifice.", hint:"Qxg7 shatters the kingside.", fen:"r1b2rk1/ppp1q1pp/2n5/3pP3/1b1N4/2NB4/PPPQ1PPP/R3K2R w KQ - 0 1", solution:[{from:"d2",to:"g5",notation:"Qg5"},{from:"g8",to:"h8",notation:"Kh8"},{from:"g5",to:"h6",notation:"Qxh6"}] },
  { id:10, title:"Viswanathan Anand", subtitle:"vs. Gelfand, 2012", year:"2012", difficulty:"hard", turn:"w", desc:"White to move. World Championship moment.", hint:"Discover the deflecting sacrifice.", fen:"2rr2k1/pp3pp1/2n2n1p/3q4/3P4/1BN2N2/PP2QPPP/R4RK1 w - - 0 1", solution:[{from:"e2",to:"e8",notation:"Qxe8+"},{from:"f8",to:"e8",notation:"Rxe8"},{from:"f3",to:"g5",notation:"Ng5#"}] },
  { id:11, title:"Alexander Alekhine", subtitle:"vs. Nimzowitsch, 1930", year:"1930", difficulty:"hard", turn:"w", desc:"White to move. The classic positional crusher.", hint:"The Bishop to f6 is stunning.", fen:"2r1k2r/pp1b1pp1/2n1pn1p/q7/3P4/1BN1BN2/PP2QPPP/2RR2K1 w k - 0 1", solution:[{from:"e3",to:"f4",notation:"Bf4"},{from:"e7",to:"d5",notation:"Nxd5"},{from:"f4",to:"h6",notation:"Bh6#"}] },
  { id:12, title:"Efim Bogoljubov", subtitle:"vs. Alekhine, 1922", year:"1922", difficulty:"hard", turn:"b", desc:"Black to move. Find the winning combination.", hint:"The Queen at d4 creates a deadly threat.", fen:"r3r1k1/ppp2ppp/8/4n3/3qP1b1/2NB4/PPP2PPP/R1BQR1K1 b - - 0 1", solution:[{from:"e5",to:"f3",notation:"Nxf3+"},{from:"g2",to:"f3",notation:"gxf3"},{from:"d4",to:"h4",notation:"Qxh4#"}] }
];

// ─── SCREEN MANAGER ──────────────────────────────────────────────────────────

const Screens = {
  show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(id)?.classList.remove('hidden');
  }
};

// ─── CHESS GAME CONTROLLER ───────────────────────────────────────────────────

class ChessGame {
  constructor() {
    this.engine = new ChessEngine();
    this.difficulty = 'medium';
    this.selectedSq = null;
    this.legalMovesCache = [];
    this.aiThinking = false;
    this.pendingPromo = null;
    this.moveCount = 0;
    this._initDOM();
    this._bindEvents();
  }

  _initDOM() {
    this.boardEl = document.getElementById('chessBoard');
    this.rankLabels = document.getElementById('chessRankLabels');
    this.fileLabels = document.getElementById('chessFileLabels');
    this.statusEl = document.getElementById('chessStatus');
    this.diffBadgeEl = document.getElementById('chessDiffBadge');
    this.moveListEl = document.getElementById('chessMoveList');
    this.thinkingEl = document.getElementById('thinkingIndicator');
    this.evalFillEl = document.getElementById('evalFill');
    this.evalLabelEl = document.getElementById('evalLabel');
    this.capturedByAIEl = document.getElementById('capturedByAI');
    this.capturedByHumanEl = document.getElementById('capturedByHuman');
    this.hintEl = document.getElementById('chessHintText');
    this._buildLabels();
  }

  _buildLabels() {
    this.rankLabels.innerHTML = '';
    this.fileLabels.innerHTML = '';
    FILES.forEach((f, i) => { const s = document.createElement('span'); s.textContent = f; this.fileLabels.appendChild(s); });
    for (let r = 8; r >= 1; r--) { const s = document.createElement('span'); s.textContent = r; this.rankLabels.appendChild(s); }
  }

  _bindEvents() {
    document.getElementById('btnUndoMove').addEventListener('click', () => this.undoMove());
    document.getElementById('btnResign').addEventListener('click', () => this.resign());
    document.getElementById('btnChessNewGame').addEventListener('click', () => {
      Screens.show('screenDifficulty');
    });
    document.getElementById('btnChessHome').addEventListener('click', () => Screens.show('screenIntro'));
    document.getElementById('btnChessPuzzles').addEventListener('click', () => {
      puzzleGame.goToPuzzles();
    });
    document.getElementById('btnGameoverNewGame').addEventListener('click', () => Screens.show('screenDifficulty'));
    document.getElementById('btnGameoverHome').addEventListener('click', () => Screens.show('screenIntro'));
  }

  startGame(difficulty) {
    this.difficulty = difficulty;
    this.engine.reset();
    this.selectedSq = null;
    this.aiThinking = false;
    this.moveCount = 0;
    this.diffBadgeEl.textContent = DIFFICULTY_CONFIG[difficulty].name;
    this.diffBadgeEl.className = 'hdr-mode-badge diff-badge-' + difficulty;
    this.moveListEl.innerHTML = '';
    this._render();
    this._updateStatus();
    this._updateEval();
    this._updateCaptured();
    this._setHint('You play White. Control the center — e4 or d4 are strong opening moves.');
  }

  _render() {
    this.boardEl.innerHTML = '';
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const sq = document.createElement('div');
        const isLight = (r + c) % 2 === 0;
        sq.className = 'sq ' + (isLight ? 'light' : 'dark');
        sq.dataset.r = r; sq.dataset.c = c;

        const piece = this.engine.board[r][c];
        if (piece) {
          const wrap = document.createElement('div');
          wrap.className = 'piece-wrap piece-' + piece.color;
          wrap.innerHTML = PIECE_SVG[piece.color + piece.type] || '';
          sq.appendChild(wrap);
        }

        // Highlights
        if (this.selectedSq && this.selectedSq[0] === r && this.selectedSq[1] === c) {
          sq.classList.add('selected');
        }

        sq.addEventListener('click', () => this._handleClick(r, c));
        this.boardEl.appendChild(sq);
      }
    }

    // Show legal move dots
    if (this.selectedSq) {
      const [sr, sc] = this.selectedSq;
      for (const mv of this.legalMovesCache) {
        if (mv.from[0] === sr && mv.from[1] === sc) {
          const targetEl = this._getSquareEl(mv.to[0], mv.to[1]);
          if (targetEl) {
            targetEl.classList.add(this.engine.board[mv.to[0]][mv.to[1]] ? 'capture-dot' : 'move-dot-hint');
          }
        }
      }
    }

    // Highlight last move
    if (this.engine.moveHistory.length > 0) {
      const lastMv = this.engine.moveHistory[this.engine.moveHistory.length - 1].mv;
      this._getSquareEl(lastMv.from[0], lastMv.from[1])?.classList.add('last-move');
      this._getSquareEl(lastMv.to[0], lastMv.to[1])?.classList.add('last-move');
    }

    // Check highlight
    if (this.engine.gameStatus === 'check' || this.engine.gameStatus === 'checkmate') {
      const color = this.engine.turn;
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          if (this.engine.board[r][c]?.color === color && this.engine.board[r][c]?.type === 'K') {
            this._getSquareEl(r, c)?.classList.add('in-check');
          }
        }
      }
    }
  }

  _getSquareEl(r, c) {
    return this.boardEl.querySelector(`[data-r="${r}"][data-c="${c}"]`);
  }

  _handleClick(r, c) {
    if (this.aiThinking || this.engine.gameStatus === 'checkmate' || this.engine.gameStatus === 'stalemate' || this.engine.gameStatus === 'draw') return;
    if (this.engine.turn !== 'w') return; // Player is always white

    const piece = this.engine.board[r][c];

    if (this.selectedSq) {
      const [sr, sc] = this.selectedSq;
      // Try to make a move
      const mv = this.legalMovesCache.find(m =>
        m.from[0] === sr && m.from[1] === sc && m.to[0] === r && m.to[1] === c
      );

      if (mv) {
        if (mv.promo) {
          // Multiple promo moves possible — pick Queen by default for now, or show modal
          const promoMoves = this.legalMovesCache.filter(m =>
            m.from[0] === sr && m.from[1] === sc && m.to[0] === r && m.to[1] === c
          );
          this._showPromoModal(promoMoves);
          return;
        }
        this._makePlayerMove(mv);
        return;
      }

      // Click on own piece — switch selection
      if (piece && piece.color === 'w') {
        this.selectedSq = [r, c];
        this.legalMovesCache = this.engine.getLegalMoves('w');
        this._render();
        return;
      }

      this.selectedSq = null;
      this.legalMovesCache = [];
      this._render();
      return;
    }

    // Select piece
    if (piece && piece.color === 'w') {
      this.selectedSq = [r, c];
      this.legalMovesCache = this.engine.getLegalMoves('w');
      this._render();
    }
  }

  _showPromoModal(promoMoves) {
    const modal = document.getElementById('promotionModal');
    const choices = document.getElementById('promoChoices');
    choices.innerHTML = '';
    const pieces = ['Q', 'R', 'B', 'N'];
    for (const pt of pieces) {
      const mv = promoMoves.find(m => m.promo === pt);
      if (!mv) continue;
      const btn = document.createElement('button');
      btn.className = 'promo-btn';
      btn.innerHTML = PIECE_SVG['w' + pt] || pt;
      btn.addEventListener('click', () => {
        modal.classList.add('hidden');
        this._makePlayerMove(mv);
      });
      choices.appendChild(btn);
    }
    modal.classList.remove('hidden');
    this.selectedSq = null;
  }

  _makePlayerMove(mv) {
    this.selectedSq = null;
    this.legalMovesCache = [];
    this.engine.makeMove(mv);
    this.moveCount++;
    this._addMoveToList(mv, 'w');
    this._render();
    this._updateStatus();
    this._updateEval();
    this._updateCaptured();

    if (this.engine.gameStatus === 'checkmate' || this.engine.gameStatus === 'stalemate' || this.engine.gameStatus === 'draw') {
      this._gameOver();
      return;
    }

    // AI response
    setTimeout(() => this._aiMove(), 300);
  }

  _aiMove() {
    if (this.engine.turn !== 'b') return;
    this.aiThinking = true;
    this.thinkingEl.classList.remove('hidden');
    this._setHint('AI is calculating its move…');

    const delay = this.difficulty === 'hard' ? 800 : this.difficulty === 'medium' ? 500 : 200;

    setTimeout(() => {
      const mv = this.engine.getBestMove(this.difficulty);
      if (mv) {
        this.engine.makeMove(mv);
        this.moveCount++;
        this._addMoveToList(mv, 'b');
      }
      this.aiThinking = false;
      this.thinkingEl.classList.add('hidden');
      this._render();
      this._updateStatus();
      this._updateEval();
      this._updateCaptured();

      if (this.engine.gameStatus === 'checkmate' || this.engine.gameStatus === 'stalemate' || this.engine.gameStatus === 'draw') {
        this._gameOver();
      } else {
        this._updateHintForPosition();
      }
    }, delay);
  }

  _addMoveToList(mv, color) {
    const notation = this.engine.moveHistory[this.engine.moveHistory.length - 1]?.notation || '?';
    if (color === 'w') {
      const row = document.createElement('div');
      row.className = 'move-row';
      const num = Math.ceil(this.moveCount / 2);
      row.innerHTML = `<span class="move-num">${num}.</span><span class="move-notation move-w" id="mw${num}">${notation}</span>`;
      this.moveListEl.appendChild(row);
    } else {
      const num = Math.ceil(this.moveCount / 2);
      const whiteEl = document.getElementById('mw' + num);
      if (whiteEl) {
        const bSpan = document.createElement('span');
        bSpan.className = 'move-notation move-b';
        bSpan.textContent = notation;
        whiteEl.parentElement.appendChild(bSpan);
      }
    }
    this.moveListEl.scrollTop = this.moveListEl.scrollHeight;
  }

  _updateStatus() {
    const statusMap = {
      playing: this.engine.turn === 'w' ? 'Your Turn · White' : 'AI Thinking…',
      check: this.engine.turn === 'w' ? '⚠ Check! You must respond' : 'AI is in Check!',
      checkmate: this.engine.winner === 'w' ? '♛ You Win — Checkmate!' : '♚ AI Wins — Checkmate!',
      stalemate: 'Stalemate — Draw',
      draw: 'Draw — Insufficient Material'
    };
    this.statusEl.textContent = statusMap[this.engine.gameStatus] || '';
  }

  _updateEval() {
    const score = this.engine.getEvalScore();
    // score: positive = white winning, range roughly -10 to +10
    const clamped = Math.max(-10, Math.min(10, score));
    const pct = 50 - (clamped / 10) * 45; // 50% = equal, lower = white winning (fills from top)
    this.evalFillEl.style.height = pct + '%';
    this.evalLabelEl.textContent = score > 0 ? '+' + score.toFixed(1) : score.toFixed(1);
    this.evalFillEl.style.background = score > 2 ? 'var(--gold)' : score < -2 ? 'var(--space-600)' : 'var(--eval-neutral)';
  }

  _updateCaptured() {
    const PV = {P:1,N:3,B:3,R:5,Q:9,K:0};
    const renderCaptured = (pieces, el) => {
      el.innerHTML = pieces.map(p => `<span class="cap-piece">${PIECE_UNICODE[p.color + p.type]}</span>`).join('');
    };
    renderCaptured(this.engine.capturedPieces.b, this.capturedByAIEl);
    renderCaptured(this.engine.capturedPieces.w, this.capturedByHumanEl);
    const aiMat = this.engine.capturedPieces.b.reduce((s,p)=>s+(PV[p.type]||0),0);
    const huMat = this.engine.capturedPieces.w.reduce((s,p)=>s+(PV[p.type]||0),0);
    const aiScoreEl = document.getElementById('aiScore');
    const huScoreEl = document.getElementById('humanScore');
    if (aiScoreEl) aiScoreEl.textContent = aiMat > huMat ? '+' + (aiMat - huMat) : '';
    if (huScoreEl) huScoreEl.textContent = huMat > aiMat ? '+' + (huMat - aiMat) : '';
  }

  _setHint(text) {
    this.hintEl.textContent = text;
  }

  _updateHintForPosition() {
    const hints = [
      'Control the center with pawns and knights.',
      'Develop all your pieces before attacking.',
      'Castle early to protect your king.',
      'Look for forks — attacking two pieces at once.',
      'Rooks are most powerful on open files.',
      'Connected rooks on the 7th rank are devastating.',
      'Knights need outposts — squares where they can\'t be chased.',
      'Trade pieces when you\'re ahead in material.',
      'Passed pawns must be pushed!',
      'Your king is strong in the endgame — activate it.',
      'Look for discovered attacks and pins.',
      'A bishop pair is an endgame advantage.'
    ];
    this._setHint(hints[Math.floor(Math.random() * hints.length)]);
  }

  _gameOver() {
    setTimeout(() => {
      const gameoverGlyph = document.getElementById('gameoverGlyph');
      const gameoverLabel = document.getElementById('gameoverLabel');
      const gameoverTitle = document.getElementById('gameoverTitle');
      const gameoverMoves = document.getElementById('gameoverMoves');

      if (this.engine.gameStatus === 'checkmate') {
        if (this.engine.winner === 'w') {
          gameoverGlyph.textContent = '♔';
          gameoverLabel.textContent = 'Checkmate!';
          gameoverTitle.textContent = 'You Win';
        } else {
          gameoverGlyph.textContent = '♚';
          gameoverLabel.textContent = 'Checkmate!';
          gameoverTitle.textContent = 'AI Wins';
        }
      } else if (this.engine.gameStatus === 'stalemate') {
        gameoverGlyph.textContent = '½';
        gameoverLabel.textContent = 'Stalemate';
        gameoverTitle.textContent = 'It\'s a Draw';
      } else {
        gameoverGlyph.textContent = '½';
        gameoverLabel.textContent = 'Draw';
        gameoverTitle.textContent = 'Game Over';
      }
      gameoverMoves.textContent = `${Math.ceil(this.moveCount / 2)} moves played`;
      Screens.show('screenGameover');
    }, 800);
  }

  undoMove() {
    if (this.aiThinking) return;
    const ok = this.engine.undoLastMove();
    if (ok) {
      this.moveCount = Math.max(0, this.moveCount - 2);
      // Remove last move row from list
      const rows = this.moveListEl.querySelectorAll('.move-row');
      if (rows.length > 0) rows[rows.length - 1].remove();
      this.selectedSq = null;
      this._render();
      this._updateStatus();
      this._updateEval();
      this._updateCaptured();
    }
  }

  resign() {
    document.getElementById('gameoverGlyph').textContent = '⚑';
    document.getElementById('gameoverLabel').textContent = 'You Resigned';
    document.getElementById('gameoverTitle').textContent = 'AI Wins';
    document.getElementById('gameoverMoves').textContent = `${Math.ceil(this.moveCount / 2)} moves played`;
    Screens.show('screenGameover');
  }
}

// ─── PUZZLE GAME CONTROLLER ──────────────────────────────────────────────────

class PuzzleGame {
  constructor() {
    this.puzzles = this._shuffle([...PUZZLES_DATA]);
    this.idx = 0;
    this.score = 0;
    this.solved = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.selected = null;
    this.moveNum = 0;
    this.hintUsed = false;
    this.puzzleDone = false;
    this.boardState = null;
    this._initDOM();
  }

  _initDOM() {
    this.boardEl = document.getElementById('board');
    this.rankLabels = document.getElementById('rankLabels');
    this.fileLabels = document.getElementById('fileLabels');
    this.puzzleTitleEl = document.getElementById('puzzleTitle');
    this.puzzleSubtitleEl = document.getElementById('puzzleSubtitle');
    this.puzzleYearEl = document.getElementById('puzzleYear');
    this.puzzleDescEl = document.getElementById('puzzleDesc');
    this.gameBadgeEl = document.getElementById('gameBadge');
    this.feedbackEl = document.getElementById('feedback');
    this.hdrNumEl = document.getElementById('hdrNum');
    this.progressFill = document.getElementById('progressFill');
    this.scoreValEl = document.getElementById('scoreVal');
    this.moveDotsEl = document.getElementById('moveDots');
    this.moveHistoryEl = document.getElementById('moveHistory');
    this.hintTextEl = document.getElementById('hintText');
    this.turnBadgeEl = document.getElementById('turnBadge');
    this.statSolvedEl = document.getElementById('statSolved');
    this.statStreakEl = document.getElementById('statStreak');
    this.statBestEl = document.getElementById('statBest');
    this.btnNext = document.getElementById('btnNext');
    this.btnReset = document.getElementById('btnReset');
    this.btnHint = document.getElementById('btnHint');

    this.btnNext.addEventListener('click', () => this.nextPuzzle());
    this.btnReset.addEventListener('click', () => this.loadPuzzle());
    this.btnHint.addEventListener('click', () => this.showHint());
    document.getElementById('btnPuzzleHome').addEventListener('click', () => Screens.show('screenIntro'));
    document.getElementById('btnBackToChess').addEventListener('click', () => Screens.show('screenChess'));
    document.getElementById('btnRestart').addEventListener('click', () => {
      this.puzzles = this._shuffle([...PUZZLES_DATA]);
      this.idx = 0; this.score = 0; this.solved = 0; this.streak = 0;
      this.loadPuzzle();
      Screens.show('screenGame');
    });

    this._buildLabels();
  }

  _buildLabels() {
    this.rankLabels.innerHTML = '';
    this.fileLabels.innerHTML = '';
    for (let r = 8; r >= 1; r--) { const s = document.createElement('span'); s.textContent = r; this.rankLabels.appendChild(s); }
    ['a','b','c','d','e','f','g','h'].forEach(f => { const s = document.createElement('span'); s.textContent = f; this.fileLabels.appendChild(s); });
  }

  goToPuzzles() {
    this.loadPuzzle();
    Screens.show('screenGame');
  }

  _shuffle(arr) {
    const grouped = { easy: [], medium: [], hard: [] };
    arr.forEach(p => grouped[p.difficulty].push(p));
    for (const g of Object.values(grouped)) {
      for (let i = g.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [g[i], g[j]] = [g[j], g[i]];
      }
    }
    return [...grouped.easy, ...grouped.medium, ...grouped.hard];
  }

  _parseFEN(fen) {
    const board = Array.from({length:8}, () => Array(8).fill(null));
    const rows = fen.split(' ')[0].split('/');
    rows.forEach((row, r) => {
      let c = 0;
      for (const ch of row) {
        if (/\d/.test(ch)) { c += parseInt(ch); }
        else {
          const color = ch === ch.toUpperCase() ? 'w' : 'b';
          board[r][c] = { color, type: ch.toUpperCase(), id: color + ch.toUpperCase() };
          c++;
        }
      }
    });
    return board;
  }

  _sqToRC(sq) {
    const files = ['a','b','c','d','e','f','g','h'];
    return [8 - parseInt(sq[1]), files.indexOf(sq[0])];
  }

  loadPuzzle() {
    const p = this.puzzles[this.idx];
    this.currentPuzzle = p;
    this.boardState = this._parseFEN(p.fen);
    this.selected = null;
    this.moveNum = 0;
    this.hintUsed = false;
    this.puzzleDone = false;
    this.hintTextEl.textContent = '';
    this.feedbackEl.textContent = '';
    this.feedbackEl.className = 'feedback';
    this.moveHistoryEl.innerHTML = '';
    this.btnNext.classList.add('hidden');
    this._renderInfo();
    this._renderBoard();
    this._renderMoveDots();
    this._updateProgress();
    this._updateStats();
  }

  _renderInfo() {
    const p = this.currentPuzzle;
    this.puzzleTitleEl.textContent = p.title;
    this.puzzleSubtitleEl.textContent = p.subtitle;
    this.puzzleYearEl.textContent = p.year;
    this.puzzleDescEl.textContent = p.desc;
    this.gameBadgeEl.textContent = p.difficulty.charAt(0).toUpperCase() + p.difficulty.slice(1);
    this.gameBadgeEl.className = 'game-badge ' + p.difficulty;
    this.turnBadgeEl.textContent = (p.turn === 'w' ? 'White' : 'Black') + ' to move';
    this.hdrNumEl.textContent = String(this.idx + 1).padStart(2, '0');
  }

  _renderBoard() {
    this.boardEl.innerHTML = '';
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const sq = document.createElement('div');
        const isLight = (r + c) % 2 === 0;
        sq.className = 'sq ' + (isLight ? 'light' : 'dark');
        sq.dataset.r = r; sq.dataset.c = c;
        const piece = this.boardState[r][c];
        if (piece) {
          const wrap = document.createElement('div');
          wrap.className = 'piece-wrap piece-' + piece.color;
          wrap.innerHTML = PIECE_SVG[piece.id] || '';
          sq.appendChild(wrap);
        }
        sq.addEventListener('click', () => this._handleClick(r, c));
        this.boardEl.appendChild(sq);
      }
    }
    if (this.selected) {
      const [sr, sc] = this.selected;
      this._getSquareEl(sr, sc)?.classList.add('selected');
    }
  }

  _getSquareEl(r, c) {
    return this.boardEl.querySelector(`[data-r="${r}"][data-c="${c}"]`);
  }

  _handleClick(r, c) {
    if (this.puzzleDone) return;
    const p = this.currentPuzzle;
    const step = p.solution[this.moveNum];
    if (!step) return;
    const [fr, fc] = this._sqToRC(step.from);
    const [tr, tc] = this._sqToRC(step.to);

    if (!this.selected) {
      if (r === fr && c === fc) {
        this.selected = [r, c];
        this._clearHighlights();
        this._getSquareEl(r, c)?.classList.add('selected');
        this._getSquareEl(tr, tc)?.classList.add('move-dot-hint');
      } else {
        this._flashWrong();
      }
      return;
    }

    const [sr, sc] = this.selected;
    this.selected = null;
    this._clearHighlights();

    if (r === tr && c === tc) {
      this._executeMove(sr, sc, r, c, step);
    } else if (r === fr && c === fc) {
      this.selected = [r, c];
      this._getSquareEl(r, c)?.classList.add('selected');
      this._getSquareEl(tr, tc)?.classList.add('move-dot-hint');
    } else {
      this._flashWrong();
      this._showFeedback('wrong', 'Not quite — try that piece again.');
      setTimeout(() => { if (this.feedbackEl.classList.contains('wrong')) { this.feedbackEl.textContent = ''; this.feedbackEl.className = 'feedback'; } }, 1500);
    }
  }

  _clearHighlights() {
    this.boardEl.querySelectorAll('.selected,.move-dot-hint,.hint-sq').forEach(el => {
      el.classList.remove('selected', 'move-dot-hint', 'hint-sq');
    });
  }

  _executeMove(fr, fc, tr, tc, step) {
    const piece = this.boardState[fr][fc];
    if (!piece) return;
    const hadCapture = !!this.boardState[tr][tc];
    this.boardState[tr][tc] = piece;
    this.boardState[fr][fc] = null;
    this._renderBoard();
    const destEl = this._getSquareEl(tr, tc);
    if (destEl) {
      destEl.classList.add('move-anim');
      if (hadCapture) destEl.classList.add('capture-flash');
      setTimeout(() => { destEl.classList.remove('move-anim', 'capture-flash'); }, 400);
    }
    this._addMoveHistory(this.moveNum + 1, step.notation);
    this.moveNum++;
    this._renderMoveDots();

    const p = this.currentPuzzle;
    if (this.moveNum >= p.solution.length) {
      this._onPuzzleSolved();
    } else {
      this._showFeedback('correct', '✓ Good move!');
      setTimeout(() => { if (!this.puzzleDone) { this.feedbackEl.textContent = ''; this.feedbackEl.className = 'feedback'; } }, 1200);
    }
  }

  _onPuzzleSolved() {
    this.puzzleDone = true;
    this.solved++;
    this.streak++;
    if (this.streak > this.bestStreak) this.bestStreak = this.streak;
    const bonus = this.hintUsed ? 50 : 100;
    this.score += bonus + (this.currentPuzzle.difficulty === 'hard' ? 50 : this.currentPuzzle.difficulty === 'medium' ? 25 : 0);
    this.scoreValEl.textContent = this.score;
    this.scoreValEl.classList.add('bump');
    setTimeout(() => this.scoreValEl.classList.remove('bump'), 400);
    this._showFeedback('done', '♔ Checkmate!');
    this.btnNext.classList.remove('hidden');
    this._updateStats();
    this._playSuccessAnimation();
  }

  _playSuccessAnimation() {
    const squares = this.boardEl.querySelectorAll('.sq');
    squares.forEach((sq, i) => {
      setTimeout(() => {
        sq.style.transition = 'transform 0.2s ease';
        sq.style.transform = 'scale(1.04)';
        setTimeout(() => { sq.style.transform = ''; }, 200);
      }, i * 8);
    });
  }

  _flashWrong() {
    this.boardEl.style.animation = 'none';
    void this.boardEl.offsetHeight;
    this.boardEl.style.animation = 'boardShake .4s ease';
    setTimeout(() => this.boardEl.style.animation = '', 400);
    this._showFeedback('wrong', 'Wrong piece — look again.');
    setTimeout(() => { if (this.feedbackEl.classList.contains('wrong')) { this.feedbackEl.textContent = ''; this.feedbackEl.className = 'feedback'; } }, 1500);
  }

  _showFeedback(type, msg) {
    this.feedbackEl.className = 'feedback ' + type;
    this.feedbackEl.textContent = msg;
  }

  showHint() {
    if (this.puzzleDone) return;
    const p = this.currentPuzzle;
    this.hintUsed = true;
    this.hintTextEl.textContent = p.hint;
    const step = p.solution[this.moveNum];
    if (step) {
      const [fr, fc] = this._sqToRC(step.from);
      this._clearHighlights();
      this._getSquareEl(fr, fc)?.classList.add('hint-sq');
    }
  }

  nextPuzzle() {
    if (this.idx < this.puzzles.length - 1) {
      this.idx++;
      this.loadPuzzle();
    } else {
      document.getElementById('winScore').textContent = this.score;
      Screens.show('screenWin');
    }
  }

  _addMoveHistory(num, notation) {
    const el = document.createElement('div');
    el.className = 'move-entry';
    el.innerHTML = `<span class="mn">${num}.</span><span class="mv correct">${notation}</span>`;
    this.moveHistoryEl.appendChild(el);
  }

  _renderMoveDots() {
    const total = this.currentPuzzle.solution.length;
    this.moveDotsEl.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('div');
      dot.className = 'move-dot' + (i < this.moveNum ? ' used' : (i === this.moveNum ? ' filled' : ''));
      this.moveDotsEl.appendChild(dot);
    }
  }

  _updateProgress() {
    const pct = (this.idx / this.puzzles.length) * 100;
    this.progressFill.style.width = pct + '%';
  }

  _updateStats() {
    this.statSolvedEl.textContent = this.solved;
    this.statStreakEl.textContent = this.streak;
    this.statBestEl.textContent = this.bestStreak || '—';
  }
}

// ─── INIT ────────────────────────────────────────────────────────────────────

const chessGame = new ChessGame();
const puzzleGame = new PuzzleGame();

// Intro screen buttons
document.getElementById('btnPlayChess').addEventListener('click', () => Screens.show('screenDifficulty'));
document.getElementById('btnPlayPuzzles').addEventListener('click', () => {
  puzzleGame.goToPuzzles();
});

// Difficulty selection
document.querySelectorAll('.diff-card').forEach(card => {
  card.addEventListener('click', () => {
    const diff = card.dataset.diff;
    chessGame.startGame(diff);
    Screens.show('screenChess');
  });
});
document.getElementById('btnDiffBack').addEventListener('click', () => Screens.show('screenIntro'));

// Inject animations
const style = document.createElement('style');
style.textContent = `
@keyframes boardShake {
  0%{transform:translateX(0)} 15%{transform:translateX(-6px)} 30%{transform:translateX(6px)}
  45%{transform:translateX(-4px)} 60%{transform:translateX(4px)} 75%{transform:translateX(-2px)}
  90%{transform:translateX(2px)} 100%{transform:translateX(0)}
}
@keyframes piecePlace {
  0%{transform:scale(1.3) translateY(-4px)} 100%{transform:scale(1) translateY(0)}
}
@keyframes pulseCheck {
  0%,100%{box-shadow:0 0 0 0 rgba(200,60,80,.7),inset 0 0 12px rgba(200,60,80,.18)}
  50%{box-shadow:0 0 0 7px rgba(200,60,80,0),inset 0 0 20px rgba(200,60,80,.32)}
}`;
document.head.appendChild(style);
