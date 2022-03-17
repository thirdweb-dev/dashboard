import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IFormProps } from "components/forms/types";
import React from "react";
import { useForm } from "react-hook-form";
import { CoinContractInput, CoinContractSchema } from "schema/contracts";

interface ICurrencyModuleForm extends IFormProps {
  onSubmit: (data: CoinContractInput) => Promise<void>;
}

export const CurrencyModuleForm: React.FC<ICurrencyModuleForm> = ({
  formId,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CoinContractSchema),
    defaultValues: {
      name: "",
      symbol: "",
      description: "",
    },
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Flex>
          <FormControl isRequired isInvalid={!!errors.name} w="70%">
            <FormLabel>Name</FormLabel>
            <Input {...register("name")} />
            <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.symbol} flex="1" ml={2}>
            <FormLabel>Symbol</FormLabel>
            <Input {...register("symbol")} />
            <FormErrorMessage>{errors?.symbol?.message}</FormErrorMessage>
          </FormControl>
        </Flex>
        <FormControl isInvalid={!!errors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea {...register("description")} />
          <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
        </FormControl>
      </Stack>
    </form>
  );
};
