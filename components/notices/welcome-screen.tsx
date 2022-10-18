import {
  AspectRatio,
  ButtonGroup,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { Logo } from "components/logo";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Button, Heading, Text } from "tw-components";

export const WelcomeScreen: React.FC = () => {
  const [showWelcomeScreen, setShowWelcomeScreen] = useLocalStorage(
    "welcome-screen",
    true,
    false,
  );

  const [step, setStep] = useState<number>(0);

  const isMobile = useBreakpointValue({ base: true, md: false });
  if (!showWelcomeScreen) {
    return null;
  }

  const nextStep = () => {
    setStep((curr) => {
      if (curr >= 3) {
        setShowWelcomeScreen(false);
      }
      return curr + 1;
    });
  };

  const prevStep = () => {
    setStep((curr) => {
      if (curr <= 0) {
        return 0;
      }
      return curr - 1;
    });
  };

  return (
    <Modal
      size="3xl"
      closeOnEsc={false}
      allowPinchZoom
      closeOnOverlayClick={false}
      isOpen
      onClose={() => undefined}
    >
      <ModalOverlay />
      <ModalContent
        borderTopRadius={{ base: "2xl", md: "lg" }}
        overflow="hidden"
        borderBottomRadius={{ base: "none", md: "lg" }}
        mb={{ base: 0, md: "auto" }}
        mt="auto"
      >
        <ModalBody p={0}>
          <SimpleGrid columns={{ base: 1, md: 2 }} placeItems="center" p={0}>
            <Center
              bg="linear-gradient(147.15deg, #410AB6 30.17%, #B4F1FF 100.01%)"
              w="100%"
              h="100%"
              p={6}
            >
              <AspectRatio ratio={1} w="100%">
                <ChakraNextImage
                  src={require("public/assets/product-pages/dashboard/hero.png")}
                  alt=""
                  layout="fill"
                />
              </AspectRatio>
            </Center>

            <Flex direction="column" maxW="95%" gap={4} p={6}>
              <Logo forceShowWordMark />

              <Heading as="h3" size="title.md">
                the complete web3 development framework.
              </Heading>
              <Text size="body.lg">
                We empower web3 teams to focus on creating business value while
                handling the technical complexity.
              </Text>
            </Flex>
          </SimpleGrid>
        </ModalBody>
        <ModalFooter borderTop="1px solid" borderColor="borderColor">
          <Flex w="full" align="center" justify="space-between">
            <Button
              onClick={() => setShowWelcomeScreen(false)}
              fontWeight={400}
              variant="link"
              colorScheme="gray"
            >
              Skip for now
            </Button>
            <ButtonGroup variant="solid">
              <Button onClick={prevStep} isDisabled={step === 0}>
                Back
              </Button>
              <Button
                autoFocus
                onClick={nextStep}
                rightIcon={<FiArrowRight />}
                colorScheme="blue"
              >
                Next
              </Button>
            </ButtonGroup>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
