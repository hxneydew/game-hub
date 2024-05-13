import { XOs } from './tic-tac-toe.component';

export const GRID: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const STARTER: XOs[] = ['', '', '', '', '', '', '', '', ''];
export const EMPTY_GRID: boolean[] = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

export const WinningMoves: number[][] = [
  // horizontals (top, middle, bottom)
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // verticals (left, middle, right)
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //diagonals (top to bottom, bottom to top)
  [0, 4, 8],
  [2, 4, 6],
];
