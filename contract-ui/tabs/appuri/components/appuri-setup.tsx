import {
  Box,
  Center,
  Flex,
  FormControl,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { useStorageUpload } from "@thirdweb-dev/react";
import { SmartContract } from "@thirdweb-dev/sdk/dist/declarations/src/evm/contracts/smart-contract";
import { FileInput } from "components/shared/FileInput";
import { useErrorHandler } from "contexts/error-handler";
import { BaseContract } from "ethers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { Button, Card, CodeBlock, FormLabel, Heading } from "tw-components";

interface AppURISetupProps {
  appURI?: string;
  contract: SmartContract<BaseContract> | undefined;
}

const buildIframeSrc = (appUri: string | undefined): string => {
  if (!appUri) {
    return "";
  }
  appUri = appUri.startsWith("ipfs://")
    ? `${process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL}/${appUri.replace(
        "ipfs://",
        "",
      )}`
    : appUri;

  return appUri;
};

export const AppURISetup: React.FC<AppURISetupProps> = ({
  appURI,
  contract,
}) => {
  const { register, watch, getValues, setValue, getFieldState } = useForm<{
    appURI: string;
  }>({
    defaultValues: {
      appURI,
    },
    reValidateMode: "onChange",
  });

  const iframeSrc = buildIframeSrc(appURI);

  const { onError } = useErrorHandler();
  const { mutate: upload, isLoading } = useStorageUpload();

  const handleUpload = (file: File) => {
    upload(
      { data: [file] },
      {
        onSuccess: ([uri]) => setValue("appURI", uri, { shouldDirty: true }),
        onError: (error) => onError(error, "Failed to upload file"),
      },
    );
  };

  const embedCode = `<iframe
src="${iframeSrc}"
width="600px"
height="600px"
style="max-width:100%;"
frameborder="0"
></iframe>`;

  return (
    <Flex gap={8} direction="column">
      <Flex
        gap={8}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Stack as={Card} w="100%" maxWidth="768px">
          <FormControl>
            <HStack justifyContent="center" pb={4}>
              <FormLabel flexGrow={1}>App URI</FormLabel>
              <Button
                w="auto"
                variant="outline"
                justifySelf="flex-end"
                onClick={() => window.open(iframeSrc, "_blank")}
                p={2}
              >
                Visit App
              </Button>
            </HStack>
            <InputGroup display="flex">
              <Input
                placeholder="string"
                isDisabled={isLoading}
                pr={{ base: "90px", md: "160px" }}
                {...register("appURI")}
              />
              <InputRightElement mx={1} width={{ base: "75px", md: "145px" }}>
                <FileInput setValue={handleUpload}>
                  <Button
                    size="sm"
                    variant="solid"
                    aria-label="Upload to IPFS"
                    rightIcon={<Icon as={FiUpload} />}
                    isLoading={isLoading}
                  >
                    <Box
                      display={{ base: "none", md: "block" }}
                      mr={1}
                      as="span"
                    >
                      Upload to
                    </Box>
                    IPFS
                  </Button>
                </FileInput>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Center>
            <Button
              variant="solid"
              w="100px"
              alignSelf="flex-end"
              disabled={getFieldState("appURI").isDirty}
              onClick={() => contract?.appURI.set(getValues("appURI"))}
            >
              Save
            </Button>
          </Center>
          <Stack as={Card} w="100%" maxWidth="768px">
            <Heading size="label.md">Embed Code</Heading>
            <CodeBlock
              canCopy={true}
              whiteSpace="pre"
              overflowX="auto"
              code={embedCode}
              language="markup"
            />
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};
