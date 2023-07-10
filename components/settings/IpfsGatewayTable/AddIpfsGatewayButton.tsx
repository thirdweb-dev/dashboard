import { Icon } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { Button } from "tw-components";

export const AddIpfsGatewayButton: React.FC = () => {
  return (
    <Button
      onClick={()=>{}}
      colorScheme="blue"
      leftIcon={<Icon as={FiPlus} boxSize={4} />}
      //   isLoading={createKeyMutation.isLoading}
      //   isDisabled={createKeyMutation.isLoading}
    >
      Add new gateway
    </Button>
  );
};
