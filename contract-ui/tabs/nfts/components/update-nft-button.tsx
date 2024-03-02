import { NFTMintForm } from "./mint-form";
import { MinterOnly } from "@3rdweb-sdk/react/components/roles/minter-only";
import { Icon, useDisclosure } from "@chakra-ui/react";
import { useContract, useUpdateNFTMetadata } from "@thirdweb-dev/react";
import { extensionDetectedState } from "components/buttons/ExtensionDetectButton";
import { FiPlus } from "react-icons/fi";
import { Button, Drawer } from "tw-components";

interface UpdateNFTMintButtonProps {
  contractQuery: ReturnType<typeof useContract>;
  tokenId: string;
}

export const UpdateNFTMintButton: React.FC<UpdateNFTMintButtonProps> = ({
  contractQuery,
  tokenId,
  ...restButtonProps
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mutation = useUpdateNFTMetadata(contractQuery.contract);

  const detectedState = extensionDetectedState({
    contractQuery,
    feature: [
      "ERC721UpdatableMetadata",
      "ERC1155UpdatableMetadata",
      "ERC1155LazyMintableV2", // TODO support ERC721LazyMintableV2 too
    ],
  });

  console.log(
    "detectedState",
    detectedState,
    contractQuery.contract?.getAddress(),
  );

  if (detectedState !== "enabled" || !contractQuery.contract) {
    return null;
  }

  return (
    <MinterOnly contract={contractQuery.contract}>
      <Drawer
        allowPinchZoom
        preserveScrollBarGap
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
      >
        <NFTMintForm
          contract={contractQuery.contract}
          updateMetadataMutation={mutation}
          tokenId={tokenId}
        />
      </Drawer>
      <Button colorScheme="primary" {...restButtonProps} onClick={onOpen}>
        Update Metadata
      </Button>
    </MinterOnly>
  );
};
