import type { ConsolePage } from "../../_app";
import { useQueryWithNetwork } from "@3rdweb-sdk/react/hooks/query/useQueryWithNetwork";
import {
  AspectRatio,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { useSDK } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { AppLayout } from "components/app-layouts/app";
import { Card } from "components/layout/Card";
import { AddressCopyButton } from "components/web3/AddressCopyButton";
// import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";
import invariant from "tiny-invariant";

const CustomContractPage: ConsolePage = () => {
  const router = useRouter();

  // const network = useSingleQueryParam("network");
  const [contractAddress] = router.query.customContract || [];

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={6}>
      <GridItem colSpan={{ base: 12, md: 8 }}>
        <ContractMetadata contractAddress={contractAddress} />
      </GridItem>
      <GridItem as={Card} colSpan={{ base: 12, md: 4 }}>
        actions will go here
      </GridItem>
      <GridItem as={Card} colSpan={{ base: 12 }}>
        analytics / data section
      </GridItem>
      <GridItem as={Card} colSpan={{ base: 12 }}>
        main content table
      </GridItem>
    </Grid>
  );
};

export default CustomContractPage;

CustomContractPage.Layout = AppLayout;

type PossibleContractInstance = Awaited<
  ReturnType<ThirdwebSDK["unstable_getCustomContract"]>
>;

function fetchContractMetadata(contractInstance: PossibleContractInstance) {
  invariant(
    contractInstance?.metadata,
    "contract does not support metadata api",
  );
  return contractInstance.metadata.get();
}

function useContractMetadataQuery(contractAddress?: string) {
  const sdk = useSDK();
  return useQueryWithNetwork(
    ["contract-metadata", contractAddress],
    async () =>
      contractAddress
        ? await fetchContractMetadata(
            await sdk?.unstable_getCustomContract(contractAddress),
          )
        : undefined,
    { enabled: !!contractAddress && !!sdk },
  );
}

interface ContractQueryProps {
  contractAddress?: string;
}

interface ContractMetadataProps extends ContractQueryProps {}

export const ContractMetadata: React.VFC<ContractMetadataProps> = ({
  contractAddress,
}) => {
  const metadataQuery = useContractMetadataQuery(contractAddress);
  if (metadataQuery.isError) {
    return <div>error loading metadata</div>;
  }
  const renderName = metadataQuery.data?.name || contractAddress || "";
  const contractImage = metadataQuery.data?.image;

  return (
    <Flex gap={3} direction="row" align="center">
      {contractImage && (
        <Image
          src={contractImage}
          objectFit="contain"
          boxSize={{ base: "64px", md: "96px" }}
          alt={renderName}
        />
      )}

      <Flex direction="column" alignItems="flex-start">
        <Heading>{renderName}</Heading>

        <Flex
          justifyContent="center"
          alignItems="center"
          my={3}
          flexDir={{ base: "column", md: "row" }}
          mr={{ base: 2, md: 0 }}
        >
          <AddressCopyButton variant="solid" address={contractAddress} />
        </Flex>
      </Flex>
    </Flex>
  );
};
