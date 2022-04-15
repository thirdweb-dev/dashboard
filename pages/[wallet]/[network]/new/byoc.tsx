import { PublishMetadata } from "../publish";
import {
  useMutationWithInvalidate,
  useQueryWithNetwork,
} from "@3rdweb-sdk/react/hooks/query/useQueryWithNetwork";
import {
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { CustomContractMetadata } from "@thirdweb-dev/sdk/dist/schema/contracts/custom";
import { AppLayout } from "components/app-layouts/app";
import { TransactionButton } from "components/buttons/TransactionButton";
import { Card } from "components/layout/Card";
import { FileInput } from "components/shared/FileInput";
import { useImageFileOrUrl } from "hooks/useImageFileOrUrl";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";
import { ConsolePage } from "pages/_app";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
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
      contractMetadata,
    }: {
      publisherAddress: string;
      contractId: string;
      constructorValues: unknown[];
      contractMetadata?: CustomContractMetadata;
    }) => {
      return sdk?.publisher.deployCustomContract(
        publisherAddress,
        contractId,
        constructorValues,
        contractMetadata,
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
  const router = useRouter();
  const wallet = useSingleQueryParam("wallet") || "dashboard";

  const form =
    useForm<Pick<CustomContractMetadata, "name" | "image" | "description">>();

  const { getFieldState, watch, setValue, register, handleSubmit, formState } =
    form;

  return (
    <Card
      p={10}
      as="form"
      onSubmit={handleSubmit((d) => {
        if (!address || !publishedContract.data) {
          return;
        }
        deploy.mutate(
          {
            contractId: publishedContract.data.id,
            publisherAddress: address,
            constructorValues: contractParams,
            contractMetadata: d,
          },
          {
            onSuccess: (data) => {
              console.info("contract deployed:", data);
              toast({
                title: "Success",
                description: `Successfully deployed BYOC with address: ${data}!`,
                status: "success",
                duration: 5000,
                isClosable: true,
              });
              router.push(`/${wallet}/mumbai/${data}`);
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
      })}
    >
      <Flex direction="column" gap={8}>
        <Heading size="title.lg">Deploy new contract</Heading>
        <PublishMetadata
          bg="backgroundCardHighlight"
          uri={publishedContract.data?.metadataUri}
        />
        <Divider borderColor="borderColor" />
        <Flex as={Card} bg="backgroundCardHighlight" direction="column" gap={3}>
          <Flex direction="column">
            <Heading size="title.md">Contract Metadata</Heading>
            <Text size="body.md" fontStyle="italic">
              Settings to organize and distinguish between your different
              contracts.
            </Text>
          </Flex>
          <Flex gap={4} direction={{ base: "column", md: "row" }}>
            <Flex
              flexShrink={0}
              flexGrow={1}
              maxW={{ base: "100%", md: "160px" }}
            >
              <FormControl
                display="flex"
                flexDirection="column"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                isInvalid={getFieldState("image", formState).invalid}
              >
                <FormLabel>Image</FormLabel>
                <FileInput
                  accept="image/*"
                  value={useImageFileOrUrl(watch("image"))}
                  setValue={(file) =>
                    setValue("image", file, { shouldTouch: true })
                  }
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  transition="all 200ms ease"
                />
                <FormErrorMessage>
                  {getFieldState("image", formState).error?.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            <Flex
              direction="column"
              gap={4}
              flexGrow={1}
              justify="space-between"
            >
              <Flex gap={4} direction={{ base: "column", md: "row" }}>
                <FormControl
                  isRequired
                  isInvalid={getFieldState("name", formState).invalid}
                >
                  <FormLabel>Name</FormLabel>
                  <Input autoFocus variant="filled" {...register("name")} />
                  <FormErrorMessage>
                    {getFieldState("name", formState).error?.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>

              <FormControl
                isInvalid={getFieldState("description", formState).invalid}
              >
                <FormLabel>Description</FormLabel>
                <Textarea variant="filled" {...register("description")} />
                <FormErrorMessage>
                  {getFieldState("description", formState).error?.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
          </Flex>
          {constuctorParams.data?.length ? (
            <>
              <Divider my={4} borderColor="borderColor" />
              <Flex direction="column">
                <Heading size="title.md">Contract Parameters</Heading>
                <Text size="body.md" fontStyle="italic">
                  Parameters the contract specifies to be passed in during
                  deployment.
                </Text>
              </Flex>

              {constuctorParams.data.map((param, idx) => (
                <FormControl isRequired key={param.name}>
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
              ))}
            </>
          ) : null}
        </Flex>
        <TransactionButton
          type="submit"
          isLoading={deploy.isLoading}
          isDisabled={!address || !publishedContract.data}
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
