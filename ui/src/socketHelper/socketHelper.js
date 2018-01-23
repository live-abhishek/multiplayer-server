import io from 'socket.io-client';
import store from '../store';
import { requestGameFulfilled } from '../game/gameAction'

export const socket = io.connect();

socket.on('gameRequestFulfilled', (data) => {
  store.dispatch(requestGameFulfilled(data));
});

socket.on('message', (data) => {
  console.log(data);
});

export const sendGameRequest = (data) => {
  socket.emit('gameRequest', data);
}
