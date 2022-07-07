import { Flex, Skeleton } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { AppLayout } from "components/app-layouts/app";
import { useLatestRelease } from "components/contract-components/hooks";
import { ReleasedContract } from "components/contract-components/released-contract";
import { FeatureIconMap } from "constants/mappings";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ReactElement } from "react";
import { Heading, LinkButton } from "tw-components";

const ContractsNamePageWrapped = () => {
  const wallet = useSingleQueryParam("wallet");
  const contractName = useSingleQueryParam("contractName");
  /*   const [release, setRelease] = useState<PublishedContract>(); */
  /* const allVersions = useAllVersions(wallet, contractName); */

  const release = useLatestRelease(wallet, contractName);

  return (
    <Flex direction="column" gap={6}>
      <Flex justifyContent="space-between" w="full">
        <Flex gap={4} alignItems="center">
          <ChakraNextImage src={FeatureIconMap["custom"]} boxSize={12} alt="" />
          <Skeleton isLoaded={release.isSuccess}>
            <Heading size="title.md">{release.data?.id}</Heading>
          </Skeleton>
        </Flex>
        <LinkButton
          size="sm"
          colorScheme="purple"
          href={`/contracts/deploy/${encodeURIComponent(
            release.data?.metadataUri.replace("ipfs://", "") || "",
          )}`}
        >
          Deploy Now
        </LinkButton>
      </Flex>
      <Flex>
        {release?.data && <ReleasedContract release={release.data} />}
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
