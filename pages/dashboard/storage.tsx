import { Flex } from "@chakra-ui/react";
import { useStorageUpload } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { CodeSelector } from "components/product-pages/homepage/CodeSelector";
import dynamic from "next/dynamic";
import { PageId } from "page-id";
import { useForm } from "react-hook-form";
import { CodeBlock, Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const LazyIpfsUploadButton = dynamic(
  () =>
    import("components/ipfs-upload").then(
      ({ IpfsUploadButton }) => IpfsUploadButton,
    ),
  { ssr: false },
);

const Storage: ThirdwebNextPage = () => {
  const storageUpload = useStorageUpload();
  const form = useForm({
    defaultValues: {
      file: "",
    },
  });

  return (
    <Flex flexDir="column" gap={6}>
      <Heading size="display.md">Storage</Heading>
      <Flex flexDir="column" alignItems="center" gap={4}>
        <Text>
          Everything you upload using thirdweb, gets automatically uploaded and
          pinned to IPFS. For free. Try it right now.
        </Text>
        <LazyIpfsUploadButton
          onUpload={(uri) => form.setValue("file", uri, { shouldDirty: true })}
          storageUpload={storageUpload}
        >
          Upload file to IPFS
        </LazyIpfsUploadButton>
        {form.watch("file") ? (
          <CodeBlock
            minW="700px"
            w="inherit"
            code={JSON.stringify(form.watch("file"), null, 2)}
            language="bash"
          />
        ) : null}
      </Flex>
      <Heading size="display.md">Integrate into your app</Heading>
      <Flex flexDir="column" alignItems="center">
        <CodeSelector snippets="storage" defaultLanguage="cli" />
      </Flex>
    </Flex>
  );
};

Storage.getLayout = (page, props) => <AppLayout {...props}>{page}</AppLayout>;
Storage.pageId = PageId.Storage;

export default Storage;
