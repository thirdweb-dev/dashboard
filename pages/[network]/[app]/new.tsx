import { Center, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { Step, Steps } from "chakra-ui-steps";
import { AddModuleButton } from "components/add-module/AddModuleButton";
import { MODULE_TYPE_TO_NAME } from "components/add-module/select/SelectModule";
import { AppLayout } from "components/app-layouts/app";
import { ChakraNextImage } from "components/Image";
import { Card } from "components/layout/Card";
import { DeployingModal, DeployMode } from "components/web3/DeployingModal";
import useAddModuleContext, {
  AddModuleContextProvider,
} from "contexts/AddModuleContext";
import { ConsolePage } from "pages/_app";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FeatureIconMap } from "utils/feature-icons";

const AddModuleWithProvider: ConsolePage = () => {
  return (
    <AddModuleContextProvider>
      <AddModule />
    </AddModuleContextProvider>
  );
};

const AddModule: React.FC = () => {
  const {
    steps: { steps, prevStep, activeStep },
    analytics: { Track },
    error,
    setError,
    selectedModule,
    isDeploying,
  } = useAddModuleContext();

  return (
    <Track>
      <DeployingModal
        isDeploying={isDeploying}
        error={error}
        clearError={() => setError(null)}
        deployMode={DeployMode.MODULE}
      />

      <Stack spacing={8}>
        <Stack spacing={6}>
          {activeStep > 0 && activeStep !== 2 && (
            <Stack
              marginLeft="-4px"
              padding="4px"
              width="100px"
              borderRadius="20px"
              direction="row"
              onClick={prevStep}
              align="center"
              spacing={3}
              cursor="pointer"
              _hover={{
                bg: "gray.100",
              }}
            >
              <Center
                bg="white"
                outline="gray.400"
                height="32px"
                width="32px"
                borderRadius="50px"
              >
                <Icon boxSize={5} as={FiArrowLeft} color="primary.500" />
              </Center>
              <Text fontSize="18px" fontWeight="semibold" color="gray.700">
                Back
              </Text>
            </Stack>
          )}
          <Stack direction="row" align="center">
            {selectedModule !== undefined && activeStep > 0 && (
              <ChakraNextImage
                boxSize="48px"
                src={FeatureIconMap[selectedModule]}
                alt={MODULE_TYPE_TO_NAME[selectedModule] as string}
              />
            )}
            <Heading flexShrink={0}>
              {activeStep === 2 ? "Manage " : "Add "}
              {selectedModule !== undefined && activeStep > 0
                ? MODULE_TYPE_TO_NAME[selectedModule]
                : "New Module"}
            </Heading>
          </Stack>
        </Stack>
        <Steps responsive={false} activeStep={activeStep}>
          {steps.map((step) => (
            <Step key={step.label}>
              <Card
                position="relative"
                paddingBottom={
                  selectedModule !== undefined && activeStep === 0
                    ? "140px"
                    : "80px"
                }
              >
                {step.content({})}
                <AddModuleButton step={step} />
              </Card>
            </Step>
          ))}
        </Steps>
      </Stack>
    </Track>
  );
};

AddModuleWithProvider.Layout = AppLayout;

export default AddModuleWithProvider;
