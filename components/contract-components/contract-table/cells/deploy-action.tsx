import { useContractPublishMetadataFromURI } from "../../hooks";
import { DeployableContractContractCellProps } from "../../types";
import { Icon, useDisclosure } from "@chakra-ui/react";
import { Button } from "components/buttons/Button";
import { ContractDeployForm } from "components/contract-components/contract-deploy-form";
import { LinkButton } from "components/shared/LinkButton";
import { ThirdwebDrawer } from "components/tw-drawer";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { IoRocketOutline } from "react-icons/io5";
import {
  SUPPORTED_CHAIN_ID,
  SupportedChainIdToNetworkMap,
} from "utils/network";

export const ContractDeployActionCell: React.VFC<
  DeployableContractContractCellProps
> = ({ cell: { value } }) => {
  const publishMetadata = useContractPublishMetadataFromURI(value);
  const [deployData, setDeployData] = useState<
    { contractAddress: string; chainId: SUPPORTED_CHAIN_ID } | undefined
  >(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ThirdwebDrawer size="lg" isOpen={isOpen} onClose={onClose}>
        <ContractDeployForm
          contractId={value}
          onDeploySuccess={(contractAddress, chainId) => {
            setDeployData({ contractAddress, chainId });
            onClose();
          }}
        />
      </ThirdwebDrawer>
      {deployData ? (
        <LinkButton
          href={`/dashboard/${
            SupportedChainIdToNetworkMap[deployData.chainId]
          }/${deployData.contractAddress}`}
          size="sm"
          colorScheme="blue"
          rightIcon={<Icon as={FiArrowRight} />}
        >
          Go to contract
        </LinkButton>
      ) : (
        <Button
          onClick={onOpen}
          isLoading={publishMetadata.isLoading}
          colorScheme="purple"
          size="sm"
          rightIcon={<Icon as={IoRocketOutline} />}
        >
          Deploy Now
        </Button>
      )}
    </>
  );
};
