import { SolidityInputProps } from ".";
import { validateAddress } from "./helpers";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useEns } from "components/contract-components/hooks";
import { utils } from "ethers";
import { Button } from "tw-components";

export const SolidityAddressInput: React.FC<SolidityInputProps> = ({
  formContext: form,
  ...inputProps
}) => {
  const inputName = inputProps.name as string;
  const ensQuery = useEns(form.watch(inputName));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    form.setValue(inputName, value, { shouldDirty: true });

    const inputError = validateAddress(value);

    if (inputError) {
      form.setError(inputName, inputError);
    } else {
      form.clearErrors(inputName);
    }
  };

  const handleConversion = () => {
    if (ensQuery?.data?.address) {
      form.setValue(inputName, ensQuery.data.address, {
        shouldDirty: true,
      });
      form.clearErrors(inputName);
    } else {
      form.setError(inputName, {
        type: "pattern",
        message: "ENS couldn't be resolved. Please try again.",
      });
    }
  };

  // TODO: Add error onBlur if ENS
  return (
    <InputGroup>
      <Input
        placeholder="address"
        {...inputProps}
        onChange={handleChange}
        value={form.watch(inputName)}
        maxLength={42}
      />
      {form.watch(inputName)?.endsWith(".eth") && (
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
