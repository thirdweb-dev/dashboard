import {
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { Button } from "tw-components";

export const RemoveButton: React.FC<{ onRemove: () => void }> = ({
  onRemove,
}) => {
  const deletePopover = useDisclosure();

  return (
    <Popover
      isOpen={deletePopover.isOpen}
      onOpen={deletePopover.onOpen}
      onClose={deletePopover.onClose}
    >
      <PopoverTrigger>
        <Button variant="outline">Remove Network</Button>
      </PopoverTrigger>
      <PopoverContent
        bg="backgroundBody"
        mb={3}
        boxShadow="0 0px 20px rgba(0, 0, 0, 0.15)"
      >
        <PopoverArrow bg="backgroundBody" />
        <PopoverCloseButton />
        <PopoverHeader border="none"> Are you sure? </PopoverHeader>
        <PopoverFooter border="none" p={4} mt={2} display="flex" gap={3}>
          <Button colorScheme="red" onClick={onRemove}>
            Remove
          </Button>
          <Button onClick={deletePopover.onClose} variant="outline">
            Cancel
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
