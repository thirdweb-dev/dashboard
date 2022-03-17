import { Button, Icon } from "@chakra-ui/react";
import { GiPayMoney } from "react-icons/gi";
import { IModuleActionButtonProps } from "./types";

export interface IDistributeButtonProps extends IModuleActionButtonProps {
  distributeFunds: () => void;
  noBalance: boolean;
  isLoading: boolean;
}

export const DistributeButton: React.FC<IDistributeButtonProps> = ({
  isLoading,
  distributeFunds,
  noBalance,
  ...restButtonProps
}) => {
  if (noBalance) {
    return null;
  }

  return (
    <Button
      isLoading={isLoading}
      leftIcon={<Icon as={GiPayMoney} />}
      colorScheme="primary"
      onClick={distributeFunds}
      {...restButtonProps}
    >
      Distribute Funds
    </Button>
  );
};
