import { Icon, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useStorageUpload } from "@thirdweb-dev/react";
import { FileInput } from "components/shared/FileInput";
import { FiUpload } from "react-icons/fi";
import { Button } from "tw-components";

interface ContractUriUploadProps {
  value: string;
  setValue: (value: string) => void;
}

export const ContractUriUpload: React.FC<ContractUriUploadProps> = ({
  value,
  setValue,
}) => {
  const { mutateAsync: upload, isLoading } = useStorageUpload();

  const handleUpload = async (file: any) => {
    const [uri] = await upload({ data: [file] });
    setValue(uri);
  };

  return (
    <>
      <InputGroup>
        <Input
          defaultValue={value}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <InputRightElement width="96px">
          <FileInput setValue={(file) => handleUpload(file)}>
            <Button
              size="xs"
              padding="10px"
              paddingY="14px"
              colorScheme="purple"
              rightIcon={<Icon as={FiUpload} />}
              isLoading={isLoading}
            >
              Upload
            </Button>
          </FileInput>
        </InputRightElement>
      </InputGroup>
    </>
  );
};
