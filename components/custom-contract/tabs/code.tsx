import { Box, Flex, Tag } from "@chakra-ui/react";
import { jsx } from "@emotion/react";
import { useContractFunctions } from "@thirdweb-dev/react";
import { FeatureWithEnabled } from "@thirdweb-dev/sdk/dist/src/constants/contract-features";
import {
  useContractFeatures,
  usePublishedMetadataQuery,
} from "components/contract-components/hooks";
import { ta } from "date-fns/locale";
import { Card, CodeBlock, Heading } from "tw-components";

interface ContentOverviewProps {
  contractAddress: string;
}

export const CustomContractCodeTab: React.VFC<ContentOverviewProps> = ({
  contractAddress,
}) => {
  const functionsQuery = useContractFunctions(contractAddress);
  const metadataQuery = usePublishedMetadataQuery(contractAddress);
  const features = useContractFeatures(metadataQuery?.data?.abi);

  const isError = functionsQuery.isError;
  const isSuccess = functionsQuery.isSuccess;

  const functions = functionsQuery.data
    ?.filter(
      (d) =>
        d.name !== "contractURI" &&
        d.name !== "setThirdwebInfo" &&
        d.name !== "getPublishMetadataUri",
    )
    .map((f) => f.signature);

  console.log(features);

  if (isError) {
    return <Box>Contract does not support generated functions</Box>;
  }

  const generateTags = (
    features: Record<string, FeatureWithEnabled> | undefined,
    tags: JSX.Element[],
  ) => {
    features &&
      Object.keys(features)
        .map((f) => features[f])
        .filter((f) => f.enabled)
        .forEach((f) => {
          tags.push(<Tag key={f.name}>{f.name}</Tag>);
          generateTags(f.features, tags);
        });
  };

  const tags: JSX.Element[] = [];
  generateTags(features, tags);
  const detectedFeaturesCard =
    tags.length > 0 ? (
      <>
        <Card as={Flex} flexDirection="column" gap={2}>
          <Heading size="subtitle.md">Detetcted Features</Heading>
          <Flex gap={2} direction="row">
            {tags}
          </Flex>
        </Card>
      </>
    ) : (
      undefinedq
    );

  return (
    <Flex gap={4} direction="column">
      <Card as={Flex} gap={2} flexDirection="column">
        <Heading size="subtitle.md">Install the thirdweb SDK</Heading>
        <CodeBlock
          px={4}
          py={2}
          borderRadius="md"
          language="bash"
          code={`npm install @thirdweb-dev/sdk`}
        />
      </Card>
      <Card as={Flex} gap={2} flexDirection="column">
        <Heading size="subtitle.md">
          Use your contract with the thirdweb SDK
        </Heading>
        <CodeBlock
          language="typescript"
          code={`import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const provider = ethers.Wallet.createRandom();
const sdk = new ThirdwebSDK(provider);
const contract = await sdk.getCustomContract("${contractAddress}");`}
        />
      </Card>
      {detectedFeaturesCard}
      <Card as={Flex} gap={2} flexDirection="column">
        <Heading size="subtitle.md">Contract functions</Heading>
        {isSuccess
          ? functions?.map((signature) => (
              <CodeBlock
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
