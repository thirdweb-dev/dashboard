import {
  Icon,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { useStorageUpload } from "@thirdweb-dev/react";
import { FileInput } from "components/shared/FileInput";
import { useErrorHandler } from "contexts/error-handler";
import { useFormContext } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { Button } from "tw-components";

export const SolidityStringInput: React.FC<InputProps> = ({
  ...inputProps
}) => {
  const { setValue, watch } = useFormContext();
  const { onError } = useErrorHandler();
  const { mutate: upload, isLoading } = useStorageUpload();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(inputProps.name as string, val);
  };

  const handleUpload = (file: File) => {
    upload(
      { data: [file] },
      {
        onSuccess: ([uri]) => setValue(inputProps.name as string, uri),
        onError: (error) => onError(error, "Failed to upload file"),
      },
    );
  };

  return (
    <InputGroup>
      <Input
        value={watch(inputProps.name as string)}
        disabled={isLoading}
        onChange={handleChange}
        {...inputProps}
      />
      {(inputProps.name as string).toLowerCase().includes("uri") && (
        <InputRightElement width="96px">
          <FileInput setValue={handleUpload}>
            <Button
              size="xs"
              padding="3"
              paddingY="3.5"
              colorScheme="purple"
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
