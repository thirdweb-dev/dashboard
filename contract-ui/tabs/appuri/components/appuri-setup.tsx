import {
  Alert,
  AlertIcon,
  Container,
  Flex,
  FormControl,
  Input,
  InputGroup,
  Stack,
} from "@chakra-ui/react";
import {
  useContract,
  useSetAppURI,
  useStorageUpload,
} from "@thirdweb-dev/react";
import { SmartContract } from "@thirdweb-dev/sdk/dist/declarations/src/evm/contracts/smart-contract";
import { TransactionButton } from "components/buttons/TransactionButton";
import { BaseContract } from "ethers";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { replaceIpfsUrl } from "lib/sdk";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CodeBlock, Heading, LinkButton, Text } from "tw-components";

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
  const { contract: realContract } = useContract(contract?.getAddress());
  const form = useForm<{
    appURI: string;
  }>({
    defaultValues: {
      appURI: appURI || "",
    },
    reValidateMode: "onChange",
  });
  const storageUpload = useStorageUpload();
  const { mutate: setAppURI, isLoading } = useSetAppURI(contract);

  const watchAppUri = form.watch("appURI") || "";

  const iframeSrc = buildIframeSrc(replaceIpfsUrl(watchAppUri));

  const embedCode = `<iframe
  src="${iframeSrc}"
  width="600px"
  height="600px"
  style="max-width:100%;"
  frameborder="0"
></iframe>
`;

  useEffect(() => {
    if (realContract) {
      // eslint-disable-next-line no-console
      console.log({ realContract });
      realContract.app.get().then((appUri) => {
        // eslint-disable-next-line no-console
        console.log({ appUri });
      });
    }
  }, [realContract]);

  return (
    <Flex gap={8} direction="column">
      <Flex
        gap={8}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Container maxW="2xl" h="full">
          <Flex flexDir="column" gap={4}>
            <Flex flexDir="column" gap={2}>
              <Flex justifyContent="space-between">
                <Heading size="title.lg" as="h1">
                  App URI
                </Heading>
                <LinkButton
                  href={replaceIpfsUrl(watchAppUri)}
                  colorScheme="blue"
                  isExternal
                  variant="outline"
                >
                  Preview App
                </LinkButton>
              </Flex>
              <Text>Set the App URI for your contract.</Text>
            </Flex>
            <FormControl>
              <InputGroup display="flex">
                <Input
                  placeholder="ipfs://Qm..."
                  isDisabled={storageUpload.isLoading}
                  {...form.register("appURI")}
                />
                {/*               <InputRightElement mx={1} width={{ base: "75px", md: "145px" }}>
                  <IpfsUploadButton
                    onUpload={(uri) =>
                      form.setValue("appURI", uri, { shouldDirty: true })
                    }
                    storageUpload={storageUpload}
                  >
                    <Box display={{ base: "none", md: "block" }} mr={1} as="span">
                      Upload to
                    </Box>
                    IPFS
                  </IpfsUploadButton>
                </InputRightElement> */}
              </InputGroup>
            </FormControl>
            <Flex gap={2} justifyContent="flex-end">
              <TransactionButton
                alignSelf="flex-end"
                disabled={form.getFieldState("appURI").isDirty}
                onClick={() => setAppURI({ uri: watchAppUri })}
                colorScheme="blue"
                isLoading={isLoading}
                transactionCount={1}
              >
                Update
              </TransactionButton>
            </Flex>
            <Stack as={Card} w="100%" gap={2}>
              <Heading size="label.md">Embed Code</Heading>
              <CodeBlock
                canCopy={true}
                whiteSpace="pre"
                overflowX="auto"
                code={embedCode}
                language="markup"
              />
            </Stack>
          </Flex>
        </Container>
      </Flex>
    </Flex>
  );
};
