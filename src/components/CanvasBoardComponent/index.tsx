import { useRef, useState, useEffect, useCallback } from "react";
import { ICanvasBoard, ICoordinates } from "../../templates";
import { useAppSelector, useAppDispatch } from "../../store";
import {
  MOVE_DOWN,
  MOVE_UP,
  MOVE_RIGHT,
  MOVE_LEFT,
  RESET_SCORE,
  INCREMENT_SCORE,
  RESET_SNAKE,
  INCREASE_SNAKE,
} from "../../actions";
import {
  makeMove,
  updateSnake,
  stopGame,
  resetGame,
  updateScore,
  updateGameState,
} from "../../actions/actionCreator";
import {
  generateRandomPosition,
  drawObject,
  clearBoard,
  hasSnakeCollided,
} from "../../utilities";
import ScoreCard from "../ScoreCard";
import InstructionScreen from "../InstructionScreen";

const CanvasBoardComponent = ({
  height,
  width,
}: ICanvasBoard) => {
  const dispatch = useAppDispatch();
  // canvas context
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [snake1, disallowedDirection] = useAppSelector((state) => [
    state.snakeReducer.snake,
    state.snakeReducer.disallowedDirection,
  ]);

  const [pos, setPos] = useState<ICoordinates>(
    generateRandomPosition(width - 20, height - 20)
  );
  const [isConsumed, setIsConsumed] = useState<boolean>(false);

  const moveSnake = useCallback(
    (dx = 0, dy = 0, ds: string) => {
      dispatch(updateGameState("playing"));
      if (dx > 0 && dy === 0 && ds !== "RIGHT") {
        dispatch(makeMove(dx, dy, MOVE_RIGHT));
      }

      if (dx < 0 && dy === 0 && ds !== "LEFT") {
        dispatch(makeMove(dx, dy, MOVE_LEFT));
      }

      if (dx === 0 && dy < 0 && ds !== "UP") {
        dispatch(makeMove(dx, dy, MOVE_UP));
      }

      if (dx === 0 && dy > 0 && ds !== "DOWN") {
        dispatch(makeMove(dx, dy, MOVE_DOWN));
      }
    },
    [dispatch]
  );
  const handleKeyEvents = useCallback(
    (event: KeyboardEvent) => {
      if (disallowedDirection) {
        switch (event.key) {
          case "ArrowUp":
            moveSnake(0, -20, disallowedDirection);
            break;
          case "ArrowDown":
            moveSnake(0, 20, disallowedDirection);
            break;
          case "ArrowLeft":
            moveSnake(-20, 0, disallowedDirection);
            break;
          case "ArrowRight":
            event.preventDefault();
            moveSnake(20, 0, disallowedDirection);
            break;
        }
      } else {
        if (
          disallowedDirection !== "LEFT" &&
          disallowedDirection !== "UP" &&
          disallowedDirection !== "DOWN" &&
          event.key === " "
        ) {
          moveSnake(20, 0, disallowedDirection); //Move RIGHT at start
        }
      }
    },
    [disallowedDirection, moveSnake]
  );

  const resetBoard = useCallback(() => {
    window.removeEventListener("keydown", handleKeyEvents);
    dispatch(resetGame());
    dispatch(updateScore(RESET_SCORE));
    dispatch(updateSnake(RESET_SNAKE));
    clearBoard(context);
    drawObject(context, snake1, "#91C483");
    drawObject(
      context,
      [generateRandomPosition(width - 20, height - 20)],
      "#676FA3"
    ); //Draws object randomly
    window.addEventListener("keydown", handleKeyEvents);
  }, [context, dispatch, handleKeyEvents, height, snake1, width]);

  useEffect(() => {
    //Draw on canvas each time
    setContext(canvasRef.current && canvasRef.current.getContext("2d"));
    clearBoard(context);
    drawObject(context, snake1, "#91C483"); //Draws snake at the required position
    drawObject(context, [pos], "#676FA3"); //Draws fruit randomly
    //When the object is consumed
    if (snake1[0].x === pos?.x && snake1[0].y === pos?.y) {
      setIsConsumed(true);
    }
    //when snake collides
    if (
      hasSnakeCollided(snake1, snake1[0]) ||
      snake1[0].x >= width ||
      snake1[0].x <= -20 ||
      snake1[0].y <= -20 ||
      snake1[0].y >= height
    ) {
      dispatch(updateGameState("over"));
      dispatch(stopGame());
      resetBoard();
      window.removeEventListener("keydown", handleKeyEvents);
    }
  }, [
    context,
    snake1,
    pos,
    dispatch,
    handleKeyEvents,
    height,
    width,
    resetBoard,
  ]);

  useEffect(() => {
    //Generate new object
    if (isConsumed) {
      const newPosition = generateRandomPosition(width - 20, height - 20);
      setPos(newPosition);
      setIsConsumed(false);
      dispatch(updateScore(INCREMENT_SCORE));
      //Increase snake size when object is consumed successfully
      dispatch(updateSnake(INCREASE_SNAKE));
    }
  }, [isConsumed, pos, height, width, dispatch]);

  //add event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyEvents);
    return () => {
      window.removeEventListener("keydown", handleKeyEvents);
    };
  }, [handleKeyEvents]);

  return (
    <div>
      <InstructionScreen />
      <ScoreCard resetBoard={resetBoard} />
      <canvas
        ref={canvasRef}
        style={{ border: "3px solid black" }}
        height={height}
        width={width}
      />
    </div>
  );
};

export default CanvasBoardComponent;
