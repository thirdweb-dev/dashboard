import {
  Center,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useStorageUpload } from "@thirdweb-dev/react";
import { FileInput } from "components/shared/FileInput";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { Button, Drawer, Heading } from "tw-components";

interface ContractUriUploadProps {
  value: string;
  setValue: (value: string) => void;
}

export const ContractUriUpload: React.FC<ContractUriUploadProps> = ({
  value,
  setValue,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <UploadDrawer isOpen={isOpen} onClose={onClose} setValue={setValue} />
      <InputGroup>
        <Input
          defaultValue={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <InputRightElement width="96px">
          <Button
            size="xs"
            padding="10px"
            paddingY="14px"
            colorScheme="purple"
            rightIcon={<Icon as={FiUpload} />}
            onClick={onOpen}
          >
            Upload
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

interface UploadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  setValue: (value: string) => void;
}

const UploadDrawer: React.FC<UploadDrawerProps> = ({
  isOpen,
  onClose,
  setValue,
}) => {
  const { mutateAsync: upload } = useStorageUpload();
  const [data, setData] = useState<any>("");

  const handleUpload = async () => {
    const [uri] = await upload(data);
    setValue(uri);
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      size="md"
      onClose={onClose}
      header={{
        children: <Heading>Upload Metadata to IPFS</Heading>,
      }}
      footer={{
        children: (
          <>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleUpload}>
              Upload
            </Button>
          </>
        ),
      }}
    >
      <Textarea value={data} onChange={(e) => setData(e.target.value)} />
      <FileInput setValue={(file) => setData(file)}>
        <Center
          borderRadius="md"
          width="200px"
          height="200px"
          border="1px solid"
          borderColor="gray.500"
          bg="gray.700"
        >
          <Icon as={FiUpload} color="gray.600" _hover={{ color: "gray.500" }} />
        </Center>
      </FileInput>
    </Drawer>
  );
};
