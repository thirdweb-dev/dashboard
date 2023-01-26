import { ClientOnly } from "components/ClientOnly/ClientOnly";
import { AppLayout } from "components/app-layouts/app";
import { ContractTabRouter } from "contract-ui/layout/tab-router";
import { isPossibleSolanaAddress } from "lib/address-utils";
import { useRouter } from "next/router";
import { PageId } from "page-id";
import { ProgramMetadata } from "program-ui/common/program-metadata";
import { useEffect, useState } from "react";
import { DashboardSolanaNetwork } from "utils/solanaUtils";
import { ThirdwebNextPage } from "utils/types";

/**
 * thirdweb.com/<sol-network>/<sol-program-address>
 */
const SolanaProgramPage: ThirdwebNextPage = () => {
  const [programAddress, setProgramAddress] = useState<string | undefined>();
  const [solNetwork, setSolNetwork] = useState<
    DashboardSolanaNetwork | undefined
  >();

  // console.log("programAddress", programAddress);
  // console.log("solNetwork", solNetwork);

  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const [_solNetwork, _programAddress] = url.pathname.slice(1).split("/");
    setProgramAddress(_programAddress);
    setSolNetwork(_solNetwork as DashboardSolanaNetwork);
    // router as a dependency to re-run this effect when the client side route changes

    if (!isPossibleSolanaAddress(_programAddress)) {
      router.replace("/404");
    }
  }, [router]);

  return (
    <>
      <ProgramMetadata address={programAddress || ""} />
      <ClientOnly ssr={null}>
        {programAddress && solNetwork && (
          <ContractTabRouter
            address={programAddress}
            ecosystem="solana"
            network={solNetwork}
          />
        )}
      </ClientOnly>
    </>
  );
};

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

export default SolanaProgramPage;
