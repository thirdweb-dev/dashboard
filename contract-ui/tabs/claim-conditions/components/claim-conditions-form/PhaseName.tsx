import { FormControl, Input } from "@chakra-ui/react";
import React from "react";
import { FormHelperText, FormLabel, Heading } from "tw-components";

interface PhaseNameProps {
  inputValue?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
  editable: boolean;
  inputPlaceholder: string;
}

export const PhaseName: React.FC<PhaseNameProps> = ({
  inputValue,
  editable,
  onChange,
  disabled,
  inputPlaceholder,
}) => {
  return (
    <>
      {/* Phase Name */}
      {editable ? (
        <FormControl>
          <Heading as={FormLabel} size="label.md">
            Name
          </Heading>
          <Input
            w="auto"
            isDisabled={disabled}
            type="text"
            value={inputValue}
            placeholder={inputPlaceholder}
            onChange={onChange}
          />
          <FormHelperText>
            This does not affect how your claim phase functions and is for
            organizational purposes only.
          </FormHelperText>
        </FormControl>
      ) : (
        <Heading size="label.lg">{inputValue || inputPlaceholder}</Heading>
      )}
    </>
  );
};
