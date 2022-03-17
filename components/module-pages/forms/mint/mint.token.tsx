import { useTokenMintMutation } from "@3rdweb-sdk/react";
import { TokenModule } from "@3rdweb/sdk";
import {
  Button,
  DrawerBody,
  DrawerFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Stack,
  useModalContext,
  useToast,
} from "@chakra-ui/react";
import { MismatchButton } from "components/shared/MismatchButton";
import React from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { CurrencyTokenInput, CurrencyTokenSchema } from "schema/tokens";
import { zodResolver } from "schema/zodResolver";
import { parseErrorToMessage } from "utils/errorParser";
import { IMintFormProps } from "./types";

const MINT_FORM_ID = "token-mint-form";
interface ITokenMintForm extends IMintFormProps {
  module: TokenModule;
}

export const TokenMintForm: React.FC<ITokenMintForm> = ({ module }) => {
  const mint = useTokenMintMutation(module);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CurrencyTokenInput>({
    resolver: zodResolver(CurrencyTokenSchema),
  });
  const modalContext = useModalContext();
  const toast = useToast();

  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Additional tokens minted!",
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

  const onSubmit = (data: CurrencyTokenInput) => {
    mint.mutate(data, { onSuccess, onError });
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
          <FormControl isRequired isInvalid={!!errors.amount}>
            <FormLabel>Additional Supply</FormLabel>
            <Input
              type="number"
              step="1"
              pattern="[0-9]"
              {...register("amount")}
            />
            <FormErrorMessage>{errors?.amount?.message}</FormErrorMessage>
          </FormControl>
        </Stack>
      </DrawerBody>
      <DrawerFooter>
        <Button
          isDisabled={mint.isLoading}
          variant="outline"
          mr={3}
          onClick={modalContext.onClose}
        >
          Cancel
        </Button>
        <MismatchButton
          isLoading={mint.isLoading}
          leftIcon={<Icon as={FiPlus} />}
          form={MINT_FORM_ID}
          type="submit"
          colorScheme="primary"
        >
          Mint Tokens
        </MismatchButton>
      </DrawerFooter>
    </>
  );
};
