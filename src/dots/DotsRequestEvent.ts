export interface DotsRequestEvent {
  gameType: string;
  eventType: string;
  move: {
    rowNum: number;
    colNum: number;
  };
}
