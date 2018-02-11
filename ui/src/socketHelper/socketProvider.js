import io from "socket.io-client";
import store from "../store";
import * as AppConstants from "../constants";
import { requestGameFulfilled, playerDisconnected } from "../game/gameAction";
import { tictactoeSocketEventRegister } from "./socketTicTacToeProvider";
import { dotsSocketEventRegister } from "./socektDotsProvider";

export const socket = io.connect();

socket.on(AppConstants.SOCKET_MESSAGE, data => {
  console.log(data);
});

socket.on(AppConstants.SOCKET_CONNECT, () =>
  console.log("Socket connection successful.")
);

socket.on(AppConstants.SOCKET_GAME_INIT, data => {
  store.dispatch(requestGameFulfilled(data));
});

socket.on(AppConstants.SOCKET_PLAYER_DISCONNETED, disconnectionData => {
  store.dispatch(playerDisconnected(disconnectionData));
});

tictactoeSocketEventRegister(socket);
dotsSocketEventRegister(socket);

export const sendGameRequest = data => {
  socket.emit(AppConstants.SOCKET_GAME_REQUEST, data);
};

export const sendLeaveRoomSignal = () => {
  socket.emit(AppConstants.SOCKET_LEAVE, {});
};
