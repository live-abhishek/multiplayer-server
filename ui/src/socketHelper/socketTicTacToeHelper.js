import store from '../store';
import { socket } from './socketHelper';
import { initializeMatch, gameMoveResponse } from '../game/tic-tac-toe/tttAction';

const TIC_TAC_TOE = 'tictactoe';

socket.on('gameRequestFulfilled', (matchInitData) => {
  if (data.gameType === TIC_TAC_TOE) {
    store.dispatch(initializeMatch(matchInitData));
  }
});

socket.on('gameMoveResponse', (moveRespData) => {
  if (data.gameType === TIC_TAC_TOE) {
    store.dispatch(gameMoveResponse(moveRespData));
  }
});

export const sendMoveRequest = (moveEventData) => {
  socket.emit('gameMove', moveEventData);
}
