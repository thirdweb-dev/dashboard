import {
  Divider,
  Flex,
  GridItem,
  Select,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import {
  useAllVersions,
  useResolvedEnsName,
} from "components/contract-components/hooks";
import { ReleasedContract } from "components/contract-components/released-contract";
import { FeatureIconMap } from "constants/mappings";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { Heading, LinkButton, Text } from "tw-components";

export interface ReleaseWithVersionPageProps {
  author: string;
  contractName: string;
  version: string;
}

export const ReleaseWithVersionPage: React.FC<ReleaseWithVersionPageProps> = ({
  author,
  contractName,
  version: initialVersion,
}) => {
  const resolvedAddress = useResolvedEnsName(author);

  const [version, setVersion] = useState(initialVersion);

  const router = useRouter();

  const allVersions = useAllVersions(
    resolvedAddress.data || undefined,
    contractName,
  );

  const release = useMemo(() => {
    return (
      allVersions.data?.find((v) => v.version === version) ||
      allVersions.data?.[0]
    );
  }, [allVersions?.data, version]);

  return (
    <SimpleGrid columns={12} gap={{ base: 6, md: 12 }} w="full">
      <GridItem colSpan={{ base: 12, md: 9 }}>
        <Flex gap={4} alignItems="center">
          <ChakraNextImage
            flexShrink={0}
            src={FeatureIconMap["custom"]}
            boxSize={12}
            alt=""
          />
          <Skeleton isLoaded={allVersions.isSuccess}>
            <Flex direction="column" gap={2}>
              <Heading size="title.md">{release?.name}</Heading>
              <Text>{release?.description}</Text>
            </Flex>
          </Skeleton>
        </Flex>
      </GridItem>
      <GridItem colSpan={{ base: 12, md: 3 }}>
        <Flex gap={3} direction="column">
          <Select
            onChange={(e) => {
              const path =
                e.target.value === allVersions.data?.[0].version
                  ? `/${author}/${contractName}`
                  : `/${author}/${contractName}/${e.target.value}`;
              router.push(path, undefined, { shallow: true });
              setVersion(e.target.value);
            }}
            value={version}
          >
            {(allVersions?.data || []).map((releasedVersion, idx) => (
              <option
                key={releasedVersion.version}
                value={releasedVersion.version}
              >
                {releasedVersion.version}
                {idx === 0 ? " (latest)" : ""}
              </option>
            ))}
          </Select>
          <LinkButton
            flexShrink={0}
            colorScheme="purple"
            href={`/contracts/deploy/${encodeURIComponent(
              release?.metadataUri.replace("ipfs://", "") || "",
            )}`}
          >
            Deploy Now
          </LinkButton>
        </Flex>
      </GridItem>
      <GridItem colSpan={12} display={{ base: "inherit", md: "none" }}>
        <Divider />
      </GridItem>
      {release && <ReleasedContract release={release} walletOrEns={author} />}
    </SimpleGrid>
  );
};
