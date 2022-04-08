import {
  CallEffect,
  delay,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";
import {
  MOVE_UP,
  MOVE_RIGHT,
  MOVE_LEFT,
  MOVE_DOWN,
  UP,
  DOWN,
  LEFT,
  RIGHT,
  STOP_GAME,
  RESET_GAME
} from "../../actions";
import { setDisDirection } from "../../actions/actionCreator";
import { ICoordinates } from "../../templates";

export function* moveSaga(params: {
  type: string;
  payload: ICoordinates;
}): Generator<
  | PutEffect<{ type: string; payload: ICoordinates }>
  | PutEffect<{ type: string; payload: Array<string> }>
  | CallEffect<true>
> {
  while (params.type !== RESET_GAME && params.type !== STOP_GAME) {
    yield put({
      type: params.type.split("_")[1],
      payload: params.payload,
    });
    switch (params.type.split("_")[1]) {
      case RIGHT:
        yield put(setDisDirection(LEFT));
        break;

      case LEFT:
        yield put(setDisDirection(RIGHT));
        break;

      case UP:
        yield put(setDisDirection(DOWN));
        break;

      case DOWN:
        yield put(setDisDirection(UP));
        break;
    }
    yield delay(500);
  }
}

function* watcherSagas() {
  yield takeLatest(
    [MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN, STOP_GAME, RESET_GAME],
    moveSaga
  );
}

export default watcherSagas;
