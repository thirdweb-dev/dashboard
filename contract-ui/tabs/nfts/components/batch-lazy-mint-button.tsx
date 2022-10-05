import { BatchLazyMint } from "./batch-lazy-mint";
import { MinterOnly } from "@3rdweb-sdk/react";
import { Icon, useDisclosure } from "@chakra-ui/react";
import {
  RevealableContract,
  useContract,
  useDelayedRevealLazyMint,
  useLazyMint,
  useTotalCount,
} from "@thirdweb-dev/react";
import {
  UploadProgressEvent,
  ValidContractInstance,
} from "@thirdweb-dev/sdk/evm";
import { extensionDetectedState } from "components/buttons/ExtensionDetectButton";
import { detectFeatures } from "components/contract-components/utils";
import { ProgressBox } from "core-ui/batch-upload/progress-box";
import { BigNumber } from "ethers";
import { useState } from "react";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";
import { Button, Drawer } from "tw-components";

interface BatchLazyMintButtonProps {
  contractQuery: ReturnType<typeof useContract>;
}

export const BatchLazyMintButton: React.FC<BatchLazyMintButtonProps> = ({
  contractQuery,
  ...restButtonProps
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nextTokenIdToMint = useTotalCount(contractQuery.contract);
  const [progress, setProgress] = useState<UploadProgressEvent>({
    progress: 0,
    total: 100,
  });

  const detectedState = extensionDetectedState({
    contractQuery,
    feature: ["ERC721LazyMintable", "ERC1155LazyMintable"],
  });

  const mintBatch = useLazyMint(
    contractQuery.contract,
    (event: UploadProgressEvent) => {
      setProgress(event);
    },
  );

  const mintDelayedRevealBatch = useDelayedRevealLazyMint(
    contractQuery.contract as RevealableContract,
    (event: UploadProgressEvent) => {
      setProgress(event);
    },
  );

  const isRevealable = detectFeatures(contractQuery.contract, [
    "ERC721Revealable",
    "ERC1155Revealable",
  ]);

  if (detectedState !== "enabled") {
    return null;
  }

  return (
    <MinterOnly
      contract={contractQuery?.contract as unknown as ValidContractInstance}
    >
      <Drawer
        allowPinchZoom
        preserveScrollBarGap
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
      >
        <BatchLazyMint
          isOpen={isOpen}
          onClose={onClose}
          nextTokenIdToMint={BigNumber.from(
            nextTokenIdToMint.data || 0,
          ).toNumber()}
          progress={progress}
          setProgress={setProgress}
          mintBatch={mintBatch}
          mintDelayedRevealBatch={isRevealable ? mintDelayedRevealBatch : null}
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
    </MinterOnly>
  );
};
