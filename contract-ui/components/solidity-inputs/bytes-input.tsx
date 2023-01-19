import { SolidityInputProps } from ".";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { formatBytes32String, keccak256 } from "ethers/lib/utils";
import { useFormContext } from "react-hook-form";
import { Button } from "tw-components";

export const SolidityBytesInput: React.FC<SolidityInputProps> = ({
  solidityType,
  ...inputProps
}) => {
  const {
    setValue,
    setError,
    clearErrors,
    getFieldState,
    formState,
    watch,
    getValues,
  } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(inputProps.name as string, val);
    try {
      keccak256(val);
      clearErrors(inputProps.name as string);
    } catch (error) {
      setError(inputProps.name as string, {
        type: "pattern",
        message: `Value is not a valid ${solidityType}.`,
      });
    }
  };

  const handleConversion = () => {
    const val = getValues(inputProps.name as string);

    try {
      const hash = formatBytes32String(val);
      setValue(inputProps.name as string, hash);
      clearErrors(inputProps.name as string);
    } catch (error) {
      setError(inputProps.name as string, {
        type: "pattern",
        message: `Error trying to convert to ${solidityType}.`,
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
      {!!getFieldState(inputProps.name as string, formState).error && (
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
