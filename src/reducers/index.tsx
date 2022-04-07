import { snakeReducer } from "./snakeReducer";
import { gameReducer } from "./gameReducer"
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  snakeReducer,
  gameReducer,
});

export default rootReducer;