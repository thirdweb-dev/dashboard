import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  Box,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";
import { ChainId, SUPPORTED_CHAIN_ID } from "@thirdweb-dev/sdk/evm";
import { AppLayout } from "components/app-layouts/app";
import { ConfigureNetworks } from "components/configure-networks/ConfigureNetworks";
import { configuredNetworkListCookieKey } from "components/configure-networks/constants";
import { ConfiguredNetworkInfo } from "components/configure-networks/types";
import { networkNameToUrlFriendlyName } from "components/configure-networks/utils";
import {
  ensQuery,
  fetchAllVersions,
  fetchContractPublishMetadataFromURI,
  fetchReleasedContractInfo,
  releaserProfileQuery,
} from "components/contract-components/hooks";
import {
  ReleaseWithVersionPage,
  ReleaseWithVersionPageProps,
} from "components/pages/release";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import { ContractTabRouter } from "contract-ui/layout/tab-router";
// import { getAllExploreReleases } from "data/explore";
import {
  isPossibleEVMAddress,
  isPossibleSolanaAddress,
} from "lib/address-utils";
import { getEVMThirdwebSDK } from "lib/sdk";
import { GetServerSideProps, InferGetStaticPropsType } from "next";
// import dynamic from "next/dynamic";
import { PageId } from "page-id";
import type { ParsedUrlQuery } from "querystring";
import { ReactElement, useRef, useState } from "react";
import { Button, Heading, Text } from "tw-components";
import {
  DashboardSolanaNetwork,
  SupportedChainIdToNetworkMap,
  SupportedNetwork,
  SupportedNetworkToChainIdMap,
  getChainIdFromNetworkPath,
  getSolNetworkFromNetworkPath,
  isSupportedSOLNetwork,
} from "utils/network";
import { getSingleQueryValue } from "utils/router";
import { ThirdwebNextPage } from "utils/types";

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

const CatchAllPage: ThirdwebNextPage = (
  props: Awaited<InferGetStaticPropsType<typeof getServerSideProps>>,
) => {
  const [isNetworkConfigured, setIsNetworkConfigured] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [shouldContinueToContract, setShouldContinueToContract] =
    useState(false);

  if (props.pageType === "contract") {
    const isUnknownContract = props.chainId === -1;
    // this means that we don't the chainId because network is unknown
    // we can also check the cookies to do the same thing ( check if props.network is in the configured-network-list cookie array)
    // user needs to configure this network
    if (isUnknownContract && !shouldContinueToContract) {
      return (
        <HomepageSection>
          <Box mb={8} mt={8}>
            {isNetworkConfigured ? (
              <Flex justifyContent="center" my={10}>
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    setShouldContinueToContract(true);
                  }}
                >
                  {" "}
                  Continue to Contract{" "}
                </Button>
              </Flex>
            ) : (
              <Alert borderRadius="md" background="backgroundHighlight">
                <AlertIcon />
                You tried to connecting to {`"`}
                {props.network}
                {`"`} network but it is not configured yet. Please configure it
                and try again.
              </Alert>
            )}
          </Box>

          <Box
            border="2px solid"
            borderColor="whiteAlpha.50"
            borderRadius="lg"
            overflow="hidden"
          >
            <ConfigureNetworks
              onNetworkConfigured={(network) => {
                if (
                  networkNameToUrlFriendlyName(network.name) === props.network
                ) {
                  setIsNetworkConfigured(true);
                  onOpen();
                }
              }}
            />
          </Box>

          {/* Show Alert Dialog when user configures the required network */}
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader>Awesome!</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                You have configured the required network. <br />
                Continue to the contract page?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  No
                </Button>
                <Button
                  colorScheme="blue"
                  ml={3}
                  onClick={() => {
                    setShouldContinueToContract(true);
                  }}
                >
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </HomepageSection>
      );
    }

    return (
      <ContractTabRouter
        address={props.contractAddress}
        ecosystem="evm"
        network={props.network}
        chainId={props.chainId}
      />
    );
  }
  if (props.pageType === "program") {
    return (
      <ContractTabRouter
        address={props.programAddress}
        ecosystem="solana"
        network={props.network}
      />
    );
  }

  // Todo: pass chainId here?
  if (props.pageType === "release") {
    return (
      <PublisherSDKContext>
        <ReleaseWithVersionPage
          author={props.author}
          contractName={props.contractName}
          version={props.version}
        />
      </PublisherSDKContext>
    );
  }
  return null;
};

// const AppLayout = dynamic(
//   async () => (await import("components/app-layouts/app")).AppLayout,
// );

CatchAllPage.getLayout = function (
  page: ReactElement,
  props: Awaited<InferGetStaticPropsType<typeof getServerSideProps>>,
) {
  return (
    <AppLayout
      layout={props.pageType !== "release" ? "custom-contract" : undefined}
      dehydratedState={props.dehydratedState}
    >
      {page}
    </AppLayout>
  );
};

CatchAllPage.pageId = (
  props: Awaited<InferGetStaticPropsType<typeof getServerSideProps>>,
) => {
  if (props.pageType === "contract") {
    return PageId.DeployedContract;
  }
  if (props.pageType === "program") {
    return PageId.DeployedProgram;
  }
  if (props.pageType === "release") {
    return PageId.ReleasedContract;
  }

  return PageId.Unknown;
};

export default CatchAllPage;

type PossiblePageProps =
  | ({
      pageType: "release";
      dehydratedState: DehydratedState;
    } & ReleaseWithVersionPageProps)
  | {
      pageType: "contract";
      contractAddress: string;
      network: string;
      chainId: SUPPORTED_CHAIN_ID | -1;
      dehydratedState: DehydratedState;
    }
  | {
      pageType: "program";
      programAddress: string;
      network: DashboardSolanaNetwork;
      dehydratedState: DehydratedState;
    };

interface Params extends ParsedUrlQuery {
  networkOrAddress: string;
  catchAll: string[];
}

export const getServerSideProps: GetServerSideProps<
  PossiblePageProps,
  Params
> = async (ctx) => {
  // TODO
  // increase cache time for pages that don't update often
  // https://nextjs.org/docs/going-to-production
  //  res.setHeader(
  //    "Cache-Control",
  //    "public, s-maxage=86400, stale-while-revalidate=59",
  //  );

  const customNetworkListCookieStr =
    ctx.req.cookies[configuredNetworkListCookieKey];

  const networkOrAddress = getSingleQueryValue(
    ctx.params,
    "networkOrAddress",
  ) as string;

  // handle old contract paths
  if (networkOrAddress === "contracts") {
    return {
      redirect: {
        destination: "/explore",
        permanent: false,
      },
    };
  }
  // handle old dashboard urls
  if (networkOrAddress === "dashboard") {
    const pathSegments = ctx.params?.catchAll as string[];

    const destination = pathSegments.join("/");

    return {
      redirect: {
        destination: `/${destination}`,
        permanent: false,
      },
    };
  }
  // handle old contract urls
  if (networkOrAddress === "contracts") {
    const pathSegments = ctx.params?.catchAll as string[];

    const destination = pathSegments.join("/").replace("/latest", "");
    return {
      redirect: {
        destination: `/${destination}`,
        permanent: false,
      },
    };
  }

  // handle deployer.thirdweb.eth urls
  if (networkOrAddress === "deployer.thirdweb.eth") {
    const pathSegments = ctx.params?.catchAll as string[];

    return {
      redirect: {
        destination: `/thirdweb.eth/${pathSegments.join("/")}`,
        permanent: true,
      },
    };
  }

  const queryClient = new QueryClient();

  // handle the case where the user is trying to access a EVM contract

  // network is a configured network if it is in the customNetworkListCookie
  let isConfiguredNetwork = false;
  let configuredChainId = -1;

  if (customNetworkListCookieStr) {
    try {
      const customNetworkListCookie = JSON.parse(
        customNetworkListCookieStr,
      ) as ConfiguredNetworkInfo[];

      for (const network of customNetworkListCookie) {
        const urlFriendlyName = networkNameToUrlFriendlyName(network.name);
        if (urlFriendlyName === networkOrAddress) {
          isConfiguredNetwork = true;
          configuredChainId = network.chainId;
          break;
        }
      }
    } catch (e) {
      // ignore
    }
  }

  // if `networkOrAddress` is a supported network or a configured network
  if (isConfiguredNetwork || networkOrAddress in SupportedNetworkToChainIdMap) {
    const [contractAddress] = ctx.params?.catchAll as string[];

    if (isPossibleEVMAddress(contractAddress)) {
      await queryClient.prefetchQuery(ensQuery(contractAddress));

      return {
        props: {
          dehydratedState: dehydrate(queryClient),
          pageType: "contract",
          contractAddress: contractAddress as string,
          network: networkOrAddress,
          chainId: isConfiguredNetwork
            ? configuredChainId
            : (getChainIdFromNetworkPath(
                networkOrAddress as SupportedNetwork,
              ) as SUPPORTED_CHAIN_ID),
        },
      };
    }
  }

  // support using chain-id instead of network name
  // redirect /<chain-id>/... to /<network>/...

  // if `networkOrAddress` is a supported chain-id
  if (networkOrAddress in SupportedChainIdToNetworkMap) {
    // get the network name from the chain-id
    const chainId = Number(networkOrAddress) as SUPPORTED_CHAIN_ID;
    const network = SupportedChainIdToNetworkMap[chainId];

    // get the rest of the path
    const catchAll = ctx.params?.catchAll;
    const rest = catchAll ? `/${catchAll.join("/")}` : "";

    return {
      redirect: {
        destination: `/${network}${rest}`,
        permanent: false,
      },
    };
  }

  // handle the case where the user is trying to access a solana contract
  else if (isSupportedSOLNetwork(networkOrAddress)) {
    const network = getSolNetworkFromNetworkPath(networkOrAddress);
    if (!network) {
      return {
        notFound: true,
      };
    }
    const [programAddress] = ctx.params?.catchAll as (string | undefined)[];
    if (isPossibleSolanaAddress(programAddress)) {
      // lets get the program type and metadata right here
      // TODO this would be great if it was fast, but alas it is slow af!
      // const solSDK = getSOLThirdwebSDK(network);
      // const program = await queryClient.fetchQuery(
      //   programQuery(queryClient, solSDK, programAddress),
      // );
      // await queryClient.prefetchQuery(programMetadataQuery(program));
      return {
        props: {
          dehydratedState: dehydrate(queryClient, {
            shouldDehydrateQuery: (query) =>
              // TODO this should use the util function, but for some reason it doesn't work
              !query.queryHash.includes("-instance"),
          }),
          pageType: "program",
          programAddress: programAddress as string,
          network: networkOrAddress as DashboardSolanaNetwork,
        },
      };
    }
  } else if (isPossibleEVMAddress(networkOrAddress)) {
    const polygonSdk = getEVMThirdwebSDK(ChainId.Polygon);
    // we're in release world
    const [contractName, version = ""] = ctx.params?.catchAll as (
      | string
      | undefined
    )[];

    if (contractName) {
      const { address, ensName } = await queryClient.fetchQuery(
        ensQuery(networkOrAddress),
      );

      if (!address) {
        return {
          notFound: true,
        };
      }

      // TODO get the latest version instead of all versions
      // OR wait till contract upgrade to have a faster call for this
      const allVersions = await queryClient.fetchQuery(
        ["all-releases", address, contractName],
        () => fetchAllVersions(polygonSdk, address, contractName),
      );

      const release =
        allVersions.find((v) => v.version === version) || allVersions[0];

      const ensQueries = [queryClient.prefetchQuery(ensQuery(address))];
      if (ensName) {
        ensQueries.push(queryClient.prefetchQuery(ensQuery(ensName)));
      }

      await Promise.all([
        ...ensQueries,
        queryClient.prefetchQuery(["released-contract", release], () =>
          fetchReleasedContractInfo(polygonSdk, release),
        ),
        queryClient.prefetchQuery(
          ["publish-metadata", release.metadataUri],
          () => fetchContractPublishMetadataFromURI(release.metadataUri),
        ),
        queryClient.prefetchQuery(releaserProfileQuery(release.releaser)),
      ]);

      return {
        props: {
          dehydratedState: dehydrate(queryClient),
          pageType: "release",
          author: networkOrAddress,
          contractName,
          version,
        },
      };
    }
  }

  // if nothing matches above,
  // if the request is for showing the contract details for an unknown network
  // we show the contract details page anyway instead of 404
  // that page will show the option to configure the network
  const catchAll = ctx.params?.catchAll;
  const maybeEVMContract = catchAll && catchAll[0].startsWith("0x");
  const [contractAddress] = ctx.params?.catchAll as string[];

  if (maybeEVMContract) {
    return {
      props: {
        // Question: do we need to dehydrate the queryClient here?
        dehydratedState: dehydrate(queryClient),
        pageType: "contract",
        contractAddress,
        network: networkOrAddress,
        // we don't know the chainId
        chainId: -1,
      },
    };
  }

  return {
    notFound: true,
  };
};

// Removed because we can't use it with getServerSideProps

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     fallback: true,
//     paths: generateBuildTimePaths(),
//   };
// };

// function generateBuildTimePaths() {
//   const paths = getAllExploreReleases();
//   return paths.map((path) => {
//     const [networkOrAddress, contractId] = path.split("/");
//     return {
//       params: {
//         networkOrAddress,
//         catchAll: [contractId],
//       },
//     };
//   });
// }
