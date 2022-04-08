export interface ISnakeCoord {
  snake: ICoordinates[] | [];
  disallowedDirection: string;
}

export interface IGameUtilities {
  gameState: string;
  score: number;
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
  readonly payload: P;
}

export interface IScoreCardProps {
  resetBoard: () => void;
}