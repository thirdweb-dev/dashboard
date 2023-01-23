import { SolidityInputProps } from ".";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useEns } from "components/contract-components/hooks";
import { utils } from "ethers";
import { Button } from "tw-components";

export const SolidityAddressInput: React.FC<SolidityInputProps> = ({
  formContext: form,
  ...inputProps
}) => {
  const ensQuery = useEns(form.watch(inputProps.name as string));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    form.setValue(inputProps.name as string, val, {
      shouldDirty: true,
    });
    if (utils.isAddress(val) === false && !val.endsWith(".eth")) {
      form.setError(inputProps.name as string, {
        type: "pattern",
        message: "Address is not a valid address.",
      });
    } else {
      form.clearErrors(inputProps.name as string);
    }
  };

  const handleConversion = () => {
    if (ensQuery?.data?.address) {
      form.setValue(inputProps.name as string, ensQuery.data.address, {
        shouldDirty: true,
      });
      form.clearErrors(inputProps.name as string);
    } else {
      form.setError(inputProps.name as string, {
        type: "pattern",
        message: "ENS couldn't be resolved. Please try again.",
      });
    }
  };

  // TODO: Add error onBlur if ENS
  return (
    <InputGroup>
      <Input
        {...inputProps}
        onChange={handleChange}
        value={form.watch(inputProps.name as string)}
        maxLength={42}
      />
      {form.watch(inputProps.name as string)?.endsWith(".eth") && (
        <InputRightElement width="96px">
          <Button
            size="xs"
            padding={3.5}
            paddingY="3.5"
            aria-label="Convert to bytes"
            onClick={handleConversion}
            mr={2}
            disabled={ensQuery.isLoading}
            bgColor="gray.700"
          >
            Resolve ENS
          </Button>
        </InputRightElement>
      )}
    </InputGroup>
  );
};
