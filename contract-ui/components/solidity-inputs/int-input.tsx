import { SolidityInputWithTypeProps } from ".";
import { validateInt } from "./helpers";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { parseEther } from "ethers/lib/utils";
import { Button } from "tw-components";

export const SolidityIntInput: React.FC<SolidityInputWithTypeProps> = ({
  formContext: form,
  solidityType,
  ...inputProps
}) => {
  const inputName = inputProps.name as string;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    form.setValue(inputName, value, { shouldDirty: true });

    const inputError = validateInt(value, solidityType);

    if (inputError) {
      form.setError(inputName, inputError);
    } else {
      form.clearErrors(inputName);
    }
  };

  const handleConversion = () => {
    const val: string = form.getValues(inputName);

    try {
      const parsed = parseEther(val.replace(",", "."));
      form.setValue(inputName, parsed.toString(), {
        shouldDirty: true,
        shouldValidate: true,
      });
      form.clearErrors(inputName);
    } catch (e) {
      form.setError(inputName, {
        type: "pattern",
        message: "Can't be converted to wei.",
      });
    }
  };

  return (
    <InputGroup>
      <Input
        placeholder={solidityType}
        {...inputProps}
        value={form.watch(inputName)}
        onChange={handleChange}
      />
      {(form.watch(inputName).includes(".") ||
        form.watch(inputName).includes(",")) && (
        <InputRightElement width="72px">
          <Button
            size="xs"
            padding={2}
            paddingY="3.5"
            aria-label="Convert to WEI"
            onClick={handleConversion}
            bgColor="gray.700"
            _hover={{ bgColor: "gray.800" }}
            ml={2}
          >
            To Wei
          </Button>
        </InputRightElement>
      )}
    </InputGroup>
  );
};
