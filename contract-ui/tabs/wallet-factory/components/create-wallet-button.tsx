import {
  useAddress,
  useContract,
  useCreateSmartWallet,
} from "@thirdweb-dev/react";
import { TransactionButton } from "components/buttons/TransactionButton";

interface CreateWalletButtonProps {
  contractQuery: ReturnType<typeof useContract>;
}

export const CreateWalletButton: React.FC<CreateWalletButtonProps> = ({
  contractQuery,
  ...restButtonProps
}) => {
  const { mutate: createWallet, isLoading } = useCreateSmartWallet(
    contractQuery?.contract,
  );
  const address = useAddress();

  if (!contractQuery.contract || !address) {
    return null;
  }

  return (
    <TransactionButton
      colorScheme="primary"
      onClick={() => createWallet(address)}
      isLoading={isLoading}
      transactionCount={1}
      {...restButtonProps}
    >
      Create Wallet
    </TransactionButton>
  );
};
