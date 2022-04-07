import { useRef, useState, useEffect } from "react";
import { ICanvasBoard, ICoordinates } from "../../templates";
import { useAppSelector } from "../../store";
import { generateRandomPosition, drawObject } from "../../utilities";

const CanvasBoardComponent = ({ height, width }: ICanvasBoard) => {
  // canvas context
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const snake1 = useAppSelector((state) => state.snakeReducer.snake);
  //TODO: -20, why?
  const [pos, setPos] = useState<ICoordinates>(
    generateRandomPosition(width - 20, height - 20)
  );

  useEffect(() => {
    //Draw on canvas each time
    setContext(canvasRef.current && canvasRef.current.getContext("2d"));
		drawObject(context, snake1, "#91C483"); //Draws snake at the required position
		drawObject(context, [pos], "#676FA3"); //Draws fruit randomly 
	}, [context]);

  return (
    <canvas
      ref={canvasRef}
      style={{ border: "3px solid black" }}
      height={height}
      width={width}
    />
  );
};

export default CanvasBoardComponent;
