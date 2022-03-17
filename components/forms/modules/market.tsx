import {
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
import { MarketContractInput, MarketContractSchema } from "schema/contracts";

interface IMarketModuleForm extends IFormProps {
  onSubmit: (data: MarketContractInput) => Promise<void>;
}

export const MarketModuleForm: React.FC<IMarketModuleForm> = ({
  formId,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(MarketContractSchema),
    defaultValues: {
      seller_fee_basis_points: 0,
      name: "",
      description: "",
    },
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl isRequired isInvalid={!!errors.name}>
          <FormLabel>Name</FormLabel>
          <Input {...register("name")} />
          <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea {...register("description")} />
          <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
        </FormControl>
      </Stack>
    </form>
  );
};
