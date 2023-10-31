import { useAccount } from "@3rdweb-sdk/react/hooks/useApi";
import {
  Divider,
  Flex,
  FormControl,
  Icon,
  Image,
  Input,
  LinkBox,
  LinkOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Tag,
  TagLabel,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { CSSProperties } from "react";
import { useForm } from "react-hook-form";
import { FiArrowRight } from "react-icons/fi";
import {
  Card,
  Link,
  Text,
  Button,
  FormHelperText,
  Heading,
  TrackedLinkOverlay,
} from "tw-components";

function simplifyURL(url: string): string {
  const parsedURL = new URL(url);
  return `${parsedURL.protocol}//${parsedURL.host}/`;
}

interface NoEngineInstanceProps {
  instance: string;
  setInstanceUrl: (value: string) => void;
  disclosure: UseDisclosureReturn;
}

export const NoEngineInstance: React.FC<NoEngineInstanceProps> = ({
  instance,
  setInstanceUrl,
  disclosure,
}) => {
  const meQuery = useAccount();
  const address = useAddress();
  const form = useForm({
    defaultValues: {
      url: instance,
    },
  });

  const earlyAccessRequestformUrl = `https://share.hsforms.com/1k5tu00ueS5OYMaxHK6De-gea58c?email=${
    meQuery.data?.email || ""
  }&thirdweb_account_id=${meQuery.data?.id || ""}`;

  return (
    <>
      <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={form.handleSubmit((data) => {
            setInstanceUrl(simplifyURL(data.url));
            disclosure.onClose();
          })}
        >
          <ModalHeader>Set Engine Instance</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <Input
                type="url"
                placeholder="Enter your Engine URL"
                autoFocus
                {...form.register("url")}
              />
              <FormHelperText>
                Only https:// URLs are accepted.{" "}
                <Link
                  href="https://portal.thirdweb.com/engine/getting-started"
                  color="primary.500"
                  isExternal
                >
                  Learn more
                </Link>
                .
              </FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter as={Flex} gap={3}>
            <Button onClick={disclosure.onClose} variant="ghost">
              Cancel
            </Button>
            <Button colorScheme="primary" type="submit">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {!instance && address && (
        <>
          <LinkBox my={6}>
            <Card
              p={10}
              _hover={{
                borderColor: "blue.500",
              }}
              transitionDuration="200ms"
              bgColor="backgroundHighlight"
              borderColor="#0000"
            >
              <Stack spacing={4}>
                <LinkOverlay href="#" onClick={disclosure.onOpen}>
                  <Flex align="center" gap={2}>
                    <Image
                      src="/assets/engine/cloud-icon.png"
                      alt="cloud icon"
                      w={8}
                    />
                    <Heading size="title.sm">Add my Engine instance</Heading>
                    <Icon as={FiArrowRight} boxSize={6} />
                  </Flex>
                </LinkOverlay>

                <Text>
                  Manage Engine by providing the URL to your running Engine
                  instance.
                </Text>
              </Stack>
            </Card>
          </LinkBox>

          <Divider />

          <Text fontStyle="italic">Don&apos;t have Engine running yet?</Text>

          <SimpleGrid columns={2} gap={8}>
            <LinkBox>
              <Card
                p={10}
                _hover={{
                  borderColor: "blue.500",
                }}
                transitionDuration="200ms"
                h="full"
              >
                <Stack spacing={4}>
                  <Tag
                    variant="outline"
                    w="fit-content"
                    // Hack to fix tags in dark mode.
                    style={{ "--badge-color": "gray" } as CSSProperties}
                  >
                    <TagLabel>Free</TagLabel>
                  </Tag>

                  <LinkOverlay
                    href="https://portal.thirdweb.com/engine/getting-started"
                    isExternal
                  >
                    <Flex align="center" gap={2}>
                      <Heading size="title.sm">Self-host Engine</Heading>
                      <Icon as={FiArrowRight} boxSize={6} />
                    </Flex>
                  </LinkOverlay>

                  <Text>
                    Host Engine on your own infrastructure with minimal setup.
                  </Text>
                </Stack>
              </Card>
            </LinkBox>

            <LinkBox>
              <Card
                p={10}
                _hover={{
                  borderColor: "blue.500",
                }}
                transitionDuration="200ms"
                h="full"
              >
                <Stack spacing={4}>
                  <Tag
                    variant="outline"
                    w="fit-content"
                    // Hack to fix tags in dark mode.
                    style={{ "--badge-color": "gray" } as CSSProperties}
                  >
                    $99 / month
                  </Tag>
                  <TrackedLinkOverlay
                    href={earlyAccessRequestformUrl}
                    isExternal
                    category="engine"
                    label="clicked-request-early-access"
                    fontWeight="medium"
                  >
                    <Flex align="center" gap={2}>
                      <Heading size="title.sm">
                        Request a cloud-hosted Engine
                      </Heading>
                      <Icon as={FiArrowRight} boxSize={6} />
                    </Flex>
                  </TrackedLinkOverlay>

                  <Text>
                    Host Engine on thirdweb-managed infrastructure with no
                    setup.
                  </Text>
                </Stack>
              </Card>
            </LinkBox>
          </SimpleGrid>
        </>
      )}
    </>
  );
};
