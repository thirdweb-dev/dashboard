import { Flex, Spinner } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { ContractTabRouter } from "contract-ui/layout/tab-router";
import { isPossibleSolanaAddress } from "lib/address-utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { PageId } from "page-id";
import { ProgramMetadata } from "program-ui/common/program-metadata";
import { isSupportedSOLNetwork } from "utils/solanaUtils";
import { ThirdwebNextPage } from "utils/types";

/**
 * thirdweb.com/<sol-network>/<sol-program-address>
 */
const SolanaProgramPage: ThirdwebNextPage = () => {
  const router = useRouter();
  const paths = router.query.paths as string[] | undefined;

  // fallback page - paths is undefined on fallback
  if (!paths || router.isFallback) {
    return (
      <Flex h="100%" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  const [solNetwork, programAddress] = paths;

  return (
    <>
      <ProgramMetadata address={programAddress} />
      <ContractTabRouter
        address={programAddress}
        ecosystem="solana"
        network={solNetwork}
      />
    </>
  );
};

export default SolanaProgramPage;
SolanaProgramPage.pageId = PageId.DeployedProgram;
SolanaProgramPage.getLayout = (page) => {
  return (
    <AppLayout
      layout={"custom-contract"}
      dehydratedState={{ mutations: [], queries: [] }}
    >
      {page}
    </AppLayout>
  );
};

// server side ---------------------------------------------------------------
export const getStaticProps: GetStaticProps = (ctx) => {
  const [solNetwork, programAddress] = ctx.params?.paths as string[];

  if (
    !programAddress ||
    !isPossibleSolanaAddress(programAddress) ||
    !isSupportedSOLNetwork(solNetwork)
  ) {
    return {
      notFound: true,
    };
  }

  // TODO - populate it with solNetwork and programAddress to context
  // and use context in components
  return {
    props: {},
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    fallback: true,
    paths: [],
  };
};
