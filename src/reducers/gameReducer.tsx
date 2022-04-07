import { Action } from "../templates";

const globalState = {
  data: "",
};

const gameReducer = <T extends string, P>(
  state = globalState,
  action: Action<T, P>
) => {
  switch (action.type) {
    case "MOVE_RIGHT":
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

export { gameReducer };
