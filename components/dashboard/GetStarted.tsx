import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Box, Flex, ModalCloseButton, Progress } from "@chakra-ui/react";
import { FiX } from "@react-icons/all-files/fi/FiX";
import { useEffect, useState } from "react";
import { FiCheck, FiChevronUp } from "react-icons/fi";
import { Card, Heading, Text } from "tw-components";

type Step = {
  title: string;
  description?: string;
  completed: boolean;
  children: React.ReactNode;
};

interface GetStartedProps {
  title: string;
  description: string;
  steps: Step[];
  storageKey: string;
}

export const GetStarted: React.FC<GetStartedProps> = ({
  title,
  description,
  steps,
  storageKey,
}) => {
  const firstIncomplete = steps.findIndex((step) => !step.completed);
  const lastStepCompleted =
    firstIncomplete === -1 ? steps.length - 1 : firstIncomplete - 1;
  const percentage = ((lastStepCompleted + 1) / steps.length) * 100;
  const [isOpen, setIsOpen] = useState(firstIncomplete !== -1);
  const [isHidden, setIsHidden] = useLocalStorage(
    storageKey,
    firstIncomplete === -1,
  );

  useEffect(() => {
    if (firstIncomplete === -1) {
      setIsHidden(true);
    }
  }, [firstIncomplete, setIsHidden]);

  return isHidden ? (
    <></>
  ) : (
    <Card
      flexDir="column"
      p={8}
      gap={4}
      position="relative"
      maxW="3xl"
      onClick={() => !isOpen && setIsOpen(true)}
    >
      <Box
        onClick={() => setIsHidden(true)}
        as="button"
        position="absolute"
        top={2}
        right={2}
        color="gray.700"
      >
        <FiX />
      </Box>
      <Flex justifyContent="space-between" alignItems="center">
        <Text size="label.xl" color="white">
          {title}
        </Text>
        <Flex
          as="button"
          type="button"
          alignItems="center"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Heading size="subtitle.xs" color="white" mr="2">
            {isOpen ? "Collapse" : "Expand"}
          </Heading>
          <Box
            transition="transform 0.2s"
            transform={`rotate(${isOpen ? "0" : "180"}deg)`}
          >
            <FiChevronUp />
          </Box>
        </Flex>
      </Flex>
      {isOpen && (
        <>
          <Text mt={4}>{description}</Text>
          <Progress value={percentage} mt={8} mb={2} rounded="full" />
          <Text size="body.sm" mt={2} color="whiteAlpha.500">
            {lastStepCompleted + 1}/{steps.length} Tasks Completed
          </Text>
          {steps.map(({ children, ...step }, index) => {
            return (
              <Flex
                flexDir={{ base: "column", md: "row" }}
                opacity={index === lastStepCompleted + 1 ? 1 : 0.5}
                key={index}
                mt={8}
                gap={4}
                w="full"
              >
                <Flex
                  w={6}
                  h={6}
                  shrink={0}
                  rounded="full"
                  alignItems="center"
                  justifyContent="center"
                  border="1px solid"
                  borderColor={step.completed ? "white" : "whiteAlpha.500"}
                >
                  {step.completed ? (
                    <FiCheck />
                  ) : (
                    <Text size="label.sm" color="white">
                      {index + 1}
                    </Text>
                  )}
                </Flex>
                <Flex flexDir="column" w="full">
                  <Text color="white">{step.title}</Text>
                  {index === lastStepCompleted + 1 && (
                    <>
                      {step.description && (
                        <Text my={2} size="body.sm" color="whiteAlpha.500">
                          {step.description}
                        </Text>
                      )}
                      <Box mt={4} w="full">
                        {children}
                      </Box>
                    </>
                  )}
                </Flex>
              </Flex>
            );
          })}
        </>
      )}
    </Card>
  );
};
