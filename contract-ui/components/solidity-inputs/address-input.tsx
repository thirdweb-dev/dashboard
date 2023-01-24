import { SolidityInputProps } from ".";
import { validateAddress } from "./helpers";
import { Flex, Input } from "@chakra-ui/react";
import { useEns } from "components/contract-components/hooks";
import { isAddress } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { FormHelperText, Text } from "tw-components";

export const SolidityAddressInput: React.FC<SolidityInputProps> = ({
  formContext: form,
  ...inputProps
}) => {
  const inputName = inputProps.name as string;
  const inputNameWatch = form.watch(inputName);
  const [localInput, setLocalInput] = useState(inputNameWatch);

  const ensQuery = useEns(localInput);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLocalInput(value);

    const inputError = validateAddress(value);

    if (inputError) {
      form.setError(inputName, inputError);
    } else {
      form.clearErrors(inputName);
    }
  };

  useEffect(() => {
    if (ensQuery?.data?.address && ensQuery?.data?.address !== inputNameWatch) {
      form.setValue(inputName, ensQuery.data.address, {
        shouldDirty: true,
      });
      form.clearErrors(inputName);
    }
  }, [ensQuery.data?.address, form, inputName, inputNameWatch]);

  const hasError = !!form.getFieldState(inputName, form.formState).error;

  const resolvingEns =
    localInput?.endsWith(".eth") &&
    !ensQuery.isError &&
    !ensQuery.data?.address;

  const resolvedAddress =
    localInput?.endsWith(".eth") && !hasError && ensQuery.data?.address;

  const ensFound =
    isAddress(localInput) && !hasError && ensQuery?.data?.ensName;

  return (
    <>
      <Input
        placeholder="address"
        onChange={handleChange}
        value={localInput}
        maxLength={42}
      />

      <Input
        placeholder="address"
        display="none"
        maxLength={42}
        {...inputProps}
      />

      {resolvingEns || resolvedAddress || ensFound ? (
        <FormHelperText as={Flex}>
          {resolvingEns && "Resolving ENS..."}
          {resolvedAddress && (
            <Flex gap={2}>
              <Text color="green.600">✔</Text>{" "}
              <Text>Resolved address: {ensQuery?.data?.address}</Text>
            </Flex>
          )}
          {ensFound && (
            <Flex gap={2}>
              <Text color="green.600">✔</Text>{" "}
              <Text>ENS Found: {ensQuery?.data?.ensName}</Text>
            </Flex>
          )}
        </FormHelperText>
      ) : null}

      {ensQuery.isError && (
        <FormHelperText color="red.300">
          ENS couldn&apos;t be resolved.
        </FormHelperText>
      )}
    </>
  );
};
