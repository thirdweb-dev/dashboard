import {
  AspectRatio,
  Flex,
  FlexProps,
  Icon,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { QueryClient } from "@tanstack/query-core";
import { dehydrate, useQueries, useQueryClient } from "@tanstack/react-query";
import { ChainId, detectFeatures } from "@thirdweb-dev/sdk/evm";
import { AppLayout } from "components/app-layouts/app";
import {
  ens,
  ensQuery,
  extractExtensions,
  fetchContractPublishMetadataFromURI,
  releaserProfileQuery,
  useEns,
} from "components/contract-components/hooks";
import {
  ReleaserAvatar,
  ReleaserAvatarProps,
} from "components/contract-components/releaser/masked-avatar";
import { GettingStartedBox } from "components/getting-started/box";
import { GettingStartedCard } from "components/getting-started/card";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import { getEVMThirdwebSDK, replaceIpfsUrl } from "lib/sdk";
import { GetStaticProps } from "next";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "pages/_app";
import { ReactElement } from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { FiArrowRight, FiChevronsRight } from "react-icons/fi";
import { VscVerified } from "react-icons/vsc";
import invariant from "tiny-invariant";
import {
  Card,
  CodeBlock,
  Heading,
  Link,
  LinkButton,
  Text,
  TextProps,
  TrackedLink,
} from "tw-components";
import { shortenIfAddress } from "utils/usedapp-external";

const RENDER_CATEGORIES: Array<{
  title: string;
  description: string;
  releases: ReleaseQueryInfo[];
}> = [
  {
    title: "Popular",
    description: "Contracts that are popular among the community.",
    releases: [
      "deployer.thirdweb.eth/DropERC721",
      "deployer.thirdweb.eth/Marketplace",
      "unlock-protocol.eth/PublicLock",
    ],
  },
  {
    title: "ERC721",
    description: "Contracts that are based on the ERC721 standard.",
    releases: [
      "deployer.thirdweb.eth/Multiwrap",
      "deployer.thirdweb.eth/TokenERC721",
      "deployer.thirdweb.eth/SignatureDrop",
      "deployer.thirdweb.eth/DropERC721",
      "flairsdk.eth/ERC721CommunityStream",
      "unlock-protocol.eth/PublicLock",
      "doubledev.eth/ERC4907",
    ],
  },
  {
    title: "ERC1155",
    description: "Contracts that are based on the ERC1155 standard.",
    releases: [
      "deployer.thirdweb.eth/DropERC1155",
      "deployer.thirdweb.eth/TokenERC1155",
      "deployer.thirdweb.eth/Pack",
    ],
  },
  {
    title: "ERC20",
    description: "Contracts that are based on the ERC20 standard.",
    releases: [
      "deployer.thirdweb.eth/TokenERC20",
      "deployer.thirdweb.eth/DropERC20",
      "deployer.thirdweb.eth/VoteERC20",
    ],
  },
  {
    title: "Other",
    description: "Contracts that are not based on a specific standard.",
    releases: [
      "deployer.thirdweb.eth/Marketplace",
      "deployer.thirdweb.eth/Split",
      "deployer.thirdweb.eth/VoteERC20",
    ],
  },
];

const CONTRACTS_TO_LOAD = RENDER_CATEGORIES.reduce(
  (acc, { releases }) => [...acc, ...releases],
  [] as ReleaseQueryInfo[],
);

function filterExists<T>(item: T | undefined): item is T {
  return !!item;
}

const Contracts: ThirdwebNextPage = () => {
  // const walletAddress = useAddress();
  // const releasedContractsQuery = usePublishedContractsQuery(walletAddress);

  // const prebuiltContracts = Object.values(BuiltinContractMap).filter(
  //   (contract) => contract.contractType !== "custom",
  // );
  // const releasedContracts = useMemo(
  //   () => releasedContractsQuery.data || [],
  //   [releasedContractsQuery],
  // );

  // const allContracts = useMemo(
  //   () => [...releasedContracts, ...prebuiltContracts],

  //   [prebuiltContracts, releasedContracts],
  // );

  const releasesQueries = useReleases(CONTRACTS_TO_LOAD);

  const categoriesWithQueries = RENDER_CATEGORIES.map((category) => ({
    ...category,
    releases: category.releases
      .map((release) => {
        return releasesQueries.find(
          (query) => query.data?.releasePath === release,
        );
      })
      .filter(filterExists),
  }));
  return (
    <Flex gap={8} direction="column">
      <GettingStartedBox
        title="Begin your journey with building contracts"
        description="Which best describes your contract needs?"
        storageId="contract"
      >
        <GettingStartedCard
          title="I want to get started with a prebuilt contract"
          description={
            <>
              Browse our selection of secure, gas-optimized, and audited
              contracts that are ready to be deployed with one-click.
            </>
          }
          icon={require("public/assets/product-icons/contracts.png")}
          linkProps={{
            category: "getting-started",
            label: "browse-contracts",
            href: "#release-contract-table",
            children: (
              <>
                Get Started <Icon as={FiArrowRight} />
              </>
            ),
          }}
        />
        <GettingStartedCard
          title="I want to build my own customized contract"
          description={
            <>
              Get started with <b>ContractKit</b> to create custom contracts
              that is specific to your use case.
            </>
          }
          icon={require("public/assets/product-icons/extensions.png")}
          linkProps={{
            category: "getting-started",
            label: "custom-contracts",
            href: "https://portal.thirdweb.com/contractkit",
            isExternal: true,
            children: (
              <>
                View Docs <Icon as={FiArrowRight} />
              </>
            ),
          }}
        />
        <GettingStartedCard
          title="I already have an existing contract"
          description={
            <>
              You are ready to deploy your contract with our interactive{" "}
              <b>CLI</b>.
            </>
          }
          icon={require("public/assets/product-icons/deploy.png")}
        >
          <CodeBlock
            mt="auto"
            language="bash"
            code="npx thirdweb@latest deploy"
          />
        </GettingStartedCard>
      </GettingStartedBox>
      <Heading id="release-contract-table" size="title.lg">
        Contracts
      </Heading>
      {/* <Text fontStyle="italic">
        A combination of our{" "}
        <TrackedLink
          category="contracts"
          label="pre-built"
          href="https://portal.thirdweb.com/pre-built-contracts"
          isExternal
          color="primary.500"
        >
          prebuilt contracts
        </TrackedLink>{" "}
        and your{" "}
        <TrackedLink
          category="contracts"
          label="released"
          href="https://portal.thirdweb.com/release"
          isExternal
          color="primary.500"
        >
          released contracts
        </TrackedLink>
        . Not sure which contract is right for your use-case?{" "}
        <TrackedLink
          category="contracts"
          label="take-quiz"
          href="https://portal.thirdweb.com/pre-built-contracts/choosing-the-right-pre-built-contract"
          isExternal
          color="primary.500"
        >
          Help me choose.
        </TrackedLink>
      </Text> */}

      {categoriesWithQueries.map((category) => (
        <Flex gap={6} direction="column" key={category.title}>
          <Flex direction="column">
            <Heading size="subtitle.lg">{category.title}</Heading>
            <Text>{category.description}</Text>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            {category.releases.map((release, idx) => (
              <ReleaseCard
                key={`community_release_${idx}`}
                releaseQuery={release}
              />
            ))}
          </SimpleGrid>
        </Flex>
      ))}
    </Flex>
  );
};

Contracts.getLayout = (page: ReactElement) => (
  <AppLayout>
    <PublisherSDKContext>{page}</PublisherSDKContext>
  </AppLayout>
);

Contracts.pageId = PageId.Contracts;

export default Contracts;

interface ReleaseCardProps {
  releaseQuery: ReturnType<typeof useReleases>[number];
}

const ReleaseCard: React.FC<ReleaseCardProps> = ({ releaseQuery }) => {
  const showSkeleton =
    releaseQuery.status !== "success" || releaseQuery.isPlaceholderData;
  const releaserEns = ens.useQuery(releaseQuery.data?.releaser);
  const contractLogo = releaseQuery.data?.logo
    ? replaceIpfsUrl(releaseQuery.data.logo)
    : undefined;

  const releaseUrl = `/${
    releaserEns.data?.ensName || releaseQuery.data?.releaser
  }/${releaseQuery.data?.id}`;
  return (
    <Flex gap={0} direction="column">
      <AspectRatio ratio={1280 / 600} w="100%">
        <Card
          position="relative"
          as={LinkBox}
          overflow="hidden"
          p={0}
          flexGrow={1}
        >
          <Flex
            w="100%"
            p={3}
            gap={3}
            direction="column"
            h="full"
            zIndex={2}
            pos="relative"
          >
            <Flex direction="column" gap={2}>
              <Flex align="center" gap={2}>
                {(contractLogo || showSkeleton) && (
                  <Skeleton
                    isLoaded={!showSkeleton}
                    boxSize={8}
                    borderRadius="full"
                    flexShrink={0}
                    overflow="hidden"
                  >
                    <Image
                      alt={releaseQuery.data?.name}
                      src={contractLogo}
                      boxSize="100%"
                    />
                  </Skeleton>
                )}
                <LinkOverlay as={Link} href={releaseUrl}>
                  <Skeleton
                    isLoaded={!showSkeleton}
                    noOfLines={1}
                    h={showSkeleton ? "20px" : "auto"}
                    as="span"
                  >
                    <Heading
                      minW="100px"
                      lineHeight={8}
                      size="label.lg"
                      noOfLines={1}
                    >
                      {releaseQuery.data?.name}
                    </Heading>
                  </Skeleton>
                </LinkOverlay>
              </Flex>

              <SkeletonText isLoaded={!showSkeleton} noOfLines={3}>
                <Text size="body.sm" noOfLines={3}>
                  {releaseQuery.data?.description}
                </Text>
              </SkeletonText>
            </Flex>
            <Flex mt="auto" gap={3} align="center">
              <SkeletonText minH="12px" isLoaded={!showSkeleton} noOfLines={1}>
                <Text minW="30px" size="label.sm">
                  v{releaseQuery.data?.version}
                </Text>
              </SkeletonText>
              {releaseQuery.data?.audit && (
                <TrackedLink
                  size="xs"
                  isExternal
                  href={replaceIpfsUrl(releaseQuery.data.audit)}
                  category="deploy"
                  label="audited"
                  display="flex"
                  alignItems="center"
                  gap={1}
                  color="green.500"
                  _dark={{
                    color: "green.300",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Icon as={BsShieldFillCheck} boxSize={3} />
                  <Text color="inherit" size="label.sm">
                    Audited
                  </Text>
                </TrackedLink>
              )}
            </Flex>
          </Flex>
        </Card>
      </AspectRatio>
      <Flex justify="space-between" align="center">
        <Releaser
          isLoading={showSkeleton}
          containerProps={{
            mt: "auto",
            py: 3,
            px: 0,
            gap: 1.5,
          }}
          addressOrEns={releaseQuery.data?.releaser || ""}
        />
        <LinkButton
          // variant="outline"
          href={releaseUrl}
          rightIcon={<FiChevronsRight />}
          iconSpacing={1}
          borderRadius="full"
          colorScheme="contrast"
          size="sm"
        >
          Deploy
        </LinkButton>
      </Flex>
    </Flex>
  );
};

interface ReleaserProps {
  addressOrEns: string;
  isLoading: boolean;
  containerProps?: FlexProps;
  avatarProps?: Omit<ReleaserAvatarProps, "address">;
  textProps?: TextProps;
}

const Releaser: React.FC<ReleaserProps> = (props) => {
  const ensResult = useEns(props.addressOrEns);
  const releaserName =
    ensResult.data?.ensName === "deployer.thirdweb.eth"
      ? "thirdweb.eth"
      : ensResult.data?.ensName || props.addressOrEns;
  return (
    <Flex as={LinkBox} gap={1} align="center" {...props.containerProps}>
      <ReleaserAvatar
        isLoading={props.isLoading}
        boxSize={7}
        flexShrink={0}
        {...props.avatarProps}
        address={ensResult.data?.ensName || props.addressOrEns}
      />
      <LinkOverlay
        as={Link}
        href={`/${ensResult.data?.ensName || props.addressOrEns}`}
        color="paragraph"
      >
        <SkeletonText noOfLines={1} minW="50px" isLoaded={!props.isLoading}>
          <Text noOfLines={1} size="label.sm" {...props.textProps}>
            {shortenIfAddress(releaserName)}
          </Text>
        </SkeletonText>
      </LinkOverlay>
      {ensResult.data?.ensName === "deployer.thirdweb.eth" && (
        <Icon
          color="green.500"
          _dark={{
            color: "green.300",
          }}
          as={VscVerified}
        />
      )}
    </Flex>
  );
};

type ReleaseQueryInfo = `${string}/${string}`;

function generateReleaseQueryKey(info: ReleaseQueryInfo) {
  const [author, contractId] = info.split("/");
  return ["release", { author, contractId }];
}

async function fetchRelease(
  queryClient: QueryClient,
  releasePath: ReleaseQueryInfo,
) {
  const [author, contractId] = releasePath.split("/");
  const polygonSdk = getEVMThirdwebSDK(ChainId.Polygon);

  const ensResult = await queryClient.fetchQuery(ensQuery(author));
  invariant(ensResult.address, "ENS result must have an address");
  const latestReleaseVersion = await polygonSdk
    .getPublisher()
    .getLatest(ensResult.address, contractId);
  invariant(latestReleaseVersion, "no release found");
  const contractInfo = await polygonSdk
    .getPublisher()
    .fetchPublishedContractInfo(latestReleaseVersion);

  const publishMetadata = await fetchContractPublishMetadataFromURI(
    latestReleaseVersion.metadataUri,
  );
  return {
    ...latestReleaseVersion,
    version: contractInfo.publishedMetadata.version,
    name: contractInfo.publishedMetadata.name,
    description: contractInfo.publishedMetadata.description || "",
    releaser: contractInfo.publishedMetadata.publisher || "",
    audit: contractInfo.publishedMetadata.audit || "",
    logo: contractInfo.publishedMetadata.logo || "",
    detectedExtensions: extractExtensions(
      detectFeatures(publishMetadata.abi || []),
    ).enabledExtensions.map((extension) => ({
      name: extension.name,
      docLinks: extension.docLinks,
      namespace: extension.namespace,
    })),
    releasePath,
  };
}

type Release = Awaited<ReturnType<typeof fetchRelease>>;

function prefetchReleases(
  queryClient: QueryClient,
  releaseInfos: ReleaseQueryInfo[],
) {
  return Promise.all(
    releaseInfos.map((info) =>
      queryClient.fetchQuery({
        queryKey: generateReleaseQueryKey(info),
        queryFn: () => fetchRelease(queryClient, info),
      }),
    ),
  );
}

function makePlaceHolderData(releaseInfo: ReleaseQueryInfo): Release {
  return {
    version: "0.0.0",
    name: "Loading...",
    description: "Loading...",
    releaser: "",
    audit: "",
    logo: "",
    detectedExtensions: [],
    releasePath: releaseInfo,
    id: "",
    metadataUri: "",
    timestamp: "",
  };
}

function useReleases(releaseInfos: ReleaseQueryInfo[]) {
  const queryClient = useQueryClient();
  return useQueries({
    queries: releaseInfos.map((info) => ({
      queryKey: generateReleaseQueryKey(info),
      queryFn: () => fetchRelease(queryClient, info),
      placeholderData: makePlaceHolderData(info),
    })),
  });
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  const releases = await prefetchReleases(queryClient, CONTRACTS_TO_LOAD);

  await Promise.all([
    ...releases.map((release) =>
      queryClient.prefetchQuery(releaserProfileQuery(release.releaser)),
    ),
    ...releases.map((release) =>
      queryClient.prefetchQuery(ensQuery(release.releaser)),
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
