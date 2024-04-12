import {
  useEngineCreateAccessToken,
  useEngineImportKeypair,
} from "@3rdweb-sdk/react/hooks/useEngine";
import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Icon,
  Stack,
  Textarea,
  FormControl,
  Alert,
  AlertTitle,
  AlertDescription,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Code,
} from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import {
  Button,
  Checkbox,
  CodeBlock,
  FormHelperText,
  FormLabel,
  Heading,
  Link,
  Text,
} from "tw-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState } from "react";

interface AddKeypairButtonProps {
  instanceUrl: string;
}

export const AddKeypairButton: React.FC<AddKeypairButtonProps> = ({
  instanceUrl,
}) => {
  const [publicKey, setPublicKey] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync: importKeypair } = useEngineImportKeypair(instanceUrl);
  const trackEvent = useTrack();

  const { onSuccess, onError } = useTxNotifications(
    "Public key imported successfully.",
    "Failed to import public key.",
  );

  const onClick = async () => {
    try {
      await importKeypair({ publicKey });
      onSuccess();
      trackEvent({
        category: "engine",
        action: "import-keypair",
        label: "success",
        instance: instanceUrl,
      });
      setPublicKey("");
      onClose();
    } catch (error) {
      onError(error);
      trackEvent({
        category: "engine",
        action: "import-keypair",
        label: "error",
        instance: instanceUrl,
        error,
      });
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        variant="ghost"
        size="sm"
        leftIcon={<Icon as={AiOutlinePlusCircle} boxSize={6} />}
        colorScheme="primary"
        w="fit-content"
      >
        Add Public Key
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Public Key</ModalHeader>
          <ModalBody as={Flex} flexDir="column" gap={4}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>1. Generate a keypair</FormLabel>
                <Tabs fontSize="small" mt={4}>
                  <TabList>
                    <Tab>Mac &amp; Linux</Tab>
                    <Tab>Windows</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel p={4}>
                      <Stack>
                        <Text>
                          Generate a ES256 private and public key in your
                          terminal. Keep your private key secure.
                        </Text>
                        <CodeBlock
                          fontSize="sm"
                          code={`openssl ecparam -name prime256v1 -genkey -noout -out private.key && \
openssl ec -in private.key -pubout -out public.key`}
                          language="solidity"
                        />
                        <Text>Print the public key.</Text>
                        <CodeBlock
                          fontSize="sm"
                          code={`cat public.key`}
                          language="solidity"
                        />
                      </Stack>
                    </TabPanel>
                    <TabPanel p={4}>
                      <Stack>
                        <Text>Generate a keypair in your command line.</Text>
                        <CodeBlock
                          fontSize="sm"
                          code={`openssl ecparam -name prime256v1 -genkey -noout -out private.key
openssl ec -in private.key -pubout -out public.key`}
                          language="solidity"
                        />
                      </Stack>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </FormControl>

              <FormControl>
                <FormLabel>2. Paste the public key</FormLabel>
                <Textarea
                  fontFamily="mono"
                  fontSize="small"
                  value={publicKey}
                  onChange={(e) => setPublicKey(e.target.value)}
                  placeholder={
                    "-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"
                  }
                />
              </FormControl>

              <Alert variant="left-accent">
                <Stack>
                  {/* <Heading size="label.lg"></Heading> */}
                  <Text>
                    Your backend will generate{" "}
                    <strong>restricted access tokens</strong> signed with this
                    private key.
                    <br />
                    Engine verifies each token with this public key.
                  </Text>
                </Stack>
              </Alert>
            </Stack>
          </ModalBody>

          <ModalFooter as={Flex} gap={3}>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="primary" onClick={onClick}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
