import store from "../store";
import * as AppConstants from "../constants";
import * as dotsAction from "../game/dots/dotsAction";

let mainSocket;

export const dotsSocketEventRegister = socket => {
  mainSocket = socket;
  socket.on(AppConstants.SOCKET_GAME_INIT, matchInitData => {
    if (matchInitData.gameType === AppConstants.DOTS) {
      store.dispatch(dotsAction.initializeMatch(matchInitData));
    }
  });

  socket.on(AppConstants.SOCKET_GAME_MOVE_RESPONSE, moveRespData => {
    if (moveRespData.gameType === DOTS) {
      store.dispatch(dotsAction.gameMoveResponse(moveRespData));
    }
  });
};

export const sendMoveRequest = moveEventData => {
  mainSocket.emit(AppConstants.SOCKET_GAME_MOVE, moveEventData);
};
