import {
  useDelegateMutation,
  useTokensDelegated,
} from "@3rdweb-sdk/react/hooks/useVote";
import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import { Icon, Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import { MintDrawer } from "components/shared/MintDrawer";
import { MismatchButton } from "components/shared/MismatchButton";
import { FiPlus } from "react-icons/fi";
import { parseErrorToMessage } from "utils/errorParser";
import { IModuleActionButtonProps } from "./types";

interface IVoteButton extends IModuleActionButtonProps {}

export const ProposalButton: React.FC<IVoteButton> = ({ module }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MintDrawer
        isOpen={isOpen}
        onClose={onClose}
        module={module as EitherBaseModuleType}
      />
      <MismatchButton
        colorScheme="primary"
        onClick={onOpen}
        leftIcon={<Icon as={FiPlus} />}
      >
        Create Proposal
      </MismatchButton>
    </>
  );
};

export const DelegateButton: React.FC<IVoteButton> = ({ module }) => {
  const toast = useToast();
  const { data: delegated, isLoading } = useTokensDelegated(module?.address);
  const { mutate: delegate, isLoading: isDelegating } = useDelegateMutation(
    module?.address,
  );

  if (delegated || isLoading) {
    return null;
  }

  const delegateTokens = () => {
    delegate(undefined, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Tokens succesfully delegated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error delegating tokens",
          description: parseErrorToMessage(error),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <Tooltip label="You need to delegate tokens to this module before you can make proposals and vote.">
      <MismatchButton
        colorScheme="primary"
        onClick={delegateTokens}
        isLoading={isDelegating}
      >
        Delegate Tokens
      </MismatchButton>
    </Tooltip>
  );
};
