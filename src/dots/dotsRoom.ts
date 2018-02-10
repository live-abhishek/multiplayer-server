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
    if (this.match.matchResult === DotsMatchResultState.result) {
      this.startNewGame();
    }
  }

  private updateMatchState(event: any, player: Player) {
    const dotsEvent = <DotsRequestEvent>event;
    this.processMove(dotsEvent, player);
    this.updateBoardScore();
    this.updateMatchResult();
    this.updateRoomScore();
  }

  private processMove(event: DotsRequestEvent, player: Player) {
    // updateBoardState
    const cellNewState = this.getPlayerId(player) + 1;
    const dotsEvent = <DotsRequestEvent>event;
    const { move } = event;
    if (this.match.boardState[move.rowNum][move.colNum] !== 0) {
      logger.error("Tampered data received");
      return;
    }
    const isNewBoxFormed = this.updateAndCheckBoxFormed(
      move.rowNum,
      move.colNum,
      cellNewState
    );
    // assign the nextTurnPlayerIndex based on whether
    // this move resulted in formation of new box
    if (!isNewBoxFormed) {
      // if new box is not formed, then assign to other player
      this.match.nextTurnPlayerIndex =
        (this.match.nextTurnPlayerIndex + 1) % DotsRoom.maxPlayers;
    }
  }

  private updateAndCheckBoxFormed(
    rowNum: number,
    colNum: number,
    cellNewState: number
  ): boolean {
    let boxFormed = false;
    this.match.boardState[rowNum][colNum] = cellNewState;
    if (rowNum % 2 !== 0) {
      // horizontal line drawn
      // if not the top most row horizontal line, then check if a box is formed just above
      if (rowNum !== 0) {
        const boxTopLine = this.match.boardState[rowNum - 2][colNum] !== 0;
        const boxLtLine = this.match.boardState[rowNum - 1][colNum - 1] !== 0;
        const boxRtLine = this.match.boardState[rowNum - 1][colNum + 1] !== 0;
        const boxBtmLine = this.match.boardState[rowNum][colNum] !== 0; // redundant
        if (boxTopLine && boxLtLine && boxRtLine && boxBtmLine) {
          this.match.boardState[rowNum - 1][colNum] = cellNewState;
          boxFormed = true;
        }
      }
      // if not the bottom most row horizontal line, then check if a box is formed just below
      if (rowNum !== DotsMatch.BoardSize - 1) {
        const boxTopLine = this.match.boardState[rowNum][colNum] !== 0; // redundant
        const boxLtLine = this.match.boardState[rowNum + 1][colNum - 1] !== 0;
        const boxRtLine = this.match.boardState[rowNum + 1][colNum + 1] !== 0;
        const boxBtmLine = this.match.boardState[rowNum + 2][colNum] !== 0;
        if (boxTopLine && boxLtLine && boxRtLine && boxBtmLine) {
          this.match.boardState[rowNum + 1][colNum] = cellNewState;
          boxFormed = true;
        }
      }
    } else {
      // vertical line drawn
      // if not the left most vertical line, then check if a box is formed just left
      if (colNum !== 0) {
        const boxTopLine = this.match.boardState[rowNum - 1][colNum - 1] !== 0;
        const boxLtLine = this.match.boardState[rowNum][colNum - 2] !== 0;
        const boxRtLine = this.match.boardState[rowNum][colNum] !== 0; // redundant
        const boxBtmLine = this.match.boardState[rowNum + 1][colNum - 1] !== 0;
        if (boxTopLine && boxLtLine && boxRtLine && boxBtmLine) {
          this.match.boardState[rowNum][colNum - 1] = cellNewState;
          boxFormed = true;
        }
      }
      // if not the right most vertical line, then check if a box is formed just right
      if (colNum !== DotsMatch.BoardSize - 1) {
        const boxTopLine = this.match.boardState[rowNum - 1][colNum + 1] !== 0;
        const boxLtLine = this.match.boardState[rowNum][colNum] !== 0;
        const boxRtLine = this.match.boardState[rowNum][colNum + 2] !== 0;
        const boxBtmLine = this.match.boardState[rowNum + 1][colNum + 1] !== 0;
        if (boxTopLine && boxLtLine && boxRtLine && boxBtmLine) {
          this.match.boardState[rowNum][colNum + 1] = cellNewState;
          boxFormed = true;
        }
      }
    }
    return boxFormed;
  }
  private updateMatchResult() {
    if (this.match.score.reduce((a, b) => a + b, 0) === DotsMatch.MaxBoxNum) {
      this.match.matchResult = DotsMatchResultState.result;
    } else {
      this.match.matchResult = DotsMatchResultState.inpro;
    }
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

  private updateBoardScore() {
    let player1Score = 0;
    let player2Score = 0;
    for (let r = 1; r < DotsMatch.BoardSize; r += 2) {
      for (let c = 1; c < DotsMatch.BoardSize; c += 2) {
        if (this.match.boardState[r][c] === 1) {
          player1Score++;
        } else if (this.match.boardState[r][c] === 2) {
          player2Score++;
        }
      }
    }
    this.match.score = [player1Score, player2Score];
  }

  private startGame() {
    if (!this.isRoomClosed()) {
      return;
    }
    this.match = new DotsMatch();
    this.players.forEach((roomPlayer, idx) => {
      roomPlayer.socket.emit("gameInit", this.createResponse(idx, true));
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
        roomPlayer.socket.emit("gameInit", this.createResponse(idx, true));
      });
    }, 2000);
  }

  private sendResponse() {
    this.players.forEach((roomPlayer, idx) => {
      const response = this.createResponse(idx);
      roomPlayer.socket.emit("gameMoveResponse", response);
    });
  }

  private createResponse(
    playerIndex: number,
    firstMove?: boolean
  ): DotsResponseEvent {
    const response = this.match.createResponse(playerIndex);
    response.roomScore = this.createScoreResponse(playerIndex);
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
