import store from "../store";
import * as dotsAction from "../game/dots/dotsAction";

const DOTS = "dots";
let mainSocket;

export const dotsSocketEventRegister = socket => {
  mainSocket = socket;
  socket.on("gameInit", matchInitData => {
    if (matchInitData.gameType === DOTS) {
      store.dispatch(dotsAction.initializeMatch(matchInitData));
    }
  });

  socket.on("gameMoveResponse", moveRespData => {
    if (matchRespData.gameType === DOTS) {
      store.dispatch(dotsAction.gameMoveResponse(moveRespData));
    }
  });

  socket.on("playerDisconnected", disconnectionData => {
    if (matchRespData.gameType === DOTS) {
      store.dispatch(dotsAction.paylerDisconnected(disconnectionData));
    }
  });
};

export const sendMoveRequest = moveEventData => {
  mainSocket.emit("gameMove", moveEventData);
};
