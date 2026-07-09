# Design System — Submerged Cathedral

This document is the editorial brief behind CHECKMATE's visual identity. It
exists so anyone touching the codebase, a designer, a developer, or a future
photographer, can extend the system without breaking its internal logic.

## Direction in one paragraph

The frame is a 135mm portrait plate. The camera almost never moves. Every
surface is tactile: film grain, condensation, salt residue, cracked skin,
oxidized metal. Nothing reads as digitally clean. The palette is monochrome
with a single cold accent (a pale nacre green) standing in for the one
thing still alive in the frame. Reference points are baroque religious
portraiture drained of color, Scandinavian ritual minimalism, museum
conservation photography, and deep-sea macro biology.

## Why a chess app carries this system

A puzzle in CHECKMATE is a small, contained rite: the player is handed a
position, given no room to improvise, and must find the one sequence that
resolves it. That structure, arrival, constraint, revelation, mirrors the
eight-chapter arc below far more naturally than a bright, gamified UI would.
Each puzzle screen is treated as a single plate in the sequence rather than
a dashboard.

## The eight chapters, mapped to the product

| # | Chapter | Product moment |
|---|---------|----------------|
| I | The Arrival | App load. A single title emerges from `--abyss-000`, nothing else on screen for the first beat. |
| II | Initiation | The intro screen proper. Three pieces (Queen, Knight, Bishop) rest motionless in the dark field, eyes-closed stillness rendered as near-zero animation. |
| III | Communion | The moment a player selects a piece. Legal destinations surface as faint nacre marks, unclear at a glance whether they are UI or something living on the board. |
| IV | Tithe | The info column: macro-style close reading of the position, difficulty, year, the cost of the position in material. |
| V | Procession | The full board itself, an altarpiece of light and dark squares, generous negative space around it. |
| VI | Shedding | The checkmate transition. Board opacity and piece forms dissolve into the overlay rather than popping a modal. |
| VII | Cathedral of Water | The mate overlay, environment (grain, vignette, condensation) overwhelms the UI chrome. |
| VIII | Return | The win screen after all twelve puzzles. One final portrait, the score, mostly darkness. |

## Color

All color lives in `src/styles/tokens.css`. There is no separate light
theme, the system is monochrome by intent, the only variation is a
low-contrast "Parchment Ash" reading mode for accessibility (`prefers-contrast:
more`), which lifts text contrast without introducing new hues.

- `--abyss-*` background depths, darkest at the frame edges.
- `--water-*` secondary surfaces, panels, cards.
- `--skin-*`, `--salt` text and light-value pieces.
- `--scar`, `--leather*` warm dark accents used sparingly, hint states,
  captured pieces, warnings.
- `--oxide*`, `--nacre`, `--verdigris` the single living accent color and
  its supporting tones. Used for the active piece, legal-move marks, and
  the accent border.

## Typography

- Display: `Cormorant Garamond` (falls back to `Playfair Display`), used
  only for the puzzle title and chapter numerals, always wide-tracked in
  small caps or italic, never at high weight.
- Body: `Libre Baskerville` for descriptive copy.
- Mono: `DM Mono` for conservation-style labels, coordinates, and metadata
  (puzzle number, move counters, timers) letter-spaced like a museum
  object tag.

## Texture system

Three fixed, non-interactive layers sit above every screen (`global.css`):
grain, condensation, and vignette. They are pure CSS/SVG, no raster image
assets, so the effect stays crisp at any resolution and costs nothing to
load. A fourth optional layer, `.texture-scale`, adds a faint fish-scale
iridescence to the board frame only, used on the Procession and Communion
moments.

## Motion

Everything defaults to `--duration-slow` (1.4s) with `--ease-still`, a
gentle deceleration curve with no overshoot. Fast feedback (a wrong-move
shake, a hint pulse) is the only place `--duration-fast` appears, and even
that stays a few degrees of movement, never a bounce. `prefers-reduced-motion`
collapses everything to instant state changes.

## Iconography

Icons are hand-drawn single-weight line SVGs (`src/components/icons`),
stroke only, no fills, echoing etching-plate line work rather than a
UI icon font. There are eight: crown, droplet, hourglass, flame (streak),
scroll (hint), seal (achievement), tide (reset), and key (next).

## Extending the system

If real photography is produced for the eight chapters later, it should
replace the CSS/SVG texture approximations directly as background plates
behind the existing screens, the layout, type, and motion rules in this
document are written to hold regardless of whether the texture layer is
procedural or photographic.
