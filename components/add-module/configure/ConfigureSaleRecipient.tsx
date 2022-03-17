import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import useAddModuleContext from "contexts/AddModuleContext";

export const ConfigureSaleRecipient: React.FC = () => {
  const { register, errors } = useAddModuleContext();

  return (
    <FormControl isInvalid={!!errors.primarySaleRecipientAddress} isRequired>
      <FormLabel>Primary Sale Recipient Address</FormLabel>
      <Input {...register("primarySaleRecipientAddress")} />
      <FormHelperText>
        This address will receive the sales from NFT drops.
      </FormHelperText>
      <FormErrorMessage>
        {errors?.primarySaleRecipientAddress?.message}
      </FormErrorMessage>
    </FormControl>
  );
};
