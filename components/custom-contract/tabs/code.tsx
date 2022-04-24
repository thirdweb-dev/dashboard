import { Box, Flex, Heading } from "@chakra-ui/react";
import { useContractFunctions } from "@thirdweb-dev/react";
import { CodeBlock } from "components/code-block/code-block";
import { Card } from "components/layout/Card";

interface ContentOverviewProps {
  contractAddress: string;
}

export const CustomContractCodeTab: React.VFC<ContentOverviewProps> = ({
  contractAddress,
}) => {
  const metadataQuery = useContractFunctions(contractAddress);

  const isError = metadataQuery.isError;
  const isSuccess = metadataQuery.isSuccess;

  const functions = metadataQuery.data?.map((f) => f.signature);

  if (isError) {
    return <Box>Contract does not support generated functions</Box>;
  }

  return (
    <Flex gap={4} direction="column">
      <Card as={Flex} gap={2} flexDirection="column">
        <Heading size="subtitle.md">Install the thirdweb SDK</Heading>
        <CodeBlock
          px={4}
          py={2}
          borderRadius="md"
          language="bash"
          code={`npm install @thirdweb-dev/sdk@dev`}
        />
      </Card>
      <Card as={Flex} gap={2} flexDirection="column">
        <Heading size="subtitle.md">
          Use your contract with the thirdweb SDK
        </Heading>
        <CodeBlock
          px={4}
          py={2}
          borderRadius="md"
          code={`import { ThirdwebSDK } from "@thirdweb-dev/sdk";

          const sdk = new ThirdwebSDK();
          const contract = await sdk.getCustomContract("${contractAddress}");`}
        />
      </Card>
      <Card as={Flex} gap={2} flexDirection="column">
        <Heading size="subtitle.md">Contract functions</Heading>
        {isSuccess
          ? functions?.map((signature) => (
              <CodeBlock
                px={4}
                py={2}
                borderRadius="md"
                key={signature}
                code={`contract.functions.${signature}`}
                language="typescript"
              />
            ))
          : ""}
      </Card>
    </Flex>
  );
};
