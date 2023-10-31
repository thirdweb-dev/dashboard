import { usePaymentsRegisterContract } from "@3rdweb-sdk/react/hooks/usePayments";
import { Flex } from "@chakra-ui/react";
import { Button } from "tw-components";

interface EnablePaymentsButtonProps {
  contractAddress: string;
  chainId: number;
}

export const EnablePaymentsButton: React.FC<EnablePaymentsButtonProps> = ({
  contractAddress,
  chainId,
}) => {
  const { mutate: registerContract } = usePaymentsRegisterContract();

  return (
    <Flex justifyContent="end">
      <Button
        colorScheme="blackAlpha"
        size="sm"
        onClick={() => {
          registerContract({
            chain: `${chainId}`,
            contractAddress,
            displayName: "from the sdk",
          });
        }}
        px={6}
      >
        Enable Payments
      </Button>
    </Flex>
  );
};
