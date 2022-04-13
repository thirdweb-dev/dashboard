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
import { BigNumberish } from "ethers";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ConsolePage } from "pages/_app";
import React, { useCallback, useState } from "react";
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

function usePublishedContractQuery(groupId?: string) {
  const sdk = useSDK();
  const address = useAddress();
  return useQueryWithNetwork(
    ["byoc", "get", { publisherAddress: address, groupId }],
    () => {
      return address && groupId && sdk
        ? sdk.publisher.getLatest(address, groupId)
        : undefined;
    },
    {
      enabled: !!groupId && !!sdk && !!address,
    },
  );
}

function useBYOCDeployMutation() {
  const sdk = useSDK();

  return useMutationWithInvalidate(
    async ({
      publisherAddress,
      contractId,
      constructorValues,
    }: {
      publisherAddress: string;
      contractId: BigNumberish;
      constructorValues: unknown[];
    }) => {
      return sdk?.publisher.deployCustomContract(
        publisherAddress,
        contractId,
        constructorValues,
      );
    },
  );
}

const BYOCDeployPage: ConsolePage = () => {
  const address = useAddress();
  const groupId = useSingleQueryParam("groupId");
  const publishedContract = usePublishedContractQuery(groupId);
  const constuctorParams = useConstructorParamsQuery(
    publishedContract.data?.metadataUri,
  );
  const deploy = useBYOCDeployMutation();

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
        <PublishMetadata
          bg="backgroundCardHighlight"
          uri={publishedContract.data?.metadataUri}
        />
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
          isDisabled={!address || !publishedContract.data}
          onClick={() => {
            if (!address || !publishedContract.data) {
              return;
            }
            deploy.mutate(
              {
                contractId: publishedContract.data.id,
                publisherAddress: address,
                constructorValues: contractParams,
              },
              {
                onSuccess: (data) => {
                  console.log("contract deployed:", data);
                  toast({
                    title: "Success",
                    description: `Successfully deployed BYOC with address: ${data}!`,
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
              },
            );
          }}
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
