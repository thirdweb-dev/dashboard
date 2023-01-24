import { SolidityInputProps } from ".";
import { validateAddress } from "./helpers";
import { Flex, Input } from "@chakra-ui/react";
import { useEns } from "components/contract-components/hooks";
import { isAddress } from "ethers/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { FormHelperText, Text } from "tw-components";

export const SolidityAddressInput: React.FC<SolidityInputProps> = ({
  formContext: form,
  ...inputProps
}) => {
  const inputName = inputProps.name as string;
  const inputNameWatch = form.watch(inputName);
  const [localInput, setLocalInput] = useState(inputNameWatch);
  const setDefault = useRef(false);

  const ensQuery = useEns(localInput);

  const { setValue, clearErrors } = form;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLocalInput(value);
    setValue(inputName, value, { shouldDirty: true });

    const inputError = validateAddress(value);

    if (inputError) {
      form.setError(inputName, inputError);
    } else {
      form.clearErrors(inputName);
    }
  };

  useEffect(() => {
    if (!localInput && !!inputNameWatch && setDefault.current === false) {
      setLocalInput(inputNameWatch);
      setDefault.current = true;
    }
  }, [inputName, inputNameWatch, localInput]);

  useEffect(() => {
    if (ensQuery?.data?.address && ensQuery?.data?.address !== inputNameWatch) {
      setValue(inputName, ensQuery.data.address, {
        shouldDirty: true,
      });
      clearErrors(inputName);
    }
  }, [
    ensQuery.data?.address,
    setValue,
    clearErrors,
    inputName,
    inputNameWatch,
  ]);

  const hasError = !!form.getFieldState(inputName, form.formState).error;

  const resolvingEns = useMemo(
    () =>
      localInput?.endsWith(".eth") &&
      !ensQuery.isError &&
      !ensQuery.data?.address,
    [ensQuery.data?.address, ensQuery.isError, localInput],
  );

  const resolvedAddress = useMemo(
    () => localInput?.endsWith(".eth") && !hasError && ensQuery.data?.address,
    [ensQuery.data?.address, hasError, localInput],
  );

  const ensFound = useMemo(
    () => isAddress(localInput) && !hasError && ensQuery?.data?.ensName,
    [ensQuery?.data?.ensName, hasError, localInput],
  );

  return (
    <>
      <Input
        placeholder="address"
        maxLength={42}
        {...inputProps}
        onChange={handleChange}
        value={localInput}
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
