import { useContractPublishMetadataFromURI } from "../../hooks";
import { DeployableContractContractCellProps } from "../../types";
import { Icon, useDisclosure } from "@chakra-ui/react";
import { ContractDeployForm } from "components/contract-components/contract-deploy-form";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { IoRocketOutline } from "react-icons/io5";
import { Button, Drawer, LinkButton } from "tw-components";
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
      <Drawer size="xl" isOpen={isOpen} onClose={onClose}>
        <ContractDeployForm
          contractId={value}
          onDeploySuccess={(contractAddress, chainId) => {
            setDeployData({ contractAddress, chainId });
            onClose();
          }}
        />
      </Drawer>
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
          isDisabled={publishMetadata.data?.deployDisabled}
          onClick={onOpen}
          isLoading={publishMetadata.isLoading}
          colorScheme="purple"
          variant={publishMetadata.data?.deployDisabled ? "outline" : "solid"}
          size="sm"
          rightIcon={
            !publishMetadata.data?.deployDisabled ? (
              <Icon as={IoRocketOutline} />
            ) : undefined
          }
        >
          {publishMetadata.data?.deployDisabled ? "Coming Soon" : "Deploy Now"}
        </Button>
      )}
    </>
  );
};
