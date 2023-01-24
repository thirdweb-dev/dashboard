import { SolidityInputWithTypeProps } from ".";
import { Icon, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useStorageUpload } from "@thirdweb-dev/react";
import { FileInput } from "components/shared/FileInput";
import { useErrorHandler } from "contexts/error-handler";
import { FiUpload } from "react-icons/fi";
import { Button } from "tw-components";

export const SolidityStringInput: React.FC<SolidityInputWithTypeProps> = ({
  formContext: form,
  solidityName,
  ...inputProps
}) => {
  const inputName = inputProps.name as string;
  const { onError } = useErrorHandler();
  const { mutate: upload, isLoading } = useStorageUpload();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    form.setValue(inputName, value, { shouldDirty: true });
  };

  const handleUpload = (file: File) => {
    upload(
      { data: [file] },
      {
        onSuccess: ([uri]) =>
          form.setValue(inputName, uri, { shouldDirty: true }),
        onError: (error) => onError(error, "Failed to upload file"),
      },
    );
  };

  const showButton =
    ((solidityName as string).toLowerCase().includes("uri") ||
      (solidityName as string).toLowerCase().includes("ipfs")) &&
    (solidityName as string) !== "_baseURIForTokens";

  return (
    <InputGroup>
      <Input
        value={form.watch(inputName)}
        disabled={isLoading}
        onChange={handleChange}
        {...inputProps}
      />
      {showButton && (
        <InputRightElement width="96px">
          <FileInput setValue={handleUpload}>
            <Button
              size="xs"
              padding="3"
              paddingY="3.5"
              aria-label="Upload to IPFS"
              rightIcon={<Icon as={FiUpload} />}
              isLoading={isLoading}
              ml={3}
              bgColor="gray.700"
            >
              IPFS
            </Button>
          </FileInput>
        </InputRightElement>
      )}
    </InputGroup>
  );
};
