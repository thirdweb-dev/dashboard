import {
  AspectRatio,
  Box,
  ButtonGroup,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  SimpleGrid,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { Logo } from "components/logo";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useLocalStorage } from "hooks/useLocalStorage";
import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Button, Heading, Text } from "tw-components";

const steps = [
  {
    key: "step-1",
    action: "Build",
    title: "Build contracts & applications",
    text: "Ship your web3 apps faster by reducing development time. Build smart contracts and applications effortlessly with our prebuilt contracts, build your own contract with ContractKit, and powerful SDKs.",
    gradient: "linear-gradient(147.15deg, #00C850 0%, #AD00FF 100%)",
  },
  {
    key: "step-2",
    action: "Launch",
    title: "Launch contracts & applications",
    text: "Deploy your smart contracts on-chain easily with a single command or with our Dashboard without requiring private keys. Publish your contracts with Release for other web3 devs to discover and deploy your contract with one-click.",
    gradient: "linear-gradient(147.15deg, #000AFF 0%, #FF3D00 130%)",
  },
  {
    key: "step-3",
    action: "Manage",
    title: "Manage contracts",
    text: "After you have deployed your contracts on-chain, you can monitor, configure and interact with your contracts directly from the Dashboard. Invite your team to collaborate and manage their permissions for interacting with contracts.",
    gradient: "linear-gradient(147.15deg, #8F00FF 0%, #FFB800 130%)",
  },
] as const;

export const WelcomeScreen: React.FC = () => {
  const [showWelcomeScreen, setShowWelcomeScreen] = useLocalStorage(
    "welcome-screen",
    true,
    false,
  );

  const [step, setStep] = useState<number>(0);

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
    <MotionConfig transition={{ duration: 0.3 }}>
      <AnimatePresence initial={step !== 0}>
        <Modal
          size="4xl"
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
            minH={{ base: "80vh", md: "auto" }}
            position={{ base: "fixed", md: "relative" }}
            bottom={{ base: 0, md: undefined }}
            mt="auto"
          >
            <ModalBody p={0}>
              <SimpleGrid
                overflow="hidden"
                columns={{ base: 1, md: 2 }}
                placeItems="center"
                p={0}
              >
                <AspectRatio
                  ratio={{ base: 16 / 9, md: 1 }}
                  w="100%"
                  position="relative"
                >
                  <Center
                    as={motion.div}
                    initial={`step-${step}`}
                    animate={`step-${step}`}
                    variants={{
                      "step-0": {
                        background:
                          "linear-gradient(147.15deg, #410AB6 30.17%, #B4F1FF 100.01%)",
                      },
                      ...steps.reduce((acc, curr) => {
                        acc[curr.key] = { background: curr.gradient };
                        return acc;
                      }, {} as Record<typeof steps[number]["key"], { background: typeof steps[number]["gradient"] }>),
                    }}
                    w="100%"
                    h="100%"
                    p={6}
                  >
                    {step === 0 && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: "-100%",
                          width: "100%",
                          height: "100%",
                        }}
                        animate={{
                          opacity: 1,
                          y: "0%",
                          width: "100%",
                          height: "100%",
                        }}
                        exit={{
                          opacity: 0,
                          y: "-100%",
                          width: "100%",
                          height: "100%",
                        }}
                        key="step-1"
                      >
                        <Center>
                          <ChakraNextImage
                            w={{ base: "45%", md: "90%" }}
                            src={require("public/assets/product-pages/dashboard/hero.png")}
                            alt=""
                            layout="responsive"
                          />
                        </Center>
                      </motion.div>
                    )}
                    {step > 0 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                      >
                        <Flex gap={6} direction="column" textAlign="center">
                          {steps.map((s, i) => (
                            <Heading
                              key={s.key}
                              cursor="pointer"
                              onClick={() => setStep(i + 1)}
                              size="title.2xl"
                              transition="all 0.2s"
                              {...(step === i + 1
                                ? {
                                    opacity: 1,
                                    fontWeight: 700,
                                    letterSpacing: "0em",
                                  }
                                : {
                                    opacity: 0.5,
                                    fontWeight: 400,
                                    letterSpacing: "0.02em",
                                  })}
                            >
                              {s.action}
                            </Heading>
                          ))}
                        </Flex>
                      </motion.div>
                    )}
                  </Center>
                </AspectRatio>

                <Flex
                  direction="column"
                  gap={4}
                  p={6}
                  w="100%"
                  h="100%"
                  justify="space-between"
                >
                  <Box placeSelf="start" flexShrink={0} h="30px">
                    <Logo forceShowWordMark />
                  </Box>

                  <Center flexGrow={1} position="relative">
                    <Box position="relative">
                      {step === 0 && (
                        <Flex
                          gap={4}
                          as={motion.div}
                          direction="column"
                          key="step-1"
                          initial={{
                            opacity: 0,
                            y: -20,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: -20,
                          }}
                        >
                          <Heading size="title.md">
                            the complete web3 development framework.
                          </Heading>
                          <Text size="body.lg">
                            We empower web3 teams to focus on creating business
                            value while handling the technical complexity.
                          </Text>
                        </Flex>
                      )}
                      {step > 0 && (
                        <Flex
                          gap={4}
                          as={motion.div}
                          direction="column"
                          key="step-2"
                          initial={{
                            opacity: 0,
                            y: 20,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: 20,
                          }}
                        >
                          {steps.map(
                            (s, i) =>
                              step === i + 1 && (
                                <React.Fragment key={s.key}>
                                  <motion.div {...titleAnimation}>
                                    <Heading size="title.sm">{s.title}</Heading>
                                  </motion.div>
                                  <motion.div {...textAnimation}>
                                    <Text size="body.lg">{s.text}</Text>
                                  </motion.div>
                                </React.Fragment>
                              ),
                          )}
                        </Flex>
                      )}
                    </Box>
                  </Center>
                  <Box h="30px" />
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
                    rightIcon={step === 3 ? undefined : <FiArrowRight />}
                    colorScheme="blue"
                  >
                    {step === 3 ? "Start Now" : "Next"}
                  </Button>
                </ButtonGroup>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </AnimatePresence>
    </MotionConfig>
  );
};

const titleAnimation = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1,
    },
  },
  exit: { opacity: 0, x: 20 },
};

const textAnimation = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2,
    },
  },
  exit: { opacity: 0, x: 20 },
};
