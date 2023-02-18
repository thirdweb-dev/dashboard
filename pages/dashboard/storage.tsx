import {
  Divider,
  Flex,
  GridItem,
  Input,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import { useAddress, useStorageUpload } from "@thirdweb-dev/react";
import { UploadProgressEvent } from "@thirdweb-dev/storage";
import { AppLayout } from "components/app-layouts/app";
import { RelevantDataSection } from "components/dashboard/RelevantDataSection";
import { IpfsUploadDropzone } from "components/ipfs-upload/dropzone";
import { CodeSelector } from "components/product-pages/homepage/CodeSelector";
import { replaceIpfsUrl } from "lib/sdk";
import { PageId } from "page-id";
import { useState } from "react";
import { Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "storage";

const links = [
  {
    title: "Storage docs",
    url: "https://docs.thirdweb.com/storage",
  },
  {
    title: "Upload And Pin Files to IPFS",
    url: "https://blog.thirdweb.com/guides/how-to-upload-and-pin-files-to-ipfs-using-storage/",
  },
];

const videos = [
  {
    title: "How To Easily Add IPFS Into Your Web3 App",
    url: "https://www.youtube.com/watch?v=4Nnu9Cy7SKc",
  },
  {
    title: "How to Upload Files to IPFS (Step by Step Guide)",
    url: "https://www.youtube.com/watch?v=wyYkpMgEVxE",
  },
];

const DashboardStorage: ThirdwebNextPage = () => {
  const address = useAddress();
  const [ipfsHash, setIpfsHash] = useState("");
  const [progress, setProgress] = useState<UploadProgressEvent>({
    progress: 0,
    total: 100,
  });
  const storageUpload = useStorageUpload({
    onProgress: setProgress,
    metadata: {
      address,
      uploadedAt: new Date().toISOString(),
      uploadedFrom: "thirdweb-dashboard",
    },
  });

  return (
    <SimpleGrid columns={{ base: 1, xl: 4 }} gap={8} mt={10}>
      <GridItem as={Flex} colSpan={{ xl: 3 }} direction="column" gap={8}>
        <Flex flexDir="column" gap={{ base: 16, md: 16 }}>
          <Flex flexDir="column" gap={4}>
            <Heading size="title.lg" as="h1">
              Storage
            </Heading>
            <Flex flexDir="column" gap={4}>
              <Text>
                Everything uploaded using thirdweb is automatically uploaded and
                pinned to IPFS.
              </Text>
              <IpfsUploadDropzone
                storageUpload={storageUpload}
                progress={progress}
                setProgress={setProgress}
              />
            </Flex>
          </Flex>
          <Flex flexDir="column" w="full" gap={4}>
            <Heading size="title.md" as="h2">
              Gateway
            </Heading>
            <Text>
              Enter an IPFS hash to generate a gateway URL that accesses your
              hosted data on IPFS.
            </Text>
            <Input
              bg="transparent"
              value={ipfsHash}
              onChange={(e) => setIpfsHash(e.target.value)}
              borderColor="borderColor"
            />
            <SimpleGrid
              columns={{ base: 1, md: 24 }}
              alignItems="center"
              gap={1}
            >
              <GridItem as={Text} colSpan={{ base: 1, md: 3 }}>
                <Text>Gateway URL:</Text>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 21 }}>
                <Link
                  href={
                    ipfsHash.includes("ipfs://")
                      ? replaceIpfsUrl(ipfsHash)
                      : "https://gateway.ipfscdn.io/ipfs/"
                  }
                  isExternal
                  _hover={{ textDecoration: "none" }}
                  role="group"
                >
                  <Text
                    noOfLines={1}
                    color="blue.500"
                    _groupHover={{ opacity: 0.9 }}
                  >
                    {ipfsHash.includes("ipfs://")
                      ? replaceIpfsUrl(ipfsHash)
                      : "https://gateway.ipfscdn.io/ipfs/"}
                  </Text>
                </Link>
              </GridItem>
            </SimpleGrid>
          </Flex>
          <Flex flexDir="column" w="full" gap={4}>
            <Heading size="title.md" as="h2">
              Integrate into your app
            </Heading>
            <CodeSelector
              snippets="storage"
              defaultLanguage="cli"
              docs="https://portal.thirdweb.com/storage"
            />
          </Flex>
        </Flex>
      </GridItem>
      <GridItem as={Flex} direction="column" gap={6}>
        <RelevantDataSection
          data={links}
          title="link"
          TRACKING_CATEGORY={TRACKING_CATEGORY}
        />
        <Divider />
        <RelevantDataSection
          data={videos}
          title="video"
          TRACKING_CATEGORY={TRACKING_CATEGORY}
        />
      </GridItem>
    </SimpleGrid>
  );
};

DashboardStorage.getLayout = (page, props) => (
  <AppLayout {...props}>{page}</AppLayout>
);
DashboardStorage.pageId = PageId.DashboardStorage;

export default DashboardStorage;
