import { SolidityInputWithTypeProps } from ".";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { formatBytes32String, keccak256 } from "ethers/lib/utils";
import { Button } from "tw-components";

export const SolidityBytesInput: React.FC<SolidityInputWithTypeProps> = ({
  formObject: form,
  solidityType,
  ...inputProps
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    form.setValue(inputProps.name as string, val);
    try {
      keccak256(val);
      form.clearErrors(inputProps.name as string);
    } catch (error) {
      form.setError(inputProps.name as string, {
        type: "pattern",
        message: `Value is not a valid ${solidityType}.`,
      });
    }
  };

  const handleConversion = () => {
    const val = form.getValues(inputProps.name as string);

    try {
      const hash = formatBytes32String(val);
      form.setValue(inputProps.name as string, hash);
      form.clearErrors(inputProps.name as string);
    } catch (error) {
      form.setError(inputProps.name as string, {
        type: "pattern",
        message: `Error trying to convert to ${solidityType}.`,
      });
    }
  };

  return (
    <InputGroup>
      <Input
        {...inputProps}
        value={form.watch(inputProps.name as string)}
        onChange={handleChange}
      />
      {!!form.getFieldState(inputProps.name as string, form.formState)
        .error && (
        <InputRightElement width="96px">
          <Button
            size="xs"
            padding={3}
            paddingY="3.5"
            colorScheme="purple"
            aria-label="Convert to bytes"
            onClick={handleConversion}
            ml={3}
          >
            Convert
          </Button>
        </InputRightElement>
      )}
    </InputGroup>
  );
};
