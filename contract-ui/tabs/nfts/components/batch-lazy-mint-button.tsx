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
import { NFTMetadataInput } from "@thirdweb-dev/sdk";
import {
  UploadProgressEvent,
  ValidContractInstance,
} from "@thirdweb-dev/sdk/evm";
import { extensionDetectedState } from "components/buttons/ExtensionDetectButton";
import { detectFeatures } from "components/contract-components/utils";
import { ProgressBox } from "core-ui/batch-upload/progress-box";
import { BigNumber } from "ethers";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useState } from "react";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";
import { Button, Drawer } from "tw-components";
import { shuffleData } from "utils/batch";

interface BatchLazyMintButtonProps {
  contractQuery: ReturnType<typeof useContract>;
}

export const BatchLazyMintButton: React.FC<BatchLazyMintButtonProps> = ({
  contractQuery,
  ...restButtonProps
}) => {
  const trackEvent = useTrack();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nextTokenIdToMint = useTotalCount(contractQuery.contract);
  const [progress, setProgress] = useState<UploadProgressEvent>({
    progress: 0,
    total: 100,
  });
  const [nftData, setNftData] = useState<NFTMetadataInput[]>([]);

  const detectedState = extensionDetectedState({
    contractQuery,
    feature: ["ERC721LazyMintable", "ERC1155LazyMintable"],
  });

  const isRevealable = detectFeatures(contractQuery.contract, [
    "ERC721Revealable",
    "ERC1155Revealable",
  ]);

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

  const { onSuccess, onError } = useTxNotifications(
    "Batch uploaded successfully",
    "Error uploading batch",
  );

  const onSubmit = (formData: {
    description?: string | undefined;
    image?: any;
    name: string;
    password: string;
    shuffle: boolean;
    confirmPassword: string;
    selectedReveal: string;
  }) => {
    console.log(formData);
    if (formData.selectedReveal === "delayed") {
      trackEvent({
        category: "nft",
        action: "batch-upload-delayed",
        label: "attempt",
      });
      mintDelayedRevealBatch.mutate(
        {
          placeholder: {
            name: formData.name,
            description: formData.description || "",
            image: formData.image,
          },
          metadatas: formData.shuffle ? shuffleData(nftData) : nftData,
          password: formData.password,
        },
        {
          onSuccess: () => {
            trackEvent({
              category: "nft",
              action: "batch-upload-delayed",
              label: "success",
            });
            onSuccess();
            onClose();
            setProgress({
              progress: 0,
              total: 100,
            });
          },
          onError: (error) => {
            trackEvent({
              category: "nft",
              action: "batch-upload-delayed",
              label: "error",
              error,
            });
            setProgress({
              progress: 0,
              total: 100,
            });
            onError(error);
          },
        },
      );
    }
    if (formData.selectedReveal === "instant") {
      trackEvent({
        category: "nft",
        action: "batch-upload-instant",
        label: "attempt",
      });
      mintBatch.mutate(
        {
          metadatas: formData.shuffle ? shuffleData(nftData) : nftData,
        },
        {
          onSuccess: () => {
            trackEvent({
              category: "nft",
              action: "batch-upload-instant",
              label: "success",
            });
            onSuccess();
            onClose();
            setProgress({
              progress: 0,
              total: 100,
            });
          },
          onError: (error) => {
            trackEvent({
              category: "nft",
              action: "batch-upload-instant",
              label: "error",
              error,
            });
            setProgress({
              progress: 0,
              total: 100,
            });
            onError(error);
          },
        },
      );
    }
  };

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
        size="full"
        onClose={onClose}
        isOpen={isOpen}
      >
        <BatchLazyMint
          onSubmit={onSubmit}
          nextTokenIdToMint={BigNumber.from(
            nextTokenIdToMint.data || 0,
          ).toNumber()}
          ecosystem="evm"
          isRevealable={isRevealable}
          nftData={nftData}
          setNftData={setNftData}
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
