import { MinterOnly } from "@3rdweb-sdk/react/components/roles/minter-only";
import { Icon, useDisclosure } from "@chakra-ui/react";
import { TokenContract, useAddress, useContract } from "@thirdweb-dev/react";
import { detectFeatures } from "components/contract-components/utils";
import { FiPlus } from "react-icons/fi";
import { Button, Drawer } from "tw-components";

interface CreateWalletButtonProps {
  contractQuery: ReturnType<typeof useContract>;
}

export const CreateWalletButton: React.FC<CreateWalletButtonProps> = ({
  contractQuery,
  ...restButtonProps
}) => {
  const { mutate: createWallet } = useCreateSmartWallet();
  const address = useAddress();

  if (!contractQuery.contract || !address) {
    return null;
  }

  return (
    <Button
      colorScheme="primary"
      leftIcon={<Icon as={FiPlus} />}
      {...restButtonProps}
      onClick={() => createWallet(address)}
    >
      Create Wallet
    </Button>
  );
};
