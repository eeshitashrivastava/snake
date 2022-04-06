import { ChakraProvider, Container, Heading } from "@chakra-ui/react";
import CanvasBoardComponent from "../../components/CanvasBoardComponent";
import "@fontsource/press-start-2p";
import theme from "../../theme";

const MainContainer = () => {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.lg" centerContent>
        <Heading as="h1" size="xl">
          SNAKE GAME
        </Heading>
        <CanvasBoardComponent height={600} width={1000} />
      </Container>
    </ChakraProvider>
  );
};

export default MainContainer;