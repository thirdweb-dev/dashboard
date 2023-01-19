import {
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { useEns } from "components/contract-components/hooks";
import { utils } from "ethers";
import { useFormContext } from "react-hook-form";
import { Button } from "tw-components";

export const SolidityAddressInput: React.FC<InputProps> = ({
  ...inputProps
}) => {
  const { setValue, setError, clearErrors, watch } = useFormContext();
  const ensQuery = useEns(watch(inputProps.name as string));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(inputProps.name as string, val);
    if (utils.isAddress(val) === false && !val.endsWith(".eth")) {
      setError(inputProps.name as string, {
        type: "pattern",
        message: "Address is not a valid address.",
      });
    } else {
      clearErrors(inputProps.name as string);
    }
  };

  const handleConversion = () => {
    if (ensQuery?.data?.address) {
      setValue(inputProps.name as string, ensQuery.data.address);
      clearErrors(inputProps.name as string);
    } else {
      setError(inputProps.name as string, {
        type: "pattern",
        message: "ENS couldn't be resolved. Please try again.",
      });
    }
  };

  return (
    <InputGroup>
      <Input
        {...inputProps}
        value={watch(inputProps.name as string)}
        onChange={handleChange}
      />
      {watch(inputProps.name as string).endsWith(".eth") && (
        <InputRightElement width="96px">
          <Button
            size="xs"
            padding={3.5}
            paddingY="3.5"
            colorScheme="purple"
            aria-label="Convert to bytes"
            onClick={handleConversion}
            mr={2}
            disabled={ensQuery.isLoading}
          >
            Resolve ENS
          </Button>
        </InputRightElement>
      )}
    </InputGroup>
  );
};
