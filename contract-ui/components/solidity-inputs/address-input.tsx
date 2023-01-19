import { Input, InputProps } from "@chakra-ui/react";
import { utils } from "ethers";
import { useFormContext } from "react-hook-form";

export const SolidityAddressInput: React.FC<InputProps> = ({
  ...inputProps
}) => {
  const { setValue, setError, clearErrors } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (utils.isAddress(val) === false) {
      setError(inputProps.name as string, {
        type: "pattern",
        message: "Address is not a valid address.",
      });
    } else {
      setValue(inputProps.name as string, val);
      clearErrors(inputProps.name as string);
    }
  };

  return (
    <Input
      {...inputProps}
      pattern="^0x[a-fA-F0-9]{40}$"
      maxLength={42}
      type="text"
      onChange={handleChange}
    />
  );
};
