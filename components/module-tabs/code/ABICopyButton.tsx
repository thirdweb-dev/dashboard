import { useModuleTypeOfModule } from "@3rdweb-sdk/react";
import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import {
  ERC20Votes__factory,
  Governor__factory,
  LazyMintERC1155__factory,
  LazyMintERC721__factory,
  Marketplace__factory,
  Market__factory,
  NFTCollection__factory,
  NFT__factory,
  Pack__factory,
  Splits__factory,
} from "@3rdweb/contracts";
import { ModuleType } from "@3rdweb/sdk";
import { Button, ButtonProps, useClipboard } from "@chakra-ui/react";
import { useMemo } from "react";
import { IoCopy } from "react-icons/io5";

interface ABICopyButtonProps extends ButtonProps {
  module?: EitherBaseModuleType;
}

const moduleTypeToABI = {
  [ModuleType.ACCESS_NFT]: undefined,
  [ModuleType.BUNDLE]: NFTCollection__factory.abi,
  [ModuleType.BUNDLE_DROP]: LazyMintERC1155__factory.abi,
  [ModuleType.BUNDLE_SIGNATURE]: undefined,
  [ModuleType.COLLECTION]: NFTCollection__factory.abi,
  [ModuleType.DATASTORE]: undefined,
  [ModuleType.DROP]: LazyMintERC721__factory.abi,
  [ModuleType.DYNAMIC_NFT]: undefined,
  [ModuleType.MARKET]: Market__factory.abi,
  [ModuleType.MARKETPLACE]: Marketplace__factory.abi,
  [ModuleType.NFT]: NFT__factory.abi,
  [ModuleType.PACK]: Pack__factory.abi,
  [ModuleType.SPLITS]: Splits__factory.abi,
  [ModuleType.TOKEN]: ERC20Votes__factory.abi,
  [ModuleType.VOTE]: Governor__factory.abi,
};

export const ABICopyButton: React.FC<ABICopyButtonProps> = ({
  module,
  ...restButtonProps
}) => {
  const moduleType = useModuleTypeOfModule(module);

  const abi = useMemo(() => {
    return moduleType !== undefined && moduleType !== null
      ? JSON.stringify(moduleTypeToABI[moduleType], null, 2)
      : null;
  }, [moduleType]);
  const { onCopy, hasCopied, value } = useClipboard(abi || "");
  if (!value) {
    return (
      <Button {...restButtonProps} leftIcon={<IoCopy />} isDisabled>
        ABI not available
      </Button>
    );
  }

  return (
    <Button {...restButtonProps} leftIcon={<IoCopy />} onClick={onCopy}>
      {hasCopied ? "ABI Copied" : "Copy ABI"}
    </Button>
  );
};
