import { usePackBalance, usePackOpenMutation } from "@3rdweb-sdk/react";
import { NFTMetadata, PackMetadata } from "@3rdweb/sdk";
import {
  Button,
  Flex,
  Icon,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiPackage } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Row } from "react-table";
import { parseErrorToMessage } from "utils/errorParser";
import { useTableContext } from "../../../table-context";

interface IPackActionsProps {
  row: Row<PackMetadata>;
}

export const PackActions: React.FC<IPackActionsProps> = ({ row }) => {
  const toast = useToast();
  const tableContext = useTableContext();
  const packAddress = useSingleQueryParam("pack");

  const [rewards, setRewards] = useState<NFTMetadata[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: balance } = usePackBalance(
    packAddress,
    row.original.metadata.id,
  );
  const { mutate: open, isLoading: isOpening } =
    usePackOpenMutation(packAddress);

  const openPack = async () => {
    open(row.original.metadata.id, {
      onSuccess: (packRewards) => {
        setRewards(packRewards || []);
        onOpen();
        toast({
          title: "Success",
          description: "Pack succesfully opened",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error opening pack",
          description: parseErrorToMessage(error),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <RewardsModal rewards={rewards} />
      </Modal>

      <Button
        onClick={() =>
          tableContext.expandRow({
            tokenId: row.original.metadata.id,
            type: "rewards",
          })
        }
        leftIcon={<Icon as={MdOutlineRemoveRedEye} />}
      >
        View Rewards
      </Button>
      {BigNumber.from(balance || 0).gt(0) && (
        <Button
          onClick={openPack}
          leftIcon={<Icon as={FiPackage} />}
          isLoading={isOpening}
        >
          Open Pack
        </Button>
      )}
    </>
  );
};

interface IRewardsModal {
  rewards: NFTMetadata[];
}

const RewardsModal: React.FC<IRewardsModal> = ({ rewards }) => {
  const [reward, setReward] = useState(0);

  const left = () => {
    if (reward > 0) {
      setReward(reward - 1);
    }
  };

  const right = () => {
    if (reward < rewards.length - 1) {
      setReward(reward + 1);
    }
  };

  return (
    <ModalBody>
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalCloseButton />
        <ModalBody>
          <ModalHeader mb="12px">
            You received{" "}
            {rewards.length > 1 ? "the following rewards!" : "a reward!"}
          </ModalHeader>

          <Flex width="100%" justify="space-between" align="center">
            <IconButton
              aria-label="left"
              icon={<Icon as={FiChevronLeft} />}
              onClick={left}
              isDisabled={rewards.length < 2 || reward === 0}
            />
            <Image
              src={rewards[reward].image}
              width="200px"
              borderRadius="md"
            />
            <IconButton
              aria-label="left"
              icon={<Icon as={FiChevronRight} />}
              onClick={right}
              isDisabled={rewards.length < 2 || reward === rewards.length - 1}
            />
          </Flex>

          <Text size="label.lg" mt="24px">
            {rewards[reward].name}
          </Text>
        </ModalBody>
      </ModalContent>
    </ModalBody>
  );
};
