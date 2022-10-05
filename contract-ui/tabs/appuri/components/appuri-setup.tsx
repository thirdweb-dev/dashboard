import { useActiveChainId } from "@3rdweb-sdk/react";
import { useBreakpointValue } from "@chakra-ui/media-query";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Flex,
  FormControl,
  Input,
  Link,
  Select,
  Stack,
  useClipboard,
} from "@chakra-ui/react";
import { IoMdCheckmark } from "@react-icons/all-files/io/IoMdCheckmark";
import {
  ContractType,
  DEFAULT_IPFS_GATEWAY,
  ValidContractInstance,
} from "@thirdweb-dev/sdk";
import { ContractAppURI } from "@thirdweb-dev/sdk/dist/declarations/src/evm/core/classes/contract-appuri";
import { useForm } from "react-hook-form";
import { FiCopy } from "react-icons/fi";
import {
  Button,
  Card,
  CodeBlock,
  FormHelperText,
  FormLabel,
  Heading,
} from "tw-components";

interface AppURISetupProps {
  appUri?: string;
}

const buildIframeSrc = (appUri: string | null): string => {
  if (!appUri) {
    return "";
  }
  appUri = appUri.startsWith("ipfs://")
    ? `${process.env.DEFAULT_IPFS_GATEWAY}/${appUri.replace("ipfs://", "")}`
    : appUri;

  return appUri;
};

export const AppURISetup: React.FC<AppURISetupProps> = ({ appUri = null }) => {
  const { register, watch } = useForm<{
    appUri: string;
  }>({
    defaultValues: {
      appUri: "",
    },
    reValidateMode: "onChange",
  });

  const isMobile = useBreakpointValue({ base: true, md: false });
  const iframeSrc = buildIframeSrc(appUri);

  const embedCode = `<iframe
src="${iframeSrc}"
width="600px"
height="600px"
style="max-width:100%;"
frameborder="0"
></iframe>`;

  const { hasCopied, onCopy } = useClipboard(embedCode, 3000);

  return (
    <Flex gap={8} direction="column">
      <Flex gap={8} direction={{ base: "column", md: "row" }}>
        <Stack as={Card} w={{ base: "100%", md: "50%" }}>
          <Heading size="title.sm" mb={4}>
            Configuration
          </Heading>
          <FormControl>
            <FormLabel>Current App URI</FormLabel>
            <Input type="url" {...register("appUri")} />
          </FormControl>
        </Stack>
        <Stack as={Card} w={{ base: "100%", md: "50%" }}>
          <Heading size="title.sm">Embed Code</Heading>
          <CodeBlock
            canCopy={false}
            whiteSpace="pre"
            overflowX="auto"
            code={embedCode}
            language="markup"
          />
          <Button
            colorScheme="purple"
            w="auto"
            variant="outline"
            onClick={onCopy}
            leftIcon={hasCopied ? <IoMdCheckmark /> : <FiCopy />}
          >
            {hasCopied ? "Copied!" : "Copy to clipboard"}
          </Button>
        </Stack>
      </Flex>

      <Stack align="center" gap={2}>
        <Heading size="title.sm">Preview</Heading>
        <iframe
          src={iframeSrc}
          width={isMobile ? "100%" : "600px"}
          height="600px"
          frameBorder="0"
        />
      </Stack>
    </Flex>
  );
};
