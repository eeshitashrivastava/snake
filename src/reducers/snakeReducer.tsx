import { Action, ISnakeCoord } from "../templates";
import { RIGHT, LEFT, UP, DOWN } from "../actions";

const globalState: ISnakeCoord = {
  //Postion of the entire snake
  snake: [
    { x: 580, y: 300 },
    { x: 560, y: 300 },
    { x: 540, y: 300 },
    { x: 520, y: 300 },
    { x: 500, y: 300 },
  ],
};

const snakeReducer = <T extends string, P extends Array<number>> (
  state = globalState,
  action: Action<T, P>
) => {
  switch (action.type) {
    case RIGHT:
    case LEFT:
    case UP:
    case DOWN: {
      let newSnake = [...state.snake];
      newSnake = [{
        //New x and y coordinates
        x: state.snake[0].x + action.payload[0],
        y: state.snake[0].y + action.payload[1],
      }, ...newSnake];
      newSnake.pop();
      return {
        ...state,
        snake: newSnake,
      };
    }
    default:
      return state;
  }
};

export { snakeReducer };
