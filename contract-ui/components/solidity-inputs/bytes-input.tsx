import { SolidityInputProps } from ".";
import { Input } from "@chakra-ui/react";
import { keccak256 } from "ethers/lib/utils";
import { useFormContext } from "react-hook-form";

export const SolidityBytesInput: React.FC<SolidityInputProps> = ({
  solidityType,
  ...inputProps
}) => {
  const { setValue, setError, clearErrors } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    try {
      keccak256(val);
      setValue(inputProps.name as string, val);
      clearErrors(inputProps.name as string);
    } catch (error) {
      setError(inputProps.name as string, {
        type: "pattern",
        message: `Value is not a valid ${solidityType}.`,
      });
    }
  };

  return <Input {...inputProps} type="text" onChange={handleChange} />;
};
