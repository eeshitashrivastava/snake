import { SET_DIS_DIRECTION, STOP_GAME, RESET_GAME, GAME_STATE } from ".";

export const makeMove = (dx: number, dy: number, move: string) => ({
  type: move,
  payload: [dx, dy],
});

export const setDisDirection = (direction: string) => ({
  type: SET_DIS_DIRECTION,
  payload: [direction],
});

export const updateSnake = (type: string) => ({
  type: type,
  payload: [],
});

export const updateScore = (type: string) => ({
  type: type,
  payload: [],
});

export const stopGame = () => ({
  type: STOP_GAME,
  payload: [],
});

export const resetGame = () => ({
  type: RESET_GAME,
  payload: [],
});

export const updateGameState = (state: string) => ({
  type: GAME_STATE,
  payload: [state],
});
