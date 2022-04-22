import { Box, Flex, Heading } from "@chakra-ui/react";
import { useContractFunctionsQuery } from "@thirdweb-dev/react";
import { CodeBlock } from "components/code-block/code-block";
import { Card } from "components/layout/Card";

interface ContentOverviewProps {
  contractAddress: string;
}

export const CustomContractCodeTab: React.VFC<ContentOverviewProps> = ({
  contractAddress,
}) => {
  const metadataQuery = useContractFunctionsQuery(contractAddress);

  const isError = metadataQuery.isError;
  const isSuccess = metadataQuery.isSuccess;

  const functions = metadataQuery.data?.map((f) => f.signature);

  if (isError) {
    return <Box>Contract does not support generated functions</Box>;
  }

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
