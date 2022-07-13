import { Flex, Select, Skeleton } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { AppLayout } from "components/app-layouts/app";
import { useAllVersions } from "components/contract-components/hooks";
import { ReleasedContract } from "components/contract-components/released-contract";
import { FeatureIconMap } from "constants/mappings";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import { NextPageContext } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ReactElement, useMemo, useState } from "react";
import { Heading, LinkButton, Text } from "tw-components";

interface ContractNamePage {
  query: {
    wallet: string;
    contractName: string;
  };
}

const ContractsNamePageWrapped: React.FC<ContractNamePage> = ({
  query: { wallet, contractName },
}) => {
  const allVersions = useAllVersions(wallet, contractName);
  const [selectedVersion, setSelectedVersion] = useState<string>();

  const router = useRouter();

  const release = useMemo(() => {
    if (selectedVersion) {
      return allVersions.data?.find((v) => v.version === selectedVersion);
    }
    return allVersions.data?.[0];
  }, [allVersions?.data, selectedVersion]);

  return (
    <Flex direction="column" gap={8}>
      <NextSeo
        title={`${contractName} | Deploy in one click with thirdweb deploy`}
        description={`Browse previous versions of ${contractName} and deploy it in one click to any supported blockchains.`}
        openGraph={{
          title: `${contractName} | Deploy in one click with thirdweb deploy`,
          url: `https://thirdweb.com${router.asPath}`,
          images: [
            {
              url: `https://og-image-orpin-seven.vercel.app/thirdweb?version=${release?.version}&description=${release?.description}&contractName=${contractName}&.png`,
              width: 1200,
              height: 650,
              alt: "thirdweb",
            },
          ],
        }}
      />
      <Flex justifyContent="space-between" w="full">
        <Flex gap={4} alignItems="center">
          <ChakraNextImage src={FeatureIconMap["custom"]} boxSize={12} alt="" />
          <Skeleton isLoaded={allVersions.isSuccess}>
            <Heading size="title.md">{contractName}</Heading>
            <Text>{release?.description}</Text>
          </Skeleton>
        </Flex>
        <Flex gap={3}>
          <Select onChange={(e) => setSelectedVersion(e.target.value)} w={24}>
            {(allVersions.data || []).map((releasedVersion) => (
              <option
                key={releasedVersion.version}
                value={releasedVersion.version}
              >
                {releasedVersion.version}
              </option>
            ))}
          </Select>
          <LinkButton
            colorScheme="purple"
            href={`/contracts/deploy/${encodeURIComponent(
              release?.metadataUri.replace("ipfs://", "") || "",
            )}`}
          >
            Deploy {selectedVersion || "Now"}
          </LinkButton>
        </Flex>
      </Flex>
      <Flex>{release && <ReleasedContract release={release} />}</Flex>
    </Flex>
  );
};

export default function ContractNamePage(props: ContractNamePage) {
  return (
    <PublisherSDKContext>
      <ContractsNamePageWrapped {...props} />
    </PublisherSDKContext>
  );
}

ContractNamePage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

ContractNamePage.getInitialProps = async (ctx: NextPageContext) => {
  return {
    query: {
      wallet: ctx.query.wallet,
      contractName: ctx.query.contractName[0],
    },
  };
};
