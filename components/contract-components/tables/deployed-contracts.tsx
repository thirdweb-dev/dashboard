import { ShowMoreButton } from "./show-more-button";
import {
  useAllContractList,
  useContractMetadataWithAddress,
  useWeb3,
} from "@3rdweb-sdk/react";
import {
  Center,
  Flex,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Skeleton,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  ChainId,
  CommonContractOutputSchema,
  ContractType,
  PrebuiltContractType,
  SUPPORTED_CHAIN_IDS,
  SchemaForPrebuiltContractType,
} from "@thirdweb-dev/sdk/evm";
import { ChakraNextImage } from "components/Image";
import {
  useConfiguredNetworks,
  useConfiguredNetworksRecord,
} from "components/configure-networks/useConfiguredNetworks";
import { useReleasesFromDeploy } from "components/contract-components/hooks";
import { GettingStartedBox } from "components/getting-started/box";
import { GettingStartedCard } from "components/getting-started/card";
import { CONTRACT_TYPE_NAME_MAP, FeatureIconMap } from "constants/mappings";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { Column, useFilters, useGlobalFilter, useTable } from "react-table";
import {
  Badge,
  Card,
  ChakraNextLink,
  CodeBlock,
  Heading,
  LinkButton,
  Text,
} from "tw-components";
import { AddressCopyButton } from "tw-components/AddressCopyButton";
import { ComponentWithChildren } from "types/component-with-children";
import { getNetworkSlug } from "utils/network";
import { shortenIfAddress } from "utils/usedapp-external";
import { z } from "zod";

interface DeployedContractsProps {
  noHeader?: boolean;
  contractListQuery: ReturnType<typeof useAllContractList>;
  limit?: number;
}

export const DeployedContracts: React.FC<DeployedContractsProps> = ({
  noHeader,
  contractListQuery,
  limit = 10,
}) => {
  const [showMoreLimit, setShowMoreLimit] = useState(limit);

  const slicedData = useMemo(() => {
    if (contractListQuery.data) {
      return contractListQuery.data.slice(0, showMoreLimit);
    }
    return [];
  }, [contractListQuery.data, showMoreLimit]);

  const router = useRouter();

  return (
    <>
      {!noHeader && (
        <Flex
          justify="space-between"
          align="top"
          gap={4}
          direction={{ base: "column", md: "row" }}
        >
          <Flex gap={2} direction="column">
            <Heading size="title.md">Deployed contracts</Heading>
            <Text fontStyle="italic" maxW="container.md">
              The list of contract instances that you have deployed with
              thirdweb across all networks.
            </Text>
          </Flex>
          <LinkButton
            leftIcon={<FiPlus />}
            colorScheme="primary"
            href="/explore"
          >
            Deploy new contract
          </LinkButton>
        </Flex>
      )}

      <ContractTable combinedList={slicedData}>
        {contractListQuery.isLoading && (
          <Center>
            <Flex py={4} direction="row" gap={4} align="center">
              <Spinner size="sm" />
              <Text>Loading contracts</Text>
            </Flex>
          </Center>
        )}
        {contractListQuery.data.length === 0 && contractListQuery.isFetched && (
          <Center>
            <Flex py={4} direction="column" gap={4} align="center">
              {router.pathname === "/dashboard" ? (
                <GettingStartedBox title="No contracts found, yet!">
                  <GettingStartedCard
                    title="Explore"
                    description={
                      <>
                        Browse a large collection of ready-to-deploy contracts
                        built by thirdweb and other contract developers. Find a
                        contract for your app&apos; or game&apos;s use case.
                      </>
                    }
                    icon={require("public/assets/product-icons/contracts.png")}
                    linkProps={{
                      category: "getting-started",
                      label: "browse-contracts",
                      href: "/explore",
                      children: (
                        <>
                          Get Started <Icon as={FiArrowRight} />
                        </>
                      ),
                    }}
                  />
                  <GettingStartedCard
                    title="Build your own"
                    description={
                      <>
                        Get started with <b>ContractKit</b> to create custom
                        contracts specific to your use case.
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
                    title="Deploy from source"
                    description={
                      <>
                        You are ready to deploy your contract with our
                        interactive <b>CLI</b>.
                      </>
                    }
                    icon={require("public/assets/product-icons/deploy.png")}
                  >
                    <CodeBlock
                      mt="auto"
                      language="bash"
                      code="npx thirdweb deploy"
                    />
                  </GettingStartedCard>
                </GettingStartedBox>
              ) : (
                <Text>No contracts found, yet!</Text>
              )}
            </Flex>
          </Center>
        )}
        {contractListQuery.data.length > slicedData.length && (
          <ShowMoreButton
            limit={limit}
            showMoreLimit={showMoreLimit}
            setShowMoreLimit={setShowMoreLimit}
          />
        )}
      </ContractTable>
    </>
  );
};

interface ContractTableProps {
  combinedList: {
    chainId: ChainId;
    address: string;
    contractType: () => Promise<ContractType>;
    metadata: () => Promise<z.output<typeof CommonContractOutputSchema>>;
  }[];
  isFetching?: boolean;
}

export const ContractTable: ComponentWithChildren<ContractTableProps> = ({
  combinedList,
  children,
  isFetching,
}) => {
  const { getNetworkMetadata } = useWeb3();
  const configuredNetworks = useConfiguredNetworks();
  const configuredNetworksRecord = useConfiguredNetworksRecord();

  const ALL_CONFIGURED_CHAIN_IDS = useMemo(() => {
    return [
      ...SUPPORTED_CHAIN_IDS,
      ...configuredNetworks.map((network) => network.chainId),
    ];
  }, [configuredNetworks]);

  const columns: Column<(typeof combinedList)[number]>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: (row) => row.metadata,
        Cell: (cell: any) => {
          return <AsyncContractNameCell cell={cell.row.original} />;
        },
      },
      {
        Header: "Contract Type",
        accessor: (row) => row.contractType,
        Cell: (cell: any) => <AsyncContractTypeCell cell={cell.row.original} />,
      },
      {
        Header: "Network",
        accessor: (row) => row.chainId,
        Cell: (cell: any) => {
          const data = getNetworkMetadata(cell.row.original.chainId);
          return (
            <Flex align="center" gap={2}>
              <Icon boxSize={6} as={data.icon} />
              <Text size="label.md">{data.chainName}</Text>
              {data.isTestnet !== "unknown" && (
                <Badge
                  colorScheme={data.isTestnet ? "blue" : "green"}
                  textTransform="capitalize"
                >
                  {data.isTestnet ? "Testnet" : "Mainnet"}
                </Badge>
              )}
            </Flex>
          );
        },
        Filter: (props) => {
          return (
            <Menu closeOnSelect={false}>
              <MenuButton
                as={IconButton}
                icon={<Icon as={IoFilterSharp} boxSize={4} />}
                aria-label="open contract type filter menu"
                size="sm"
                variant="ghost"
                p={0}
              />
              <MenuList zIndex={10}>
                <MenuOptionGroup
                  defaultValue={ALL_CONFIGURED_CHAIN_IDS.map(
                    (chainId) => `${chainId}`,
                  )}
                  title="Networks"
                  fontSize={12}
                  type="checkbox"
                  value={props.filterValue}
                  onChange={(e) => props.setFilter(props.column.id, e)}
                >
                  {ALL_CONFIGURED_CHAIN_IDS.map((chainId) => {
                    const networkMetadata = getNetworkMetadata(chainId);
                    return (
                      <MenuItemOption value={`${chainId}`} key={chainId}>
                        <Flex align="center" direction="row" gap={1}>
                          <Icon boxSize={4} as={networkMetadata.icon} />
                          <Text size="label.md">
                            {networkMetadata.chainName}
                          </Text>
                        </Flex>
                      </MenuItemOption>
                    );
                  })}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          );
        },
        filter: (rows, _columnIds, filterValue = []) => {
          return rows.filter((row) => {
            return filterValue.includes(row.original.chainId.toString());
          });
        },
      },
      {
        Header: "Contract Address",
        accessor: (row) => row.address,
        Cell: (cell: any) => {
          return <AddressCopyButton address={cell.row.original.address} />;
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ALL_CONFIGURED_CHAIN_IDS],
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: "",
    }),
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: combinedList,
        defaultColumn,
      },
      useFilters,
      useGlobalFilter,
    );

  const router = useRouter();

  return (
    <Card p={0} overflowX="auto" position="relative" overflowY="hidden">
      {isFetching && (
        <Spinner
          color="primary"
          size="xs"
          position="absolute"
          top={2}
          right={4}
        />
      )}
      <Table
        {...getTableProps()}
        bg="backgroundHighlight"
        p={4}
        borderTopRadius="lg"
        overflow="hidden"
      >
        <Thead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <Th
                  borderBottomColor="borderColor"
                  {...column.getHeaderProps()}
                >
                  <Flex align="center" gap={2}>
                    <Text as="label" size="label.md">
                      {column.render("Header")}
                    </Text>
                    {column.render("Filter")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              // eslint-disable-next-line react/jsx-key
              <Tr
                {...row.getRowProps()}
                role="group"
                // this is a hack to get around the fact that safari does not handle position: relative on table rows
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const networkSlug = getNetworkSlug(
                    row.original.chainId,
                    configuredNetworksRecord,
                  );

                  router.push(`/${networkSlug}/${row.original.address}`);
                }}
                // end hack
                borderBottomWidth={1}
                _last={{ borderBottomWidth: 0 }}
              >
                {row.cells.map((cell) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <Td
                      borderBottomWidth="inherit"
                      borderBottomColor="borderColor"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {children}
    </Card>
  );
};

interface AsyncContractTypeCellProps {
  cell: {
    address: string;
    chainId: number;
    contractType: (() => Promise<ContractType>) | undefined;
    metadata: () => Promise<
      z.infer<SchemaForPrebuiltContractType<PrebuiltContractType>["output"]>
    >;
  };
}

const AsyncContractTypeCell: React.FC<AsyncContractTypeCellProps> = ({
  cell,
}) => {
  const contractTypeQuery = useQuery({
    queryKey: ["contract-type", cell.chainId, cell.address],
    queryFn: () => (cell.contractType ? cell.contractType() : ""),
    enabled: !!cell.contractType,
    refetchOnWindowFocus: false,
    // contract type of a contract does not change - so safe to set high staleTime ( currently set to 1 hour )
    staleTime: 1000 * 60 * 60,
  });

  const contractType = contractTypeQuery.data;

  const isPrebuiltContract = contractType && contractType !== "custom";
  const configuredNetworksRecord = useConfiguredNetworksRecord();
  const releasesFromDeploy = useReleasesFromDeploy(
    configuredNetworksRecord,
    isPrebuiltContract ? undefined : cell.address || undefined,
    cell.chainId,
  );

  const src = contractType ? FeatureIconMap[contractType as ContractType] : "";

  const contractName = contractType
    ? CONTRACT_TYPE_NAME_MAP[contractType as ContractType]
    : "";

  const Custom = CONTRACT_TYPE_NAME_MAP["custom"];

  if (isPrebuiltContract) {
    return (
      <Flex align="center" gap={2}>
        {contractType ? (
          <ChakraNextImage boxSize={8} src={src} alt={contractName} />
        ) : (
          <Image boxSize={8} src="" alt={contractName} />
        )}
        <Text size="label.md">{contractName} </Text>
      </Flex>
    );
  }

  const actualRelease = releasesFromDeploy.data
    ? releasesFromDeploy.data[0]
    : null;

  if (!releasesFromDeploy.isLoading && !actualRelease) {
    return (
      <Flex align="center" gap={2}>
        {src ? (
          <ChakraNextImage boxSize={8} src={src} alt={Custom} />
        ) : (
          <Image boxSize={8} src="" alt={Custom} />
        )}
        <Text size="label.md">{Custom}</Text>
      </Flex>
    );
  }

  return (
    <Flex align="center" gap={2}>
      <Skeleton isLoaded={!releasesFromDeploy.isLoading && !!src}>
        <ChakraNextImage boxSize={8} src={src} alt={Custom} />
      </Skeleton>
      <Skeleton isLoaded={!releasesFromDeploy.isLoading}>
        <Text size="label.md">{actualRelease?.name || Custom}</Text>
      </Skeleton>
    </Flex>
  );
};

interface AsyncContractNameCellProps {
  cell: {
    address: string;
    chainId: number;
    contractType: ContractType;
    metadata: () => Promise<
      z.infer<SchemaForPrebuiltContractType<PrebuiltContractType>["output"]>
    >;
  };
}

const AsyncContractNameCell: React.FC<AsyncContractNameCellProps> = ({
  cell,
}) => {
  const metadataQuery = useContractMetadataWithAddress(
    cell.address,
    cell.metadata,
    cell.chainId,
  );

  const configuredNetworksRecord = useConfiguredNetworksRecord();
  const networkSlug = getNetworkSlug(cell.chainId, configuredNetworksRecord);

  return (
    <Skeleton isLoaded={!metadataQuery.isLoading}>
      <ChakraNextLink href={`/${networkSlug}/${cell.address}`} passHref>
        <Text
          color="blue.700"
          _dark={{ color: "blue.300" }}
          size="label.md"
          _groupHover={{ textDecor: "underline" }}
        >
          {metadataQuery.data?.name || shortenIfAddress(cell.address)}
        </Text>
      </ChakraNextLink>
    </Skeleton>
  );
};
