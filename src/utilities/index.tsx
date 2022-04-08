import { ICoordinates } from "../templates";

export const clearBoard = (context: CanvasRenderingContext2D | null) => {
  if (context) {
    context.clearRect(0, 0, 1000, 600);
  }
};

export const drawObject = (
  context: CanvasRenderingContext2D | null,
  objectBody: ICoordinates[],
  fillColor: string,
  strokeStyle = "#146356"
) => {
  if (context) {
    objectBody.forEach((object: ICoordinates) => {
      context.fillStyle = fillColor;
      context.strokeStyle = strokeStyle;
      context?.fillRect(object.x, object.y, 20, 20);
      context?.strokeRect(object.x, object.y, 20, 20);
    });
  }
};

function randomNumber(min: number, max: number) {
  let random = Math.floor(Math.random() * (max - min)) + min;
  return random - (random % 20);
}

export const generateRandomPosition = (width: number, height: number) => {
  return {
    x: randomNumber(0, width),
    y: randomNumber(0, height),
  };
};

export const hasSnakeCollided = (
  snake: ICoordinates[],
  currentHeadPos: ICoordinates
) => {
  let flag = false;
  snake.forEach((pos: ICoordinates, index: number) => {
    if (
      pos.x === currentHeadPos.x &&
      pos.y === currentHeadPos.y &&
      index !== 0
    ) {
      flag = true;
    }
  });

  return flag;
};