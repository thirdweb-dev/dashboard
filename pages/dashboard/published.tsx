import { ContractsSidebar } from "../../core-ui/sidebar/contracts";
import { ConnectWallet } from "@3rdweb-sdk/react/components/connect-wallet";
import { Box, Container, Divider, Flex } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { ClientOnly } from "components/ClientOnly/ClientOnly";
import { AppLayout } from "components/app-layouts/app";
import { PublishedContracts } from "components/contract-components/tables/published-contracts";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import { PageId } from "page-id";
import { useEffect, useState } from "react";
import { Card, Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

/**
 *
 * @TODO
 * Initially the FTUX is shown, then the contracts are shown. This creates a flash of wrong content.
 * To fix this, we need to hold off rendering either the FTUX or the contracts until we know which one to show.
 */

const Published: ThirdwebNextPage = () => {
  const address = useAddress();

  /** put the component is loading state for sometime to avoid layout shift */
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  return (
    <Box pt={8}>
      <ClientOnly fadeInDuration={600} ssr={null}>
        <ContractsSidebar activePage="published" />
        {!isLoading && (
          <>
            {/* TODO: add <GetStarted /> */}
            {address && <PublishedContractsPage address={address} />}
          </>
        )}
      </ClientOnly>
    </Box>
  );
};

Published.getLayout = (page, props) => (
  <AppLayout ecosystem="evm" {...props}>
    {page}
  </AppLayout>
);
Published.pageId = PageId.Contracts;

export default Published;

interface ContractsProps {
  address: string;
}

const PublishedContractsPage: React.FC<ContractsProps> = ({ address }) => {
  return (
    <Flex direction="column" gap={8}>
      <PublisherSDKContext>
        <PublishedContracts address={address} />
      </PublisherSDKContext>
    </Flex>
  );
};
