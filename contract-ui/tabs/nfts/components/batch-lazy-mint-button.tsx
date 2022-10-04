import { BatchLazyMint } from "./batch-lazy-mint";
import { MinterOnly } from "@3rdweb-sdk/react";
import { Icon, useDisclosure } from "@chakra-ui/react";
import {
  DropContract,
  UseContractResult,
  useTotalCount,
} from "@thirdweb-dev/react";
import { ValidContractInstance } from "@thirdweb-dev/sdk/evm";
import { extensionDetectedState } from "components/buttons/ExtensionDetectButton";
import { BigNumber } from "ethers";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";
import { Button, Drawer } from "tw-components";

interface BatchLazyMintButtonProps {
  contractQuery: UseContractResult<NonNullable<DropContract>>;
}

export const BatchLazyMintButton: React.FC<BatchLazyMintButtonProps> = ({
  contractQuery,
  ...restButtonProps
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nextTokenIdToMint = useTotalCount(contractQuery.contract);

  const detectedState = extensionDetectedState({
    contractQuery,
    feature: ["ERC721LazyMintable", "ERC1155LazyMintable"],
  });

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
          contract={contractQuery.contract}
          isOpen={isOpen}
          onClose={onClose}
          nextTokenIdToMint={BigNumber.from(
            nextTokenIdToMint.data || 0,
          ).toNumber()}
        />
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
