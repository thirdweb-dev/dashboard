import { contractKeys, networkKeys } from "../cache-keys";
import { useQuery } from "@tanstack/react-query";
import {
  ChainId,
  ChainInfo,
  ContractWithMetadata,
} from "@thirdweb-dev/sdk/evm";
import {
  useConfiguredNetworks,
  useConfiguredNetworksRecord,
} from "components/configure-networks/useConfiguredNetworks";
import { getEVMRPC } from "constants/rpc";
import { getEVMThirdwebSDK, getSOLThirdwebSDK } from "lib/sdk";
import { useMemo } from "react";
import invariant from "tiny-invariant";
import { DashboardSolanaNetwork } from "utils/network";

export function useContractList(
  chainId: number,
  rpcUrl: string,
  walletAddress?: string,
) {
  return useQuery(
    [...networkKeys.chain(chainId), ...contractKeys.list(walletAddress)],
    async () => {
      if (!walletAddress) {
        return;
      }
      const sdk = getEVMThirdwebSDK(chainId, rpcUrl);
      const contractList = await sdk.getContractList(walletAddress);
      return [...contractList].reverse();
    },
    {
      enabled: !!walletAddress && !!chainId,
    },
  );
}

export function useMultiChainRegContractList(walletAddress?: string) {
  const configuredChains = useConfiguredNetworks();
  return useQuery(
    [networkKeys.multiChainRegistry, walletAddress],
    async () => {
      const polygonSDK = getEVMThirdwebSDK(
        ChainId.Polygon,
        getEVMRPC(ChainId.Polygon),
        {
          chainInfos: configuredChains.reduce((acc, chain) => {
            acc[chain.chainId] = {
              rpc: chain.rpcUrl,
            };
            return acc;
          }, {} as Record<number, ChainInfo>),
        },
      );

      if (!walletAddress) {
        return [];
      }

      const contractList = await polygonSDK.getMultichainContractList(
        walletAddress,
      );
      return [...contractList].reverse();
    },
    {
      enabled: !!walletAddress,
    },
  );
}

export function useMainnetsContractList(walletAddress: string | undefined) {
  const mainnetQuery = useContractList(
    ChainId.Mainnet,
    getEVMRPC(ChainId.Mainnet),
    walletAddress,
  );
  const polygonQuery = useContractList(
    ChainId.Polygon,
    getEVMRPC(ChainId.Polygon),
    walletAddress,
  );
  const fantomQuery = useContractList(
    ChainId.Fantom,
    getEVMRPC(ChainId.Fantom),
    walletAddress,
  );
  const avalancheQuery = useContractList(
    ChainId.Avalanche,
    getEVMRPC(ChainId.Avalanche),
    walletAddress,
  );
  const optimismQuery = useContractList(
    ChainId.Optimism,
    getEVMRPC(ChainId.Optimism),
    walletAddress,
  );

  const arbitrumQuery = useContractList(
    ChainId.Arbitrum,
    getEVMRPC(ChainId.Arbitrum),
    walletAddress,
  );
  const binanceQuery = useContractList(
    ChainId.BinanceSmartChainMainnet,
    getEVMRPC(ChainId.BinanceSmartChainMainnet),
    walletAddress,
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

  return {
    data: mainnetList,
    isLoading:
      mainnetQuery.isLoading ||
      polygonQuery.isLoading ||
      fantomQuery.isLoading ||
      avalancheQuery.isLoading ||
      optimismQuery.isLoading ||
      arbitrumQuery.isLoading ||
      binanceQuery.isLoading,
    isFetched:
      mainnetQuery.isFetched &&
      polygonQuery.isFetched &&
      fantomQuery.isFetched &&
      avalancheQuery.isFetched &&
      optimismQuery.isFetched &&
      arbitrumQuery.isFetched &&
      binanceQuery.isFetched,
  };
}

export function useTestnetsContractList(walletAddress: string | undefined) {
  const goerliQuery = useContractList(
    ChainId.Goerli,
    getEVMRPC(ChainId.Goerli),
    walletAddress,
  );
  const mumbaiQuery = useContractList(
    ChainId.Mumbai,
    getEVMRPC(ChainId.Mumbai),
    walletAddress,
  );
  const fantomTestnetQuery = useContractList(
    ChainId.FantomTestnet,
    getEVMRPC(ChainId.FantomTestnet),
    walletAddress,
  );
  const avalancheFujiTestnetQuery = useContractList(
    ChainId.AvalancheFujiTestnet,
    getEVMRPC(ChainId.AvalancheFujiTestnet),
    walletAddress,
  );
  const optimismGoerliQuery = useContractList(
    ChainId.OptimismGoerli,
    getEVMRPC(ChainId.OptimismGoerli),
    walletAddress,
  );
  const arbitrumGoerliQuery = useContractList(
    ChainId.ArbitrumGoerli,
    getEVMRPC(ChainId.ArbitrumGoerli),
    walletAddress,
  );
  const binanceTestnetQuery = useContractList(
    ChainId.BinanceSmartChainTestnet,
    getEVMRPC(ChainId.BinanceSmartChainTestnet),
    walletAddress,
  );

  const testnetList = useMemo(() => {
    return (
      goerliQuery.data?.map((d) => ({ ...d, chainId: ChainId.Goerli })) || []
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
        optimismGoerliQuery.data?.map((d) => ({
          ...d,
          chainId: ChainId.OptimismGoerli,
        })) || [],
      )

      .concat(
        arbitrumGoerliQuery.data?.map((d) => ({
          ...d,
          chainId: ChainId.ArbitrumGoerli,
        })) || [],
      )
      .concat(
        binanceTestnetQuery.data?.map((d) => ({
          ...d,
          chainId: ChainId.BinanceSmartChainTestnet,
        })) || [],
      );
  }, [
    goerliQuery.data,
    mumbaiQuery.data,
    fantomTestnetQuery.data,
    avalancheFujiTestnetQuery.data,
    optimismGoerliQuery.data,
    arbitrumGoerliQuery.data,
    binanceTestnetQuery.data,
  ]);

  return {
    data: testnetList,
    isLoading:
      goerliQuery.isLoading ||
      mumbaiQuery.isLoading ||
      fantomTestnetQuery.isLoading ||
      avalancheFujiTestnetQuery.isLoading ||
      optimismGoerliQuery.isLoading ||
      arbitrumGoerliQuery.isLoading ||
      binanceTestnetQuery.isLoading,
    isFetched:
      goerliQuery.isFetched &&
      mumbaiQuery.isFetched &&
      fantomTestnetQuery.isFetched &&
      avalancheFujiTestnetQuery.isFetched &&
      optimismGoerliQuery.isFetched &&
      arbitrumGoerliQuery.isFetched &&
      binanceTestnetQuery.isFetched,
  };
}

export function useAllContractList(walletAddress: string | undefined) {
  const mainnetQuery = useMainnetsContractList(walletAddress);
  const testnetQuery = useTestnetsContractList(walletAddress);
  const multiChainQuery = useMultiChainRegContractList(walletAddress);
  const configuredNetworkRecord = useConfiguredNetworksRecord();

  const allList = useMemo(() => {
    const mainnets: ContractWithMetadata[] = [];
    const testnets: ContractWithMetadata[] = [];
    const unknownNets: ContractWithMetadata[] = [];

    if (multiChainQuery.data) {
      multiChainQuery.data.forEach((net) => {
        // if network is configured, we can determine if it is a testnet or not
        if (net.chainId in configuredNetworkRecord) {
          const netInfo = configuredNetworkRecord[net.chainId];
          if (netInfo.name.toLowerCase().includes("test")) {
            testnets.push(net);
          } else {
            mainnets.push(net);
          }
        }
        // if not configured, we can't determine if it is a testnet or not
        else {
          unknownNets.push(net);
        }
      });
    }
    return [
      ...mainnetQuery.data,
      ...mainnets,
      ...testnetQuery.data,
      ...testnets,
      ...unknownNets,
    ];
  }, [
    mainnetQuery.data,
    testnetQuery.data,
    multiChainQuery.data,
    configuredNetworkRecord,
  ]);

  return {
    data: allList,
    isLoading: mainnetQuery.isLoading || testnetQuery.isLoading,
    isFetched: mainnetQuery.isFetched && testnetQuery.isFetched,
  };
}

function useProgramList(
  address: string | undefined,
  network: DashboardSolanaNetwork,
) {
  return useQuery(
    ["sol", network, address, "program-list"],
    async () => {
      invariant(address, "address is required");
      const sdk = getSOLThirdwebSDK(network);
      // TODO remove this sorting when we have a stable return array from the SDK
      return (await sdk.registry.getDeployedPrograms(address))
        .sort((a, b) => (a.programName > b.programName ? 1 : -1))
        .map((p) => ({ ...p, network }));
    },
    { enabled: !!address && !!network },
  );
}

export function useAllProgramsList(address: string | undefined) {
  const mainnetQuery = useProgramList(address, "mainnet-beta");
  const devnetQuery = useProgramList(address, "devnet");

  const allList = useMemo(() => {
    return (mainnetQuery.data || []).concat(devnetQuery.data || []);
  }, [mainnetQuery.data, devnetQuery.data]);

  return {
    data: allList,
    isLoading: mainnetQuery.isLoading || devnetQuery.isLoading,
    isFetched: mainnetQuery.isFetched && devnetQuery.isFetched,
  };
}
