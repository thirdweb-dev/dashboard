import { Flex } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { usePublishedContractsQuery } from "components/contract-components/hooks";
import { ReleaserHeader } from "components/contract-components/releaser/releaser-header";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { Card } from "tw-components";

const UserPageWrapped = () => {
  const wallet = useSingleQueryParam("wallet");
  const router = useRouter();
  const publishedContracts = usePublishedContractsQuery(wallet);

  // We do this so it doesn't break for users that haven't updated their CLI
  useEffect(() => {
    const previousPath = router.asPath.split("/")[2];
    if (previousPath !== "[wallet]" && wallet?.startsWith("Qm")) {
      router.replace(`/contracts/deploy/${previousPath}`);
    }
  }, [wallet, router]);

  return (
    <Flex flexDir="column" gap={3}>
      {wallet && <ReleaserHeader wallet={wallet} />}
      <Flex flexDir="column" gap={3}>
        {(publishedContracts?.data || []).map((publishedContract) => (
          <Card key={publishedContract.id}>
            {publishedContract.metadataUri}
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};

export default function UserPage() {
  return (
    <PublisherSDKContext>
      <UserPageWrapped />
    </PublisherSDKContext>
  );
}

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
