import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalProps, Text } from "@chakra-ui/react";
import { ContractType, Edition, EditionDrop, NFTCollection, NFTDrop, Split, Token, Vote } from "@thirdweb-dev/sdk";
import { CONTRACT_TYPE_NAME_MAP, GasEstimatorMap, GasPrice } from "constants/mappings";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

interface GasEstimatorBoxProps {
  contractType: ContractType;
}

const GasEstimatorBox: React.FC<GasEstimatorBoxProps> = ({ contractType }) => {
  const { deployContract, setClaimPhase, batchUpload, mint, claim }: GasPrice =
    GasEstimatorMap[contractType];

  const [gasPrice, setGasPrice] = useState<number>(30);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_KEY}`,
      );
      const data = await res.json();
      console.log(data.result.ProposeGasPrice);
      const gasNumber = Number(data.result.ProposeGasPrice);
      setGasPrice(gasNumber ? gasNumber : 30);
    };
    fetchData();
  }, []);

  const formatPrice = (price: number) => {
    if (price) {
      return `${ethers.utils.formatUnits(
        `${(gasPrice as number) * price}`,
        "gwei",
      )} ETH`;
    }
  };

  return (
    <div>
      {CONTRACT_TYPE_NAME_MAP[contractType]}
      {deployContract && (
        <Text>Deploy Contract: {formatPrice(deployContract)}</Text>
      )}
      {setClaimPhase && (
        <Text>Set Claim Phase: {formatPrice(setClaimPhase)}</Text>
      )}
      {batchUpload && <Text>Batch Upload: {formatPrice(batchUpload)}</Text>}
      {mint && <Text>Mint: {formatPrice(mint)}</Text>}
      {claim && <Text>Claim: {formatPrice(claim)}</Text>}
    </div>
  );
};

interface GasEstimatorModalProps extends ModalProps {}

export const GasEstimatorModal: React.FC<Partial<GasEstimatorModalProps>> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen as boolean} onClose={onClose as () => void}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Gas Estimator</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <GasEstimatorBox contractType={NFTDrop.contractType} />
          <GasEstimatorBox contractType={EditionDrop.contractType} />
          <GasEstimatorBox contractType={NFTCollection.contractType} />
          <GasEstimatorBox contractType={Edition.contractType} />
          <GasEstimatorBox contractType={Token.contractType} />
          <GasEstimatorBox contractType={Split.contractType} />
          <GasEstimatorBox contractType={Vote.contractType} />
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};