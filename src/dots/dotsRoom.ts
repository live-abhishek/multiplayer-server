import { logger } from "../bunyan";
import { Player } from "../player";
import { Room } from "../room";
import { AppConstants } from "../appConstants";
import { DotsMatch, DotsMatchResultState } from "./dotsMatch";
import {
  DotsResponseEvent,
  ResponseDotsMatchResultState
} from "./DotsResponseEvent";
import { DotsRequestEvent } from "./DotsRequestEvent";

export class DotsRoom extends Room {
  static readonly maxPlayers = 2;

  players: Array<Player> = [];
  match: DotsMatch;
  roomName: string;
  gameType: string;
  private score: Array<number> = [0, 0];

  constructor(roomName: string) {
    super(roomName);
    this.gameType = AppConstants.DOTS;
  }
  addPlayer(player: Player): void {
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
    return this.players.length < DotsRoom.maxPlayers;
  }
  processEvent(event: any, player: Player): void {
    if (this.isRoomClosed()) {
      return;
    }
    this.updateMatchState(event, player);
    this.sendResponse();
    // next player turns decision is based on the fact
    // that whether this move results in a box assignment
    // in which case, move should be given to the same person
    this.match.nextTurnPlayerIndex =
      (this.match.nextTurnPlayerIndex + 1) % DotsRoom.maxPlayers;
    if (this.match.matchResult === DotsMatchResultState.result) {
      this.startNewGame();
    }
  }

  private updateMatchState(event: any, player: Player) {
    const cellNewState = this.getPlayerId(player) + 1;
    const dotsEvent = <DotsRequestEvent>event;
    this.updateMatchBoardState(event, cellNewState);
  }

  private updateMatchBoardState(event: DotsRequestEvent, cellNewState: number) {
    // perform a check for the move validity
    const { move } = event;
    this.match.boardState[move.rowNum][move.colNum] = cellNewState;
  }
  private updateMatchResult() {}
  private UpdateRoomScore() {}

  private startGame() {
    if (!this.isRoomClosed()) {
      return;
    }
    this.match = new DotsMatch();
    this.players.forEach((roomPlayer, idx) => {
      roomPlayer.socket.emit(
        "gameInit",
        this.createResponse(this.match.nextTurnPlayerIndex !== idx, idx, true)
      );
    });
  }

  private startNewGame() {
    if (this.isRoomClosed()) {
      return;
    }
    this.match = new DotsMatch(
      (this.match.starterPlayerIndex + 1) % DotsRoom.maxPlayers
    );
    setTimeout(() => {
      this.players.forEach((roomPlayer, idx) => {
        roomPlayer.socket.emit(
          "gameInit",
          this.createResponse(this.match.nextTurnPlayerIndex !== idx, idx, true)
        );
      });
    }, 2000);
  }

  private sendResponse() {
    this.players.forEach((roomPlayer, idx) => {
      const response = this.createResponse(
        this.match.nextTurnPlayerIndex === idx,
        idx
      );
      roomPlayer.socket.emit("gameMoveResponse", response);
    });
  }

  private createResponse(
    lastPlayedByThisPlayer: boolean,
    lastPlayedPlayerIndex: number,
    firstMove?: boolean
  ): DotsResponseEvent {
    const response = new DotsResponseEvent();
    response.boardState = this.match.boardState;
    response.myTurn = !lastPlayedByThisPlayer;
    if (this.match.matchResult === DotsMatchResultState.result) {
      response.matchResult = lastPlayedByThisPlayer
        ? ResponseDotsMatchResultState.win
        : ResponseDotsMatchResultState.lost;
    } else {
      response.matchResult = ResponseDotsMatchResultState.inpro;
    }
    response.score = this.createScoreResponse(lastPlayedPlayerIndex);
    response.starter = firstMove && response.myTurn;
    return response;
  }

  private createScoreResponse(
    lastPlayedPlayerIndex: number
  ): { won: number; lost: number; ties: number } {
    const scoreResponse = {
      won: this.score[lastPlayedPlayerIndex],
      lost: this.score[(lastPlayedPlayerIndex + 1) % DotsRoom.maxPlayers],
      ties: 0
    };
    return scoreResponse;
  }

  private getPlayerId(currSocket: any): number {
    return this.players.findIndex(
      playerSocket => playerSocket.id === currSocket.id
    );
  }
}
