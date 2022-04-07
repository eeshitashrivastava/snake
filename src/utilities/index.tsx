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
  console.log(width, height)
  return {
    x: randomNumber(0, width),
    y: randomNumber(0, height),
  };
};