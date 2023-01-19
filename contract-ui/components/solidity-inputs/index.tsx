import { SolidityAddressInput } from "./address-input";
import { SolidityIntInput } from "./int-input";
import { SolidityStringInput } from "./string-input";
import { Input, InputProps } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export interface SolidityInputProps extends InputProps {
  solidityType: string;
}

export const SolidityInput: React.FC<SolidityInputProps> = ({
  solidityType,
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
    solidityType.startsWith("uint") ||
    (solidityType.startsWith("int") && !solidityType.endsWith("[]"))
  ) {
    return <SolidityIntInput solidityType={solidityType} {...inputProps} />;
  } else if (solidityType === "address") {
    return <SolidityAddressInput {...inputProps} />;
  } /* else if (solidityType === "string") {
    return <SolidityStringInput {...inputProps} />;
  } */
  return <Input {...inputProps} />;
};
