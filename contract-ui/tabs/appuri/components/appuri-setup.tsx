import { useBreakpointValue } from "@chakra-ui/media-query";
import { Flex, FormControl, Input, Stack } from "@chakra-ui/react";
import { SmartContract } from "@thirdweb-dev/sdk/dist/declarations/src/evm/contracts/smart-contract";
import { BaseContract } from "ethers";
import { useForm } from "react-hook-form";
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
    ? `${process.env.DEFAULT_IPFS_GATEWAY}/${appUri.replace("ipfs://", "")}`
    : appUri;

  return appUri;
};

export const AppURISetup: React.FC<AppURISetupProps> = ({
  appURI,
  contract,
}) => {
  const { register, watch, getValues, getFieldState } = useForm<{
    appURI: string;
  }>({
    defaultValues: {
      appURI,
    },
    reValidateMode: "onChange",
  });

  const iframeSrc = buildIframeSrc(appURI);

  const embedCode = `<iframe
src="${iframeSrc}"
width="600px"
height="600px"
style="max-width:100%;"
frameborder="0"
></iframe>`;

  return (
    <Flex gap={8} direction="column">
      <Flex gap={8} direction={{ base: "column", md: "row" }}>
        <Stack as={Card} w={{ base: "100%", md: "50%" }}>
          <FormControl>
            <FormLabel>Current App URI</FormLabel>
            <Input type="url" {...register("appURI")} />
          </FormControl>
          <Button
            colorScheme="purple"
            w="auto"
            variant="outline"
            onClick={() => contract?.appURI.set(getValues("appURI"))}
          >
            Save
          </Button>
        </Stack>
        <Stack as={Card} w={{ base: "100%", md: "50%" }}>
          <Heading size="title.sm">Embed Code</Heading>
          <CodeBlock
            canCopy={true}
            whiteSpace="pre"
            overflowX="auto"
            code={embedCode}
            language="markup"
          />
        </Stack>
      </Flex>

      <Stack align="center" gap={2}>
        <Button
          colorScheme="purple"
          w="auto"
          variant="outline"
          onClick={() => window.open(iframeSrc, "_blank")}
        >
          Open App
        </Button>
      </Stack>
    </Flex>
  );
};
