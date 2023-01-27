import { Flex, Spinner } from "@chakra-ui/react";
import { DehydratedState } from "@tanstack/react-query";
import { AppLayout } from "components/app-layouts/app";
import {
  SolanaProgramInfo,
  SolanaProgramInfoProvider,
} from "contexts/solana-program";
import { ContractTabRouter } from "contract-ui/layout/tab-router";
import { isPossibleSolanaAddress } from "lib/address-utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { PageId } from "page-id";
import { ProgramMetadata } from "program-ui/common/program-metadata";
import { getSolNetworkFromNetworkPath } from "utils/solanaUtils";
import { ThirdwebNextPage } from "utils/types";

type SolanaProgramProps = {
  programInfo: SolanaProgramInfo;
  dehydratedState: DehydratedState;
};

/**
 * thirdweb.com/<sol-network>/<sol-program-address>
 */
const SolanaProgramPage: ThirdwebNextPage = (props: SolanaProgramProps) => {
  const router = useRouter();

  // fallback page
  // TODO better skeleton needed
  // TODO do we even need this or can we just rely on the pieces below to show skeletons properly?
  if (router.isFallback) {
    return (
      <Flex h="100%" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <>
      <ProgramMetadata address={props.programInfo?.programAddress || ""} />

      <ContractTabRouter
        address={props.programInfo?.programAddress || ""}
        ecosystem="solana"
        network={props.programInfo?.slug || ""}
      />
    </>
  );
};

export default SolanaProgramPage;
SolanaProgramPage.pageId = PageId.DeployedProgram;
SolanaProgramPage.getLayout = (page, pageProps: SolanaProgramProps) => {
  return (
    <SolanaProgramInfoProvider value={pageProps.programInfo}>
      <AppLayout
        layout={"custom-contract"}
        dehydratedState={{ mutations: [], queries: [] }}
      >
        {page}
      </AppLayout>
    </SolanaProgramInfoProvider>
  );
};

// server side ---------------------------------------------------------------
export const getStaticProps: GetStaticProps<SolanaProgramProps> = (ctx) => {
  const [slug, programAddress] = ctx.params?.paths as string[];

  const solNetwork = getSolNetworkFromNetworkPath(slug);

  if (
    !programAddress ||
    !isPossibleSolanaAddress(programAddress) ||
    !solNetwork
  ) {
    return {
      notFound: true,
    };
  }

  // TODO - populate it with solNetwork and programAddress to context
  // and use context in components
  return {
    props: {
      dehydratedState: { mutations: [], queries: [] },
      programInfo: {
        programAddress,
        network: solNetwork,
        slug,
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
