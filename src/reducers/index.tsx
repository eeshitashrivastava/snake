import { gameReducer } from "./gameReducer";
import { snakeReducer } from "./snakeReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  gameReducer,
  snakeReducer
});

export default rootReducer;