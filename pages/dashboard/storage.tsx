import { Divider, Flex, GridItem, SimpleGrid, Tooltip } from "@chakra-ui/react";
import { useAddress, useStorageUpload } from "@thirdweb-dev/react";
import { UploadProgressEvent } from "@thirdweb-dev/storage";
import { AppLayout } from "components/app-layouts/app";
import { RelevantDataSection } from "components/dashboard/RelevantDataSection";
import { IpfsUploadDropzone } from "components/ipfs-upload/dropzone";
import { CodeSelector } from "components/product-pages/homepage/CodeSelector";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { useState } from "react";
import { Card, Heading, Text, TrackedCopyButton } from "tw-components";
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

  const title = "IPFS Upload & Pinning Service | Pin Files to IPFS for Free";
  const description =
    "Upload, pin, and host NFT metadata, images, or any type of file on IPFS—using thirdweb's IPFS pinning service. Store files on IPFS for free.";

  return (
    <SimpleGrid columns={{ base: 1, xl: 4 }} gap={8} mt={10}>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
        }}
      />
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
              Using our gateway, you can easily access files and folders stored
              on IPFS:
            </Text>
            <Card
              as={Flex}
              w="full"
              alignItems="center"
              py={2}
              justifyContent="space-between"
            >
              <Text
                fontFamily="mono"
                overflow={{ base: "scroll", md: "inherit" }}
              >
                https://gateway.ipfscdn.io/ipfs/
              </Text>
              <Flex>
                <Tooltip
                  p={0}
                  label={
                    <Flex p={2}>
                      <Text>Copy code</Text>
                    </Flex>
                  }
                  bgColor="backgroundCardHighlight"
                  borderRadius="xl"
                  placement="top"
                  shouldWrapChildren
                >
                  <TrackedCopyButton
                    value="https://gateway.ipfscdn.io/ipfs/"
                    category="storage"
                    label="copy-gateway-url"
                    aria-label="Copy gateway URL"
                  />
                </Tooltip>
              </Flex>
            </Card>
          </Flex>
          <Flex flexDir="column" w="full" gap={4}>
            <Heading size="title.md" as="h2">
              CLI
            </Heading>
            <Flex flexDir="column" gap={4}>
              <Text>
                Using thirdweb CLI, you can easily upload files and folders to
                IPFS from your terminal:
              </Text>
              <Card
                as={Flex}
                w="full"
                alignItems="center"
                py={2}
                justifyContent="space-between"
              >
                <Text
                  fontFamily="mono"
                  overflow={{ base: "scroll", md: "inherit" }}
                >
                  npx thirdweb upload ./path/to/file-or-folder
                </Text>
                <Flex>
                  <Tooltip
                    p={0}
                    label={
                      <Flex p={2}>
                        <Text>Copy code</Text>
                      </Flex>
                    }
                    bgColor="backgroundCardHighlight"
                    borderRadius="xl"
                    placement="top"
                    shouldWrapChildren
                  >
                    <TrackedCopyButton
                      value="npx thirdweb upload ./path/to/file.jpg"
                      category="storage"
                      label="copy-cli-file-upload"
                      aria-label="Copy code"
                    />
                  </Tooltip>
                </Flex>
              </Card>
            </Flex>
          </Flex>
          <Flex flexDir="column" w="full" gap={4}>
            <Heading size="title.md" as="h2">
              Integrate into your app
            </Heading>
            <CodeSelector
              snippets="storage"
              defaultLanguage="react"
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
