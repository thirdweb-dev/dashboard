import { SolidityInputProps } from ".";
import { Textarea, TextareaProps } from "@chakra-ui/react";

export const SolidityTupleInput: React.FC<SolidityInputProps> = ({
  ...inputProps
}) => {
  return <Textarea {...(inputProps as TextareaProps)} />;
};
