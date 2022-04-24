import { useContractPublishMetadataFromURI } from "../hooks";
import { DeployableContractContractCellProps } from "../types";
import { Icon } from "@chakra-ui/react";
import { Button } from "components/buttons/Button";
import { IoRocketOutline } from "react-icons/io5";

export const ContractDeployActionCell: React.VFC<
  DeployableContractContractCellProps
> = ({ cell: { value } }) => {
  const publishMetadata = useContractPublishMetadataFromURI(value);
  return (
    <Button
      isDisabled
      isLoading={publishMetadata.isLoading}
      colorScheme="purple"
      size="sm"
      rightIcon={<Icon as={IoRocketOutline} />}
    >
      Deploy Now (Coming Soon)
    </Button>
  );
};
