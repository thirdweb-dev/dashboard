import { NoWallet } from "./no-wallet";
import { useAllProgramsList } from "@3rdweb-sdk/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { ClientOnly } from "components/ClientOnly/ClientOnly";
import { AppLayout } from "components/app-layouts/app";
import { DeployedPrograms } from "components/contract-components/tables/deployed-programs";
import { PageId } from "page-id";
import { useEffect, useState } from "react";
import { ThirdwebNextPage } from "utils/types";

/**
 *
 * @TODO
 * Initially the FTUX is shown, then the contracts are shown. This creates a flash of wrong content.
 * To fix this, we need to hold off rendering either the FTUX or the contracts until we know which one to show.
 */

const Programs: ThirdwebNextPage = () => {
  const { publicKey } = useWallet();

  /** put the component is loading state for sometime to avoid layout shift */
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  const allProgramAccounts = useAllProgramsList(publicKey?.toBase58());

  return (
    <ClientOnly fadeInDuration={600} ssr={null}>
      {!isLoading && (
        <>
          {publicKey ? (
            <DeployedPrograms programListQuery={allProgramAccounts} />
          ) : (
            <NoWallet ecosystem="solana" />
          )}
        </>
      )}
    </ClientOnly>
  );
};

Programs.getLayout = (page, props) => (
  <AppLayout ecosystem="solana" {...props}>
    {page}
  </AppLayout>
);
Programs.pageId = PageId.Programs;

export default Programs;
