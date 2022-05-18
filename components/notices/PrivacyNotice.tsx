import {
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Logo } from "components/logo";
import { useLocalStorage } from "hooks/useLocalStorage";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Checkbox, Heading, Text, TrackedLink } from "tw-components";

export const PrivacyNotice: React.FC = () => {
  const [hasShownWelcome, setHasShownWelcome] = useLocalStorage(
    "hasShownWelcome",
    false,
  );
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { register, handleSubmit } = useForm<{ accepted: false }>();

  return hasShownWelcome ? null : (
    <Modal
      size={isMobile ? "full" : "xl"}
      closeOnEsc={false}
      allowPinchZoom
      closeOnOverlayClick={false}
      isCentered
      isOpen
      onClose={() => setHasShownWelcome(true)}
    >
      <ModalOverlay />
      <ModalContent p={{ base: 0, md: 8 }}>
        <ModalHeader mt={{ base: 8, md: 0 }}>
          <Flex align="flex-start" gap={1}>
            <Logo />
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Flex
            gap={1}
            flexDirection="column"
            as="form"
            onSubmit={handleSubmit(() => setHasShownWelcome(true))}
          >
            <Heading size="subtitle.md">
              Welcome to the thirdweb dashboard
            </Heading>
            <Flex mt={1}>
              <Checkbox isRequired {...register("accepted")} />
              <Text ml={3}>
                Check here to indicate that you have read and agree to our{" "}
                <TrackedLink
                  href="/privacy"
                  isExternal
                  category="notice"
                  label="privacy"
                  textDecoration="underline"
                >
                  Privacy Policy
                </TrackedLink>{" "}
                and{" "}
                <TrackedLink
                  href="/tos"
                  isExternal
                  category="notice"
                  label="terms"
                  textDecoration="underline"
                >
                  Terms of Service
                </TrackedLink>
              </Text>
            </Flex>
            <Divider my={4} />
            <Button
              autoFocus
              width="100%"
              type="submit"
              borderRadius="md"
              colorScheme="primary"
            >
              Continue
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
