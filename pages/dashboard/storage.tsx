import { Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import { useStorageUpload } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { IpfsUploadDropzone } from "components/ipfs-upload/dropzone";
import { CodeSelector } from "components/product-pages/homepage/CodeSelector";
import { PageId } from "page-id";
import { useForm } from "react-hook-form";
import { Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const Storage: ThirdwebNextPage = () => {
  const storageUpload = useStorageUpload();
  const form = useForm({
    defaultValues: {
      file: "",
    },
  });

  return (
    <SimpleGrid columns={{ base: 1, xl: 4 }} gap={8} mt={10}>
      <GridItem as={Flex} colSpan={{ xl: 3 }} direction="column" gap={8}>
        <Flex flexDir="column" gap={{ base: 4, md: 16 }}>
          <Flex flexDir="column" gap={4}>
            <Heading size="title.lg" as="h1">
              Storage
            </Heading>
            <Flex flexDir="column" gap={4}>
              <Text>
                Everything uploaded using thirdweb is automatically uploaded and
                pinned to IPFS.
              </Text>
              <IpfsUploadDropzone storageUpload={storageUpload} />
            </Flex>
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

Storage.getLayout = (page, props) => <AppLayout {...props}>{page}</AppLayout>;
Storage.pageId = PageId.Storage;

export default Storage;
