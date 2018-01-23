import store from '../store';
import { socket } from './socketHelper';
import { initializeMatch, gameMoveResponse } from '../game/tic-tac-toe/tttAction';

const TIC_TAC_TOE = 'tictactoe';

socket.on('gameRequestFulfilled', (data) => {
  if(data.gameType === TIC_TAC_TOE){
    store.dispatch(initializeMatch(data));
  }
});

socket.on('gameMoveResponse', (data) => {
  if(data.gameType === TIC_TAC_TOE){
    store.dispatch(gameMoveResponse(data));
  }
});

export const sendMoveRequest = (data) => {
  socket.emit('gameMove', data);
}
