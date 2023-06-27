import { AccountSigner } from "./account-signer";
import { Flex } from "@chakra-ui/react";
import { useContract, useSmartWalletSigners } from "@thirdweb-dev/react";
import React from "react";

interface AccountSignersProps {
  contractQuery: ReturnType<typeof useContract>;
}

export const AccountSigners: React.FC<AccountSignersProps> = ({
  contractQuery,
}) => {
  const smartWalletSignersQuery = useSmartWalletSigners(
    contractQuery?.contract,
  );

  return (
    <Flex direction="column" gap={6}>
      {smartWalletSignersQuery.data?.map((signer) => (
        <AccountSigner key={signer.signer} signer={signer} />
      ))}
    </Flex>
  );
};
