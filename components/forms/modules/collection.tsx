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
import { useEthers } from "@usedapp/core";
import { IFormProps } from "components/forms/types";
import React, { useEffect } from "react";
import { AddressZero } from "@ethersproject/constants";
import { useForm } from "react-hook-form";
import {
  NFTCollectionContractInput,
  NftCollectionContractSchema,
} from "schema/contracts";

interface ICollectionModuleForm extends IFormProps {
  onSubmit: (data: NFTCollectionContractInput) => Promise<void>;
}

export const CollectionModuleForm: React.FC<ICollectionModuleForm> = ({
  formId,
  onSubmit,
}) => {
  const { account } = useEthers();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NftCollectionContractSchema),
    defaultValues: {
      seller_fee_basis_points: 0,
      fee_recipient: AddressZero,
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (account) {
      setValue("fee_recipient", account);
    }
  }, [account, setValue]);

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

        <FormControl isInvalid={!!errors.fee_recipient}>
          <FormLabel>Royalty Recipient Address</FormLabel>
          <Input {...register("fee_recipient")} isDisabled={true} />
          <FormErrorMessage>{errors?.fee_recipient?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.seller_fee_basis_points}>
          <FormLabel>Royalty</FormLabel>
          <InputGroup>
            <Input type="number" {...register("seller_fee_basis_points")} />
            <InputRightAddon children="%" />
          </InputGroup>
          <FormHelperText>
            The % of each transaction you want to take as royalty. Our platform
            takes 5% of your royalty %.
          </FormHelperText>
          <FormErrorMessage>
            {errors?.seller_fee_basis_points?.message}
          </FormErrorMessage>
        </FormControl>
      </Stack>
    </form>
  );
};
