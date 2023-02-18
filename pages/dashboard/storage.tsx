import { Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import { useStorageUpload } from "@thirdweb-dev/react";
import { UploadProgressEvent } from "@thirdweb-dev/storage";
import { AppLayout } from "components/app-layouts/app";
import { IpfsUploadDropzone } from "components/ipfs-upload/dropzone";
import { CodeSelector } from "components/product-pages/homepage/CodeSelector";
import { PageId } from "page-id";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, Heading, Text, TrackedCopyButton } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const DashboardStorage: ThirdwebNextPage = () => {
  const [progress, setProgress] = useState<UploadProgressEvent>({
    progress: 0,
    total: 100,
  });
  const storageUpload = useStorageUpload({ onProgress: setProgress });
  const form = useForm({
    defaultValues: {
      file: "",
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
            <Card
              as={Flex}
              w="full"
              alignItems="center"
              py={2}
              justifyContent="space-between"
            >
              <Text fontFamily="mono">https://gateway.ipfscdn.io/ipfs/</Text>
              <Flex>
                <TrackedCopyButton
                  value="https://gateway.ipfscdn.io/ipfs/"
                  category="storage"
                  label="copy-gateway-url"
                  aria-label="Copy gateway URL"
                />
              </Flex>
            </Card>
            <Text>
              The thirdweb gateway provides users access to third-party data
              hosted on the IPFS network.
            </Text>
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
    </SimpleGrid>
  );
};

DashboardStorage.getLayout = (page, props) => (
  <AppLayout {...props}>{page}</AppLayout>
);
DashboardStorage.pageId = PageId.DashboardStorage;

export default DashboardStorage;
