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
import { useRouter } from "next/router";
import { ContractTable } from "pages/dashboard";
import { useEffect, useMemo } from "react";
import { FiPlus } from "react-icons/fi";
import { Heading, LinkButton, Text } from "tw-components";

interface DeployedContractsProps {
  address?: RequiredParam<string>;
  noHeader?: boolean;
  noProjects?: boolean;
  onlyMainnet?: boolean;
}

export const DeployedContracts: React.FC<DeployedContractsProps> = ({
  address,
  noHeader,
  noProjects,
  onlyMainnet,
}) => {
  const router = useRouter();

  const {
    data: projects,
    isFetched: projectsIsFetched,
    isLoading: projectsIsLoading,
  } = useProjects(address);

  const mainnetQuery = useContractList(ChainId.Mainnet, address);
  const rinkebyQuery = useContractList(ChainId.Rinkeby, address);
  const goerliQuery = useContractList(ChainId.Goerli, address);
  const polygonQuery = useContractList(ChainId.Polygon, address);
  const mumbaiQuery = useContractList(ChainId.Mumbai, address);
  const fantomQuery = useContractList(ChainId.Fantom, address);
  const fantomTestnetQuery = useContractList(ChainId.FantomTestnet, address);
  const avalancheQuery = useContractList(ChainId.Avalanche, address);
  const avalancheFujiTestnetQuery = useContractList(
    ChainId.AvalancheFujiTestnet,
    address,
  );
  const optimismQuery = useContractList(ChainId.Optimism, address);
  const optimismTestnetQuery = useContractList(
    ChainId.OptimismTestnet,
    address,
  );
  const arbitrumQuery = useContractList(ChainId.Arbitrum, address);
  const arbitrumTestnetQuery = useContractList(
    ChainId.ArbitrumTestnet,
    address,
  );
  const binanceQuery = useContractList(
    ChainId.BinanceSmartChainMainnet,
    address,
  );
  const binanceTestnetQuery = useContractList(
    ChainId.BinanceSmartChainTestnet,
    address,
  );

  const mainnetList = useMemo(() => {
    return (
      mainnetQuery.data?.map((d) => ({ ...d, chainId: ChainId.Mainnet })) || []
    )
      .concat(
        polygonQuery.data?.map((d) => ({
          ...d,
          chainId: ChainId.Polygon,
        })) || [],
      )
      .concat(
        avalancheQuery.data?.map((d) => ({
          ...d,
          chainId: ChainId.Avalanche,
        })) || [],
      )
      .concat(
        fantomQuery.data?.map((d) => ({ ...d, chainId: ChainId.Fantom })) || [],
      )
      .concat(
        optimismQuery.data?.map((d) => ({ ...d, chainId: ChainId.Optimism })) ||
          [],
      )
      .concat(
        arbitrumQuery.data?.map((d) => ({ ...d, chainId: ChainId.Arbitrum })) ||
          [],
      )
      .concat(
        binanceQuery.data?.map((d) => ({
          ...d,
          chainId: ChainId.BinanceSmartChainMainnet,
        })) || [],
      );
  }, [
    mainnetQuery.data,
    polygonQuery.data,
    fantomQuery.data,
    avalancheQuery.data,
    optimismQuery.data,
    arbitrumQuery.data,
    binanceQuery.data,
  ]);

  const testnetList = useMemo(() => {
    return (
      rinkebyQuery.data?.map((d) => ({ ...d, chainId: ChainId.Rinkeby })) || []
    )
      .concat(
        goerliQuery.data?.map((d) => ({ ...d, chainId: ChainId.Goerli })) || [],
      )
      .concat(
        mumbaiQuery.data?.map((d) => ({ ...d, chainId: ChainId.Mumbai })) || [],
      )
      .concat(
        avalancheFujiTestnetQuery.data?.map((d) => ({
          ...d,
          chainId: ChainId.AvalancheFujiTestnet,
        })) || [],
      )
      .concat(
        fantomTestnetQuery.data?.map((d) => ({
          ...d,
          chainId: ChainId.FantomTestnet,
        })) || [],
      )
      .concat(
        optimismTestnetQuery.data?.map((d) => ({
          ...d,
          chainId: ChainId.OptimismTestnet,
        })) || [],
      )
      .concat(
        arbitrumTestnetQuery.data?.map((d) => ({
          ...d,
          chainId: ChainId.ArbitrumTestnet,
        })) || [],
      )
      .concat(
        binanceTestnetQuery.data?.map((d) => ({
          ...d,
          chainId: ChainId.BinanceSmartChainTestnet,
        })) || [],
      );
  }, [
    rinkebyQuery.data,
    goerliQuery.data,
    mumbaiQuery.data,
    fantomTestnetQuery.data,
    avalancheFujiTestnetQuery.data,
    optimismTestnetQuery.data,
    arbitrumTestnetQuery.data,
    binanceTestnetQuery.data,
  ]);

  const combinedList = useMemo(() => {
    return mainnetList.concat(onlyMainnet ? [] : testnetList);
  }, [mainnetList, testnetList, onlyMainnet]);

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
      {!noProjects && projects && projects.length ? (
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
