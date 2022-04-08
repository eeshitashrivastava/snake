import { Heading, Center, Button } from "@chakra-ui/react";
import { useAppSelector } from "../../store";
import { IScoreCardProps } from "../../templates";

const ScoreCard = ({ resetBoard }: IScoreCardProps) => {
  const score = useAppSelector((state) => state.gameReducer.score);
  return (
    <Center>
      <Heading as="h2" size="sm" mt={2} mb={2}>
        Current Score: {score} |{" "}
        <Button onClick={() => resetBoard()}>Reset game</Button>
      </Heading>
    </Center>
  );
};

export default ScoreCard;
