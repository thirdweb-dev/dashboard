import { SolidityInputProps } from ".";
import { Icon, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useStorageUpload } from "@thirdweb-dev/react";
import { FileInput } from "components/shared/FileInput";
import { useErrorHandler } from "contexts/error-handler";
import { FiUpload } from "react-icons/fi";
import { Button } from "tw-components";

export const SolidityStringInput: React.FC<SolidityInputProps> = ({
  formContext: form,
  ...inputProps
}) => {
  const { onError } = useErrorHandler();
  const { mutate: upload, isLoading } = useStorageUpload();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    form.setValue(inputProps.name as string, val, { shouldDirty: true });
  };

  const handleUpload = (file: File) => {
    upload(
      { data: [file] },
      {
        onSuccess: ([uri]) =>
          form.setValue(inputProps.name as string, uri, { shouldDirty: true }),
        onError: (error) => onError(error, "Failed to upload file"),
      },
    );
  };

  return (
    <InputGroup>
      <Input
        value={form.watch(inputProps.name as string)}
        disabled={isLoading}
        onChange={handleChange}
        {...inputProps}
      />
      {/* // TODO: This is not working because the name is not being passed (index is being passed instead) */}
      {(inputProps.name as string).toLowerCase().includes("uri") && (
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
            >
              IPFS
            </Button>
          </FileInput>
        </InputRightElement>
      )}
    </InputGroup>
  );
};
