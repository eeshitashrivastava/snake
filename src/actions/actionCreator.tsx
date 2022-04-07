import { SET_DIS_DIRECTION } from ".";

export const makeMove = (dx: number, dy: number, move: string) => ({
  type: move,
  payload: [dx, dy],
});

export const setDisDirection = (direction: string) => ({
  type: SET_DIS_DIRECTION,
  payload: direction,
});
