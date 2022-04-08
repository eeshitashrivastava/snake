import { Action, IGameUtilities } from "../templates";
import { INCREMENT_SCORE, RESET_SCORE, GAME_STATE } from "../actions";

const globalState: IGameUtilities = {
  gameState: "start",
  score: 0,
};

const gameReducer = <T extends string, P extends Array<any>>(
  state = globalState,
  action: Action<T, P>
) => {
  switch (action.type) {
    case INCREMENT_SCORE:
      return {
        ...state,
        score: state.score + 1,
      };
    case RESET_SCORE:
      return { ...state, score: 0 };
    case GAME_STATE:
      return { ...state, gameState: action.payload[0] };
    default:
      return state;
  }
};

export { gameReducer };
