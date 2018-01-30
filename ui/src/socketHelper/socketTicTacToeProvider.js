import store from "../store";
import {
  initializeMatch,
  gameMoveResponse,
  playerDisconnected
} from "../game/tic-tac-toe/tttAction";

const TIC_TAC_TOE = "tictactoe";
let mainSocket;

export const tictactoeSocketEventRegister = socket => {
  mainSocket = socket;
  socket.on("gameInit", matchInitData => {
    if (matchInitData.gameType === TIC_TAC_TOE) {
      store.dispatch(initializeMatch(matchInitData));
    }
  });

  socket.on("gameMoveResponse", moveRespData => {
    if (moveRespData.gameType === TIC_TAC_TOE) {
      store.dispatch(gameMoveResponse(moveRespData));
    }
  });

  socket.on("playerDisconnected", disconnectionData => {
    if (disconnectionData.gameType === TIC_TAC_TOE) {
      store.dispatch(playerDisconnected(disconnectionData));
    }
  });
};

export const sendMoveRequest = moveEventData => {
  mainSocket.emit("gameMove", moveEventData);
};
