import { SolidityAddressInput } from "./address-input";
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

  // All ints and uints, except for arrays.
  if (
    type.startsWith("uint") ||
    (type.startsWith("int") && !type.endsWith("[]"))
  ) {
    return <SolidityIntInput type={type} {...inputProps} />;
  }
  if (type === "address") {
    return <SolidityAddressInput type={type} {...inputProps} />;
  }
  return <Input type={type} {...inputProps} />;
};
