import { Icon } from "@chakra-ui/react";
import { CustomIpfsGateway, customIpfsStorage, useCustomIpfsGateways } from "hooks/useCustomIpfsGateways";
import { useTxNotifications } from "hooks/useTxNotifications";
import { Dispatch, SetStateAction } from "react";
import { FiX } from "react-icons/fi";
import { MenuItem } from "tw-components";

interface DeleteGatewayButtonProps {
  gatewayUrl: string;
  setGateways: Dispatch<SetStateAction<CustomIpfsGateway[]>>;
}

export const DeleteGatewayButton: React.FC<DeleteGatewayButtonProps> = ({
  gatewayUrl,
  setGateways,
}) => {
  const { onSuccess, onError } = useTxNotifications(
    "IPFS gateway deleted",
    "Failed to delete IPFS gateway",
  );
  const currentIpfsGateways = useCustomIpfsGateways();
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const newCustomGateways = currentIpfsGateways.filter(
      (item) => item.url !== gatewayUrl,
    );
    customIpfsStorage.set(newCustomGateways);
    setGateways(newCustomGateways);
    onSuccess();
  };

  return (
    <MenuItem
      onClick={handleDelete}
      closeOnSelect={false}
      icon={<Icon as={FiX} color="red.500" />}
    >
      Delete
    </MenuItem>
  );
};
