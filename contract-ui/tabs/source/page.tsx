import { useQueryWithNetwork } from "@3rdweb-sdk/react/hooks/query/useQueryWithNetwork";
import { Flex, Icon, Spinner } from "@chakra-ui/react";
import { useSDK } from "@thirdweb-dev/react";
import { FiCheck, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { Card, CodeBlock, Heading } from "tw-components";

interface CustomContractSourcePageProps {
  contractAddress?: string;
}

function useContractSources(contractAddress?: string) {
  const sdk = useSDK();
  return useQueryWithNetwork(
    [contractAddress],
    async () => {
      return sdk
        ?.getPublisher()
        .fetchContractSourcesFromAddress(contractAddress || "");
    },
    {
      enabled: !!contractAddress,
    },
  );
}

export const CustomContractSourcePage: React.FC<
  CustomContractSourcePageProps
> = ({ contractAddress }) => {
  const contractQuery = useContractSources(contractAddress);

  if (!contractAddress) {
    return <div>No contract address provided</div>;
  }
  if (!contractQuery || contractQuery?.isLoading) {
    return (
      <Flex direction="row" align="center" gap={2}>
        <Spinner color="purple.500" size="xs" />
        <Heading size="title.sm">Loading...</Heading>
      </Flex>
    );
  }

  const codeNotFound = (
    <Flex direction="row" align="center" gap={2}>
      <Icon as={FiXCircle} color="red.500" />
      <Heading size="title.sm">Contract source code not available</Heading>
    </Flex>
  );

  if (contractQuery.isError) {
    return codeNotFound;
  }

  // clean up the source filenames and filter out libraries
  const sources = contractQuery.data
    ? contractQuery.data
        .filter((source) => !source.filename.includes("@"))
        .map((source) => {
          return {
            ...source,
            filename: source.filename.split("/").pop(),
          };
        })
    : [];
  console.log(sources);

  return (
    <Flex direction="column" gap={8}>
      {sources && sources.length > 0 ? (
        <>
          <Flex direction="row" align="center" gap={2}>
            <Heading size="title.sm">Verified Contract Source Code</Heading>
            <Icon as={FiCheckCircle} color="green.500" />
          </Flex>
          {sources.map((signature) => (
            <Card
              as={Flex}
              gap={4}
              flexDirection="column"
              key={signature.filename}
            >
              <Heading size="label.md">{signature.filename}</Heading>
              <CodeBlock code={signature.source} language="javascript" />
            </Card>
          ))}
        </>
      ) : (
        codeNotFound
      )}
    </Flex>
  );
};
