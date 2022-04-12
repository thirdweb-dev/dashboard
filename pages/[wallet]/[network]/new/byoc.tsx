import { PublishMetadata } from "../publish";
import {
  useMutationWithInvalidate,
  useQueryWithNetwork,
} from "@3rdweb-sdk/react/hooks/query/useQueryWithNetwork";
import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { TransactionButton } from "components/buttons/TransactionButton";
import { Card } from "components/layout/Card";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ConsolePage } from "pages/_app";
import React, { useCallback, useState } from "react";
import invariant from "tiny-invariant";
import { parseErrorToMessage } from "utils/errorParser";

function useConstructorParamsQuery(uri?: string) {
  const sdk = useSDK();
  return useQueryWithNetwork(
    ["byoc", "constructor-params", uri],
    () => {
      return uri ? sdk?.publisher.extractConstructorParams(uri) : [];
    },
    {
      enabled: !!uri && !!sdk,
    },
  );
}

function usePublishedContractQuery(uri?: string) {
  const sdk = useSDK();
  const address = useAddress();
  return useQueryWithNetwork(
    ["byoc", "get", uri],
    () => {
      return address && uri && sdk
        ? sdk.publisher.get(address, uri)
        : undefined;
    },
    {
      enabled: !!uri && !!sdk && !!address,
    },
  );
}

function useBYOCDeployMutation(uri?: string) {
  const sdk = useSDK();
  const contract = usePublishedContractQuery(uri);
  return useMutationWithInvalidate(async (constructorValues: unknown[]) => {
    invariant(contract.data, "contract data is not defined");
    return await sdk?.publisher.deployCustomContract(
      contract.data,
      constructorValues,
    );
  });
}

const BYOCDeployPage: ConsolePage = () => {
  const uri = useSingleQueryParam("uri");
  const constuctorParams = useConstructorParamsQuery(uri);
  const deploy = useBYOCDeployMutation(uri);
  const [contractParams, _setContractParams] = useState<any[]>([]);
  const setContractParams = useCallback((idx: number, value: any) => {
    _setContractParams((prev) => {
      const newArr = [...prev];
      newArr.splice(idx, 1, value);
      return newArr;
    });
  }, []);
  const toast = useToast();

  return (
    <Card p={10}>
      <Flex direction="column" gap={4}>
        <PublishMetadata bg="backgroundCardHighlight" uri={uri as string} />
        <Flex as={Card} bg="backgroundCardHighlight" direction="column" gap={3}>
          <Heading size="subtitle.md">Contract params</Heading>
          {constuctorParams.data?.length ? (
            constuctorParams.data.map((param, idx) => (
              <FormControl key={param.name}>
                <FormLabel>{param.name}</FormLabel>
                <Input
                  value={contractParams[idx]}
                  onChange={(e) =>
                    setContractParams(idx, e.currentTarget.value)
                  }
                  type="text"
                />
                <FormHelperText>{param.type}</FormHelperText>
              </FormControl>
            ))
          ) : (
            <Text>No params</Text>
          )}
        </Flex>
        <TransactionButton
          isLoading={deploy.isLoading}
          onClick={() =>
            deploy.mutate(contractParams, {
              onSuccess: () => {
                toast({
                  title: "Success",
                  description: "Successfully deployed BYOC!",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              },
              onError: (err) => {
                toast({
                  title: "Failed to deploy",
                  description: parseErrorToMessage(err),
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
              },
            })
          }
          colorScheme="primary"
          transactionCount={1}
        >
          Deploy
        </TransactionButton>
      </Flex>
    </Card>
  );
};

BYOCDeployPage.Layout = AppLayout;

export default BYOCDeployPage;
