import { Flex, Select } from "@chakra-ui/react";
import { useSDK } from "@thirdweb-dev/react";
import { PublishedContract } from "@thirdweb-dev/sdk";
import { AppLayout } from "components/app-layouts/app";
import { useAllVersions, useLatestRelease } from "components/contract-components/hooks";
import { ReleasedContract } from "components/contract-components/released-contract";
import { ReleaserHeader } from "components/contract-components/releaser-header";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ReactElement, useState } from "react";

const ContractsNamePageWrapped = () => {
  const wallet = useSingleQueryParam("wallet");
  const contractName = useSingleQueryParam("contractName");
  /*   const [release, setRelease] = useState<PublishedContract>(); */
  /* const allVersions = useAllVersions(wallet, contractName); */

  const release = useLatestRelease(wallet, contractName);
  console.log({ release });

  return (
    <Flex>
      {/* {wallet && <ReleaserHeader wallet={wallet} />} */}
      <Flex>
{/*         <Select onChange={(e) => setRelease(e.target.value)}>
          {(allVersions.data || []).map((version) => (
            <option value={version}>{version.id}</option>
          ))}
        </Select> */}
      </Flex>
      <Flex>
        {release?.data && (
          <ReleasedContract release={release.data} />
        )}
      </Flex>
    </Flex>
  );
};

export default function ContractNamePage() {
  return (
    <PublisherSDKContext>
      <ContractsNamePageWrapped />
    </PublisherSDKContext>
  );
}

ContractNamePage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
