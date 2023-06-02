import { Icon } from "@chakra-ui/react";
import {
  useAddress,
  useContract,
  useCreateSmartWallet,
} from "@thirdweb-dev/react";
import { FiPlus } from "react-icons/fi";
import { Button } from "tw-components";

interface CreateWalletButtonProps {
  contractQuery: ReturnType<typeof useContract>;
}

export const CreateWalletButton: React.FC<CreateWalletButtonProps> = ({
  contractQuery,
  ...restButtonProps
}) => {
  const { mutate: createWallet } = useCreateSmartWallet(
    contractQuery?.contract,
  );
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
