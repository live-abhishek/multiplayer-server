import { IRoom } from "../iRoom";
import { logger } from "../bunyan";
import { Player } from "../player";
import { TicTacToeRequestEvent } from "./tictactoeRequestEvent";
import {
  TicTacToeResponseEvent,
  ResponseMatchResultState
} from "./tictactoeResponseEvent";
import { AppConstants } from "../appConstants";
import { TicTacToeMatch, TicTacToeMatchResultState } from "./tictactoeMatch";

export enum RoomState {
  matchInPro = "matchInPro",
  waiting = "waiting",
  matchEnded = "matchEnded",
  closed = "closed"
}

export class TicTacToeRoom implements IRoom {
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

  gameType: string = AppConstants.TIC_TAC_TOE;
  players: Array<Player> = [];
  roomState: RoomState;
  match: TicTacToeMatch;
  readonly roomName: string;
  /**
   * 1st index represents wins by 0th player
   * 2nd index represents wins by 1st player
   * 3rd index represents ties
   */
  private score: Array<number> = [0, 0, 0];

  constructor(roomName: string) {
    this.roomName = roomName;
    this.roomState = RoomState.waiting;
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
    this.match.nextTurnPlayerIndex =
      (this.match.nextTurnPlayerIndex + 1) % TicTacToeRoom.maxPlayers; // after updating game-board give turn to next player
    if (
      this.match.matchResult === TicTacToeMatchResultState.result ||
      this.match.matchResult === TicTacToeMatchResultState.tied
    ) {
      this.startNewGame();
    }
  }

  handleDisconnection(player: Player) {
    this.players
      .filter(itrPlayer => itrPlayer.id !== player.id)
      .forEach(itrPlayer =>
        itrPlayer.socket.emit("playerDisconnected", {
          gameType: this.gameType,
          matchResult: "disconnected"
        })
      );
    this.roomState = RoomState.closed;
  }

  isRoomClosed(): boolean {
    return this.roomState === RoomState.closed;
  }

  private startGame() {
    if (this.isRoomClosed()) {
      return;
    }
    this.match = new TicTacToeMatch();
    this.players.forEach((itrPlayer, idx) => {
      itrPlayer.socket.emit(
        "gameInit",
        this.createResponse(this.match.nextTurnPlayerIndex !== idx, idx)
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
          this.createResponse(this.match.nextTurnPlayerIndex !== idx, idx)
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
      this.score[this.match.nextTurnPlayerIndex]++;
    } else if (this.match.matchResult === TicTacToeMatchResultState.tied) {
      this.score[2]++;
    }
  }

  private updateMatchState(event: any, player: Player) {
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
    this.updateMatchResult();
    this.updateRoomScore();
  }

  private sendResponse() {
    const lastMove = this.match.history[this.match.history.length - 1];
    this.players.forEach((itrPlayer, idx) => {
      const response = this.createResponse(
        this.match.nextTurnPlayerIndex === idx,
        idx
      );
      itrPlayer.socket.emit("gameMoveResponse", response);
    });
  }

  private createResponse(
    wasThisPlayerTurn: boolean,
    wasThisPlayerIndex: number
  ): TicTacToeResponseEvent {
    const response = new TicTacToeResponseEvent();
    response.boardState = this.match.boardState;
    response.myTurn = !wasThisPlayerTurn;
    if (this.match.matchResult === TicTacToeMatchResultState.result) {
      response.matchResult = wasThisPlayerTurn
        ? ResponseMatchResultState.win
        : ResponseMatchResultState.lost;
    } else if (this.match.matchResult === TicTacToeMatchResultState.tied) {
      response.matchResult = ResponseMatchResultState.tied;
    } else {
      response.matchResult = ResponseMatchResultState.inpro;
    }
    response.winState = this.match.winState;
    response.score = this.createScoreResponse(wasThisPlayerIndex);
    return response;
  }

  /**
   * If the playerIndex is 0, then his win is this.score[0] & his loss is this.score[1]
   * If the playerIndex is 1, then his win in this.score[1] & his loss is this.score[0] === this.score[(1+1)%2]
   * @param thisPlayerIndex the player's index for whom this response is being constructed
   */
  private createScoreResponse(
    thisPlayerIndex: number
  ): { won: number; lost: number; ties: number } {
    const scoreResponse = {
      won: this.score[thisPlayerIndex],
      lost: this.score[(thisPlayerIndex + 1) % TicTacToeRoom.maxPlayers],
      ties: this.score[2]
    };
    return scoreResponse;
  }

  private getPlayerId(currSocket: any): number {
    return this.players.findIndex(
      playerSocket => playerSocket.id === currSocket.id
    );
  }
}
