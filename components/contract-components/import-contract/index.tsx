import { useImportContract } from "@3rdweb-sdk/react/hooks/useImportContract";
import {
  Center,
  Container,
  Divider,
  Flex,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import { ChakraNextImage } from "components/Image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import {
  Button,
  Card,
  Heading,
  LinkButton,
  Text,
  TrackedLink,
} from "tw-components";

interface ImportContractProps {
  contractAddress: string;
  chain: Chain | null;
  autoImport?: boolean;
}

export const ImportContract: React.FC<ImportContractProps> = ({
  contractAddress,
  chain,
  autoImport,
}) => {
  const importContract = useImportContract();
  const router = useRouter();

  const handleImportContract = useCallback(() => {
    if (!chain) {
      return;
    }

    importContract.mutate({ contractAddress, chain });
  }, [chain, contractAddress, importContract]);

  const didAutoImportRef = useRef(false);
  useEffect(() => {
    if (autoImport && chain && !didAutoImportRef.current) {
      didAutoImportRef.current = true;
      // for some reason this needs to be deferred to the next event loop otherwise we don't get the correct staus reports from the query
      setTimeout(() => {
        handleImportContract();
      }, 0);
    }
  }, [autoImport, chain, handleImportContract]);

  const [countDown, setCountDown] = useState(10);

  useEffect(() => {
    if (!importContract.isSuccess) {
      return;
    }
    const inter = setInterval(() => {
      setCountDown((prev) => {
        if (prev === 1) {
          router.replace(`/${chain?.slug}/${contractAddress}`);
          clearInterval(inter);
        }
        if (prev === 0) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      setCountDown(10);
      clearInterval(inter);
    };
  }, [chain?.slug, contractAddress, importContract.isSuccess, router]);

  return (
    <Container maxW="container.page" h="full">
      <Center h="full">
        <Card
          w="container.sm"
          as={Flex}
          flexDirection="column"
          py={12}
          px={16}
          gap={8}
        >
          <ChakraNextImage
            boxSize={16}
            src={require("./wrench.png")}
            alt="🔧"
          />
          <Flex direction="column" gap={6}>
            <Flex gap={4} align="center">
              <Heading as="h2" size="title.lg">
                {importContract.isLoading
                  ? "Importing contract"
                  : importContract.error
                  ? "Contract could not be imported."
                  : importContract.isSuccess
                  ? "Import successful!"
                  : "Contract requires import."}
              </Heading>
              {importContract.isLoading && (
                <Spinner
                  boxSize={8}
                  color="blue.400"
                  _light={{ color: "blue.600" }}
                  size="md"
                />
              )}
              {importContract.isSuccess && (
                <Icon
                  boxSize={8}
                  as={FiCheck}
                  color="green.400"
                  _light={{ color: "green.600" }}
                />
              )}
            </Flex>
            <Text>
              {importContract.isError
                ? `We could not resolve your contract's ABI or it is deployed on a network that import is not yet supported on.`
                : `This is a one-time action. Once imported, the contract can be
              accessed by everyone. This can take up to a few minutes.`}
            </Text>

            <Flex direction="column" gap={1.5} align="center">
              {importContract.isSuccess ? (
                <LinkButton
                  as={TrackedLink}
                  {...{
                    category: "import-contract",
                    label: "go-to-contract",
                  }}
                  href={`/${chain?.slug}/${contractAddress}`}
                  w="full"
                  colorScheme="green"
                  rightIcon={<Icon as={FiArrowRight} />}
                >
                  Go to contract dashboard
                </LinkButton>
              ) : (
                <Button
                  w="full"
                  colorScheme="blue"
                  isLoading={importContract.isLoading}
                  isDisabled={importContract.isSuccess || !chain}
                  loadingText="Importing"
                  onClick={handleImportContract}
                >
                  Import Contract
                </Button>
              )}
              <Text
                opacity={importContract.isSuccess ? 0.8 : 0}
                userSelect="none"
                size="body.sm"
              >
                Automatically redirecting in {countDown}...
              </Text>
            </Flex>

            <Divider />
            <Text>
              If you require assistance please{" "}
              <TrackedLink
                _dark={{
                  color: "blue.400",
                }}
                _light={{
                  color: "blue.600",
                }}
                category="import-contract"
                label="support"
                href="https://support.thirdweb.com/how-to-reach-us/gY4SUcfwkzcy5XjnWZvYiE"
                isExternal
              >
                reach out to us
              </TrackedLink>
              .
            </Text>
          </Flex>
        </Card>
      </Center>
    </Container>
  );
};
