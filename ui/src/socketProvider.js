import io from 'socket.io-client';
import store from './store';
import { requestGameFulfilled } from './game/gameAction'

var socket = io.connect();
socket.on('gameRequestFulfilled', (data) => {
  store.dispatch(requestGameFulfilled(data));
});

export default socket;