import { Room } from "../room";
import { logger } from "../bunyan";
import { Player } from "../player";
import { TicTacToeRequestEvent } from "./tictactoeRequestEvent";
import {
  TicTacToeResponseEvent,
  ResponseMatchResultState
} from "./tictactoeResponseEvent";
import { AppConstants } from "../appConstants";
import { TicTacToeMatch, TicTacToeMatchResultState } from "./tictactoeMatch";

export class TicTacToeRoom extends Room {
  private static readonly winStates: Array<Array<number>> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  static readonly maxPlayers = 2;

  players: Array<Player> = [];
  match: TicTacToeMatch;
  readonly roomName: string;
  /**
   * 1st index represents wins by 0th player
   * 2nd index represents wins by 1st player
   * 3rd index represents ties
   */
  private score: Array<number> = [0, 0, 0];

  constructor(roomName: string) {
    super(roomName);
    this.gameType = AppConstants.TIC_TAC_TOE;
  }

  addPlayer(player: Player) {
    if (!this.isAvailable()) {
      logger.error("Cannot add anymore player in this room");
      return;
    }
    this.players.push(player);
    if (!this.isAvailable()) {
      this.startGame();
    }
  }

  isAvailable(): boolean {
    return this.players.length < TicTacToeRoom.maxPlayers;
  }

  processEvent(event: any, player: Player) {
    if (this.isRoomClosed()) {
      return;
    }
    this.updateMatchState(event, player);
    this.sendResponse();
    if (
      this.match.matchResult === TicTacToeMatchResultState.result ||
      this.match.matchResult === TicTacToeMatchResultState.tied
    ) {
      this.startNewGame();
    }
  }

  private startGame() {
    if (this.isRoomClosed()) {
      return;
    }
    this.match = new TicTacToeMatch();
    this.players.forEach((itrPlayer, idx) => {
      itrPlayer.socket.emit(
        "gameInit",
        new TicTacToeResponseEvent(this.match, idx, this.score)
      );
    });
  }

  private startNewGame() {
    if (this.isRoomClosed()) {
      return;
    }
    this.match = new TicTacToeMatch(
      (this.match.starterPlayerIndex + 1) % TicTacToeRoom.maxPlayers
    );
    setTimeout(() => {
      this.players.forEach((itrPlayer, idx) => {
        itrPlayer.socket.emit(
          "gameInit",
          new TicTacToeResponseEvent(this.match, idx, this.score)
        );
      });
    }, 2000);
  }

  private updateMatchResult() {
    const gs = this.match.boardState;
    if (gs.every(cell => cell !== 0)) {
      this.match.matchResult = TicTacToeMatchResultState.tied;
    }
    for (let i = 0; i < TicTacToeRoom.winStates.length; i++) {
      const ws = TicTacToeRoom.winStates[i];
      if (
        // none of the winning states are 0
        gs[ws[0]] !== 0 &&
        gs[ws[1]] !== 0 &&
        gs[ws[2]] !== 0 &&
        // all the three winning states are same
        (gs[ws[0]] === gs[ws[1]] && gs[ws[1]] === gs[ws[2]])
      ) {
        this.match.matchResult = TicTacToeMatchResultState.result;
        this.match.winState = ws;
      }
    }
  }

  private updateRoomScore() {
    if (this.match.matchResult === TicTacToeMatchResultState.result) {
      this.score[
        // player who made the last move, won
        (this.match.nextTurnPlayerIndex + 1) % TicTacToeRoom.maxPlayers
      ]++;
    } else if (this.match.matchResult === TicTacToeMatchResultState.tied) {
      this.score[2]++;
    }
  }

  private updateMatchState(event: any, player: Player) {
    const tictactoeRequestEvent = event as TicTacToeRequestEvent;
    this.processMove(tictactoeRequestEvent, player);
    this.updateMatchResult();
    this.updateRoomScore();
  }

  private sendResponse() {
    const lastMove = this.match.history[this.match.history.length - 1];
    this.players.forEach((itrPlayer, idx) => {
      const response = new TicTacToeResponseEvent(this.match, idx, this.score);
      itrPlayer.socket.emit("gameMoveResponse", response);
    });
  }

  private processMove(event: TicTacToeRequestEvent, player: Player) {
    const cellNewState = this.getPlayerId(player) + 1;
    const tttEvent = <TicTacToeRequestEvent>event;
    if (this.match.boardState[event.cellNum] !== 0) {
      logger.error("Tampered data received.");
      return;
    }
    this.match.boardState[event.cellNum] = cellNewState;
    this.match.history.push({
      cellNum: event.cellNum,
      cellState: cellNewState
    });
    this.match.nextTurnPlayerIndex =
      (this.match.nextTurnPlayerIndex + 1) % TicTacToeRoom.maxPlayers;
  }

  private getPlayerId(currSocket: any): number {
    return this.players.findIndex(
      playerSocket => playerSocket.id === currSocket.id
    );
  }
}
