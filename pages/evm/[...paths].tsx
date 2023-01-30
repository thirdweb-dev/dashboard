import {
  EVMContractInfo,
  EVMContractInfoProvider,
  useEVMContractInfo,
  useSetEVMContractInfo,
} from "@3rdweb-sdk/react";
import { Flex, Spinner } from "@chakra-ui/react";
import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";
import { AppLayout } from "components/app-layouts/app";
import { ConfigureNetworkSection } from "components/configure-networks/ConfigureNetworkSection";
import { ensQuery } from "components/contract-components/hooks";
import { ContractHeader } from "components/custom-contract/contract-header";
import { ContractTabRouter } from "contract-ui/layout/tab-router";
import {
  useConfiguredChainSlugRecord,
  useUpdateConfiguredChains,
} from "hooks/chains/configureChains";
import { GetStaticPaths, GetStaticProps } from "next";
import { PageId } from "page-id";
import { useEffect, useState } from "react";
import { getAllChainRecords } from "utils/allChainsRecords";
import { ThirdwebNextPage } from "utils/types";

type EVMContractProps = {
  contractInfo: EVMContractInfo;
  dehydratedState: DehydratedState;
};

const EVMContractPage: ThirdwebNextPage = () => {
  const [showNetworkConfig, setShowNetworkConfig] = useState(true);
  // show optimistic UI first - assume chain is conifgured until proven otherwise
  const [chainNotFound, setChainNotFound] = useState(false);

  // contractInfo is never undefined on this page
  const { chain, chainSlug, contractAddress } =
    useEVMContractInfo() as EVMContractInfo;

  const setContractInfo = useSetEVMContractInfo();
  const configuredChainSlugRecord = useConfiguredChainSlugRecord();
  const updateConfiguredChains = useUpdateConfiguredChains();

  useEffect(() => {
    // if server resolved the chain
    if (chain) {
      // but it is not configured on client storage
      if (!(chainSlug in configuredChainSlugRecord)) {
        // configure it so user does not have to do it manually
        updateConfiguredChains.add(chain);
      }
    }

    // if server could not resolve the chain using chainList
    else {
      // check if it is configured on client storage
      if (chainSlug in configuredChainSlugRecord) {
        const configuredChain = configuredChainSlugRecord[chainSlug];
        updateConfiguredChains.add(configuredChain);
        setContractInfo({
          chainSlug,
          contractAddress,
          chain: configuredChain,
        });
      }

      // if not found in storage as well
      else {
        // user needs to configure it manually
        setChainNotFound(true);
      }
    }
  }, [
    chain,
    chainSlug,
    configuredChainSlugRecord,
    contractAddress,
    setContractInfo,
    updateConfiguredChains,
  ]);

  return (
    <>
      {chain && <ContractHeader contractAddress={contractAddress} />}

      {chain && (
        <ContractTabRouter
          address={contractAddress}
          ecosystem="evm"
          network={chainSlug}
        />
      )}

      {chainNotFound && showNetworkConfig && (
        <ConfigureNetworkSection
          unknownNetworkName={chainSlug}
          continue={() => {
            setShowNetworkConfig(false);
          }}
        />
      )}
    </>
  );
};

export default EVMContractPage;
EVMContractPage.pageId = PageId.DeployedContract;
EVMContractPage.getLayout = (page, props: EVMContractProps) => {
  return (
    <EVMContractInfoProvider initialValue={props.contractInfo}>
      <AppLayout
        layout={"custom-contract"}
        dehydratedState={props.dehydratedState}
      >
        {page}
      </AppLayout>
    </EVMContractInfoProvider>
  );
};

EVMContractPage.fallback = (
  <>
    <AppLayout layout={"custom-contract"}>
      <Flex h="100%" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Flex>
    </AppLayout>
  </>
);

// server side ---------------------------------------------------------------

const { slugToChain } = getAllChainRecords();
export const getStaticProps: GetStaticProps<EVMContractProps> = async (ctx) => {
  const [chainSlug, contractAddress] = ctx.params?.paths as string[];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(ensQuery(contractAddress));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      contractInfo: {
        chainSlug,
        contractAddress,
        chain: chainSlug in slugToChain ? slugToChain[chainSlug] : null,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    fallback: true,
    paths: [],
  };
};
