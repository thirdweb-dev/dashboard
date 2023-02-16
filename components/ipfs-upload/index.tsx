import { Icon } from "@chakra-ui/react";
import { UseMutationResult } from "@tanstack/react-query";
import { useStorageUpload } from "@thirdweb-dev/react";
import { FileInput } from "components/shared/FileInput";
import { useErrorHandler } from "contexts/error-handler";
import { FiUpload } from "react-icons/fi";
import { Button, ButtonProps } from "tw-components";
import { ComponentWithChildren } from "types/component-with-children";

export interface IpfsUploadButtonProps extends ButtonProps {
  onUpload: (uri: string) => void;
  storageUpload: UseMutationResult<string[], unknown, any, unknown>;
}

export const IpfsUploadButton: ComponentWithChildren<IpfsUploadButtonProps> = ({
  onUpload,
  children,
  ...buttonProps
}) => {
  const { mutate: upload, isLoading } = useStorageUpload();
  const { onError } = useErrorHandler();
  const handleUpload = (file: File) => {
    upload(
      { data: [file] },
      {
        onSuccess: ([uri]) => onUpload(uri),
        onError: (error) => onError(error, "Failed to upload file"),
      },
    );
  };

  return (
    <FileInput setValue={handleUpload}>
      <Button
        size="sm"
        variant="solid"
        aria-label="Upload to IPFS"
        rightIcon={<Icon as={FiUpload} />}
        isLoading={isLoading}
        {...buttonProps}
      >
        {children}
      </Button>
    </FileInput>
  );
};
