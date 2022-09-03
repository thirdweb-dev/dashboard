import { NoContracts } from "../shared/no-contracts";
import { OldProjects } from "./old-projects";
import { useContractList } from "@3rdweb-sdk/react";
import { useProjects } from "@3rdweb-sdk/react/hooks/useProjects";
import {
  Center,
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { ChainId, RequiredParam } from "@thirdweb-dev/react";
import { utils } from "ethers";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";
import { ContractTable } from "pages/dashboard";
import { useEffect, useMemo } from "react";
import { FiPlus } from "react-icons/fi";
import { Heading, LinkButton, Text } from "tw-components";

interface DeployedContractsProps {
  address?: RequiredParam<string>;
  noHeader?: boolean;
}

export const DeployedContracts: React.FC<DeployedContractsProps> = ({
  address,
  noHeader,
}) => {
  const router = useRouter();
  const wallet = useSingleQueryParam("wallet") || "dashboard";

  const dashboardAddress = useMemo(() => {
    return wallet === "dashboard"
      ? address
      : utils.isAddress(wallet)
      ? wallet
      : address;
  }, [address, wallet]);

  const {
    data: projects,
    isFetched: projectsIsFetched,
    isLoading: projectsIsLoading,
    isError: projectsIsError,
  } = useProjects(dashboardAddress);

  const mainnetQuery = useContractList(ChainId.Mainnet, dashboardAddress);
  const rinkebyQuery = useContractList(ChainId.Rinkeby, dashboardAddress);
  const goerliQuery = useContractList(ChainId.Goerli, dashboardAddress);
  const polygonQuery = useContractList(ChainId.Polygon, dashboardAddress);
  const mumbaiQuery = useContractList(ChainId.Mumbai, dashboardAddress);
  const fantomQuery = useContractList(ChainId.Fantom, dashboardAddress);
  const fantomTestnetQuery = useContractList(
    ChainId.FantomTestnet,
    dashboardAddress,
  );
  const avalancheQuery = useContractList(ChainId.Avalanche, dashboardAddress);
  const avalancheFujiTestnetQuery = useContractList(
    ChainId.AvalancheFujiTestnet,
    dashboardAddress,
  );
  const optimismQuery = useContractList(ChainId.Optimism, dashboardAddress);
  const optimismTestnetQuery = useContractList(
    ChainId.OptimismTestnet,
    dashboardAddress,
  );
  const arbitrumQuery = useContractList(ChainId.Arbitrum, dashboardAddress);
  const arbitrumTestnetQuery = useContractList(
    ChainId.ArbitrumTestnet,
    dashboardAddress,
  );
  const binanceQuery = useContractList(
    ChainId.BinanceSmartChainMainnet,
    dashboardAddress,
  );
  const binanceTestnetQuery = useContractList(
    ChainId.BinanceSmartChainTestnet,
    dashboardAddress,
  );

  const combinedList = useMemo(() => {
    return (
      mainnetQuery.data?.map((d) => ({ ...d, chainId: ChainId.Mainnet })) || []
    )
      .concat(
        rinkebyQuery.data?.map((d) => ({ ...d, chainId: ChainId.Rinkeby })) ||
          [],
      )
      .concat(
        goerliQuery.data?.map((d) => ({ ...d, chainId: ChainId.Goerli })) || [],
      )
      .concat(
        polygonQuery.data?.map((d) => ({
          ...d,
          chainId: ChainId.Polygon,
        })) || [],
      )
      .concat(
        mumbaiQuery.data?.map((d) => ({ ...d, chainId: ChainId.Mumbai })) || [],
      )
      .concat(
        avalancheQuery.data?.map((d) => ({
          ...d,
          chainId: ChainId.Avalanche,
        })) || [],
      )
      .concat(
        avalancheFujiTestnetQuery.data?.map((d) => ({
          ...d,
          chainId: ChainId.AvalancheFujiTestnet,
        })) || [],
      )
      .concat(
        fantomQuery.data?.map((d) => ({ ...d, chainId: ChainId.Fantom })) || [],
      )
      .concat(
        fantomTestnetQuery.data?.map((d) => ({
          ...d,
          chainId: ChainId.FantomTestnet,
        })) || [],
      )
      .concat(
        optimismQuery.data?.map((d) => ({ ...d, chainId: ChainId.Optimism })) ||
          [],
      )
      .concat(
        optimismTestnetQuery.data?.map((d) => ({
          ...d,
          chainId: ChainId.OptimismTestnet,
        })) || [],
      )
      .concat(
        arbitrumQuery.data?.map((d) => ({ ...d, chainId: ChainId.Arbitrum })) ||
          [],
      )
      .concat(
        arbitrumTestnetQuery.data?.map((d) => ({
          ...d,
          chainId: ChainId.ArbitrumTestnet,
        })) || [],
      )
      .concat(
        binanceQuery.data?.map((d) => ({
          ...d,
          chainId: ChainId.BinanceSmartChainMainnet,
        })) || [],
      )
      .concat(
        binanceTestnetQuery.data?.map((d) => ({
          ...d,
          chainId: ChainId.BinanceSmartChainTestnet,
        })) || [],
      );
  }, [
    mainnetQuery.data,
    rinkebyQuery.data,
    goerliQuery.data,
    polygonQuery.data,
    mumbaiQuery.data,
    fantomQuery.data,
    fantomTestnetQuery.data,
    avalancheQuery.data,
    avalancheFujiTestnetQuery.data,
    optimismQuery.data,
    optimismTestnetQuery.data,
    arbitrumQuery.data,
    arbitrumTestnetQuery.data,
    binanceQuery.data,
    binanceTestnetQuery.data,
  ]);

  const isFetched =
    projectsIsFetched &&
    mainnetQuery.isFetched &&
    rinkebyQuery.isFetched &&
    goerliQuery.isFetched &&
    polygonQuery.isFetched &&
    mumbaiQuery.isFetched &&
    fantomQuery.isFetched &&
    fantomTestnetQuery.isFetched &&
    avalancheQuery.isFetched &&
    avalancheFujiTestnetQuery.isFetched &&
    optimismQuery.isFetched &&
    optimismTestnetQuery.isFetched &&
    arbitrumQuery.isFetched &&
    arbitrumTestnetQuery.isFetched &&
    binanceQuery.isFetched &&
    binanceTestnetQuery.isFetched;

  const isLoading =
    projectsIsLoading ||
    mainnetQuery.isLoading ||
    rinkebyQuery.isLoading ||
    goerliQuery.isLoading ||
    polygonQuery.isLoading ||
    mumbaiQuery.isLoading ||
    fantomQuery.isLoading ||
    fantomTestnetQuery.isLoading ||
    avalancheQuery.isLoading ||
    avalancheFujiTestnetQuery.isLoading ||
    optimismQuery.isLoading ||
    optimismTestnetQuery.isLoading ||
    arbitrumQuery.isLoading ||
    arbitrumTestnetQuery.isLoading ||
    binanceQuery.isLoading ||
    binanceTestnetQuery.isLoading;

  useEffect(() => {
    if (
      isFetched &&
      combinedList.length === 0 &&
      projects?.length === 0 &&
      router.asPath === "/dashboard"
    ) {
      router.replace("/contracts");
    }
  }, [isFetched, router, combinedList, projects]);

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
            href="/contracts"
          >
            Deploy new contract
          </LinkButton>
        </Flex>
      )}
      {projects && projects.length ? (
        <>
          <Tabs>
            <TabList>
              <Tab>V2 Contracts</Tab>
              <Tab>V1 Projects</Tab>
            </TabList>
            <TabPanels>
              <TabPanel px={0} pt={8}>
                {combinedList.length === 0 ? (
                  <NoContracts />
                ) : (
                  <ContractTable combinedList={combinedList} />
                )}
              </TabPanel>
              <TabPanel px={0} pt={8}>
                <OldProjects projects={projects} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      ) : (
        <ContractTable combinedList={combinedList}>
          {isLoading && (
            <Center>
              <Flex py={4} direction="row" gap={4} align="center">
                <Spinner size="sm" />
                <Text>Loading deployments</Text>
              </Flex>
            </Center>
          )}
          {combinedList.length === 0 && isFetched && (
            <Center>
              <Flex py={4} direction="column" gap={4} align="center">
                <Text>No deployments found.</Text>
              </Flex>
            </Center>
          )}
        </ContractTable>
      )}
    </>
  );
};
