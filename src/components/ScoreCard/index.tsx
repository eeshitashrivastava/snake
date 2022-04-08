import { Heading, Center, Button } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../../store";
import { updateGameState } from "../../actions/actionCreator";
import { IScoreCardProps } from "../../templates";

const ScoreCard = ({ resetBoard }: IScoreCardProps) => {
  const dispatch = useAppDispatch();
  const score = useAppSelector((state) => state.gameReducer.score);
  return (
    <Center>
      <Heading as="h2" size="sm" mt={2} mb={2}>
        Current Score: {score} |{" "}
        <Button
          onClick={() => {
            dispatch(updateGameState("start"));
            resetBoard();
          }}
        >
          Reset game
        </Button>
      </Heading>
    </Center>
  );
};

export default ScoreCard;
