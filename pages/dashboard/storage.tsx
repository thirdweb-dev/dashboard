import { Flex } from "@chakra-ui/react";
import { MediaRenderer, useStorageUpload } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { IpfsUploadButton } from "components/ipfs-upload";
import { PageId } from "page-id";
import { useForm } from "react-hook-form";
import { CodeBlock, Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

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
      <Flex flexDir="column">
        <Text>You can use thirdweb to upload files to IPFS.</Text>
        <IpfsUploadButton
          onUpload={(uri) => form.setValue("file", uri, { shouldDirty: true })}
          storageUpload={storageUpload}
        >
          Upload to IPFS
        </IpfsUploadButton>
        {form.watch("file") ? (
          <CodeBlock
            code={JSON.stringify(form.watch("file"), null, 2)}
            language="bash"
          />
        ) : null}
        <MediaRenderer src={form.watch("file")} />
      </Flex>
    </Flex>
  );
};

Storage.getLayout = (page, props) => <AppLayout {...props}>{page}</AppLayout>;
Storage.pageId = PageId.Storage;

export default Storage;
