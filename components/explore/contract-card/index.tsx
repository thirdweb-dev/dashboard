import { ContractPublisher } from "../publisher";
import {
  Flex,
  Icon,
  Image,
  LinkBox,
  LinkOverlay,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { QueryClient } from "@tanstack/query-core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ensQuery } from "components/contract-components/hooks";
import { getEVMThirdwebSDK, replaceIpfsUrl } from "lib/sdk";
import { BsShieldCheck } from "react-icons/bs";
import { VscVersions } from "react-icons/vsc";
import invariant from "tiny-invariant";
import { Card, Heading, Link, LinkButton, Text } from "tw-components";

interface ContractCardProps {
  publisher: string;
  contractId: string;
}

export const ContractCard: React.FC<ContractCardProps> = ({
  publisher,
  contractId,
}) => {
  const publishedContractResult = usePublishedContract(
    `${publisher}/${contractId}`,
  );

  const showSkeleton =
    publishedContractResult.isLoading ||
    publishedContractResult.isPlaceholderData;

  return (
    <LinkBox as="article">
      <Card
        role="group"
        p={3}
        display="flex"
        gap={3}
        flexDir="column"
        minHeight="170px"
        borderColor="borderColor"
        transition="150ms border-color ease-in-out"
        _hover={{
          _dark: {
            borderColor: "white",
          },
          _light: {
            borderColor: "black",
          },
        }}
      >
        <Flex align="center" justify="space-between">
          <Skeleton
            boxSize={8}
            borderRadius="full"
            overflow="hidden"
            isLoaded={!showSkeleton}
          >
            {(publishedContractResult.data?.logo || showSkeleton) && (
              <Image
                alt={
                  publishedContractResult.data?.displayName ||
                  publishedContractResult.data?.name
                }
                boxSize="full"
                src={replaceIpfsUrl(publishedContractResult.data?.logo || "")}
              />
            )}
          </Skeleton>
          <Skeleton isLoaded={!showSkeleton} borderRadius="full">
            <LinkOverlay
              as={LinkButton}
              href={`/${publisher}/${contractId}`}
              size="sm"
              variant="outline"
              borderRadius="full"
              borderColor="borderColor"
              fontSize={12}
              _groupHover={{
                _dark: {
                  bg: "white",
                  color: "black",
                },
                _light: {
                  bg: "black",
                  color: "white",
                },
              }}
            >
              Deploy
            </LinkOverlay>
          </Skeleton>
        </Flex>
        <Flex direction="column" gap={2}>
          <Skeleton
            noOfLines={1}
            isLoaded={!showSkeleton}
            w={showSkeleton ? "50%" : "auto"}
          >
            <Heading as="h3" noOfLines={1} size="label.lg">
              {publishedContractResult.data?.displayName ||
                publishedContractResult.data?.name}
            </Heading>
          </Skeleton>
          <SkeletonText
            isLoaded={!showSkeleton}
            spacing={3}
            noOfLines={2}
            my={showSkeleton ? 2 : 0}
          >
            <Text size="body.md" noOfLines={2}>
              {publishedContractResult.data?.description}
            </Text>
          </SkeletonText>
        </Flex>
        <Flex
          mt="auto"
          pt={1}
          justify="space-between"
          align="center"
          as="footer"
        >
          <ContractPublisher
            addressOrEns={publishedContractResult.data?.publisher}
            showSkeleton={showSkeleton}
          />
          <Flex
            align="center"
            gap={4}
            color="rgba(255,255,255,.7)"
            _light={{ color: "rgba(0,0,0,.6)" }}
          >
            {(showSkeleton || publishedContractResult.data?.audit) && (
              <Flex
                isExternal
                as={Link}
                align="center"
                gap={0.5}
                href={replaceIpfsUrl(publishedContractResult.data?.audit || "")}
                _hover={{
                  _dark: {
                    color: "green.300",
                  },
                  _light: {
                    color: "green.500",
                  },
                }}
              >
                <Skeleton boxSize={5} isLoaded={!showSkeleton}>
                  <Icon as={BsShieldCheck} />
                </Skeleton>
                <Skeleton isLoaded={!showSkeleton}>
                  <Text color="inherit" size="label.sm" fontWeight={500}>
                    Audited
                  </Text>
                </Skeleton>
              </Flex>
            )}
            {(showSkeleton || publishedContractResult.data?.version) && (
              <Flex align="center" gap={0.5}>
                <Skeleton boxSize={5} isLoaded={!showSkeleton}>
                  <Icon as={VscVersions} />
                </Skeleton>
                <Skeleton isLoaded={!showSkeleton}>
                  <Text color="inherit" size="label.sm" fontWeight={500}>
                    {publishedContractResult.data?.version}
                  </Text>
                </Skeleton>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Card>
    </LinkBox>
  );
};

// data fetching
export type PublishedContractId = `${string}/${string}`;

async function queryFn(
  publisher: string,
  contractId: string,
  queryClient: QueryClient,
) {
  // polygon is chainID 137
  const polygonSdk = getEVMThirdwebSDK(137);

  const publisherEns = await queryClient.fetchQuery(ensQuery(publisher));
  // START prefill both publisher ens variations
  if (publisherEns.address) {
    queryClient.setQueryData(
      ensQuery(publisherEns.address).queryKey,
      publisherEns,
    );
  }
  if (publisherEns.ensName) {
    queryClient.setQueryData(
      ensQuery(publisherEns.ensName).queryKey,
      publisherEns,
    );
  }
  // END prefill both publisher ens variations
  invariant(publisherEns.address, "publisher address not found");
  const latestPublishedVersion = await polygonSdk
    .getPublisher()
    .getLatest(publisherEns.address, contractId);
  invariant(latestPublishedVersion, "no release found");
  const contractInfo = await polygonSdk
    .getPublisher()
    .fetchPublishedContractInfo(latestPublishedVersion);

  // const publishMetadata = await fetchContractPublishMetadataFromURI(
  //   latestPublishedVersion.metadataUri,
  // );

  return {
    ...latestPublishedVersion,
    ...contractInfo.publishedMetadata,
    // detectedExtensions: extractExtensions(
    //   detectFeatures(publishMetadata.abi || []),
    // ).enabledExtensions.map((extension) => ({
    //   name: extension.name,
    //   docLinks: extension.docLinks,
    //   namespace: extension.namespace,
    // })),
    publishedContractId: `${publisher}/${contractId}`,
  };
}

export function publishedContractQuery(
  publishedContractId: PublishedContractId,
  queryClient: QueryClient,
) {
  const [publisher, contractId] = publishedContractId.split("/");
  return {
    queryKey: ["published-contract", { publisher, contractId }],
    queryFn: () => queryFn(publisher, contractId, queryClient),
    enabled: !!publisher || !!contractId,
    placeholderData: {
      publishedContractId,
      version: "0.0.0",
      name: "Loading...",
      description: "Loading...",
      publisher: "",
      audit: "",
      logo: "",
      detectedExtensions: [],
      id: "",
      metadataUri: "",
      timestamp: "",
      bytecodeUri: "",
    } as PublishedContract,
  };
}

export type PublishedContract = Awaited<ReturnType<typeof queryFn>>;

export function usePublishedContract(publishedContractId: PublishedContractId) {
  const queryClient = useQueryClient();
  return useQuery(publishedContractQuery(publishedContractId, queryClient));
}
