import { NFTGetAllTable } from "./components/table";
import { Flex, Icon, useDisclosure } from "@chakra-ui/react";
import { useLazyMint } from "@thirdweb-dev/react/solana";
import type { NFTDrop } from "@thirdweb-dev/sdk/solana";
import { UploadProgressEvent } from "@thirdweb-dev/storage";
import { NFTMintForm } from "contract-ui/tabs/nfts/components/mint-form";
import { BatchLazyMint } from "core-ui/batch-upload/batch-lazy-mint";
import { ProgressBox } from "core-ui/batch-upload/progress-box";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";
import { Button, Drawer, Heading } from "tw-components";

export const NFTDropPanel: React.FC<{
  program: NFTDrop;
}> = ({ program }) => {
  return (
    <Flex direction="column" gap={6}>
      <Flex direction="row" justify="space-between" align="center">
        <Heading size="title.sm">Program NFTs</Heading>
        <Flex gap={2} flexDir={{ base: "column", md: "row" }}>
          <NFTSingleUploadButton program={program} />
          <NFTBatchUploadButton program={program} />
        </Flex>
      </Flex>
      <NFTGetAllTable program={program} />
    </Flex>
  );
};

export const NFTSingleUploadButton: React.FC<{ program: NFTDrop }> = ({
  program,
  ...restButtonProps
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mutation = useLazyMint(program);
  return (
    <>
      <Drawer
        allowPinchZoom
        preserveScrollBarGap
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
      >
        <NFTMintForm lazyMintMutation={mutation} ecosystem="solana" />
      </Drawer>
      <Button
        colorScheme="primary"
        leftIcon={<Icon as={FiPlus} />}
        {...restButtonProps}
        onClick={onOpen}
      >
        Single Upload
      </Button>
    </>
  );
};

export const NFTBatchUploadButton: React.FC<{ program: NFTDrop }> = ({
  program,
  ...restButtonProps
}) => {
  const trackEvent = useTrack();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [progress, setProgress] = useState<UploadProgressEvent>({
    progress: 0,
    total: 100,
  });

  const mintBatchMutation = useLazyMint(
    program,
    (event: UploadProgressEvent) => {
      setProgress(event);
    },
  );

  const { onSuccess, onError } = useTxNotifications(
    "Batch uploaded successfully",
    "Error uploading batch",
  );

  return (
    <>
      <Drawer
        allowPinchZoom
        preserveScrollBarGap
        size="full"
        onClose={onClose}
        isOpen={isOpen}
      >
        <BatchLazyMint
          ecosystem="solana"
          onSubmit={async ({ data }) => {
            trackEvent({
              category: "nft",
              action: "batch-upload-instant",
              label: "attempt",
            });
            try {
              await mintBatchMutation.mutateAsync(data);
              trackEvent({
                category: "nft",
                action: "batch-upload-instant",
                label: "success",
              });
              onSuccess();
              onClose();
            } catch (error) {
              trackEvent({
                category: "nft",
                action: "batch-upload-instant",
                label: "error",
                error,
              });
              onError(error);
            } finally {
              setProgress({
                progress: 0,
                total: 100,
              });
            }
          }}
        >
          <ProgressBox progress={progress} />
        </BatchLazyMint>
      </Drawer>
      <Button
        colorScheme="primary"
        leftIcon={<Icon as={RiCheckboxMultipleBlankLine} />}
        {...restButtonProps}
        onClick={onOpen}
      >
        Batch Upload
      </Button>
    </>
  );
};
