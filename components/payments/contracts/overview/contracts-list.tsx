import { Flex } from "@chakra-ui/react";
import { PaymentContracts } from "../payment-contracts";
import { EnabledContracts } from "../enabled-contracts";

export const ContractsList: React.FC = () => {
  return (
    <Flex flexDir="column" gap={12}>
      <PaymentContracts />
      <EnabledContracts />
    </Flex>
  );
};
