import {
  Flex,
  Heading,
  Kbd,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { useAppSelector } from "../../store";
import { useEffect, useCallback } from "react";

const InstructionScreen = () => {
  const gameState = useAppSelector((state) => state.gameReducer.gameState);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onModalClose = useCallback(() => {
    onClose();
    window.removeEventListener("keydown", onModalKeyDown);
  }, []);

  const onModalKeyDown = useCallback((event: KeyboardEvent) => {
    if(event.key === " ")
      onModalClose();
  }, [onModalClose]);

  useEffect(() => {
    if(gameState === "start" || gameState === "over") {
      onOpen();
      window.addEventListener("keydown", onModalKeyDown);
    }
  }, [gameState, onOpen, onModalKeyDown]);

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent
          bg="transparent"
          boxShadow=""
          pt={100}
          alignItems="center"
        >
          {gameState === "over" && (
            <Heading as="h6" size="lg" color="white">
              Game Over!
            </Heading>
          )}
          <Heading as="h6" size="lg" color="white">
            How to Play
          </Heading>
          <Heading as="h5" size="sm" mt={1} color="white">
            Press Spacebar to start!
          </Heading>
          <Flex flexDirection="row" mt={3}>
            <Flex flexDirection={"column"} color="white">
              <span>
                <Kbd color="black">&uarr;</Kbd> Move Up
              </span>
              <span>
                <Kbd color="black">&larr;</Kbd> Move Left
              </span>
              <span>
                <Kbd color="black">&darr;</Kbd> Move Down
              </span>
              <span>
                <Kbd color="black">&rarr;</Kbd> Move Right
              </span>
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default InstructionScreen;
