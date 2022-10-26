import { useUnrelease } from "../hooks";
import {
  Flex,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useRouter } from "next/router";
import { BiTrash } from "react-icons/bi";
import { Button, Card, Text } from "tw-components";

export const UnreleaseButton = ({ contractId }: { contractId: string }) => {
  const trackEvent = useTrack();
  const unreleaseMutation = useUnrelease();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { onSuccess, onError } = useTxNotifications(
    "Successfully unreleased contract",
    "Failed to unrelease contract",
  );

  console.log(contractId);

  return (
    <Popover isLazy isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button variant="outline" size="sm" leftIcon={<Icon as={BiTrash} />}>
          Unrelease
        </Button>
      </PopoverTrigger>
      <Card
        maxW="sm"
        w="auto"
        as={PopoverContent}
        bg="backgroundCardHighlight"
        mx={6}
        boxShadow="0px 0px 2px 0px var(--popper-arrow-shadow-color)"
      >
        <PopoverArrow bg="backgroundCardHighlight" />
        <PopoverBody>
          <Flex flexDir="column" gap={2}>
            <Text>Are you sure you want to unrelease this contract?</Text>
            <Flex w="full" gap={2}>
              <Button onClick={onClose} size="sm" w="full" variant="outline">
                Cancel
              </Button>
              <Button
                w="full"
                size="sm"
                isLoading={unreleaseMutation.isLoading}
                colorScheme="red"
                onClick={() => {
                  trackEvent({
                    category: "unpublish",
                    action: "click",
                    label: "attempt",
                  });
                  unreleaseMutation.mutate(contractId, {
                    onSuccess: () => {
                      onSuccess();
                      trackEvent({
                        category: "unpublish",
                        action: "click",
                        label: "success",
                      });
                      router.push("/dashboard");
                    },
                    onError: (error) => {
                      trackEvent({
                        category: "unpublish",
                        action: "click",
                        label: "error",
                        error,
                      });
                      onError(error);
                    },
                  });
                }}
              >
                Confirm
              </Button>
            </Flex>
          </Flex>
        </PopoverBody>
      </Card>
    </Popover>
  );
};
