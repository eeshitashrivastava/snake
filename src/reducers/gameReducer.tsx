import { Action, ISnakeDirec } from "../templates";
import { SET_DIS_DIRECTION } from "../actions";

const globalState: ISnakeDirec = {
  disallowedDirection: ""
};

const gameReducer = <T extends string, P extends string> (
  state = globalState,
  action: Action<T, P>
) => {
  switch (action.type) {
    case SET_DIS_DIRECTION: {
      return {
        ...state,
        disallowedDirection: action.payload,
      };
    }
    default:
      return state;
  }
};

export { gameReducer };
