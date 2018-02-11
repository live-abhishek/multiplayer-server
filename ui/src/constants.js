// Actions
export const GAME_REQUEST = "GAME_REQUEST";
export const GAME_REQUEST_FULFILLED = "GAME_REQUEST_FULFILLED";
export const LEAVE_ROOM = "LEAVE_ROOM";
export const DISCONNECTED = "DISCONNECTED";

export const TTT_INIT_MATCH = "TTT_INIT_MATCH";
export const TTT_SEND_MOVE = "TTT_SEND_MOVE";
export const TTT_GAME_MOVE_RESPONSE = "TTT_GAME_MOVE_RESPONSE";

export const DOTS_INIT_MATCH = "DOTS_INIT_MATCH";
export const DOTS_SEND_MOVE = "DOTS_SEND_MOVE";
export const DOTS_GAME_MOVE_RESPONSE = "DOTS_GAME_MOVE_RESPONSE";

// Socket Events
export const SOCKET_MESSAGE = "message";
export const SOCKET_CONNECT = "connect";
export const SOCKET_GAME_INIT = "gameInit";
export const SOCKET_PLAYER_DISCONNETED = "playerDisconnected";
export const SOCKET_GAME_REQUEST = "gameRequest";
export const SOCKET_GAME_MOVE = "gameMove";
export const SOCKET_GAME_MOVE_RESPONSE = "gameMoveResponse";
export const SOCKET_LEAVE = "leave";

// Page State
export const MENU = "MENU";
export const WAITING = "WAITING";
export const FULFILLED = "FULFILLED";

// Games Type
export const TIC_TAC_TOE = "tictactoe";
export const DOTS = "dots";
