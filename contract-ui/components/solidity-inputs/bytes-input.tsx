import { SolidityInputWithTypeProps } from ".";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { formatBytes32String, keccak256 } from "ethers/lib/utils";
import { Button } from "tw-components";

export const SolidityBytesInput: React.FC<SolidityInputWithTypeProps> = ({
  formContext: form,
  solidityType,
  ...inputProps
}) => {
  const inputName = inputProps.name as string;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    form.setValue(inputName, val, { shouldDirty: true });
    try {
      keccak256(val);
      form.clearErrors(inputName);
    } catch (error) {
      form.setError(inputName, {
        type: "pattern",
        message: `Value is not a valid ${solidityType}.`,
      });
    }
  };

  const handleConversion = () => {
    const val = form.getValues(inputName);

    try {
      const hash = formatBytes32String(val);
      form.setValue(inputName, hash, { shouldDirty: true });
      form.clearErrors(inputName);
    } catch (error) {
      form.setError(inputName, {
        type: "pattern",
        message: `Error trying to convert to ${solidityType}.`,
      });
    }
  };

  return (
    <InputGroup>
      <Input
        {...inputProps}
        value={form.watch(inputName)}
        onChange={handleChange}
      />
      {!!form.getFieldState(inputName, form.formState).error && (
        <InputRightElement width="96px">
          <Button
            size="xs"
            padding={3}
            paddingY="3.5"
            aria-label="Convert to bytes"
            onClick={handleConversion}
            ml={3}
            bgColor="gray.700"
          >
            Convert
          </Button>
        </InputRightElement>
      )}
    </InputGroup>
  );
};
