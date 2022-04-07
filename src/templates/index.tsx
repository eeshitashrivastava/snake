export interface ISnakeCoord {
  snake: ICoordinates[] | [];
}

export interface ICoordinates {
  x: number;
  y: number;
}

export interface ICanvasBoard {
  height: number;
  width: number;
}

export interface Action<T, P> {
  readonly type: T;
  readonly payload?: P;
}
