import { SolidityInputWithTypeProps } from ".";
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
    const parsedValue = value
      .replace("[", "")
      .replace("]", "")
      .split(",")
      .map((v) => v.trim());

    console.log(parsedValue);
  };

  return (
    <Textarea {...(inputProps as TextareaProps)} onChange={handleChange} />
  );
};
