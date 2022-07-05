import { useActiveChainId } from "@3rdweb-sdk/react";
import { useQueryWithNetwork } from "@3rdweb-sdk/react/hooks/query/useQueryWithNetwork";
import { Flex, Icon, Link, Spinner } from "@chakra-ui/react";
import { useSDK } from "@thirdweb-dev/react";
import { useState } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { Button, Card, CodeBlock, Heading } from "tw-components";

interface CustomContractSourcePageProps {
  contractAddress?: string;
}

function useContractSources(contractAddress?: string) {
  const sdk = useSDK();
  return useQueryWithNetwork(
    [contractAddress],
    async () => {
      return await sdk
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
  const chainId = useActiveChainId();

  const [verifying, setVerifying] = useState(false);
  const [etherscanGUID, setEtherscanGUID] = useState<string | undefined>();
  const [verificationResult, setVerificationResult] = useState<
    string | undefined
  >();

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
    <Flex direction="column" align="left" gap={2}>
      <Flex direction="row" align="center" gap={2}>
        <Icon as={FiXCircle} color="red.500" />
        <Heading size="title.sm">Contract source code not available</Heading>
      </Flex>
      <Heading size="subtitle.sm">
        Try deploying with{" "}
        <Link
          href="https://portal.thirdweb.com/thirdweb-deploy/thirdweb-cli"
          isExternal
        >
          thirdweb CLI v0.5+
        </Link>
      </Heading>
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

  return (
    <Flex direction="column" gap={8}>
      {sources && sources.length > 0 ? (
        <>
          <Flex direction="row" align="center" gap={2}>
            <Heading size="title.sm">Verified Contract Source Code</Heading>
            <Icon as={FiCheckCircle} color="green.500" />
            <Button
              onClick={async () => {
                setEtherscanGUID(undefined);
                setVerificationResult(undefined);
                setVerifying(true);
                await fetch("/api/verify", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    contractAddress,
                    chainId,
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.guid) {
                      setEtherscanGUID(data.guid);
                    } else if (data.error) {
                      setVerificationResult(data.error);
                    }
                    setVerifying(false);
                  })
                  .catch((e) => console.log(e));
              }}
            >
              Verify on Etherscan
            </Button>
            {verifying && <Spinner color="purple.500" size="xs" />}
            {etherscanGUID ? (
              <Button
                onClick={async () => {
                  setVerificationResult(undefined);
                  await fetch(
                    `/api/checkVerificationStatus?guid=${etherscanGUID}&chainId=${chainId}`,
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      setVerificationResult(data.result);
                    })
                    .catch((e) => console.log(e));
                }}
              >
                Check verification
              </Button>
            ) : null}
            {verificationResult ? (
              <Heading size="label.md">{verificationResult.toString()}</Heading>
            ) : null}
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
