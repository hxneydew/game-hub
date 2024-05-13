import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EMPTY_GRID, GRID, STARTER, WinningMoves } from './tic-tac-toe.mock';
import { ButtonComponent, ButtonVariant } from '../button/button.component';

export type XOs = 'X' | 'O' | '';
export interface Moves {
  index: number;
  player: XOs;
}

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.scss',
})
export class TicTacToeComponent {
  readonly ButtonVariant = ButtonVariant;
  readonly WinningMoves = WinningMoves;
  turnCount = 0;
  gameOver = false;
  onePlayer = true;
  xTurn = true;
  winner = '';
  grid: number[] = GRID;
  checkedBoxes: XOs[] = Array.from(STARTER);
  activated: boolean[] = Array.from(EMPTY_GRID);
  history: Moves[] = [];

  click(index: number, player: XOs = 'X'): void {
    this.turnCount++;
    if (this.onePlayer) {
      if (this.turnCount > 4) {
        this.popOldestMove();
      }
    } else {
      if (this.turnCount > 8) {
        this.popOldestMove();
      }
    }
    this.activated[index] = !this.activated[index];
    this.checkedBoxes[index] = player;
    this.history.push({ index, player: this.xTurn ? 'X' : 'O' });
    this.checkWinner(player);
    if (this.onePlayer && !this.gameOver) {
      this.computerTurn();
    }
  }

  computerTurn(): void {
    // array of indexes that need to be blocked
    let defensiveMoves = this.computerOffenseOrDefense('X');
    let offensiveMoves = this.computerOffenseOrDefense('O');

    if (offensiveMoves.length <= defensiveMoves.length) {
      // index offensive
      let random = Math.floor(Math.random() * offensiveMoves.length);
      this.activated[offensiveMoves[random]] = true;
      this.checkedBoxes[offensiveMoves[random]] = 'O';
      this.history.push({
        index: offensiveMoves[random],
        player: this.xTurn ? 'X' : 'O',
      });
    } else {
      // index defensive
      let random = Math.floor(Math.random() * defensiveMoves.length);
      this.activated[defensiveMoves[random]] = true;
      this.checkedBoxes[defensiveMoves[random]] = 'O';
      this.history.push({
        index: defensiveMoves[random],
        player: this.xTurn ? 'X' : 'O',
      });
    }

    if (this.turnCount > 4) {
      this.popOldestMove();
    }
    this.checkWinner('O');
  }

  // gets board for offensive (best O move) or defense (blocks x winning move)
  computerOffenseOrDefense(player: XOs): number[] {
    // find empty spaces on the board
    let openSpaces: number[] = [];
    this.activated.map((x, index) => {
      if (x === false) {
        openSpaces.push(index);
      }
    });

    // find spaces x occupies and spots it needs to win
    let Xspaces: number[] = this.getPlayerTakenSpaces(player);
    let strategicMoves: number[][] = [];

    this.WinningMoves.forEach((pattern) => {
      // arrays of winning patterns that x would need to win
      let filteredArray = pattern.filter((x) => !Xspaces.includes(x));
      // 3 is longest length for a winning pattern
      if (filteredArray.length < 3) {
        strategicMoves.push(filteredArray);
      }
    });

    // start at highest length a winning pattern can be
    // find smallest possible moves for X to win
    let smallestLength = 3;
    strategicMoves.forEach((x) =>
      x.length < smallestLength ? (smallestLength = x.length) : smallestLength
    );

    // set so we don't have repeating index values
    let spotsToTake = new Set<number>();
    for (let i = 0; i < strategicMoves.length; i++) {
      if (strategicMoves[i].length === smallestLength) {
        strategicMoves[i].forEach((x) => spotsToTake.add(x));
      }
    }

    let result = [...spotsToTake]
      .filter((x) => openSpaces.includes(x))
      .sort((a, b) => a - b);

    // maybe return offensive moves otherwise
    // return array of spots to take (strategic) that are available
    return result.length ? result : openSpaces;
  }

  getPlayerTakenSpaces(player: XOs): number[] {
    let spaces: number[] = [];
    this.checkedBoxes.forEach((x, index) => {
      if (x === player) {
        spaces.push(index);
      }
    });
    return spaces;
  }

  popOldestMove(): void {
    let moveIndex = this.history[0].index;
    this.activated[moveIndex] = !this.activated[moveIndex];
    this.checkedBoxes[moveIndex] = '';
    this.history.splice(0, 1);
  }

  checkWinner(player: XOs): void {
    let spaces: number[] = this.getPlayerTakenSpaces(player);
    this.WinningMoves.forEach((pattern) => {
      if (pattern.every((spot) => spaces.includes(spot))) {
        this.gameOver = true;
        this.winner = player;
      }
    });
  }

  togglePlayerMode(): void {
    this.resetBoard();
    this.onePlayer = !this.onePlayer;
  }

  togglePlayerTurn(): void {
    this.xTurn = !this.xTurn;
  }

  resetBoard(): void {
    this.checkedBoxes = Array.from(STARTER);
    this.activated = Array.from(EMPTY_GRID);
    this.history = [];
    this.gameOver = false;
    this.turnCount = 0;
    this.xTurn = true;
  }
}
