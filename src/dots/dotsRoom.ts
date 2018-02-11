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
  private score: Array<number> = [0, 0, 0];

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
    this.updateRoomScore();
    this.sendResponse();
    if (this.match.matchResult === DotsMatchResultState.result) {
      this.startNewGame();
    }
  }

  private updateMatchState(event: any, player: Player) {
    const dotsEvent = event as DotsRequestEvent;
    const cellNewState = this.getPlayerId(player) + 1;
    this.match.processMove(dotsEvent, cellNewState);
    this.match.updateBoardScore();
    this.match.updateMatchResult();
  }

  private updateRoomScore() {
    if (this.match.matchResult === DotsMatchResultState.result) {
      if (this.match.score[0] > this.match.score[1]) {
        this.score[0]++;
      } else if (this.match.score[1] > this.match.score[0]) {
        this.score[1]++;
      } else {
        this.score[2]++; // unnecessary as right now there are odd number of boxes available, so a winner is imminent
      }
    }
  }

  private startGame() {
    if (this.isRoomClosed()) {
      return;
    }
    this.match = new DotsMatch();
    this.players.forEach((roomPlayer, idx) => {
      roomPlayer.socket.emit(
        "gameInit",
        new DotsResponseEvent(this.match, idx, this.score)
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
          new DotsResponseEvent(this.match, idx, this.score)
        );
      });
    }, 2000);
  }

  private sendResponse() {
    this.players.forEach((roomPlayer, idx) => {
      const response = new DotsResponseEvent(this.match, idx, this.score);
      roomPlayer.socket.emit("gameMoveResponse", response);
    });
  }

  private getPlayerId(currSocket: any): number {
    return this.players.findIndex(
      playerSocket => playerSocket.id === currSocket.id
    );
  }
}
