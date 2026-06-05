const PUZZLES_DATA = [
  {
    id:1,
    title:"Paul Morphy",
    subtitle:"Opera Game",
    year:"1858",
    difficulty:"easy",
    turn:"w",
    desc:"White to move. Checkmate in 2.",
    hint:"The Queen delivers from the d-file.",
    fen:"4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR3R w k - 0 1",
    solution:[
      {from:"b3",to:"b8",notation:"Qb8+"},
      {from:"d8",to:"b8",notation:"Rxb8#"}
    ]
  },
  {
    id:2,
    title:"Adolf Anderssen",
    subtitle:"The Immortal Game",
    year:"1851",
    difficulty:"easy",
    turn:"w",
    desc:"White to move. Checkmate in 2.",
    hint:"The Bishop on b3 creates a lethal diagonal.",
    fen:"r1bk3r/p2pBpNp/n4n2/1p1NP2P/6P1/3P4/P1P1K3/q5b1 w - - 0 1",
    solution:[
      {from:"d7",to:"c8",notation:"Bd8+"},
      {from:"c8",to:"d8",notation:"Rxd8#"}
    ]
  },
  {
    id:3,
    title:"Robert James Fischer",
    subtitle:"Game of the Century",
    year:"1956",
    difficulty:"medium",
    turn:"b",
    desc:"Black to move. Checkmate in 2.",
    hint:"The Queen sacrifices herself for the rooks to act.",
    fen:"1Q6/5pk1/2p3p1/1p2N2p/1b5P/1bn5/2r3P1/2K5 b - - 0 1",
    solution:[
      {from:"c3",to:"e1",notation:"Ne1+"},
      {from:"c1",to:"d2",notation:"Kd2"},
      {from:"b3",to:"a2",notation:"Ba2#"}
    ]
  },
  {
    id:4,
    title:"Garry Kasparov",
    subtitle:"vs. Topalov, 1999",
    year:"1999",
    difficulty:"medium",
    turn:"w",
    desc:"White to move. Find the decisive combination.",
    hint:"Rook sacrifice opens the king's defenses.",
    fen:"r3r1k1/pp3pbp/1qp3p1/2B5/2BP2b1/Q5P1/PP3nKP/R4R2 w - - 0 1",
    solution:[
      {from:"f1",to:"f2",notation:"Rxf2+"},
      {from:"g2",to:"f2",notation:"Kxf2"},
      {from:"a1",to:"d1",notation:"Rd1+"}
    ]
  },
  {
    id:5,
    title:"Mikhail Tal",
    subtitle:"vs. Botvinnik, 1960",
    year:"1960",
    difficulty:"medium",
    turn:"w",
    desc:"White to move. Sacrifice for checkmate.",
    hint:"Knight leaps to h5 opening the attack.",
    fen:"r1bqr1k1/pp3ppp/2n2n2/3p4/1bpP4/2NBPN2/PP3PPP/R1BQR1K1 w - - 0 1",
    solution:[
      {from:"d3",to:"e5",notation:"Nxe5"},
      {from:"c6",to:"e5",notation:"Nxe5"},
      {from:"d4",to:"e5",notation:"dxe5#"}
    ]
  },
  {
    id:6,
    title:"Anatoly Karpov",
    subtitle:"vs. Spassky, 1974",
    year:"1974",
    difficulty:"easy",
    turn:"w",
    desc:"White to move. Mate in 2.",
    hint:"The Queen to h7 is crushing.",
    fen:"5rk1/pp4pp/4p3/2R3Q1/3n4/2q4r/P1P2PPP/1R4K1 w - - 0 1",
    solution:[
      {from:"g5",to:"g7",notation:"Qxg7+"},
      {from:"g8",to:"g7",notation:"Kxg7"}
    ]
  },
  {
    id:7,
    title:"Magnus Carlsen",
    subtitle:"vs. Morozevich, 2008",
    year:"2008",
    difficulty:"hard",
    turn:"w",
    desc:"White to move. Three-move combination.",
    hint:"Queen to h6 starts the mating net.",
    fen:"r4rk1/ppp2ppp/2n1bn2/4p1q1/2B1P3/2NP1N2/PPP2PPP/R1BQR1K1 w - - 0 1",
    solution:[
      {from:"d1",to:"h5",notation:"Qh5"},
      {from:"g5",to:"h5",notation:"Qxh5"},
      {from:"f3",to:"h4",notation:"Nxh4#"}
    ]
  },
  {
    id:8,
    title:"Tigran Petrosian",
    subtitle:"vs. Spassky, 1966",
    year:"1966",
    difficulty:"easy",
    turn:"w",
    desc:"White to move. Deliver checkmate.",
    hint:"A back-rank weakness is decisive.",
    fen:"6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1",
    solution:[
      {from:"d1",to:"d8",notation:"Rd8+"},
      {from:"g8",to:"f7",notation:"Kf7"}
    ]
  },
  {
    id:9,
    title:"José Raúl Capablanca",
    subtitle:"vs. Marshall, 1918",
    year:"1918",
    difficulty:"medium",
    turn:"w",
    desc:"White to move. Queen and Bishop cooperate.",
    hint:"Queen to g7 threatens immediate mate.",
    fen:"r4rk1/1b3ppp/p2bp3/1p2p1q1/3PP3/P1NB1N2/1PP2PPP/R2Q1RK1 w - - 0 1",
    solution:[
      {from:"f3",to:"h4",notation:"Nxh4"},
      {from:"g5",to:"d2",notation:"Qxd2"},
      {from:"d3",to:"h7",notation:"Bxh7#"}
    ]
  },
  {
    id:10,
    title:"Viswanathan Anand",
    subtitle:"vs. Kasparov, 1995",
    year:"1995",
    difficulty:"hard",
    turn:"w",
    desc:"White to move. Find the brilliant finish.",
    hint:"A discovered check changes everything.",
    fen:"r1bqr1k1/pp1n1ppp/2p2n2/3pp1B1/1b1PP3/2NB1N2/PPP2PPP/R2QK2R w KQ - 0 1",
    solution:[
      {from:"g5",to:"f6",notation:"Bxf6"},
      {from:"g7",to:"f6",notation:"gxf6"},
      {from:"d3",to:"h7",notation:"Bxh7#"}
    ]
  },
  {
    id:11,
    title:"Mikhail Botvinnik",
    subtitle:"vs. Chekhover, 1935",
    year:"1935",
    difficulty:"easy",
    turn:"w",
    desc:"White to move. Classic Queen sacrifice.",
    hint:"The Knight on f7 threatens a royal fork.",
    fen:"r1b2rk1/pp2nppp/2n1p3/q2pP3/5B2/2NQ1N2/PPP2PPP/2KR3R w - - 0 1",
    solution:[
      {from:"d3",to:"d5",notation:"Qxd5"},
      {from:"e7",to:"d5",notation:"Nxd5"},
      {from:"f4",to:"h6",notation:"Bh6#"}
    ]
  },
  {
    id:12,
    title:"Efim Bogoljubov",
    subtitle:"vs. Alekhine, 1922",
    year:"1922",
    difficulty:"hard",
    turn:"b",
    desc:"Black to move. Find the winning combination.",
    hint:"The Queen at d4 creates a deadly threat.",
    fen:"r3r1k1/ppp2ppp/8/4n3/3qP1b1/2NB4/PPP2PPP/R1BQR1K1 b - - 0 1",
    solution:[
      {from:"e5",to:"f3",notation:"Nxf3+"},
      {from:"g2",to:"f3",notation:"gxf3"},
      {from:"d4",to:"h4",notation:"Qxh4#"}
    ]
  }
];

const PIECE_UNICODE = {
  wK:"♔",wQ:"♕",wR:"♖",wB:"♗",wN:"♘",wP:"♙",
  bK:"♚",bQ:"♛",bR:"♜",bB:"♝",bN:"♞",bP:"♟"
};

const FILE_LABELS = ["a","b","c","d","e","f","g","h"];
const RANK_LABELS = ["8","7","6","5","4","3","2","1"];

function parseFEN(fen){
  const board = Array.from({length:8},()=>Array(8).fill(null));
  const parts = fen.split(" ");
  const rows = parts[0].split("/");
  rows.forEach((row,r)=>{
    let c=0;
    for(const ch of row){
      if(/\d/.test(ch)){c+=parseInt(ch)}
      else{
        const color=ch===ch.toUpperCase()?"w":"b";
        const type=ch.toUpperCase();
        board[r][c]={color,type,id:color+type};
        c++;
      }
    }
  });
  return board;
}

function sqToRC(sq){
  const f=FILE_LABELS.indexOf(sq[0]);
  const r=8-parseInt(sq[1]);
  return [r,f];
}

function rcToSq(r,c){
  return FILE_LABELS[c]+(8-r);
}

class Game{
  constructor(){
    this.puzzles=this.shuffle([...PUZZLES_DATA]);
    this.idx=0;
    this.score=0;
    this.solved=0;
    this.streak=0;
    this.bestStreak=0;
    this.selected=null;
    this.moveNum=0;
    this.hintUsed=false;
    this.puzzleDone=false;
    this.initDOM();
    this.loadPuzzle();
    this.bindIntro();
  }

  shuffle(arr){
    const sorted=[...arr].sort((a,b)=>{
      const order={easy:0,medium:1,hard:2};
      return order[a.difficulty]-order[b.difficulty];
    });
    const grouped={easy:[],medium:[],hard:[]};
    sorted.forEach(p=>grouped[p.difficulty].push(p));
    const shuffleGroup=g=>{for(let i=g.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[g[i],g[j]]=[g[j],g[i]]}};
    shuffleGroup(grouped.easy);
    shuffleGroup(grouped.medium);
    shuffleGroup(grouped.hard);
    return [...grouped.easy,...grouped.medium,...grouped.hard];
  }

  initDOM(){
    this.boardEl=document.getElementById("board");
    this.rankLabels=document.getElementById("rankLabels");
    this.fileLabels=document.getElementById("fileLabels");
    this.puzzleTitleEl=document.getElementById("puzzleTitle");
    this.puzzleSubtitleEl=document.getElementById("puzzleSubtitle");
    this.puzzleYearEl=document.getElementById("puzzleYear");
    this.puzzleDescEl=document.getElementById("puzzleDesc");
    this.gameBadgeEl=document.getElementById("gameBadge");
    this.feedbackEl=document.getElementById("feedback");
    this.hdrNumEl=document.getElementById("hdrNum");
    this.progressFill=document.getElementById("progressFill");
    this.scoreValEl=document.getElementById("scoreVal");
    this.moveDotsEl=document.getElementById("moveDots");
    this.moveHistoryEl=document.getElementById("moveHistory");
    this.hintTextEl=document.getElementById("hintText");
    this.turnBadgeEl=document.getElementById("turnBadge");
    this.statSolvedEl=document.getElementById("statSolved");
    this.statStreakEl=document.getElementById("statStreak");
    this.statBestEl=document.getElementById("statBest");
    this.btnNext=document.getElementById("btnNext");
    this.btnReset=document.getElementById("btnReset");
    this.btnHint=document.getElementById("btnHint");
    this.btnNext.addEventListener("click",()=>this.nextPuzzle());
    this.btnReset.addEventListener("click",()=>this.resetPuzzle());
    this.btnHint.addEventListener("click",()=>this.showHint());
    document.getElementById("btnBackHome").addEventListener("click",()=>this.goHome());
    this.buildBoardLabels();
  }

  bindIntro(){
    document.getElementById("btnStart").addEventListener("click",()=>{
      document.getElementById("screenIntro").classList.add("hidden");
      document.getElementById("screenGame").classList.remove("hidden");
    });
    document.getElementById("btnRestart").addEventListener("click",()=>{
      this.puzzles=this.shuffle([...PUZZLES_DATA]);
      this.idx=0;this.score=0;this.solved=0;this.streak=0;
      this.updateStats();
      this.loadPuzzle();
      document.getElementById("screenWin").classList.add("hidden");
      document.getElementById("screenGame").classList.remove("hidden");
    });
  }

  goHome(){
    document.getElementById("screenGame").classList.add("hidden");
    document.getElementById("screenIntro").classList.remove("hidden");
  }

  buildBoardLabels(){
    this.rankLabels.innerHTML="";
    this.fileLabels.innerHTML="";
    RANK_LABELS.forEach(l=>{const s=document.createElement("span");s.textContent=l;this.rankLabels.appendChild(s)});
    FILE_LABELS.forEach(l=>{const s=document.createElement("span");s.textContent=l;this.fileLabels.appendChild(s)});
  }

  loadPuzzle(){
    const p=this.puzzles[this.idx];
    this.currentPuzzle=p;
    this.boardState=parseFEN(p.fen);
    this.selected=null;
    this.moveNum=0;
    this.hintUsed=false;
    this.puzzleDone=false;
    this.hintTextEl.textContent="";
    this.feedbackEl.textContent="";
    this.feedbackEl.className="feedback";
    this.moveHistoryEl.innerHTML="";
    this.btnNext.classList.add("hidden");
    this.renderInfo();
    this.renderBoard();
    this.renderMoveDots();
    this.updateProgress();
    this.updateStats();
  }

  renderInfo(){
    const p=this.currentPuzzle;
    this.puzzleTitleEl.textContent=p.title;
    this.puzzleSubtitleEl.textContent=p.subtitle;
    this.puzzleYearEl.textContent=p.year;
    this.puzzleDescEl.textContent=p.desc;
    this.gameBadgeEl.textContent=p.difficulty.charAt(0).toUpperCase()+p.difficulty.slice(1);
    this.gameBadgeEl.className="game-badge "+p.difficulty;
    this.turnBadgeEl.textContent=(p.turn==="w"?"White":"Black")+" to move";
    this.hdrNumEl.textContent=String(this.idx+1).padStart(2,"0");
  }

  renderBoard(){
    this.boardEl.innerHTML="";
    for(let r=0;r<8;r++){
      for(let c=0;c<8;c++){
        const sq=document.createElement("div");
        const isLight=(r+c)%2===0;
        sq.className="sq "+(isLight?"light":"dark");
        sq.dataset.r=r;sq.dataset.c=c;
        const piece=this.boardState[r][c];
        if(piece){
          const span=document.createElement("span");
          span.className="piece "+(piece.color==="w"?"white-piece":"black-piece");
          span.textContent=PIECE_UNICODE[piece.id]||"";
          sq.appendChild(span);
          sq.classList.add("has-piece");
        }
        sq.addEventListener("click",()=>this.handleClick(r,c));
        this.boardEl.appendChild(sq);
      }
    }
    if(this.selected){
      const[sr,sc]=this.selected;
      this.getSquareEl(sr,sc)?.classList.add("selected");
    }
  }

  getSquareEl(r,c){
    return this.boardEl.querySelector(`[data-r="${r}"][data-c="${c}"]`);
  }

  handleClick(r,c){
    if(this.puzzleDone)return;
    const p=this.currentPuzzle;
    const step=p.solution[this.moveNum];
    if(!step)return;
    const [fr,fc]=sqToRC(step.from);
    const [tr,tc]=sqToRC(step.to);

    if(!this.selected){
      if(r===fr&&c===fc){
        this.selected=[r,c];
        this.clearHighlights();
        this.getSquareEl(r,c)?.classList.add("selected");
        this.showPossibleMoves(tr,tc);
      }else{
        this.flashWrong();
      }
      return;
    }

    const [sr,sc]=this.selected;
    this.selected=null;
    this.clearHighlights();

    if(r===tr&&c===tc){
      this.executeMove(sr,sc,r,c,step);
    }else if(r===fr&&c===fc){
      this.selected=[r,c];
      this.getSquareEl(r,c)?.classList.add("selected");
      this.showPossibleMoves(tr,tc);
    }else{
      this.flashWrong();
      this.showFeedback("wrong","Not quite — try that piece again.");
      setTimeout(()=>{if(this.feedbackEl.classList.contains("wrong")){this.feedbackEl.textContent="";this.feedbackEl.className="feedback";}},1500);
    }
  }

  showPossibleMoves(tr,tc){
    const sq=this.getSquareEl(tr,tc);
    if(sq){sq.classList.add("possible");if(sq.classList.contains("has-piece"))sq.classList.add("has-piece");}
  }

  clearHighlights(){
    this.boardEl.querySelectorAll(".selected,.possible,.hint-sq").forEach(el=>{
      el.classList.remove("selected","possible","hint-sq");
    });
  }

  executeMove(fr,fc,tr,tc,step){
    const piece=this.boardState[fr][fc];
    if(!piece)return;
    const hadCapture=!!this.boardState[tr][tc];
    this.boardState[tr][tc]=piece;
    this.boardState[fr][fc]=null;
    this.renderBoard();
    const destEl=this.getSquareEl(tr,tc);
    if(destEl){
      destEl.classList.add("move-anim");
      if(hadCapture)destEl.classList.add("capture-flash");
      setTimeout(()=>{destEl.classList.remove("move-anim","capture-flash")},400);
    }
    this.addMoveHistory(this.moveNum+1,step.notation,true);
    this.moveNum++;
    this.renderMoveDots();

    const totalMoves=p.solution?p.solution.length:this.currentPuzzle.solution.length;
    const p2=this.currentPuzzle;
    if(this.moveNum>=p2.solution.length){
      this.onPuzzleSolved();
    }else{
      this.showFeedback("correct","✓ Good move!");
      setTimeout(()=>{if(!this.puzzleDone){this.feedbackEl.textContent="";this.feedbackEl.className="feedback";}},1200);
    }
  }

  onPuzzleSolved(){
    this.puzzleDone=true;
    this.solved++;
    this.streak++;
    if(this.streak>this.bestStreak)this.bestStreak=this.streak;
    const bonus=this.hintUsed?50:100;
    this.score+=bonus+(this.currentPuzzle.difficulty==="hard"?50:this.currentPuzzle.difficulty==="medium"?25:0);
    this.scoreValEl.textContent=this.score;
    this.scoreValEl.classList.add("bump");
    setTimeout(()=>this.scoreValEl.classList.remove("bump"),400);
    this.showFeedback("done","♔ Checkmate!");
    this.btnNext.classList.remove("hidden");
    this.updateStats();
    this.playSuccessAnimation();
  }

  playSuccessAnimation(){
    const squares=this.boardEl.querySelectorAll(".sq");
    squares.forEach((sq,i)=>{
      setTimeout(()=>{
        sq.style.transition="transform 0.2s ease";
        sq.style.transform="scale(1.04)";
        setTimeout(()=>{sq.style.transform="";},200);
      },i*8);
    });
  }

  flashWrong(){
    this.boardEl.style.animation="none";
    void this.boardEl.offsetHeight;
    this.boardEl.style.animation="boardShake .4s ease";
    setTimeout(()=>this.boardEl.style.animation="",400);
    this.showFeedback("wrong","Wrong piece — look again.");
    setTimeout(()=>{if(this.feedbackEl.classList.contains("wrong")){this.feedbackEl.textContent="";this.feedbackEl.className="feedback";}},1500);
  }

  showFeedback(type,msg){
    this.feedbackEl.className="feedback "+type;
    this.feedbackEl.textContent=msg;
  }

  showHint(){
    if(this.puzzleDone)return;
    const p=this.currentPuzzle;
    this.hintUsed=true;
    this.hintTextEl.textContent=p.hint;
    const step=p.solution[this.moveNum];
    if(step){
      const [fr,fc]=sqToRC(step.from);
      this.clearHighlights();
      this.getSquareEl(fr,fc)?.classList.add("hint-sq");
    }
  }

  resetPuzzle(){
    this.loadPuzzle();
  }

  nextPuzzle(){
    if(this.idx<this.puzzles.length-1){
      this.idx++;
      this.loadPuzzle();
    }else{
      document.getElementById("winScore").textContent=this.score;
      document.getElementById("screenGame").classList.add("hidden");
      document.getElementById("screenWin").classList.remove("hidden");
    }
  }

  addMoveHistory(num,notation,correct){
    const el=document.createElement("div");
    el.className="move-entry";
    el.innerHTML=`<span class="mn">${num}.</span><span class="mv${correct?" correct":""}">${notation}</span>`;
    this.moveHistoryEl.appendChild(el);
  }

  renderMoveDots(){
    const p=this.currentPuzzle;
    const total=p.solution.length;
    this.moveDotsEl.innerHTML="";
    for(let i=0;i<total;i++){
      const dot=document.createElement("div");
      dot.className="move-dot"+(i<this.moveNum?" used":(i===this.moveNum?" filled":""));
      this.moveDotsEl.appendChild(dot);
    }
  }

  updateProgress(){
    const pct=((this.idx)/this.puzzles.length)*100;
    this.progressFill.style.width=pct+"%";
  }

  updateStats(){
    this.statSolvedEl.textContent=this.solved;
    this.statStreakEl.textContent=this.streak;
    this.statBestEl.textContent=this.bestStreak||"—";
  }
}

const style=document.createElement("style");
style.textContent=`
@keyframes boardShake{
  0%{transform:translateX(0)}
  15%{transform:translateX(-6px)}
  30%{transform:translateX(6px)}
  45%{transform:translateX(-4px)}
  60%{transform:translateX(4px)}
  75%{transform:translateX(-2px)}
  90%{transform:translateX(2px)}
  100%{transform:translateX(0)}
}`;
document.head.appendChild(style);

window.addEventListener("DOMContentLoaded",()=>{
  new Game();
});
