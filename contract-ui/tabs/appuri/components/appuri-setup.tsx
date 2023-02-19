import {
  Box,
  Center,
  Flex,
  FormControl,
  HStack,
  Input,
  Stack,
} from "@chakra-ui/react";
import { SmartContract } from "@thirdweb-dev/sdk/dist/declarations/src/evm/contracts/smart-contract";
import { BaseContract } from "ethers";
import { useEffect } from "react";
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
  const { register, watch, getValues, setValue } = useForm<{
    appURI: string;
  }>({
    defaultValues: {
      appURI,
    },
    reValidateMode: "onChange",
  });

  useEffect(() => {
    setValue("appURI", appURI || "");
  }, [appURI, setValue]);
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
          <Center>
            <HStack>
              <Button
                colorScheme="purple"
                w="auto"
                variant="outline"
                onClick={() => window.open(iframeSrc, "_blank")}
              >
                View App
              </Button>

              <Button
                colorScheme="purple"
                w="50%"
                disabled={watch("appURI") === appURI}
                onClick={() => contract?.appURI.set(getValues("appURI"))}
              >
                Save
              </Button>
            </HStack>
          </Center>
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
      <Center>
        <Box maxW="90%" maxH="90%" w="600px" h="600px">
          <iframe src={iframeSrc} width="100%" height="100%"></iframe>
        </Box>
      </Center>
    </Flex>
  );
};
