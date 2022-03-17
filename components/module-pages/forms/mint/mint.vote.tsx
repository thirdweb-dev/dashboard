import { useProposalCreateMutation } from "@3rdweb-sdk/react/hooks/useVote";
import { VoteModule } from "@3rdweb/sdk";
import {
  Button,
  DrawerBody,
  DrawerFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Stack,
  Textarea,
  useModalContext,
  useToast,
} from "@chakra-ui/react";
import { MismatchButton } from "components/shared/MismatchButton";
import React from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { ProposalTokenInput, ProposalTokenSchema } from "schema/tokens";
import { zodResolver } from "schema/zodResolver";
import { parseErrorToMessage } from "utils/errorParser";
import { IMintFormProps } from "./types";

const MINT_FORM_ID = "proposal-mint-form";
interface IProposalMintForm extends IMintFormProps {
  module: VoteModule;
}

export const ProposalMintForm: React.FC<IProposalMintForm> = ({ module }) => {
  const propose = useProposalCreateMutation(module?.address);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProposalTokenInput>({
    resolver: zodResolver(ProposalTokenSchema),
  });

  const modalContext = useModalContext();
  const toast = useToast();

  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Proposal successfully created",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    modalContext.onClose();
  };

  const onError = (error: unknown) => {
    toast({
      title: "Error",
      description: parseErrorToMessage(error),
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const onSubmit = (data: ProposalTokenInput) => {
    propose.mutate(data, { onSuccess, onError });
  };

  return (
    <>
      <DrawerBody>
        <Stack
          spacing={6}
          as="form"
          id={MINT_FORM_ID}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl isRequired isInvalid={!!errors.description}>
            <FormLabel>Description</FormLabel>
            <Textarea {...register("description")} />
            <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
          </FormControl>
        </Stack>
      </DrawerBody>
      <DrawerFooter>
        <Button
          isDisabled={propose.isLoading}
          variant="outline"
          mr={3}
          onClick={modalContext.onClose}
        >
          Cancel
        </Button>
        <MismatchButton
          isLoading={propose.isLoading}
          leftIcon={<Icon as={FiPlus} />}
          form={MINT_FORM_ID}
          type="submit"
          colorScheme="primary"
        >
          Submit Proposal
        </MismatchButton>
      </DrawerFooter>
    </>
  );
};
