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
} from "../../actions";
import { setDisDirection } from "../../actions/actionCreator";
import { ICoordinates } from "../../templates";

export function* moveSaga(params: {
  type: string;
  payload: ICoordinates;
}): Generator<
  | PutEffect<{ type: string; payload: ICoordinates }>
  | PutEffect<{ type: string; payload: string }>
  | CallEffect<true>
> {
  while (true) {
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
  yield takeLatest([MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN], moveSaga);
}

export default watcherSagas;
