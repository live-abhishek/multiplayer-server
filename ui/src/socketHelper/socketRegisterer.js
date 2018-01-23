// By importing this here, we register all the socket events
// Just call this from somewhere before using any socket calls
import { socket } from './socketHelper';
import * as socketTicTacToeHelper from './socketTicTacToeHelper';

export default socket;