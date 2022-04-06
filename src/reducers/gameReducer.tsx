import Action from "./actionTemplate";

const GlobalState = {
  data: "",
};

const gameReducer = <T extends string, P>(state = GlobalState, action: Action<T, P>) => {
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
