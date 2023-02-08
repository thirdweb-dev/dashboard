import {
  EVMContractInfo,
  useEVMContractInfo,
  useSetEVMContractInfo,
} from "@3rdweb-sdk/react";
import { Alert, AlertIcon, Box, Flex, Spinner } from "@chakra-ui/react";
import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";
import { AppLayout } from "components/app-layouts/app";
import { ConfigureNetworks } from "components/configure-networks/ConfigureNetworks";
import { ensQuery } from "components/contract-components/hooks";
import { ContractHeader } from "components/custom-contract/contract-header";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { ContractTabRouter } from "contract-ui/layout/tab-router";
import {
  useConfiguredChainSlugRecord,
  useConfiguredChainsRecord,
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
  // show optimistic UI first - assume chain is conifgured until proven otherwise
  const [chainNotFound, setChainNotFound] = useState(false);

  // contractInfo is never undefined on this page
  const { chain, chainSlug, contractAddress } =
    useEVMContractInfo() as EVMContractInfo;

  const setContractInfo = useSetEVMContractInfo();
  const configuredChainSlugRecord = useConfiguredChainSlugRecord();
  const configuredChainsRecord = useConfiguredChainsRecord();
  const updateConfiguredChains = useUpdateConfiguredChains();

  useEffect(() => {
    // if server resolved the chain
    if (chain) {
      // but it is not configured
      if (!(chainSlug in configuredChainSlugRecord)) {
        // auto configure it
        updateConfiguredChains.add([
          {
            ...chain,
            isAutoConfigured: true,
          },
        ]);
      }

      // it is configured
      else {
        // if server resolved it and user has it configured. user may have updated it on client
        // currently user can only update RPC - so check if it is updated or not
        // if updated, update the contractInfo.chain

        const configuredChain = configuredChainSlugRecord[chainSlug];
        if (configuredChain.rpc[0] !== chain.rpc[0]) {
          setContractInfo({
            chainSlug,
            contractAddress,
            chain: configuredChain,
          });
        }
      }
    }

    // if server could not resolve the chain using allChains
    else {
      // if it is configured on client storage, use that
      if (chainSlug in configuredChainSlugRecord) {
        setContractInfo({
          chainSlug,
          contractAddress,
          chain: configuredChainSlugRecord[chainSlug],
        });
      } else if (chainSlug in configuredChainsRecord) {
        // this is for thirdweb internal tools
        // it allows us to use chainId as slug for a custom network as well

        const chainId = Number(chainSlug);
        const _chain = configuredChainsRecord[chainId];

        // replace the chainId with slug in URL without reloading the page
        // If we don't do this, tanstack router creates issues
        window.history.replaceState(
          null,
          document.title,
          `/${_chain.slug}/${contractAddress}`,
        );

        setContractInfo({
          chainSlug: _chain.slug,
          contractAddress,
          chain: _chain,
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
    configuredChainsRecord,
    contractAddress,
    setContractInfo,
    updateConfiguredChains,
  ]);

  const isSlugNumber = !isNaN(Number(chainSlug));

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

      {chainNotFound && (
        <HomepageSection>
          <Box mb={8} mt={8}>
            <Alert borderRadius="md" background="backgroundHighlight">
              <AlertIcon />
              You tried to connecting to {isSlugNumber
                ? "Chain"
                : "Network"} ID {`"`}
              {chainSlug}
              {`"`} but it is not configured yet. Please configure it and try
              again.
            </Alert>
          </Box>

          <Box
            border="1px solid"
            borderRadius="md"
            borderColor="backgroundHighlight"
            overflow="hidden"
            _light={{
              background: "white",
            }}
          >
            <ConfigureNetworks
              prefillSlug={isSlugNumber ? undefined : chainSlug}
              prefillChainId={isSlugNumber ? chainSlug : undefined}
              onNetworkConfigured={(network) => {
                if (chainSlug === network.slug) {
                  setChainNotFound(false);
                }
              }}
            />
          </Box>
        </HomepageSection>
      )}
    </>
  );
};

export default EVMContractPage;
EVMContractPage.pageId = PageId.DeployedContract;
EVMContractPage.getLayout = (page, props: EVMContractProps) => {
  // app layout has to come first in both getLayout and fallback
  return (
    <AppLayout
      layout={"custom-contract"}
      dehydratedState={props.dehydratedState}
      // has to be passed directly because the provider can not be above app layout in the tree
      contractInfo={props.contractInfo}
    >
      {page}
    </AppLayout>
  );
};

// app layout has to come first in both getLayout and fallback
EVMContractPage.fallback = (
  <AppLayout layout={"custom-contract"}>
    <Flex h="100%" justifyContent="center" alignItems="center">
      <Spinner size="xl" />
    </Flex>
  </AppLayout>
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
