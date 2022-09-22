import {
  useAllContractList,
  useAllProgramsList,
  useContractMetadataWithAddress,
  useWeb3,
} from "@3rdweb-sdk/react";
import {
  Flex,
  Icon,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Skeleton,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAddress } from "@thirdweb-dev/react";
import {
  ChainId,
  CommonContractOutputSchema,
  ContractType,
  PrebuiltContractType,
  SUPPORTED_CHAIN_ID,
  SUPPORTED_CHAIN_IDS,
  SchemaForPrebuiltContractType,
} from "@thirdweb-dev/sdk";
import { ChakraNextImage } from "components/Image";
import { AppLayout } from "components/app-layouts/app";
import { useReleasesFromDeploy } from "components/contract-components/hooks";
import { NoWallet } from "components/contract-components/shared/no-wallet";
import { DeployedContracts } from "components/contract-components/tables/deployed-contracts";
import { DeployedPrograms } from "components/contract-components/tables/deployed-programs";
import { ReleasedContracts } from "components/contract-components/tables/released-contracts";
import { FancyEVMIcon } from "components/icons/Ethereum";
import { CONTRACT_TYPE_NAME_MAP, FeatureIconMap } from "constants/mappings";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import { utils } from "ethers";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { isPossibleSolanaAddress } from "lib/sol-utils";
import OriginalNextLink from "next/link";
import { useRouter } from "next/router";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "pages/_app";
import * as React from "react";
import { ReactElement, useMemo } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { Column, useFilters, useGlobalFilter, useTable } from "react-table";
import { AddressCopyButton, Badge, Card, Heading, Text } from "tw-components";
import { ComponentWithChildren } from "types/component-with-children";
import { getNetworkFromChainId } from "utils/network";
import { shortenIfAddress } from "utils/usedapp-external";
import { z } from "zod";

const Dashboard: ThirdwebNextPage = () => {
  const wallet = useSingleQueryParam("address") || "dashboard";
  const address = useAddress();
  const { publicKey } = useWallet();

  const evmAddress = useMemo(() => {
    return wallet === "dashboard"
      ? address
      : utils.isAddress(wallet)
      ? wallet
      : address;
  }, [address, wallet]);

  const solAddress = useMemo(() => {
    return wallet === "dashboard"
      ? publicKey?.toBase58()
      : isPossibleSolanaAddress(wallet)
      ? wallet
      : publicKey?.toBase58();
  }, [publicKey, wallet]);

  if (solAddress) {
    return <SOLDashboard address={solAddress} />;
  }

  if (evmAddress) {
    return (
      <Tabs isLazy lazyBehavior="keepMounted">
        <TabList
          px={0}
          borderBottomColor="borderColor"
          borderBottomWidth="1px"
          overflowX={{ base: "auto", md: "inherit" }}
        >
          <Tab gap={2} _selected={{ borderBottomColor: "purple.500" }}>
            <Icon opacity={0.85} boxSize={6} as={FancyEVMIcon} />
            <Heading size="label.lg">Deployed Contracts</Heading>
          </Tab>
          <Tab
            gap={2}
            _selected={{
              borderBottomColor: "#FBFF5C",
            }}
          >
            <ChakraNextImage
              src={require("public/assets/product-icons/release.png")}
              alt=""
              boxSize={6}
            />
            <Heading size="label.lg">Released Contracts</Heading>
          </Tab>
        </TabList>
        <TabPanels px={0} py={2}>
          <TabPanel px={0}>
            <EVMDashboard address={evmAddress} />
          </TabPanel>
          <TabPanel px={0}>
            <ReleaseDashboard address={evmAddress} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  }
  return <NoWallet />;
};

Dashboard.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;
Dashboard.pageId = PageId.Dashboard;

export default Dashboard;

interface DashboardProps {
  address: string;
}

const EVMDashboard: React.FC<DashboardProps> = ({ address }) => {
  const allContractList = useAllContractList(address);
  return (
    <Flex direction="column" gap={8}>
      <DeployedContracts contractListQuery={allContractList} limit={50} />
    </Flex>
  );
};

const ReleaseDashboard: React.FC<DashboardProps> = ({ address }) => {
  return (
    <Flex direction="column" gap={8}>
      {/* this section needs to be on the publishersdk context (polygon SDK) */}
      <PublisherSDKContext>
        <ReleasedContracts address={address} />
      </PublisherSDKContext>
    </Flex>
  );
};

const SOLDashboard: React.FC<DashboardProps> = ({ address }) => {
  const allProgramAccounts = useAllProgramsList(address);

  return (
    <Flex direction="column" gap={8}>
      <DeployedPrograms programListQuery={allProgramAccounts} />
    </Flex>
  );
};
interface ContractTableProps {
  combinedList: {
    chainId: ChainId;
    address: string;
    contractType: ContractType;
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

  const columns = useMemo(
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
          const data = getNetworkMetadata(
            cell.row.original.chainId as SUPPORTED_CHAIN_ID,
          );
          return (
            <Flex align="center" gap={2}>
              <Icon boxSize={6} as={data.icon} />
              <Text size="label.md">{data.chainName}</Text>
              <Badge
                colorScheme={data.isTestnet ? "blue" : "green"}
                textTransform="capitalize"
              >
                {data.isTestnet ? "Testnet" : "Mainnet"}
              </Badge>
            </Flex>
          );
        },
        Filter: (props) => {
          const options = SUPPORTED_CHAIN_IDS.map((chainId) =>
            chainId.toString(),
          );
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
                  defaultValue={options}
                  title="Networks"
                  fontSize={12}
                  type="checkbox"
                  value={props.filterValue}
                  onChange={(e) => props.setFilter(props.column.id, e)}
                >
                  {options.map((chainId) => (
                    <MenuItemOption value={chainId} key={chainId}>
                      <Flex align="center" direction="row" gap={1}>
                        <Icon
                          boxSize={4}
                          as={
                            getNetworkMetadata(
                              parseInt(chainId) as SUPPORTED_CHAIN_ID,
                            ).icon
                          }
                        />
                        <Text size="label.md">
                          {
                            getNetworkMetadata(
                              parseInt(chainId) as SUPPORTED_CHAIN_ID,
                            ).chainName
                          }
                        </Text>
                      </Flex>
                    </MenuItemOption>
                  ))}
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
    [],
  ) as Column<typeof combinedList[number]>[];

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
        <Thead bg="blackAlpha.50" _dark={{ bg: "whiteAlpha.50" }}>
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
                _hover={{ bg: "blackAlpha.50" }}
                _dark={{
                  _hover: {
                    bg: "whiteAlpha.50",
                  },
                }}
                // this is a hack to get around the fact that safari does not handle position: relative on table rows
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const href = `/${getNetworkFromChainId(
                    row.original.chainId as SUPPORTED_CHAIN_ID,
                  )}/${row.original.address}`;

                  router.push(href);
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
    chainId: SUPPORTED_CHAIN_ID;
    contractType: ContractType;
    metadata: () => Promise<
      z.infer<SchemaForPrebuiltContractType<PrebuiltContractType>["output"]>
    >;
  };
}

const AsyncContractTypeCell: React.FC<AsyncContractTypeCellProps> = ({
  cell,
}) => {
  const isPrebuiltContract = cell.contractType !== "custom";

  const releasesFromDeploy = useReleasesFromDeploy(
    isPrebuiltContract ? undefined : cell.address || undefined,
    cell.chainId as SUPPORTED_CHAIN_ID,
  );
  const src = FeatureIconMap[cell.contractType as ContractType];

  if (isPrebuiltContract) {
    return (
      <Flex align="center" gap={2}>
        {src ? (
          <ChakraNextImage
            boxSize={8}
            src={src}
            alt={CONTRACT_TYPE_NAME_MAP[cell.contractType as ContractType]}
          />
        ) : (
          <Image
            boxSize={8}
            src=""
            alt={CONTRACT_TYPE_NAME_MAP[cell.contractType as ContractType]}
          />
        )}
        <Text size="label.md">
          {CONTRACT_TYPE_NAME_MAP[cell.contractType as ContractType]}
        </Text>
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
          <ChakraNextImage
            boxSize={8}
            src={src}
            alt={CONTRACT_TYPE_NAME_MAP["custom"]}
          />
        ) : (
          <Image boxSize={8} src="" alt={CONTRACT_TYPE_NAME_MAP["custom"]} />
        )}
        <Text size="label.md">{CONTRACT_TYPE_NAME_MAP["custom"]}</Text>
      </Flex>
    );
  }

  return (
    <Flex align="center" gap={2}>
      <Skeleton isLoaded={!releasesFromDeploy.isLoading}>
        <ChakraNextImage
          boxSize={8}
          src={src}
          alt={CONTRACT_TYPE_NAME_MAP["custom"]}
        />
      </Skeleton>
      <Skeleton isLoaded={!releasesFromDeploy.isLoading}>
        <Text size="label.md">
          {actualRelease?.name || CONTRACT_TYPE_NAME_MAP["custom"]}
        </Text>
      </Skeleton>
    </Flex>
  );
};

interface AsyncContractNameCellProps {
  cell: {
    address: string;
    chainId: SUPPORTED_CHAIN_ID;
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

  const href = `/${getNetworkFromChainId(cell.chainId as SUPPORTED_CHAIN_ID)}/${
    cell.address
  }`;

  return (
    <Skeleton isLoaded={!metadataQuery.isLoading}>
      <OriginalNextLink href={href} passHref>
        <Link>
          <Text
            color="blue.700"
            _dark={{ color: "blue.300" }}
            size="label.md"
            _groupHover={{ textDecor: "underline" }}
          >
            {metadataQuery.data?.name || shortenIfAddress(cell.address)}
          </Text>
        </Link>
      </OriginalNextLink>
    </Skeleton>
  );
};
