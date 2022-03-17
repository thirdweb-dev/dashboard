import { ModuleType } from "@3rdweb/sdk";
import {
  Button,
  Center,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import useAddModuleContext, { AddModuleStep } from "contexts/AddModuleContext";
import { isAddress } from "ethers/lib/utils";
import React from "react";
import { FiChevronRight, FiInfo } from "react-icons/fi";
import { MODULE_BUTTON_INFO } from "./select/SelectModule";

interface IAddModuleButton {
  step?: AddModuleStep;
}

export const AddModuleButton: React.FC<IAddModuleButton> = ({ step }) => {
  const {
    steps: { nextStep, activeStep },
    watch,
    selectedModule,
    isDeploying,
  } = useAddModuleContext();

  const isDisabled = () => {
    switch (activeStep) {
      case 0:
        return selectedModule === undefined;
      case 1:
        if (selectedModule === ModuleType.SPLITS) {
          const addsToHundred =
            watch("recipientSplits")
              ?.map((split: any) => split.percentage)
              .reduce(
                (s1: any, s2: any) => parseFloat(s1) + parseFloat(s2),
                0,
              ) === 100;
          return (
            !watch("name") ||
            watch("recipientSplits").length === 0 ||
            !addsToHundred
          );
        } else if (selectedModule === ModuleType.VOTE) {
          return !watch("name") || !isAddress(watch("votingTokenAddress"));
        }

        return !watch("name");
      case 2:
        return false;
    }
  };

  const isNextDisabled = isDisabled();

  return (
    <Stack position="absolute" width="100%" bottom="0" left="0" spacing={0}>
      {selectedModule !== undefined && activeStep === 0 && (
        <Flex
          width="100%"
          bg="#393947"
          paddingX="24px"
          paddingY="12px"
          align="center"
        >
          <Center bg="blue.50" width="30px" height="30px" borderRadius="50px">
            <Icon as={FiInfo} boxSize={4} />
          </Center>
          <Flex ml="24px" direction="column">
            <Text color="white">
              You are currently adding a{" "}
              <strong>{MODULE_BUTTON_INFO[selectedModule]?.name}</strong>
            </Text>
            <Text color="white">
              This module lets you{" "}
              {(MODULE_BUTTON_INFO[
                selectedModule
              ]?.label[0].toLowerCase() as string) +
                MODULE_BUTTON_INFO[selectedModule]?.label.slice(1)}
              {MODULE_BUTTON_INFO[selectedModule]?.portal && (
                <Text display="inline" color="white">
                  {" "}
                  You can learn more{" "}
                  <Link
                    href={MODULE_BUTTON_INFO[selectedModule]?.portal}
                    fontWeight="bold"
                    target="_blank"
                  >
                    here.
                  </Link>
                </Text>
              )}
            </Text>
          </Flex>
        </Flex>
      )}
      <Stack>
        {activeStep === 1 ? (
          <Button
            flexGrow={5}
            borderRadius="0px 0px 4px 4px"
            colorScheme="primary"
            isLoading={isDeploying}
            rightIcon={<Icon as={FiChevronRight} />}
            isDisabled={isNextDisabled}
            type="submit"
            form="add-module-form"
          >
            {step?.action}
          </Button>
        ) : (
          <Button
            flexGrow={5}
            borderRadius={"0px 0px 4px 4px"}
            colorScheme="primary"
            rightIcon={<Icon as={FiChevronRight} />}
            onClick={nextStep}
            isDisabled={isNextDisabled}
          >
            {step?.action}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
