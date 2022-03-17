import { useModuleMetadataList, useRoyaltyTreasury } from "@3rdweb-sdk/react";
import { ModuleType } from "@3rdweb/sdk";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
} from "@chakra-ui/react";
import useAddModuleContext from "contexts/AddModuleContext";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useMemo } from "react";

export const ConfigureRoyalty: React.FC = () => {
  const appAddress = useSingleQueryParam("app");
  const { watch, setValue, register, errors } = useAddModuleContext();
  const data = useModuleMetadataList(appAddress, [ModuleType.SPLITS]);
  const royaltyTreasury = useRoyaltyTreasury(appAddress);

  const validSplits = useMemo(() => {
    return data.data?.filter((split) => split.metadata?.is_royalty);
  }, [data.data]);

  return (
    <HStack align="flex-start">
      <FormControl isInvalid={!!errors.feeRecipient}>
        <FormLabel>Royalty Recipient</FormLabel>
        <Select
          value={watch("feeRecipient")}
          onChange={(e) => setValue("feeRecipient", e.target.value)}
        >
          <option key={royaltyTreasury.data} value={royaltyTreasury.data}>
            Project Royalty Treasury ({royaltyTreasury.data})
          </option>
          {validSplits?.map((split) => (
            <option key={split.address} value={split.address}>
              {split.metadata?.name} ({split.address})
            </option>
          ))}
        </Select>
        <FormErrorMessage>{errors?.feeRecipient?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.sellerFeeBasisPoints} width="150px">
        <FormLabel>Royalty</FormLabel>
        <InputGroup>
          <Input
            type="number"
            step="0.01"
            {...register("sellerFeeBasisPoints")}
          />
          <InputRightAddon children="%" />
        </InputGroup>
        <FormErrorMessage>
          {errors?.sellerFeeBasisPoints?.message}
        </FormErrorMessage>
      </FormControl>
    </HStack>
  );
};
