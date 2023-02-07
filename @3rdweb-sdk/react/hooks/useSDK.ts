import { contractKeys, networkKeys } from "../cache-keys";
import { useQuery } from "@tanstack/react-query";
import {
  ArbitrumGoerli,
  ArbitrumOne,
  AvalancheCChain,
  AvalancheFujiTestnet,
  BinanceSmartChain,
  BinanceSmartChainTestnet,
  Ethereum,
  FantomOpera,
  FantomTestnet,
  Goerli,
  Mumbai,
  Optimism,
  OptimismGoerliTestnet,
  Polygon,
} from "@thirdweb-dev/chains";
import { ChainId, ContractWithMetadata } from "@thirdweb-dev/sdk/evm";
import { useAutoConfigureChains } from "hooks/chains/allChains";
import {
  useConfiguredChains,
  useConfiguredChainsRecord,
} from "hooks/chains/configureChains";
import { getEVMThirdwebSDK, getSOLThirdwebSDK } from "lib/sdk";
import { useEffect, useMemo } from "react";
import invariant from "tiny-invariant";
import { DashboardSolanaNetwork } from "utils/solanaUtils";

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
  const configuredChains = useConfiguredChains();
  return useQuery(
    [networkKeys.multiChainRegistry, walletAddress],
    async () => {
      if (!walletAddress) {
        return [];
      }

      // PERF ISSUE HERE, NEED TO OPTIMISE
      // thrid argument is a huge object and this function is gonna strinfigy it for creating a key
      const polygonSDK = getEVMThirdwebSDK(Polygon.chainId, Polygon.rpc[0], {
        chains: configuredChains,
      });

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
    Ethereum.chainId,
    Ethereum.rpc[0],
    walletAddress,
  );
  const polygonQuery = useContractList(
    Polygon.chainId,
    Polygon.rpc[0],
    walletAddress,
  );
  const fantomQuery = useContractList(
    FantomOpera.chainId,
    FantomOpera.rpc[0],
    walletAddress,
  );
  const avalancheQuery = useContractList(
    AvalancheCChain.chainId,
    AvalancheCChain.rpc[0],
    walletAddress,
  );
  const optimismQuery = useContractList(
    Optimism.chainId,
    Optimism.rpc[0],
    walletAddress,
  );

  const arbitrumQuery = useContractList(
    ArbitrumOne.chainId,
    ArbitrumOne.rpc[0],
    walletAddress,
  );
  const binanceQuery = useContractList(
    BinanceSmartChain.chainId,
    BinanceSmartChain.rpc[0],
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
    Goerli.chainId,
    Goerli.rpc[0],
    walletAddress,
  );
  const mumbaiQuery = useContractList(
    Mumbai.chainId,
    Mumbai.rpc[0],
    walletAddress,
  );
  const fantomTestnetQuery = useContractList(
    FantomTestnet.chainId,
    FantomTestnet.rpc[0],
    walletAddress,
  );
  const avalancheFujiTestnetQuery = useContractList(
    AvalancheFujiTestnet.chainId,
    AvalancheFujiTestnet.rpc[0],
    walletAddress,
  );
  const optimismGoerliQuery = useContractList(
    OptimismGoerliTestnet.chainId,
    OptimismGoerliTestnet.rpc[0],
    walletAddress,
  );
  const arbitrumGoerliQuery = useContractList(
    ArbitrumGoerli.chainId,
    ArbitrumGoerli.rpc[0],
    walletAddress,
  );
  const binanceTestnetQuery = useContractList(
    BinanceSmartChainTestnet.chainId,
    BinanceSmartChainTestnet.rpc[0],
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

  const configuredChainsRecord = useConfiguredChainsRecord();
  const autoConfigureChains = useAutoConfigureChains();

  useEffect(() => {
    if (!multiChainQuery.data) {
      return;
    }

    // create a set of unconfigured chains
    const unconfiguredChainsSet: Set<number> = new Set();
    multiChainQuery.data.forEach((contract) => {
      if (!configuredChainsRecord[contract.chainId]) {
        unconfiguredChainsSet.add(contract.chainId);
      }
    });

    // auto configure them all if possible
    autoConfigureChains(unconfiguredChainsSet);
  }, [autoConfigureChains, multiChainQuery.data, configuredChainsRecord]);

  const allList = useMemo(() => {
    const mainnets: ContractWithMetadata[] = [];
    const testnets: ContractWithMetadata[] = [];
    const unknownNets: ContractWithMetadata[] = [];

    if (multiChainQuery.data) {
      multiChainQuery.data.forEach((net) => {
        // if network is configured, we can determine if it is a testnet or not
        if (net.chainId in configuredChainsRecord) {
          const netInfo = configuredChainsRecord[net.chainId];
          if (netInfo.testnet) {
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

    // only for legacy reasons - can be removed once migration to multi-chain registry is complete
    const mergedMainnets = [...mainnets, ...mainnetQuery.data].sort(
      (a, b) => a.chainId - b.chainId,
    );
    const mergedTestnets = [...testnets, ...testnetQuery.data].sort(
      (a, b) => a.chainId - b.chainId,
    );

    let all = [...mergedMainnets, ...mergedTestnets, ...unknownNets];

    // remove duplicates (by address + chain) - can happen if a contract is on both muichain registry and legacy registries
    const seen: { [key: string]: boolean } = {};
    all = all.filter((item) => {
      const key = `${item.chainId}-${item.address}`;
      const seenBefore = seen[key];
      seen[key] = true;
      return !seenBefore;
    });

    return all;
  }, [
    mainnetQuery.data,
    testnetQuery.data,
    multiChainQuery.data,
    configuredChainsRecord,
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
