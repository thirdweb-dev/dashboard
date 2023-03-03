import { useDashboardEVMChainId } from "@3rdweb-sdk/react";
import {
  Container,
  Flex,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";
import {
  useContract,
  useSetAppURI,
  useStorageUpload,
} from "@thirdweb-dev/react";
import { SmartContract } from "@thirdweb-dev/sdk/dist/declarations/src/evm/contracts/smart-contract";
import { TransactionButton } from "components/buttons/TransactionButton";
import { BaseContract } from "ethers";
import { useChainSlug } from "hooks/chains/chainSlug";
import { useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import {
  Card,
  CodeBlock,
  FormLabel,
  Heading,
  Text,
  TrackedCopyButton,
  TrackedIconButton,
  TrackedLink,
} from "tw-components";

interface AppURISetupProps {
  appURI?: string;
  contract: SmartContract<BaseContract> | undefined;
}

const TRACKING_CATEGORY = "app-uri";

export const AppURISetup: React.FC<AppURISetupProps> = ({
  appURI,
  contract,
}) => {
  const chainId = useDashboardEVMChainId();
  const chainSlug = useChainSlug(chainId?.toString() || "0");
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

  const embedCode = `<iframe
  src="https://${contract?.getAddress()}-${chainSlug}.third.app"
  width="600px"
  height="600px"
  style="max-width:100%;"
  frameborder="0"
></iframe>
`;

  return (
    <Flex gap={8} direction="column">
      <Flex
        gap={8}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Container maxW="100%" h="full">
          <Flex flexDir="column" gap={6}>
            <Flex flexDir="column" gap={2}>
              <Heading size="title.lg" as="h1">
                App
              </Heading>

              <Text>
                Set the official URI that points to your app on the contract
              </Text>
              <Text>
                Use npx thirdweb deploy --app in any web project to deploy
              </Text>
            </Flex>
            <Card
              as={Flex}
              flexDir="column"
              gap={6}
              p={6}
              _groupHover={{ borderColor: "blue.500" }}
              position="relative"
            >
              <Flex justifyContent="space-between">
                <Flex gap={2} flexDir="column">
                  <Heading size="subtitle.sm" as="h3" noOfLines={1}>
                    Contract URL
                  </Heading>
                  <Text>
                    This URL will resolve the App URI for your contract.
                  </Text>
                </Flex>
              </Flex>
              <InputGroup>
                <Input
                  readOnly
                  value={`https://${contract?.getAddress()}-${chainSlug}.third.app`}
                  pr="75px"
                />
                <InputRightElement as={Flex} mr={4}>
                  <Tooltip
                    p={0}
                    bg="backgroundBody"
                    boxShadow="none"
                    label={
                      <Card py={2} px={4}>
                        <Text size="label.sm">Copy URL</Text>
                      </Card>
                    }
                    borderRadius="lg"
                    shouldWrapChildren
                    placement="right"
                  >
                    <TrackedCopyButton
                      category={TRACKING_CATEGORY}
                      label="copy-rpc-url"
                      aria-label="Copy RPC url"
                      size="sm"
                      colorScheme={undefined}
                      value={`https://${contract?.getAddress()}-${chainSlug}.third.app`}
                    />
                  </Tooltip>
                  <Tooltip
                    p={0}
                    bg="backgroundBody"
                    boxShadow="none"
                    label={
                      <Card py={2} px={4}>
                        <Text size="label.sm">Open URL</Text>
                      </Card>
                    }
                    borderRadius="lg"
                    shouldWrapChildren
                    placement="right"
                  >
                    <TrackedIconButton
                      as={TrackedLink}
                      href={`https://${contract?.getAddress()}-${chainSlug}.third.app`}
                      category={TRACKING_CATEGORY}
                      label="open-url"
                      aria-label="Open URL"
                      icon={<Icon as={FiExternalLink} />}
                      variant="ghost"
                      isExternal
                      size="sm"
                    />
                  </Tooltip>
                </InputRightElement>
              </InputGroup>
            </Card>
            <FormControl>
              <FormLabel>App URI</FormLabel>
              <InputGroup display="flex">
                <Input
                  placeholder="ipfs://Qm..."
                  isDisabled={storageUpload.isLoading}
                  {...form.register("appURI")}
                />
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
            <Flex flexDir="column" gap={2}>
              <Heading size="label.md">Embed Code</Heading>
              <CodeBlock
                canCopy={true}
                whiteSpace="pre"
                overflowX="auto"
                code={embedCode}
                language="markup"
              />
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </Flex>
  );
};
