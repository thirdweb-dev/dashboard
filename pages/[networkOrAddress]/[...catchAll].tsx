import { ActiveNetworkInfoContext } from "@3rdweb-sdk/react";
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
import { ChainId } from "@thirdweb-dev/sdk/evm";
import { AppLayout } from "components/app-layouts/app";
import { ConfigureNetworks } from "components/configure-networks/ConfigureNetworks";
import { configuredNetworkListCookieKey } from "components/configure-networks/cookies";
import { ConfiguredNetworkInfo } from "components/configure-networks/types";
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
import { EVM_RPC_URL_MAP } from "constants/rpc";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import { ContractTabRouter } from "contract-ui/layout/tab-router";
import cookie from "cookie";
// import { getAllExploreReleases } from "data/explore";
import {
  isPossibleEVMAddress,
  isPossibleSolanaAddress,
} from "lib/address-utils";
import { getEVMThirdwebSDK } from "lib/sdk";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from "next";
import { useRouter } from "next/router";
// import dynamic from "next/dynamic";
import { PageId } from "page-id";
import type { ParsedUrlQuery } from "querystring";
import { ReactElement, useRef, useState } from "react";
import { Button } from "tw-components";
import { ChainListRecord, getChainListRecords } from "types/chainlist";
import {
  DashboardSolanaNetwork,
  SupportedNetworkToChainIdMap,
  getSolNetworkFromNetworkPath,
  isShortNameSupportedNetwork,
  isSupportedSOLNetwork,
  supportedNetworkNameToShortNameRecord,
} from "utils/network";
import { getSingleQueryValue } from "utils/router";
import { ThirdwebNextPage } from "utils/types";

// #region types
type ContractPageProps = {
  pageType: "contract";
  contractAddress: string;
  network: string;
  chainId: number;
  rpcUrl: string;
  dehydratedState: DehydratedState;
};

type SolanaProgramPageProps = {
  pageType: "program";
  programAddress: string;
  network: DashboardSolanaNetwork;
  dehydratedState: DehydratedState;
};

type ReleasePageProps = {
  pageType: "release";
  dehydratedState: DehydratedState;
} & ReleaseWithVersionPageProps;

type PossiblePageProps =
  | ReleasePageProps
  | ContractPageProps
  | SolanaProgramPageProps;

interface Params extends ParsedUrlQuery {
  networkOrAddress: string;
  catchAll: string[];
}

interface ConfigureNetworkSectionProps {
  unknownNetworkName: string;
  continue: () => void;
}
// #endregion

// ---------------------------------------------

// #region Client Side
const CatchAllPage: ThirdwebNextPage = (props: PossiblePageProps) => {
  const [shouldContinue, setShouldContinue] = useState(false);
  const router = useRouter();

  // Note:
  // currently this is redundant because we are doing SSR not SSG with fallback
  // but probably will switch back to SSG, so keeping this around
  // if (router.isFallback) {
  //   return (
  //     <Flex h="100%" justifyContent="center" alignItems="center">
  //       <Spinner size="xl" />
  //     </Flex>
  //   );
  // }

  if (props.pageType === "contract") {
    const isUnknownNetwork = props.chainId === -1;
    if (isUnknownNetwork && !shouldContinue) {
      return (
        <ConfigureNetworkSection
          unknownNetworkName={props.network}
          continue={() => {
            setShouldContinue(true);
          }}
        />
      );
    }

    return (
      <ContractTabRouter
        address={props.contractAddress}
        ecosystem="evm"
        network={props.network}
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
    if (router.isFallback) {
      return <div>Release page is loading</div>;
    }
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

/**
 * Show this section to configure the network
 * when we can't find the network in the user's cookie or chain list
 */
const ConfigureNetworkSection: React.FC<ConfigureNetworkSectionProps> = (
  props,
) => {
  const [isNetworkConfigured, setIsNetworkConfigured] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <HomepageSection>
      <Box mb={8} mt={8}>
        {isNetworkConfigured ? (
          <Flex justifyContent="center" my={10}>
            <Button colorScheme="blue" onClick={props.continue}>
              Continue to Contract
            </Button>
          </Flex>
        ) : (
          <Alert borderRadius="md" background="backgroundHighlight">
            <AlertIcon />
            You tried to connecting to {`"`}
            {props.unknownNetworkName}
            {`"`} network but it is not configured yet. Please configure it and
            try again.
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
            if (network.shortName === props.unknownNetworkName) {
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
            <Button colorScheme="blue" ml={3} onClick={props.continue}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </HomepageSection>
  );
};

CatchAllPage.getLayout = function (
  page: ReactElement,
  props: PossiblePageProps,
) {
  const layout = (
    <AppLayout
      layout={props.pageType !== "release" ? "custom-contract" : undefined}
      dehydratedState={props.dehydratedState}
    >
      {page}
    </AppLayout>
  );

  if ("chainId" in props) {
    return (
      <ActiveNetworkInfoContext.Provider
        value={{
          network: props.network,
          chainId: props.chainId,
          rpcUrl: props.rpcUrl,
        }}
      >
        {layout}
      </ActiveNetworkInfoContext.Provider>
    );
  }

  return layout;
};

CatchAllPage.pageId = (props: PossiblePageProps) => {
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
// #endregion

// ---------------------------------------------

// #region Server Side

// server only chainList record
let shortNameToNetworkInfo: ChainListRecord = {};
let chainIdToNetworkInfo: ChainListRecord = {};
if (typeof window === "undefined") {
  const records = getChainListRecords();
  shortNameToNetworkInfo = records.shortNameToNetworkInfo;
  chainIdToNetworkInfo = records.chainIdToNetworkInfo;
}

export const getServerSideProps: GetServerSideProps<
  PossiblePageProps,
  Params
> = async (ctx) => {
  // TODO - increase cache time for pages that don't update often

  // params ----------------------------
  const networkOrAddress = getSingleQueryValue(
    ctx.params,
    "networkOrAddress",
  ) as string;

  const catchAll = ctx.params?.catchAll as string[];

  // handle routes ----------------------------

  // handle old routes and redirect to new routes
  const legacyHandled = handleLegacyRoutes(networkOrAddress, catchAll);
  if (legacyHandled) {
    return legacyHandled;
  }

  // View Solana contract
  if (isSupportedSOLNetwork(networkOrAddress)) {
    const handled = handleSolanaContract(networkOrAddress, catchAll);
    if (handled) {
      return handled;
    }
  }

  // View EVM Contract Page
  // thirdweb.com/<network>/<evm-address>
  // thirdweb.com/<chainId>/<evm-address>
  if (isPossibleEVMAddress(catchAll[0])) {
    // thirdweb.com/<chainId>/<evm-address>
    const redirected = handleChainIdToNetworkSlugRedirect(
      networkOrAddress,
      catchAll,
    );

    if (redirected) {
      return redirected;
    }

    // thirdweb.com/<network>/<evm-address>
    const handled = await handleEVMContractPageRoute(
      ctx,
      networkOrAddress,
      catchAll[0],
    );

    if (handled) {
      return handled;
    }
  }

  // Release Page
  // thirdweb.com/<evm-address>/<contract-name>/<version?>
  else if (isPossibleEVMAddress(networkOrAddress)) {
    const handled = await handleReleasePageRoute(networkOrAddress, catchAll);
    if (handled) {
      return handled;
    }
  }

  return {
    notFound: true,
  };
};

// ---------------------------------------------

// #region route handlers

function handleLegacyRoutes(networkOrAddress: string, catchAll: string[]) {
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
    const destination = catchAll.join("/");
    return {
      redirect: {
        destination: `/${destination}`,
        permanent: false,
      },
    };
  }

  // handle old contract urls
  if (networkOrAddress === "contracts") {
    const destination = catchAll.join("/").replace("/latest", "");
    return {
      redirect: {
        destination: `/${destination}`,
        permanent: false,
      },
    };
  }

  // handle deployer.thirdweb.eth urls
  if (networkOrAddress === "deployer.thirdweb.eth") {
    return {
      redirect: {
        destination: `/thirdweb.eth/${catchAll.join("/")}`,
        permanent: true,
      },
    };
  }

  // redirect old network names to new short names
  // ex: /ethereum/... to /eth/...
  if (networkOrAddress in SupportedNetworkToChainIdMap) {
    const networkShortName =
      supportedNetworkNameToShortNameRecord[
        networkOrAddress as keyof typeof supportedNetworkNameToShortNameRecord
      ];

    return {
      redirect: {
        destination: `/${networkShortName}/${catchAll.join("/")}`,
        permanent: false,
      },
    };
  }
}

/**
 * thirdweb.com/<network>/<evm-address>
 */
async function handleEVMContractPageRoute(
  ctx: GetServerSidePropsContext<Params, PreviewData>,
  networkShortName: string,
  contractAddress: string,
) {
  // check if the network is configured in user's cookie
  const configuredNetworkListCookieString =
    ctx.req.cookies[configuredNetworkListCookieKey];

  let configuredNetwork: ConfiguredNetworkInfo | undefined;
  let configuredNetworkList: ConfiguredNetworkInfo[] = [];
  let cookieParsingFailed = false;

  // if configured-network-list cookie is set
  // try to resolve the network from the cookie first
  if (configuredNetworkListCookieString) {
    // try parsing it
    try {
      // get list of configured networks
      configuredNetworkList = JSON.parse(
        configuredNetworkListCookieString,
      ) as ConfiguredNetworkInfo[];

      // find the network in the list
      for (const network of configuredNetworkList) {
        if (network.shortName === networkShortName) {
          // if found, save it
          configuredNetwork = network;
          break;
        }
      }
    } catch (e) {
      // declare that parsing failed
      cookieParsingFailed = true;
    }
  }

  // if the network is configured in the user's cookie
  // or present in the chain list
  if (configuredNetwork || networkShortName in shortNameToNetworkInfo) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(ensQuery(contractAddress));

    // if network configured in cookie, use that chainId
    // else use chainId from chain list
    const chainId = configuredNetwork
      ? configuredNetwork.chainId
      : shortNameToNetworkInfo[networkShortName].chainId;

    // if network configured in cookie, use that rpcUrl
    // else use rpcUrl from chain list or our own rpc based on network
    const rpcUrl = configuredNetwork
      ? configuredNetwork.rpcUrl
      : shortNameToNetworkInfo[networkShortName].rpc[0];

    const props: ContractPageProps = {
      dehydratedState: dehydrate(queryClient),
      pageType: "contract",
      contractAddress: contractAddress as string,
      network: networkShortName,
      chainId,
      rpcUrl,
    };

    // update cookie if network was not resolved from cookie
    // and if cookie was parsed successfully
    // and if the network is not a default supported network
    if (
      !configuredNetwork &&
      !cookieParsingFailed &&
      !isShortNameSupportedNetwork(networkShortName)
    ) {
      const network = shortNameToNetworkInfo[networkShortName];

      // add network to cookie
      configuredNetworkList.push({
        name: network.name,
        chainId,
        rpcUrl,
        shortName: network.shortName,
        currencySymbol: network.nativeCurrency.symbol,
      });

      ctx.res.setHeader(
        "Set-Cookie",
        cookie.serialize(
          configuredNetworkListCookieKey,
          JSON.stringify(configuredNetworkList),
          {
            // need to ready this cookie with js
            httpOnly: false,
            secure: true,
            // 90 days
            maxAge: 60 * 60 * 24 * 90,
            sameSite: "strict",
          },
        ),
      );
    }

    return {
      props,
    };
  }

  // if we can't resolve the network from the cookie or the chain list
  // treat it as "unknown" and let the user configure it on frontend
  const queryClient = new QueryClient();
  const props: ContractPageProps = {
    // Question: do we need to dehydrate the queryClient here?
    dehydratedState: dehydrate(queryClient),
    pageType: "contract",
    contractAddress,
    network: networkShortName,
    // unknown
    chainId: -1,
    rpcUrl: "",
  };

  return {
    props,
  };
}

/**
 * thirdweb.com/<chain-id>/<evm-address>
 */
function handleChainIdToNetworkSlugRedirect(
  networkSlug: string,
  catchAll: string[],
) {
  if (networkSlug in chainIdToNetworkInfo) {
    const networkInfo = chainIdToNetworkInfo[networkSlug];
    return {
      redirect: {
        destination: `/${networkInfo.shortName}/${catchAll.join("/")}`,
        permanent: false,
      },
    };
  }
}

/**
 * thirdweb.com/<sol-network>/<sol-program-address>
 */
function handleSolanaContract(networkSlug: string, catchAll: string[]) {
  const solNetwork = getSolNetworkFromNetworkPath(networkSlug);

  if (!solNetwork) {
    return {
      notFound: true,
    } as const;
  }

  const [programAddress] = catchAll;

  if (isPossibleSolanaAddress(programAddress)) {
    // lets get the program type and metadata right here
    // TODO this would be great if it was fast, but alas it is slow af!
    // const solSDK = getSOLThirdwebSDK(network);
    // const program = await queryClient.fetchQuery(
    //   programQuery(queryClient, solSDK, programAddress),
    // );
    // await queryClient.prefetchQuery(programMetadataQuery(program));
    const queryClient = new QueryClient();

    const props: SolanaProgramPageProps = {
      dehydratedState: dehydrate(queryClient, {
        shouldDehydrateQuery: (query) =>
          // TODO this should use the util function, but for some reason it doesn't work
          !query.queryHash.includes("-instance"),
      }),
      pageType: "program",
      programAddress: programAddress as string,
      network: networkSlug as DashboardSolanaNetwork,
    };

    return {
      props,
    };
  }
}

/**
 * thirdweb.com/<evm-address>/<contract-name>/<version?>
 */
async function handleReleasePageRoute(
  authorAddress: string,
  catchAll: string[],
) {
  const [contractName, version = ""] = catchAll;

  if (contractName) {
    const polygonSdk = getEVMThirdwebSDK(
      ChainId.Polygon,
      EVM_RPC_URL_MAP[ChainId.Polygon],
    );

    const queryClient = new QueryClient();
    const { address, ensName } = await queryClient.fetchQuery(
      ensQuery(authorAddress),
    );

    if (!address) {
      return {
        notFound: true,
      } as const;
    }

    // TODO get the latest version instead of all versions
    // OR wait till contract upgrade to have a faster call for this

    let allVersions: ReturnType<typeof fetchAllVersions> extends Promise<
      infer X
    >
      ? X
      : never = [];
    try {
      allVersions = await queryClient.fetchQuery(
        ["all-releases", address, contractName],
        () => fetchAllVersions(polygonSdk, address, contractName),
      );
    } catch (error) {
      return {
        notFound: true,
      } as const;
    }

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
      queryClient.prefetchQuery(["publish-metadata", release.metadataUri], () =>
        fetchContractPublishMetadataFromURI(release.metadataUri),
      ),
      queryClient.prefetchQuery(releaserProfileQuery(release.releaser)),
    ]);

    const props: ReleasePageProps = {
      dehydratedState: dehydrate(queryClient),
      pageType: "release",
      author: authorAddress,
      contractName,
      version,
    };

    return {
      props,
    };
  }
}

// #endregion

// #endregion

// ---------------------------------------------

// TODO
//  increase the cache for the static pages in getServerSideProps
// or generate statically with middleware??

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
