import { Action, ISnakeCoord } from "../templates";
import { RIGHT, LEFT, UP, DOWN, SET_DIS_DIRECTION, INCREASE_SNAKE, RESET_SNAKE } from "../actions";

const globalState: ISnakeCoord = {
  //Postion of the entire snake
  snake: [
    { x: 580, y: 300 },
    { x: 560, y: 300 },
    { x: 540, y: 300 },
    { x: 520, y: 300 },
    { x: 500, y: 300 },
  ],
  disallowedDirection: "",
};

const snakeReducer = <T extends string, P extends Array<any>>(
  state = globalState,
  action: Action<T, P>
) => {
  switch (action.type) {
    case RIGHT:
    case LEFT:
    case UP:
    case DOWN: {
      let newSnake = [...state.snake];
      newSnake = [
        {
          //New x and y coordinates
          x: state.snake[0].x + action.payload[0],
          y: state.snake[0].y + action.payload[1],
        },
        ...newSnake,
      ];
      newSnake.pop();
      return {
        ...state,
        snake: newSnake,
      };
    }
    case SET_DIS_DIRECTION: {
      return {
        ...state,
        disallowedDirection: action.payload[0],
      };
    }
    case INCREASE_SNAKE:
      const snakeLen = state.snake.length;
      return {
        ...state,
        snake: [
          ...state.snake,
          {
            x: state.snake[snakeLen - 1].x - 20,
            y: state.snake[snakeLen - 1].y - 20,
          },
        ],
      };
    case RESET_SNAKE:
      return globalState;
    default:
      return state;
  }
};

export { snakeReducer };
