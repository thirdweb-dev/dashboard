import { useGas } from "@3rdweb-sdk/react/hooks/useGas";
import {
  Box,
  ButtonGroup,
  Code,
  Divider,
  Flex,
  FormControl,
  GridItem,
  Input,
  SimpleGrid,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { AppLayout } from "components/app-layouts/app";
import { useTrack } from "hooks/analytics/useTrack";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Card, FormLabel, Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";
import { ZodError, z } from "zod";

const steps = [
  {
    title: "RPC",
    description: "Validate RPC Endpoint",
  },
  { title: "Chain ID", description: "Validate Chain ID" },
  {
    title: "Contracts",
    description: "Validate contract deployments",
  },
];

interface ValidationState {
  value: string;
  error: Error | null;
  isValid: boolean;
  isLoading: boolean;
}

const ValidateChainPage: ThirdwebNextPage = () => {
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });

  const [rpc, setRpc] = useState<ValidationState>({
    value: "",
    error: null,
    isValid: false,
    isLoading: false,
  });

  const trackEvent = useTrack();

  return (
    <>
      <NextSeo
        title="Validate Chain"
        description="Validate a given chain being compatible with thirdweb tooling."
        noindex
        nofollow
      />
      <Flex direction="column" gap={8}>
        <Heading as="h1">Validate New Chain</Heading>

        <Stepper index={activeStep}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <Heading as={StepTitle} size="label.md">
                  {step.title}
                </Heading>
                <Text
                  display={{ base: "none", md: "inline-block" }}
                  as={StepDescription}
                  size="body.md"
                >
                  {step.description}
                </Text>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>

        <Card>
          {activeStep === 0 ? (
            <RPCStep onNext={goToNext} state={rpc} setState={setRpc} />
          ) : null}
        </Card>
      </Flex>
    </>
  );
};

ValidateChainPage.getLayout = function getLayout(page, props) {
  return <AppLayout {...props}>{page}</AppLayout>;
};

ValidateChainPage.pageId = PageId.GasEstimator;

export default ValidateChainPage;

const rpcUrlSchema = z.string().url();

function useRpcValidation(rpcUrl: string) {
  const validUrlQuery = useQuery<string, ZodError>({
    queryKey: ["validate-rpc-url", { rpcUrl }],
    queryFn: async () => {
      return rpcUrlSchema.parseAsync(rpcUrl);
    },
    enabled: false,
    retry: false,
  });

  const supportsChainId = useQuery<boolean, Error>({
    queryKey: ["validate-rpc-chain-id", { rpcUrl }],
    queryFn: async () => {
      const response = await fetch(rpcUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_chainId",
          params: [],
          id: 1,
        }),
      });

      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.message);
      }

      return true;
    },
    enabled: false,
    retry: false,
  });

  const supportsBlockNumber = useQuery<boolean, Error>({
    queryKey: ["validate-rpc-block-number", { rpcUrl }],
    queryFn: async () => {
      const response = await fetch(rpcUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
          id: 1,
        }),
      });

      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.message);
      }

      return true;
    },
    enabled: false,
    retry: false,
  });

  const validationReport = {
    urlValid: validUrlQuery.isSuccess,
    urlLoading: validUrlQuery.isFetching,
    urlError: validUrlQuery.error,
    chainIdSupported: supportsChainId.isSuccess,
    chainIdLoading: supportsChainId.isFetching,
    chainIdError: supportsChainId.error,
    blockNumberSupported: supportsBlockNumber.isSuccess,
    blockNumberLoading: supportsBlockNumber.isFetching,
    blockNumberError: supportsBlockNumber.error,
    allValid:
      validUrlQuery.isSuccess &&
      supportsChainId.isSuccess &&
      supportsBlockNumber.isSuccess,
  } as const;

  return [
    validationReport,
    () => {
      validUrlQuery.refetch();
      supportsChainId.refetch();
      supportsBlockNumber.refetch();
    },
  ] as const;
}

interface StepProps {
  onNext?: () => void;
  onPrevious?: () => void;
  state: ValidationState;
  setState: Dispatch<SetStateAction<ValidationState>>;
}
const RPCStep: React.FC<StepProps> = ({
  onNext,
  onPrevious,
  state,
  setState,
}) => {
  const [rpcUrl, setRpcUrl] = useState<string>("");
  const [validationReport, validate] = useRpcValidation(rpcUrl);
  console.log("*** validationReport", validationReport);

  return (
    <Flex direction="column" gap={6}>
      <Heading as="h2" size="subtitle.md">
        Validate RPC Endpoint
      </Heading>

      <FormControl gap={2}>
        <FormLabel>RPC Endpoint</FormLabel>
        <Flex gap={3}>
          <Input
            value={rpcUrl}
            isDisabled={state.isLoading}
            onChange={(e) => setRpcUrl(e.currentTarget.value)}
            placeholder="https://rpc.yourchain.com/rpc"
            type="url"
          />
          <Button
            onClick={validate}
            colorScheme="primary"
            isDisabled={state.isValid && state.value === rpcUrl}
          >
            Validate
          </Button>
        </Flex>
      </FormControl>

      <Heading as="h3" size="label.md">
        Validation Report
      </Heading>
      <Flex direction="column" gap={2}>
        <Flex gap={1.5}>
          <Text>{validationReport.urlValid ? "✅" : "❌"}</Text>
          <Text>RPC URL valid</Text>
        </Flex>
        <Flex gap={1.5}>
          <Text>{validationReport.chainIdSupported ? "✅" : "❌"}</Text>
          <Text>
            RPC supports <Code>eth_chainId</Code> method
          </Text>
        </Flex>
        <Flex gap={1.5}>
          <Text>{validationReport.blockNumberSupported ? "✅" : "❌"}</Text>
          <Text>
            RPC supports <Code>eth_blockNumber</Code> method
          </Text>
        </Flex>
      </Flex>

      <Flex direction={"column"} gap={2}>
        <Flex gap={2}></Flex>
      </Flex>

      <Divider mt={4} />
      <ButtonGroup ml="auto">
        {onPrevious && <Button onClick={onPrevious}>Back</Button>}
        {onNext && (
          <Button
            isLoading={state.isLoading}
            isDisabled={!state.isValid}
            colorScheme="primary"
            onClick={onNext}
          >
            Next
          </Button>
        )}
      </ButtonGroup>
    </Flex>
  );
};
