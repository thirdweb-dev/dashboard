import { useRevokeApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import { Icon, Spinner } from "@chakra-ui/react";
import { useTxNotifications } from "hooks/useTxNotifications";
import { FiX } from "react-icons/fi";
import { MenuItem } from "tw-components";

interface DeleteGatewayButtonProps {
  ipfsGateway: string;
}

export const DeleteGatewayButton: React.FC<DeleteGatewayButtonProps> = ({
  ipfsGateway,
}) => {
  const { onSuccess, onError } = useTxNotifications(
    "IPFS gateway deleted",
    "Failed to delete IPFS gateway",
  );

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

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
