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
          minH={{ base: "80vh", md: "auto" }}
          mt="auto"
          pb="env(safe-area-inset-bottom)"
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
                <AnimatePresence initial={step !== 0}>
                  <Center
                    as={motion.div}
                    initial={`step-${step}`}
                    animate={`step-${step}`}
                    variants={{
                      "step-0": {
                        background:
                          "linear-gradient(147.15deg, #410AB6 30.17%, #B4F1FF 100.01%)",
                      },
                      "step-1": {
                        background:
                          "linear-gradient(147.15deg, #00C850 0%, #AD00FF 100%)",
                      },
                      "step-2": {
                        background:
                          "linear-gradient(147.15deg, #000AFF 0%, #FF3D00 130%)",
                      },
                      "step-3": {
                        background:
                          "linear-gradient(147.15deg, #8F00FF 0%, #FFB800 130%)",
                      },
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
                          <Heading
                            cursor="pointer"
                            onClick={() => setStep(1)}
                            opacity={step === 1 ? 1 : 0.5}
                            fontWeight={step === 1 ? 700 : 400}
                            letterSpacing={step === 1 ? "0em" : "0.02em"}
                            size="title.2xl"
                            transition="all 0.2s"
                          >
                            Build
                          </Heading>

                          <Heading
                            cursor="pointer"
                            onClick={() => setStep(2)}
                            fontWeight={step === 2 ? 700 : 400}
                            opacity={step === 2 ? 1 : 0.5}
                            letterSpacing={step === 2 ? "0em" : "0.02em"}
                            size="title.2xl"
                            transition="all 0.2s"
                          >
                            Launch
                          </Heading>

                          <Heading
                            cursor="pointer"
                            onClick={() => setStep(3)}
                            opacity={step === 3 ? 1 : 0.5}
                            fontWeight={step === 3 ? 700 : 400}
                            letterSpacing={step === 3 ? "0em" : "0.02em"}
                            size="title.2xl"
                            transition="all 0.2s"
                          >
                            Manage
                          </Heading>
                        </Flex>
                      </motion.div>
                    )}
                  </Center>
                </AnimatePresence>
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
                  <AnimatePresence initial={step !== 0}>
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
                          {step === 1 && (
                            <motion.div key="step-1-title" {...titleAnimation}>
                              <Heading size="title.sm">
                                Build contracts & applications
                              </Heading>
                            </motion.div>
                          )}
                          {step === 2 && (
                            <motion.div key="step-2-title" {...titleAnimation}>
                              <Heading size="title.sm">
                                Launch contracts & applications
                              </Heading>
                            </motion.div>
                          )}
                          {step === 3 && (
                            <motion.div key="step-3-title" {...titleAnimation}>
                              <Heading size="title.sm">
                                Manage contracts
                              </Heading>
                            </motion.div>
                          )}
                          {step === 1 && (
                            <motion.div key="step-1-text" {...textAnimation}>
                              <Text size="body.lg">
                                Ship your web3 apps faster by reducing
                                development time. Build smart contracts and
                                applications effortlessly with our prebuilt
                                contracts, build your own contract with
                                ContractKit, and powerful SDKs.
                              </Text>
                            </motion.div>
                          )}
                          {step === 2 && (
                            <motion.div key="step-2-text" {...textAnimation}>
                              <Text size="body.lg">
                                Deploy your smart contracts on-chain easily with
                                a single command or with our Dashboard without
                                requiring private keys. Publish your contracts
                                with Release for other web3 devs to discover and
                                deploy your contract with one-click.
                              </Text>
                            </motion.div>
                          )}
                          {step === 3 && (
                            <motion.div key="step-3-text" {...textAnimation}>
                              <Text size="body.lg">
                                After you have deployed your contracts on-chain,
                                you can monitor, configure and interact with
                                your contracts directly from the Dashboard.
                                Invite your team to collaborate and manage their
                                permissions for interacting with contracts.
                              </Text>
                            </motion.div>
                          )}
                        </Flex>
                      )}
                    </Box>
                  </AnimatePresence>
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
