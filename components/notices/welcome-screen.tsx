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
import { useTrack } from "hooks/analytics/useTrack";
import { useLocalStorage } from "hooks/useLocalStorage";
import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Button, Heading, Text, TrackedLink } from "tw-components";

const TRACK_CATEGORY = "welcome-screen";

const steps = [
  {
    key: "step-1",
    action: "Build",
    title: "Speed up development.",
    text: (
      <>
        Build contracts easily with{" "}
        <TrackedLink
          color="primary.500"
          href="https://portal.thirdweb.com/contractkit"
          category={TRACK_CATEGORY}
          label="build-contractkit"
          isExternal
        >
          ContractKit
        </TrackedLink>
        .
        <br />
        Skip ahead with{" "}
        <TrackedLink
          color="primary.500"
          href="https://portal.thirdweb.com/pre-built-contracts"
          category={TRACK_CATEGORY}
          label="build-prebuilt"
          isExternal
        >
          prebuilt contracts
        </TrackedLink>{" "}
        for common use cases.
        <br />
        Integrate any contract into your app with autogenerated{" "}
        <TrackedLink
          color="primary.500"
          href="https://portal.thirdweb.com/sdk"
          category={TRACK_CATEGORY}
          label="build-sdks"
          isExternal
        >
          SDKs
        </TrackedLink>
        .
      </>
    ),
    gradient: "linear-gradient(147.15deg, #410AB6 30.17%, #D45CFF 100.01%)",
  },
  {
    key: "step-2",
    action: "Launch",
    title: (
      <>
        One-click deploys,
        <br />
        no private keys.
      </>
    ),
    text: (
      <>
        Deploy contracts securely using{" "}
        <TrackedLink
          color="primary.500"
          href="https://portal.thirdweb.com/cli"
          category={TRACK_CATEGORY}
          label="launch-cli"
          isExternal
        >
          CLI
        </TrackedLink>{" "}
        and{" "}
        <TrackedLink
          color="primary.500"
          href="https://portal.thirdweb.com/dashboard"
          category={TRACK_CATEGORY}
          label="launch-dashboard"
          isExternal
        >
          Dashboard
        </TrackedLink>
        .
        <br />
        Scale apps easily without worrying about web3 infrastructure.
        <br />
        Create shareable landing pages for contracts with{" "}
        <TrackedLink
          color="primary.500"
          href="https://portal.thirdweb.com/release"
          category={TRACK_CATEGORY}
          label="launch-release"
          isExternal
        >
          Release
        </TrackedLink>
        .
      </>
    ),
    gradient: "linear-gradient(147.15deg, #410AB6 30.17%, #5CFFE1 100.01%)",
  },
  {
    key: "step-3",
    action: "Manage",
    title: "On-chain analytics and control.",
    text: (
      <>
        Monitor on-chain acitivity with{" "}
        <TrackedLink
          color="primary.500"
          href="https://portal.thirdweb.com/dashboard/activity-feed"
          category={TRACK_CATEGORY}
          label="manage-dashboard"
          isExternal
        >
          Analytics
        </TrackedLink>
        .
        <br />
        Interact directly with contracts using{" "}
        <TrackedLink
          color="primary.500"
          href="https://portal.thirdweb.com/dashboard"
          category={TRACK_CATEGORY}
          label="manage-dashboard"
          isExternal
        >
          Dashboard
        </TrackedLink>
        .
        <br />
        Control your team&apos;s access with{" "}
        <TrackedLink
          color="primary.500"
          href="https://portal.thirdweb.com/dashboard/permission-controls"
          category={TRACK_CATEGORY}
          label="manage-dashboard"
          isExternal
        >
          Permissions
        </TrackedLink>
        .
      </>
    ),
    gradient: "linear-gradient(147.15deg, #B4F1FF -10.17%, #410AB6 100.01%)",
  },
] as const;

export const WelcomeScreen: React.FC = () => {
  const track = useTrack();
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
      track({
        category: TRACK_CATEGORY,
        action: "click",
        label: "next",
        currentStep: curr,
      });
      if (curr >= 3) {
        setShowWelcomeScreen(false);
        track({
          category: TRACK_CATEGORY,
          action: "click",
          label: "complete",
        });
      }
      return curr + 1;
    });
  };

  const prevStep = () => {
    setStep((curr) => {
      track({
        category: TRACK_CATEGORY,
        action: "click",
        label: "back",
        currentStep: curr,
      });
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
                          y: -50,
                          width: "100%",
                          height: "100%",
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          width: "100%",
                          height: "100%",
                        }}
                        exit={{
                          opacity: 0,
                          y: -50,
                          width: "100%",
                          height: "100%",
                        }}
                        key="step-1"
                      >
                        <Center>
                          <ChakraNextImage
                            priority
                            w={{ base: "45%", md: "90%" }}
                            src={require("public/assets/product-pages/dashboard/hero.png")}
                            alt=""
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
                              color="white"
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
                    <Box position="relative" w="full">
                      {step === 0 && (
                        <Flex
                          gap={4}
                          as={motion.div}
                          direction="column"
                          key="step-0"
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          exit={{
                            opacity: 0,
                          }}
                        >
                          <React.Fragment key={"step-0-t"}>
                            <motion.div {...titleAnimation}>
                              <Heading size="title.md" w="80%">
                                the complete web3 development framework.
                              </Heading>
                            </motion.div>
                            <motion.div {...textAnimation}>
                              <Text size="body.lg" w="90%">
                                thirdweb makes it easy to integrate web3
                                technologies into apps and games.
                                <br />
                                Focus on creating business value while we handle
                                the web3 complexities.
                              </Text>
                            </motion.div>
                          </React.Fragment>
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
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          exit={{
                            opacity: 0,
                          }}
                        >
                          {steps.map(
                            (s, i) =>
                              step === i + 1 && (
                                <React.Fragment key={s.key}>
                                  <motion.div {...titleAnimation}>
                                    <Heading size="title.md">{s.title}</Heading>
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
                  onClick={() => {
                    setShowWelcomeScreen(false);
                    track({
                      category: TRACK_CATEGORY,
                      action: "click",
                      label: "skip",
                    });
                  }}
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
                    colorScheme="primary"
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
