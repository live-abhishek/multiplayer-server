import store from "../store";
import * as AppConstants from "../constants";
import {
  initializeMatch,
  gameMoveResponse,
  playerDisconnected
} from "../game/tic-tac-toe/tttAction";

let mainSocket;

export const tictactoeSocketEventRegister = socket => {
  mainSocket = socket;
  socket.on(AppConstants.SOCKET_GAME_INIT, matchInitData => {
    if (matchInitData.gameType === AppConstants.TIC_TAC_TOE) {
      store.dispatch(initializeMatch(matchInitData));
    }
  });

  socket.on(AppConstants.SOCKET_GAME_MOVE_RESPONSE, moveRespData => {
    if (moveRespData.gameType === TIC_TAC_TOE) {
      store.dispatch(gameMoveResponse(moveRespData));
    }
  });
};

export const sendMoveRequest = moveEventData => {
  mainSocket.emit(AppConstants.SOCKET_GAME_MOVE, moveEventData);
};
