import { NFTGetAllTable } from "./components/table";
import { Flex, Icon, useDisclosure } from "@chakra-ui/react";
import { useLazyMint } from "@thirdweb-dev/react/solana";
import type { NFTDrop } from "@thirdweb-dev/sdk/solana";
import { UploadProgressEvent } from "@thirdweb-dev/storage";
import { BatchLazyMint } from "contract-ui/tabs/nfts/components/batch-lazy-mint";
import { NFTMintForm } from "contract-ui/tabs/nfts/components/mint-form";
import { ProgressBox } from "core-ui/batch-upload/progress-box";
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
  // TODO (sol) not cast as any here
  return (
    <>
      <Drawer
        allowPinchZoom
        preserveScrollBarGap
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
      >
        <NFTMintForm lazyMintMutation={mutation as any} ecosystem="solana" />
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [progress, setProgress] = useState<UploadProgressEvent>({
    progress: 0,
    total: 100,
  });
  const mintBatch = useLazyMint(program, (event: UploadProgressEvent) => {
    setProgress(event);
  });
  // TODO (sol) not cast as any here
  return (
    <>
      <Drawer
        allowPinchZoom
        preserveScrollBarGap
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
      >
        <BatchLazyMint
          mintBatch={mintBatch}
          mintDelayedRevealBatch={null}
          progress={progress}
          setProgress={setProgress}
          isOpen={isOpen}
          onClose={onClose}
          ecosystem="solana"
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
