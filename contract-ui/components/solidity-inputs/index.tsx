import { SolidityIntInput } from "./int-input";
import { Input, InputProps } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export interface SolidityInputProps extends InputProps {
  type: string;
}

export const SolidityInput: React.FC<SolidityInputProps> = ({
  type,
  ...inputProps
}) => {
  const form = useFormContext();

  if (!form) {
    throw new Error(
      "SolidityInput must be used within a form context provided by useFormContext",
    );
  }

  if (type.startsWith("uint") || type.startsWith("int")) {
    return <SolidityIntInput type={type} {...inputProps} />;
  }
  return <Input type={type} {...inputProps} />;
};
