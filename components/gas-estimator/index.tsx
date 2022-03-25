import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
} from "@chakra-ui/react";
import {
  ContractType,
  Edition,
  EditionDrop,
  NFTCollection,
  NFTDrop,
  Split,
  Token,
  Vote,
} from "@thirdweb-dev/sdk";
import {
  CONTRACT_TYPE_NAME_MAP,
  GasEstimatorMap,
  GasPrice,
} from "constants/mappings";

interface GasEstimatorBoxProps {
  contractType: ContractType;
}

const GasEstimatorBox: React.FC<GasEstimatorBoxProps> = ({ contractType }) => {
  const { deployContract, setClaimPhase, batchUpload, mint, claim }: GasPrice =
    GasEstimatorMap[contractType];

  return (
    <div>
      {CONTRACT_TYPE_NAME_MAP[contractType]}
      {deployContract && <Text>Deploy Contract: {deployContract}</Text>}
      {setClaimPhase && <Text>Set Claim Phase: {setClaimPhase}</Text>}
      {batchUpload && <Text>Batch Upload: {batchUpload}</Text>}
      {mint && <Text>Mint: {mint}</Text>}
      {claim && <Text>Claim: {claim}</Text>}
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
          <GasEstimatorBox contractType={NFTCollection.contractType} />
          <GasEstimatorBox contractType={Edition.contractType} />
          <GasEstimatorBox contractType={NFTDrop.contractType} />
          <GasEstimatorBox contractType={EditionDrop.contractType} />
          <GasEstimatorBox contractType={Token.contractType} />
          <GasEstimatorBox contractType={Split.contractType} />
          <GasEstimatorBox contractType={Vote.contractType} />
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
