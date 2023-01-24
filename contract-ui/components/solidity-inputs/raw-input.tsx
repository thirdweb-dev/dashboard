import { SolidityInputWithTypeProps } from ".";
import { validateSolidityInput } from "./helpers";
import { Textarea, TextareaProps } from "@chakra-ui/react";

export const SolidityRawInput: React.FC<SolidityInputWithTypeProps> = ({
  formContext: form,
  solidityType,
  ...inputProps
}) => {
  const inputName = inputProps.name as string;
  const typeWithoutArray = solidityType.replace("[]", "");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    form.setValue(inputName, value);

    const invalidInputError = {
      type: "pattern",
      message: `Invalid input. Input should be passed in JSON format with valid values - Ex: ["0x..."]`,
    };

    const trimmedValue = value.trim();

    if (trimmedValue?.startsWith("[") && trimmedValue?.endsWith("]")) {
      try {
        const parsedValue: string[] = JSON.parse(trimmedValue);

        form.clearErrors(inputName);

        const isValid = parsedValue.every(
          (item) => !validateSolidityInput(item, typeWithoutArray),
        );

        if (!isValid) {
          form.setError(inputName, invalidInputError);
        } else {
          form.clearErrors(inputName);
        }
      } catch (error) {
        form.setError(inputName, invalidInputError);
      }
    } else {
      form.setError(inputName, invalidInputError);
    }
  };

  return (
    <Textarea
      placeholder={solidityType}
      {...(inputProps as TextareaProps)}
      onChange={handleChange}
    />
  );
};
