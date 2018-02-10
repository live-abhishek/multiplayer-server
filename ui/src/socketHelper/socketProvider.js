import io from "socket.io-client";
import store from "../store";
import { requestGameFulfilled } from "../game/gameAction";
import { tictactoeSocketEventRegister } from "./socketTicTacToeProvider";
import { dotsSocketEventRegister } from "./socektDotsProvider";

export const socket = io.connect();

socket.on("gameInit", data => {
  store.dispatch(requestGameFulfilled(data));
});

socket.on("message", data => {
  console.log(data);
});

socket.on("connect", () => console.log("Socket connection successful."));

tictactoeSocketEventRegister(socket);
dotsSocketEventRegister(socket);

export const sendGameRequest = data => {
  socket.emit("gameRequest", data);
};

export const sendLeaveRoomSignal = () => {
  socket.emit("leave", {});
};
