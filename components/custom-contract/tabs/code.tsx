import { useQueryWithNetwork } from "@3rdweb-sdk/react/hooks/query/useQueryWithNetwork";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { CustomContract } from "@thirdweb-dev/sdk";
import { CodeBlock } from "components/code-block/code-block";
import { Card } from "components/layout/Card";
import { useResolvedContract } from "pages/[wallet]/[network]/[...customContract]";

function useContractFunctionsQuery(
  contractAddress: string,
  contractQuery: ReturnType<typeof useResolvedContract>,
) {
  return useQueryWithNetwork(
    ["contract", contractAddress, "publishedMetadata", "extractFunctions"],
    () => {
      // TODO (byoc) cleanup
      return (
        contractQuery.data?.contract as CustomContract
      )?.publishedMetadata?.extractFunctions();
    },
    {
      enabled:
        !!contractQuery.data?.contract &&
        !!("publishedMetadata" in contractQuery.data.contract) &&
        !!("extractFunctions" in contractQuery.data.contract.publishedMetadata),
    },
  );
}

interface ContentOverviewProps {
  contractAddress: string;
}

export const CustomContractCodeTab: React.VFC<ContentOverviewProps> = ({
  contractAddress,
}) => {
  const contractQuery = useResolvedContract(contractAddress);
  const metadataQuery = useContractFunctionsQuery(
    contractAddress,
    contractQuery,
  );

  const isError = metadataQuery.isError || contractQuery.isError;
  const isSuccess = metadataQuery.isSuccess;

  const functions = metadataQuery.data?.map((f) => f.signature);

  if (isError) {
    return <Box>Failed to load contract metadata</Box>;
  }

  // TODO (byoc) jonas make this pretty pls
  return (
    <Flex gap={4} direction="column">
      <Card as={Flex} gap={2} flexDirection="column">
        <Heading size="subtitle.sm">
          Use your contract with the thirdweb SDK
        </Heading>
        <CodeBlock
          px={4}
          py={2}
          borderRadius="md"
          code={`import { ThirdwebSDK } from "@thirdweb-dev/sdk";

          const sdk = new ThirdwebSDK();
          const contract = sdk.getCustomContract("${contractAddress}");`}
        />
      </Card>
      <Card as={Flex} gap={2} flexDirection="column">
        <Heading size="subtitle.sm">Contract functions</Heading>
        {isSuccess
          ? functions?.map((signature) => (
              <CodeBlock
                px={4}
                py={2}
                borderRadius="md"
                key={signature}
                code={signature}
                language="typescript"
              />
            ))
          : ""}
      </Card>
    </Flex>
  );
};
