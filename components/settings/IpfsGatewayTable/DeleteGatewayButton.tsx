import { Icon } from "@chakra-ui/react";
import {
  IpfsGatewayInfo,
  useGetCustomIpfsGateways,
} from "hooks/useGetCustomIpfsGateways";
import { useTxNotifications } from "hooks/useTxNotifications";
import { Dispatch, SetStateAction } from "react";
import { FiX } from "react-icons/fi";
import { MenuItem } from "tw-components";

interface DeleteGatewayButtonProps {
  gatewayUrl: string;
  setGateways: Dispatch<SetStateAction<IpfsGatewayInfo[]>>;
}

export const DeleteGatewayButton: React.FC<DeleteGatewayButtonProps> = ({
  gatewayUrl,
  setGateways,
}) => {
  const { onSuccess, onError } = useTxNotifications(
    "IPFS gateway deleted",
    "Failed to delete IPFS gateway",
  );
  const currentIpfsGateways = useGetCustomIpfsGateways();
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const newCustomGateways = currentIpfsGateways.filter(
      (item) => item.url !== gatewayUrl,
    );
    window.localStorage.setItem(
      "tw-settings-ipfs-gateways",
      JSON.stringify(newCustomGateways),
    );
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
