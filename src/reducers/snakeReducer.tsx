import { Action, ISnakeCoord } from "../templates";

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

const snakeReducer = <T extends string, P>(
  state = globalState,
  action: Action<T, P>
) => {
  switch (action.type) {
    case "MOVE":
      /**
       * Perform a certain set of operations
       */
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export { snakeReducer };
